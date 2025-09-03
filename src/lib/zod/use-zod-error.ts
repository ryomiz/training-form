import { useState } from "react";
import type { ZodError } from "zod";

export const useZodError = <T extends string>() => {
  const [zodError, setZodError] = useState<ZodError | null>(null);
  const getErrorMessage = (targetPath: T) => {
    if (!zodError) return "";

    const targetIssues = zodError.issues.filter((issue) =>
      issue.path.includes(targetPath),
    );
    if (targetIssues.length === 0) return "";

    return targetIssues.map((issue) => issue.message).join("\n");
  };

  return { setZodError, getErrorMessage };
};
