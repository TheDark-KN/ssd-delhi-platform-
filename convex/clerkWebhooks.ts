import { v } from "convex/values";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { MutationCtx } from "./_generated/server";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

function verifyClerkSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export const clerkWebhook = httpAction(async (ctx, request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = request.headers.get("svix-signature");
  const payload = await request.text();

  if (!signature || !CLERK_WEBHOOK_SECRET) {
    console.error("Missing signature or webhook secret");
    return new Response("Unauthorized", { status: 401 });
  }

  if (!verifyClerkSignature(payload, signature, CLERK_WEBHOOK_SECRET)) {
    console.error("Invalid signature");
    return new Response("Unauthorized", { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    console.error("Invalid JSON payload");
    return new Response("Bad request", { status: 400 });
  }

  try {
    switch (event.type) {
      case "user.created":
        await ctx.runMutation(internal.users.handleUserCreated, { data: event });
        break;
      case "user.updated":
        await ctx.runMutation(internal.users.handleUserUpdated, { data: event });
        break;
      case "user.deleted":
        await ctx.runMutation(internal.users.handleUserDeleted, { data: event });
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response("Internal server error", { status: 500 });
  }
});