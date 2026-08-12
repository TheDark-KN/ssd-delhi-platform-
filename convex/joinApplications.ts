import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitJoinApplication = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    occupation: v.string(),
    motivation: v.string(),
    volunteeringPath: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("joinApplications")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "new"))
      .first();

    if (existing) {
      throw new Error("An application with this email is already under review.");
    }

    return await ctx.db.insert("joinApplications", {
      ...args,
      submittedAt: Date.now(),
      status: "new",
    });
  },
});

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const applications = await ctx.db
      .query("joinApplications")
      .withIndex("by_submitted_at")
      .order("desc")
      .collect();
    return args.limit ? applications.slice(0, args.limit) : applications;
  },
});
