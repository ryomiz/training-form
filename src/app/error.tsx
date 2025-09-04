"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className={"text-center font-bold text-xl"}>
        Oops,
        <br /> Something went wrong
      </h1>
      <Button
        onClick={() => window.location.reload()}
        className={"mt-2 w-full"}
      >
        Refresh the Page
      </Button>
    </div>
  );
}
