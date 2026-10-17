const apiBaseUrl = process.env.NEXT_PUBLIC_SSD_API_URL ?? "https://api.samtasainikdal.org/api/v1"

export type SsdApiEnvelope<T> = { data: T }
export type SsdApiRequestInit = RequestInit & { token?: string | null }

type SsdApiError = {
  error?: { code?: string; message?: string; field?: string }
}

export async function ssdApi<T>(path: string, init: SsdApiRequestInit = {}): Promise<T> {
  const { token, ...requestInit } = init
  const headers = new Headers(requestInit.headers)
  headers.set("Accept", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)
  if (requestInit.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(`${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
    ...requestInit,
    headers,
  })

  if (response.status === 204) return undefined as T

  const body = await response.json().catch(() => null) as SsdApiError | T | null
  if (!response.ok) {
    const errorBody = body as SsdApiError | null
    throw new Error(errorBody?.error?.message ?? `SSD API request failed (${response.status})`)
  }

  return body as T
}

export type MembershipApplicationInput = {
  full_name: string
  email: string
  phone?: string
  city?: string
  state?: string
  message?: string
  consent: boolean
}

export function submitMembershipApplication(values: MembershipApplicationInput, token?: string | null) {
  return ssdApi<SsdApiEnvelope<unknown>>("/membership/apply", {
    method: "POST",
    token,
    body: JSON.stringify(values),
  })
}

export type SsdProfile = {
  id?: string
  full_name?: string
  email?: string
  role?: "user" | "admin" | "super_admin" | string
  membership_status?: string
  membership_number?: string | null
  member_since?: string | null
}

export function getMyProfile(token: string) {
  return ssdApi<SsdApiEnvelope<SsdProfile>>("/me", { token, cache: "no-store" })
}

export function getMyRsvps(token: string) {
  return ssdApi<SsdApiEnvelope<unknown[]>>("/me/rsvps", { token, cache: "no-store" })
}

export function getMyMembershipStatus(token: string) {
  return ssdApi<SsdApiEnvelope<unknown>>("/me/membership-status", { token, cache: "no-store" })
}

export type SsdIdApplication = {
  id?: string
  status?: "pending" | "approved" | "rejected" | "revoked" | string
  ssd_id?: string | null
  membership_number?: string | null
  card_id?: string | null
  qr_token?: string | null
  created_at?: string
  updated_at?: string
}

export function applyForSsdId(token: string, values: Record<string, unknown> = {}) {
  return ssdApi<SsdApiEnvelope<SsdIdApplication>>("/id/apply", {
    method: "POST",
    token,
    body: JSON.stringify(values),
  })
}

export function getMySsdIdApplications(token: string) {
  return ssdApi<SsdApiEnvelope<SsdIdApplication[]>>("/id/me", { token, cache: "no-store" })
}

export function getSsdIdDownloadUrl(token: string, id: string) {
  return ssdApi<SsdApiEnvelope<{ url?: string; download_url?: string }>>(`/id/${encodeURIComponent(id)}/download`, { token, cache: "no-store" })
}

export function getApiHealth() {
  return ssdApi<{ status?: string }>("/health", { cache: "no-store" })
}
