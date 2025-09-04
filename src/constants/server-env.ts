/** biome-ignore-all lint/style/noNonNullAssertion: Zod throw error if env is not set  */
import z from "zod";

const schema = z.object({
  API_KEY: z.string(),
});

export const serverEnv = schema.parse({
  API_KEY: process.env.API_KEY!,
});
