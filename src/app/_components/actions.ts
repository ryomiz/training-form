"use server";

import { clientEnv } from "@/constants/client-env";
import { type ApplicationFormInput, applicationFormSchema } from "./schema";

export const submitApplicationAction = async (
  formInput: ApplicationFormInput,
) => {
  const parsedFormInput = applicationFormSchema.parse(formInput);
  const res = await fetch(`${clientEnv.BASE_API_URL}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedFormInput),
  });
  if (res.status !== 200) {
    throw new Error("Failed to Submit");
  }

  return;
};
