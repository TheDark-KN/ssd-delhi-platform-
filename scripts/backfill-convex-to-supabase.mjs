import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY
if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
const input = process.argv[2]
if (!input) throw new Error('Usage: node scripts/backfill-convex-to-supabase.mjs export.json')
const exportData = JSON.parse(await (await import('node:fs/promises')).readFile(input, 'utf8'))
const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
const tables = ['users', 'history', 'articles', 'blogs', 'events', 'national_officers', 'media_gallery', 'join_applications', 'contact_messages']
const columns = { users: { _id: 'id', clerkId: 'clerk_id', profilePhoto: 'profile_photo_url', membershipStatus: 'membership_status', memberSince: 'member_since', membershipNumber: 'membership_number', preferredLanguage: 'preferred_language' }, articles: { _id: 'id', featuredImage: 'featured_image_url', viewCount: 'view_count', publishedAt: 'published_at' }, blogs: { _id: 'id', featuredImage: 'featured_image_url', viewCount: 'view_count', publishedAt: 'published_at', allowComments: 'allow_comments' }, events: { _id: 'id', startDate: 'start_date', endDate: 'end_date', maxAttendees: 'max_attendees', registrationDeadline: 'registration_deadline', featuredImage: 'featured_image_url', isPublic: 'is_public' } }
const iso = value => typeof value === 'number' ? new Date(value).toISOString() : value
for (const table of tables) {
  const rows = (exportData[table] ?? []).map(row => Object.fromEntries(Object.entries(row).filter(([key]) => key !== '_id').map(([key, value]) => [columns[table]?.[key] ?? key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`), ['published_at','start_date','end_date','registration_deadline','member_since'].includes(columns[table]?.[key]) ? iso(value) : value])))
  if (!rows.length) continue
  const { error } = await supabase.from(table).upsert(rows)
  if (error) throw new Error(`${table}: ${error.message}`)
  console.log(`Backfilled ${rows.length} ${table}`)
}
