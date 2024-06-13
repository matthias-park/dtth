"use server";
import type {User} from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from "zod";
import { auth } from "@/auth";
import { db } from '@/db';
import path from '@/path';

const linkedinUrlPattern =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in)\/[A-z0-9_-]+\/?$/;
const createDemonSchema = z.object({
  name: z.string().min(3),
  url: z.string().min(3).regex(linkedinUrlPattern, {
    message: "Must be LinkedIn URL Format",
  }),
});

interface CreateUserFormState {
  errors: {
    name?: string[];
    url?: string[];
    _form?: string[];
  };
}

export async function createUser(
  formState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {

  await new Promise(resolve => setTimeout(resolve, 2500));

  const result = createDemonSchema.safeParse({
    name: formData.get('name'),
    url: formData.get("url"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if(!session || !session.user) {
    return {
      errors: {
        _form:["You must be signed in to do this"],
      }
    }
  }

  let user: User;
  try {
    user = await db.user.create({
      data: {
        name: result.data.name,
        currentUrl: result.data.url,
        reputation: -1,
      }
    })
  } catch (err: unknown) {
    if(err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ["Something went wrong"]
        }
      }
    }
  }

  if(user.currentUrl) {
    revalidatePath('/');
    redirect(path.userShow(user.currentUrl));
  }
  

  return {
    errors: {}
  };

}
