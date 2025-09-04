/** biome-ignore-all lint/style/noNonNullAssertion: Zod throw error if env is not set  */
import z from "zod";

const schema = z.object({
  API_URL: z.string(),
});

export const clientEnv = schema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
});
