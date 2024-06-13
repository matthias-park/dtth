"use server";
import type {Demon} from '@prisma/client';
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

interface CreateDemonFormState {
  errors: {
    name?: string[];
    url?: string[];
    _form?: string[];
  };
}

export async function createUser(
  formState: CreateDemonFormState,
  formData: FormData
): Promise<CreateDemonFormState> {

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

  let demon: Demon;
  try {
    demon = await db.demon.create({
      data: {
        url: result.data.url,
        name: result.data.name,
        title: "Imp",
        reputation: -1,
        userId: session.user?.id || ''
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

  if(demon.url) {
    revalidatePath('/');
    redirect(path.demonShow(demon.url));
  }
  

  return {
    errors: {}
  };

}
