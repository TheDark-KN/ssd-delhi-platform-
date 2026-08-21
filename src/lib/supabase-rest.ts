const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function getConfig() {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase environment variables are not configured")
  return { supabaseUrl, supabaseKey }
}

function toClientRecord(row: Record<string, unknown>) {
  return {
    ...row,
    _id: row.id,
    viewCount: row.view_count ?? 0,
    publishedAt: row.published_at,
    featuredImageUrl: row.featured_image_url,
    authorClerkId: row.author_clerk_id,
    startDate: row.start_date ? new Date(String(row.start_date)).getTime() : undefined,
    endDate: row.end_date ? new Date(String(row.end_date)).getTime() : undefined,
    registrationDeadline: row.registration_deadline ? new Date(String(row.registration_deadline)).getTime() : undefined,
    isPublic: row.is_public,
    maxAttendees: row.max_attendees,
    allowComments: row.allow_comments,
    submittedAt: row.submitted_at,
  }
}

async function query<T>(table: string, params: Record<string, string> = {}) {
  const { supabaseUrl, supabaseKey } = getConfig()
  const url = new URL(`${supabaseUrl}/rest/v1/${table}`)
  url.search = new URLSearchParams({ select: "*", ...params }).toString()
  const response = await fetch(url, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`)
  const rows = await response.json() as Record<string, unknown>[]
  return rows.map(toClientRecord) as T
}

export type SupabaseArticle = {
  id: string; title: string; slug: string; content: string; excerpt: string
  featured_image_url: string | null; category: string; tags: string[]; language: "en" | "hi"
  status: string; published_at: string | null; view_count: number; featured: boolean
}

export type SupabaseBlog = {
  id: string; title: string; slug: string; content: string; featured_image_url: string | null
  category: string; tags: string[]; language: "en" | "hi"; status: string
  published_at: string | null; view_count: number; allow_comments: boolean
}

export type SupabaseEvent = {
  id: string; title: string; slug: string; description: string; start_date: string; end_date: string
  venue: string; address: string; city: string; max_attendees: number | null
  registration_deadline: string | null; featured_image_url: string | null; category: string
  status: string; is_public: boolean
}

export const listArticles = (category?: string, language?: string) => query<SupabaseArticle[]>("articles", {
  status: "eq.published", ...(category ? { category: `eq.${category}` } : {}), ...(language ? { language: `eq.${language}` } : {}), order: "published_at.desc",
})

export const listBlogs = (category?: string) => query<SupabaseBlog[]>("blogs", {
  status: "eq.published", ...(category ? { category: `eq.${category}` } : {}), order: "published_at.desc", limit: "50",
})

export const listEvents = (status?: string, category?: string) => query<SupabaseEvent[]>("events", {
  is_public: "eq.true", ...(status ? { status: `eq.${status}` } : {}), ...(category ? { category: `eq.${category}` } : {}), order: "start_date.asc",
})

export type DashboardSnapshot = {
  id: string
  snapshot_key: string
  data: Record<string, unknown>
  captured_at: string
  updated_at: string
}

export const getDashboardSnapshot = (snapshotKey: string) => query<DashboardSnapshot[]>("dashboard_snapshots", {
  snapshot_key: `eq.${encodeURIComponent(snapshotKey)}`,
  limit: "1",
})

export async function submitJoinApplication(values: Record<string, unknown>) {
  const { supabaseUrl, supabaseKey } = getConfig()
  const response = await fetch(`${supabaseUrl}/rest/v1/join_applications`, {
    method: "POST",
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      occupation: values.occupation,
      motivation: values.motivation,
      volunteering_path: values.volunteeringPath ?? null,
      status: "new",
    }),
  })
  if (!response.ok) throw new Error("Supabase submission failed")
}
