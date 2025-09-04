import z from "zod";

export const holidaySchema = z.object({
  country: z.string(),
  iso: z.string(),
  year: z.number(),
  date: z.string(),
  day: z.string(),
  name: z.string(),
  type: z.union([
    z.literal("NATIONAL_HOLIDAY"),
    z.literal("OBSERVANCE"),
    z.string(),
  ]),
});
export type Holiday = Omit<z.infer<typeof holidaySchema>, "type"> & {
  type: "NATIONAL_HOLIDAY" | "OBSERVANCE" | (string & {});
};
