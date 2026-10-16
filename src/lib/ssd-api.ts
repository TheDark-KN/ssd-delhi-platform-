const apiBaseUrl = process.env.NEXT_PUBLIC_SSD_API_URL ?? "https://api.samtasainikdal.org/api/v1"

export type SsdApiEnvelope<T> = { data: T }

type SsdApiError = {
  error?: { code?: string; message?: string; field?: string }
}

export async function ssdApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set("Accept", "application/json")
  if (init.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(`${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
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
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  occupation: string
  motivation: string
  volunteering_path?: string
}

export function submitMembershipApplication(values: MembershipApplicationInput) {
  return ssdApi<SsdApiEnvelope<unknown>>("/membership/apply", {
    method: "POST",
    body: JSON.stringify(values),
  })
}

export function getApiHealth() {
  return ssdApi<{ status?: string }>("/health", { cache: "no-store" })
}
