import { NextResponse } from "next/server";
import { clerk } from "@/lib/clerk";

export async function GET(request: Request) {
  const users = await clerk.users.getUserList();
  return NextResponse.json({ ...users });
}
