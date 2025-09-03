"use server";

import type { ApplicationFormInput } from "./schema";

export const submitApplicationAction = async (
  formInput: ApplicationFormInput,
) => {
  console.log(formInput);
  return;
};
