import type { NextRequest } from "next/server";
import { clientEnv } from "@/constants/client-env";
import { serverEnv } from "@/constants/server-env";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get("year");

  const apiUrl = `${clientEnv.API_URL}/holidays?country=PL?${year}`;
  const res = await fetch(apiUrl, {
    headers: {
      "X-Api-Key": serverEnv.API_KEY,
    },
  });
  if (!res.ok) {
    return new Response("Failed to fetch holidays", { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
