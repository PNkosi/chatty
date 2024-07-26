import { convexClient } from "@/lib/convex";
import { api } from "../../../../convex/_generated/api";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(
  req: Request
): Promise<WebhookEvent | undefined> {
  const payloadString = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  try {
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (e) {
    console.error(e);
    return;
  }
}

export async function POST(request: Request) {
  const evt = await validateRequest(request);

  if (!evt) {
    return NextResponse.error();
  }

  switch (evt.type) {
    case "user.created":
    case "user.updated": {
      await convexClient.mutation(api.users.upsertUser, {
        clerkId: evt.data.id,
        email:
          evt.data.email_addresses.find(
            (e) => e.id === evt.data.primary_email_address_id
          )?.email_address || "",
        username: evt.data.username as string,
        image: evt.data.image_url,
      });
      return NextResponse.json({ ...evt.data });
      break;
    }
  }

  return NextResponse.json({ message: "Webhook received!" });
}

export async function GET() {
  return NextResponse.json({ message: "Hello from Clerk!" });
}
