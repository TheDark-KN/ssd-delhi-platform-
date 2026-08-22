import { headers } from "next/headers"
import { Webhook } from "svix"
import { createAdminClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

type ClerkEvent = { type: string; data: { id: string; email_addresses?: Array<{ email_address: string }>; first_name?: string | null; last_name?: string | null; image_url?: string; phone_numbers?: Array<{ phone_number: string }> } }

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: "Webhook is not configured" }, { status: 503 })
  const payload = await request.text()
  const headerStore = await headers()
  const svixHeaders = { "svix-id": headerStore.get("svix-id") ?? "", "svix-timestamp": headerStore.get("svix-timestamp") ?? "", "svix-signature": headerStore.get("svix-signature") ?? "" }
  let event: ClerkEvent
  try { event = new Webhook(secret).verify(payload, svixHeaders) as ClerkEvent } catch { return Response.json({ error: "Invalid signature" }, { status: 400 }) }
  const data = event.data
  const supabase = createAdminClient()
  if (event.type === "user.deleted") {
    const { error } = await supabase.from("users").delete().eq("clerk_id", data.id)
    if (error) return Response.json({ error: "Failed to delete user" }, { status: 500 })
    return Response.json({ ok: true })
  }
  if (event.type === "user.created" || event.type === "user.updated") {
    const email = data.email_addresses?.[0]?.email_address
    if (!email) return Response.json({ error: "User email is required" }, { status: 422 })
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || email
    const { error } = await supabase.from("users").upsert({ clerk_id: data.id, email, name, phone: data.phone_numbers?.[0]?.phone_number ?? null, profile_photo_url: data.image_url ?? null, updated_at: new Date().toISOString() }, { onConflict: "clerk_id" })
    if (error) return Response.json({ error: "Failed to sync user" }, { status: 500 })
  }
  return Response.json({ ok: true })
}
