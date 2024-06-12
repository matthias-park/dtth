"use server";
import { z } from "zod";

const linkedinUrlPattern =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in)\/[A-z0-9_-]+\/?$/;
const createDemonSchema = z.object({
  url: z.string().min(3).regex(linkedinUrlPattern, {
    message: "Must be LinkedIn URL Format",
  }),
  comment: z.string().min(10),
});

interface CreateDemonFormState {
  errors: {
    url?: string[];
    comment?: string[];
  };
}

export async function createDemon(
  formState: CreateDemonFormState,
  formData: FormData
): Promise<CreateDemonFormState> {
  const result = createDemonSchema.safeParse({
    url: formData.get("url"),
    comment: formData.get("comment"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  return {
    errors: {}
  };
  //TODO revalidate Home Page
}
