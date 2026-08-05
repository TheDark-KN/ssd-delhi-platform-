import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";

async function requireAdmin(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("You are not authorized to access the admin area.");
  const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).first();
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    throw new Error("You are not authorized to access the admin area.");
  }
  return user;
}

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("contactMessages", { ...args, submittedAt: Date.now(), status: "new" });
  },
});

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const messages = await ctx.db.query("contactMessages").withIndex("by_submitted_at").order("desc").collect();
    return args.limit ? messages.slice(0, args.limit) : messages;
  },
});

export const updateStatus = mutation({
  args: { messageId: v.id("contactMessages"), status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.messageId, { status: args.status });
    return args.messageId;
  },
});
