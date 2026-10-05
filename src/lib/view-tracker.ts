"use client";

/**
 * Real-time client-side view counter and tracker with session deduplication.
 * Ensures views are counted and persisted cleanly across articles, blogs, news, and library items.
 */

const STORAGE_VIEWS_KEY = "ssd_content_views_cache";
const SESSION_VIEWED_KEY = "ssd_viewed_content_session";

interface ViewStore {
  [contentKey: string]: number;
}

function getStoredViews(): ViewStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_VIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStoredViews(store: ViewStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_VIEWS_KEY, JSON.stringify(store));
  } catch {
    // Ignore quota errors
  }
}

function getSessionViewedKeys(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(SESSION_VIEWED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function addSessionViewedKey(key: string) {
  if (typeof window === "undefined") return;
  try {
    const viewed = getSessionViewedKeys();
    viewed.add(key);
    sessionStorage.setItem(SESSION_VIEWED_KEY, JSON.stringify(Array.from(viewed)));
  } catch {
    // Ignore errors
  }
}

/**
 * Generate consistent cache key for content items
 */
export function getContentKey(type: string, idOrSlug: string): string {
  return `${type}:${idOrSlug.toLowerCase()}`;
}

/**
 * Get current recorded view count for an item, falling back to base initial count.
 */
export function getViewCount(type: string, idOrSlug: string, baseCount = 0): number {
  if (!idOrSlug) return baseCount;
  const key = getContentKey(type, idOrSlug);
  const store = getStoredViews();
  if (typeof store[key] === "number") {
    return Math.max(store[key], baseCount);
  }
  return baseCount;
}

/**
 * Record a new view for an item with session deduplication (1 view per session per item).
 * Returns the updated total view count.
 */
export function recordView(type: string, idOrSlug: string, baseCount = 0): number {
  if (!idOrSlug || typeof window === "undefined") return baseCount;
  const key = getContentKey(type, idOrSlug);
  const sessionViewed = getSessionViewedKeys();
  const store = getStoredViews();
  const currentCount = typeof store[key] === "number" ? Math.max(store[key], baseCount) : baseCount;

  // If already viewed this item in this browser session, don't increment again
  if (sessionViewed.has(key)) {
    return currentCount;
  }

  // Increment view
  const newCount = currentCount + 1;
  store[key] = newCount;
  setStoredViews(store);
  addSessionViewedKey(key);

  return newCount;
}

/**
 * Format view count cleanly: 1240 -> "1.2k", 145000 -> "145k", 120 -> "120"
 */
export function formatViewCount(count: number): string {
  if (isNaN(count) || count <= 0) return "0";
  if (count < 1000) return count.toLocaleString();
  if (count < 1000000) {
    const k = count / 1000;
    return `${k >= 10 ? Math.round(k) : k.toFixed(1)}k`;
  }
  const m = count / 1000000;
  return `${m >= 10 ? Math.round(m) : m.toFixed(1)}M`;
}
