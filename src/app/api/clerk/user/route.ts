import { NextRequest, NextResponse } from "next/server";
import { clerk } from "@/lib/clerk";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const user = await clerk.users.getUser(id!);
  return NextResponse.json(user);
}
