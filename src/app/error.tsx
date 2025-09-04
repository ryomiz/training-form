"use client";
import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <h1 className={"text-center font-bold text-xl"}>
      Oops,
      <br /> Something went wrong
    </h1>
  );
}
