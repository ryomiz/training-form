import { type NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json(
      { error: "Failed to fetch holidays" },
      { status: 500 },
    );
  }

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
