"use server";
import { z } from "zod";

const linkedinUrlPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in)\/[A-z0-9_-]+\/?$/;
const createDemonSchema = z.object({
  url: z
    .string()
    .min(3)
    .regex(linkedinUrlPattern, {
      message: "Must be LinkedIn URL Format",
    }),
  comment: z.string().min(10),
});

export async function createDemon(formData: FormData) {
  const result = createDemonSchema.safeParse({
    url: formData.get("url"),
    comment: formData.get("comment"),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
  }
  //TODO revalidate Home Page
}
