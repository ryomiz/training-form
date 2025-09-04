import z from "zod";

export const holidaySchema = z.object({
  country: z.string(),
  iso: z.string(),
  year: z.number(),
  date: z.string(),
  day: z.string(),
  name: z.string(),
  type: z.string(),
});
export type Holiday = z.infer<typeof holidaySchema>;
