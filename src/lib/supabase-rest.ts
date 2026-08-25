const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function getConfig() {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase environment variables are not configured")
  return { supabaseUrl, supabaseKey }
}

async function query<T>(table: string, params: Record<string, string> = {}): Promise<T[]> {
  const { supabaseUrl, supabaseKey } = getConfig()
  const url = new URL(`${supabaseUrl}/rest/v1/${table}`)
  url.search = new URLSearchParams({ select: "*", ...params }).toString()
  const response = await fetch(url, { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" })
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`)
  return await response.json() as T[]
}

export type SupabaseArticle = { id: string; title: string; slug: string; content: string; excerpt: string; featured_image_url: string | null; category: string; tags: string[]; language: "en" | "hi"; status: string; published_at: string | null; view_count: number; featured: boolean }
export type SupabaseHistoryItem = { id: string; year: number; date_display: string; title: string; description: string; significance: string | null; era: string; created_at: string }
export type SupabaseBlog = { id: string; title: string; slug: string; content: string; featured_image_url: string | null; category: string; tags: string[]; language: "en" | "hi"; status: string; published_at: string | null; view_count: number; allow_comments: boolean }
export type SupabaseOfficer = { id: string; name: string; designation: string; state: string; slug: string; display_order?: number; email: string | null; social_links: Record<string, string> | null; zone: string | null; total_sainik_count: number; content_details: string | null; bio: string | null; rank_state: string | null; photo_url: string | null }

import { nationalOfficers } from "@/data/national-officers"

const officerFallback = nationalOfficers.map((officer) => ({ id: officer.id, name: officer.name, designation: officer.designation, state: officer.state, slug: officer.id, display_order: officer.displayOrder, email: null, social_links: null, zone: null, total_sainik_count: 0, content_details: null, bio: null, rank_state: null, photo_url: officer.photoPath ?? null })) satisfies SupabaseOfficer[]

export async function listOfficers(): Promise<SupabaseOfficer[]> {
  try {
    const rows = await query<SupabaseOfficer>("national_officers", { order: "display_order.asc" })
    return rows.length ? rows : officerFallback
  } catch (error) {
    console.warn("Supabase officer directory fallback", error)
    return officerFallback
  }
}

export async function getOfficerBySlug(slug: string) {
  const officers = await listOfficers()
  return officers.find((officer) => officer.slug === slug || officer.id === slug) ?? null
}

import { DEFAULT_ARTICLES, DEFAULT_TIMELINE } from "./articles-data"
export const getArticleBySlug = async (slug: string): Promise<SupabaseArticle[]> => { try { const rows = await query<SupabaseArticle>("articles", { slug: `eq.${encodeURIComponent(slug)}`, status: "eq.published", limit: "1" }); if (rows.length) return rows } catch (err) { console.warn("Supabase getArticleBySlug fallback", err) } return DEFAULT_ARTICLES.filter((a) => a.slug === slug) as unknown as SupabaseArticle[] }
export const getBlogBySlug = (slug: string) => query<SupabaseBlog>("blogs", { slug: `eq.${encodeURIComponent(slug)}`, status: "eq.published", limit: "1" })
export type SupabaseEvent = { id: string; title: string; slug: string; description: string; start_date: string; end_date: string; venue: string; address: string; city: string; max_attendees: number | null; registration_deadline: string | null; featured_image_url: string | null; category: string; status: string; is_public: boolean; popup_enabled?: boolean; popup_image_url?: string | null }
export const getEventBySlug = (slug: string) => query<SupabaseEvent>("events", { slug: `eq.${encodeURIComponent(slug)}`, is_public: "eq.true", limit: "1" })
export const listArticles = async (category?: string, language?: string): Promise<SupabaseArticle[]> => { try { const rows = await query<SupabaseArticle>("articles", { status: "eq.published", ...(category ? { category: `eq.${category}` } : {}), ...(language ? { language: `eq.${language}` } : {}), order: "published_at.desc" }); if (rows.length) return rows } catch (err) { console.warn("Supabase listArticles fallback", err) } return DEFAULT_ARTICLES.filter((a) => (!category || a.category === category) && (!language || a.language === language)) as unknown as SupabaseArticle[] }
export const listHistory = async (era?: string): Promise<any[]> => { try { const rows = await query<SupabaseHistoryItem>("history", { ...(era ? { era: `eq.${era}` } : {}), order: "year.asc" }); if (rows.length) return rows.map((r) => ({ ...r, _id: r.id, dateDisplay: r.date_display || String(r.year) })) } catch (err) { console.warn("Supabase listHistory fallback", err) } return DEFAULT_TIMELINE.filter((item) => !era || item.era === era) }
export const listBlogs = (category?: string) => query<SupabaseBlog>("blogs", { status: "eq.published", ...(category ? { category: `eq.${category}` } : {}), order: "published_at.desc", limit: "50" })
export type EventCard = SupabaseEvent & {
  _id: string
  startDate: string
  endDate: string
  maxAttendees: number | null
  registrationDeadline: string | null
  popupImageUrl: string | null
  isPublic: boolean
}

export const listEvents = async (status?: string, category?: string): Promise<EventCard[]> => {
  const rows = await query<SupabaseEvent>("events", {
    is_public: "eq.true",
    ...(status ? { status: `eq.${status}` } : {}),
    ...(category ? { category: `eq.${category}` } : {}),
    order: "start_date.asc",
  })

  return rows.map((event) => ({
    ...event,
    _id: event.id,
    startDate: event.start_date,
    endDate: event.end_date,
    maxAttendees: event.max_attendees,
    registrationDeadline: event.registration_deadline,
    popupImageUrl: event.popup_image_url ?? null,
    isPublic: event.is_public,
  }))
}
export type DashboardSnapshot = { id: string; snapshot_key: string; data: Record<string, unknown>; captured_at: string; updated_at: string }
export const getDashboardSnapshot = (snapshotKey: string) => query<DashboardSnapshot>("dashboard_snapshots", { snapshot_key: `eq.${encodeURIComponent(snapshotKey)}`, limit: "1" })

export async function submitJoinApplication(values: Record<string, unknown>) { const { supabaseUrl, supabaseKey } = getConfig(); const response = await fetch(`${supabaseUrl}/rest/v1/join_applications`, { method: "POST", headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ full_name: values.fullName, email: values.email, phone: values.phone, address: values.address, city: values.city, state: values.state, pincode: values.pincode, occupation: values.occupation, motivation: values.motivation, volunteering_path: values.volunteeringPath ?? null, status: "new" }) }); if (!response.ok) throw new Error("Supabase submission failed") }

