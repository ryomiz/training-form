import z from "zod";

export const applicationFormSchema = z.object({
  firstName: z.string().nonempty("First Name is Required"),
  lastName: z.string().nonempty("Last Name is Required"),
  email: z
    .email("Please use correct formatting.\nExample: address@email.com")
    .nonempty("Email is Required"),
  age: z.number().array(),
  file: z.custom<File | null>().refine((val) => val instanceof File, {
    message: "Photo is Required",
  }),
  timeSlot: z.string().nonempty("Please Select TimeSlot"),
});
export type ApplicationFormInput = z.infer<typeof applicationFormSchema>;
