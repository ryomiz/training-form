/** biome-ignore-all lint/style/noNonNullAssertion: Zod throw error if env is not set  */
import z from "zod";

const schema = z.object({
  BASE_API_URL: z.string(),
  API_URL: z.string(),
});

export const clientEnv = schema.parse({
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL!,
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
});
