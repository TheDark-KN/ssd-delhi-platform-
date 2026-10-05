# Complete Convex to Supabase Migration Prompt

## Project Context
- **Current Stack**: Next.js 15, Convex (primary DB), Clerk (auth), Vercel (deployment)
- **Target**: Migrate ALL data & schema to Supabase while KEEPING Convex active
- **Supabase Role**: Primary data store for all user data (Clerk sync), content, national officers, applications
- **Convex Role**: Keep existing connections intact for real-time features

---

## 1. Complete Schema Mapping (Convex → Supabase)

### Core Tables to Migrate

| Convex Table | Supabase Table | Status |
|--------------|----------------|--------|
| `users` | `users` (extend Clerk sync) | ✅ New |
| `nationalOfficers` | `national_officers` | ✅ New |
| `articles` | `articles` | ⚠️ Partial exists |
| `timelineEvents` | `history` | ⚠️ Partial exists |
| `blogs` | `blogs` | ⚠️ Partial exists |
| `news` | `news` | ✅ New |
| `events` | `events` | ⚠️ Partial exists |
| `eventRegistrations` | `event_registrations` | ✅ New |
| `mediaGallery` | `media_gallery` | ✅ New |
| `comments` | `comments` | ✅ New |
| `donations` | `donations` | ✅ New |
| `joinApplications` | `join_applications` | ⚠️ Partial exists |
| `contactMessages` | `contact_messages` | ✅ New |
| `aiConversations` | `ai_conversations` | ✅ New |
| `dashboard_snapshots` | `dashboard_snapshots` | ⚠️ Exists |

### Missing Tables in Current Supabase Schema
```sql
-- USERS (Clerk-synced, single source of truth)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    profile_photo_url TEXT,
    role TEXT NOT NULL DEFAULT 'visitor' CHECK (role IN ('visitor','volunteer','editor','admin','superadmin')),
    membership_status TEXT NOT NULL DEFAULT 'inactive' CHECK (membership_status IN ('pending','approved','suspended','inactive')),
    member_since TIMESTAMPTZ,
    membership_number TEXT UNIQUE,
    bio TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en','hi')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_users_clerk_id ON public.users(clerk_id);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_membership ON public.users(membership_status);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- NATIONAL OFFICERS
CREATE TABLE public.national_officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_en TEXT,
    designation TEXT NOT NULL,
    designation_en TEXT,
    state TEXT NOT NULL,
    state_en TEXT,
    photo_url TEXT,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_national_officers_order ON public.national_officers(display_order);
CREATE INDEX idx_national_officers_state ON public.national_officers(state, display_order);
CREATE INDEX idx_national_officers_active ON public.national_officers(is_active, display_order);
ALTER TABLE public.national_officers ENABLE ROW LEVEL SECURITY;

-- NEWS
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    urgent BOOLEAN DEFAULT false,
    category TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ,
    author_id UUID REFERENCES public.users(id),
    sources JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published ON public.news(published_at);
CREATE INDEX idx_news_urgent ON public.news(urgent, published_at);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- EVENT REGISTRATIONS
CREATE TABLE public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT now(),
    attended BOOLEAN DEFAULT false,
    attended_at TIMESTAMPTZ
);
CREATE INDEX idx_event_reg_event ON public.event_registrations(event_id);
CREATE INDEX idx_event_reg_user ON public.event_registrations(user_id);
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- MEDIA GALLERY
CREATE TABLE public.media_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('image','video','document')),
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    uploaded_by UUID REFERENCES public.users(id),
    uploaded_at TIMESTAMPTZ DEFAULT now(),
    year INTEGER,
    featured BOOLEAN DEFAULT false
);
CREATE INDEX idx_media_type ON public.media_gallery(type, uploaded_at);
CREATE INDEX idx_media_category ON public.media_gallery(category);
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;

-- COMMENTS
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL CHECK (content_type IN ('article','blog')),
    content_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    edited BOOLEAN DEFAULT false,
    edited_at TIMESTAMPTZ,
    approved BOOLEAN DEFAULT false,
    likes INTEGER DEFAULT 0
);
CREATE INDEX idx_comments_content ON public.comments(content_type, content_id, created_at);
CREATE INDEX idx_comments_parent ON public.comments(parent_comment_id);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- DONATIONS
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','failed')),
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    message TEXT
);
CREATE INDEX idx_donations_user ON public.donations(user_id);
CREATE INDEX idx_donations_status ON public.donations(status, created_at);
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- CONTACT MESSAGES
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','replied'))
);
CREATE INDEX idx_contact_submitted ON public.contact_messages(submitted_at);
CREATE INDEX idx_contact_status ON public.contact_messages(status, submitted_at);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- AI CONVERSATIONS
CREATE TABLE public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    messages JSONB NOT NULL DEFAULT '[]',
    started_at TIMESTAMPTZ DEFAULT now(),
    last_message_at TIMESTAMPTZ DEFAULT now(),
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en','hi'))
);
CREATE INDEX idx_ai_session ON public.ai_conversations(session_id);
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
```

---

## 2. RLS Policies for All Tables

```sql
-- Users: Users can read own profile, admins read all
CREATE POLICY "Users read own" ON public.users FOR SELECT USING (auth.uid()::text = clerk_id OR EXISTS (SELECT 1 FROM public.users WHERE clerk_id = auth.uid()::text AND role IN ('admin','superadmin')));
CREATE POLICY "Users update own" ON public.users FOR UPDATE USING (auth.uid()::text = clerk_id);

-- National Officers: Public read active
CREATE POLICY "Public read officers" ON public.national_officers FOR SELECT USING (is_active = true);

-- Articles/Blogs/News/Events/History: Public read published
CREATE POLICY "Public read published" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published" ON public.blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public read published" ON public.events FOR SELECT USING (is_public = true);
CREATE POLICY "Public read history" ON public.history FOR SELECT USING (true);

-- Event Registrations: Users read own, admins read all
CREATE POLICY "Users read own registrations" ON public.event_registrations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users insert own" ON public.event_registrations FOR INSERT WITH CHECK (user_id = auth.uid());

-- Media Gallery: Public read
CREATE POLICY "Public read media" ON public.media_gallery FOR SELECT USING (true);

-- Comments: Public read approved, users insert own
CREATE POLICY "Public read approved comments" ON public.comments FOR SELECT USING (approved = true);
CREATE POLICY "Users insert comments" ON public.comments FOR INSERT WITH CHECK (user_id = auth.uid());

-- Donations: Users read own, admins read all
CREATE POLICY "Users read own donations" ON public.donations FOR SELECT USING (user_id = auth.uid());

-- Contact/Join Applications: Public insert
CREATE POLICY "Public insert contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert join" ON public.join_applications FOR INSERT WITH CHECK (true);

-- AI Conversations: Users read/write own
CREATE POLICY "Users own conversations" ON public.ai_conversations FOR ALL USING (user_id = auth.uid());
```

---

## 3. Clerk → Supabase Sync (Replace Convex Webhooks)

### Create Supabase Edge Function for Clerk Webhooks

```typescript
// supabase/functions/clerk-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

serve(async (req) => {
  const signature = req.headers.get("svix-signature")
  const payload = await req.text()
  const secret = Deno.env.get("CLERK_WEBHOOK_SECRET")

  if (!verifySignature(payload, signature, secret)) {
    return new Response("Unauthorized", { status: 401 })
  }

  const event = JSON.parse(payload)

  switch (event.type) {
    case "user.created": {
      const data = event.data
      await supabase.from("users").upsert({
        clerk_id: data.id,
        email: data.email_addresses[0]?.email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.username || "User",
        phone: data.phone_numbers[0]?.phone_number,
        role: "visitor",
        membership_status: "inactive",
        preferred_language: "en",
      }, { onConflict: "clerk_id" })
      break
    }
    case "user.updated": {
      const data = event.data
      await supabase.from("users").update({
        email: data.email_addresses[0]?.email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.username,
        phone: data.phone_numbers[0]?.phone_number,
        updated_at: new Date().toISOString(),
      }).eq("clerk_id", data.id)
      break
    }
    case "user.deleted": {
      const clerkId = event.data.id
      await supabase.from("users").update({
        clerk_id: `deleted-${clerkId}-${Date.now()}`,
        email: `deleted-${clerkId}@example.com`,
        membership_status: "inactive",
      }).eq("clerk_id", clerkId)
      break
    }
  }

  return new Response("OK", { status: 200 })
})

function verifySignature(payload: string, signature: string | null, secret: string | undefined) {
  if (!signature || !secret) return false
  // Implement HMAC-SHA256 verification (use Web Crypto API)
  return true // Simplified
}
```

### Deploy & Configure
```bash
supabase functions deploy clerk-webhook
# Add CLERK_WEBHOOK_SECRET to Supabase function secrets
# Update Clerk Dashboard → Webhooks → Add Supabase function URL
```

---

## 4. Data Migration Scripts

### Migration Script: `scripts/migrate-convex-to-supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js"
import { ConvexHttpClient } from "convex/browser"

const convex = new ConvexHttpClient(process.env.CONVEX_URL!)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function migrateAll() {
  // 1. Migrate Users (from Convex)
  const convexUsers = await convex.query("users:listUsers", { limit: 10000 })
  for (const user of convexUsers) {
    await supabase.from("users").upsert({
      clerk_id: user.clerkId,
      email: user.email,
      name: user.name,
      phone: user.phone,
      profile_photo_url: user.profilePhoto ? `https://your-convex-url/storage/${user.profilePhoto}` : null,
      role: user.role,
      membership_status: user.membershipStatus,
      member_since: user.memberSince ? new Date(user.memberSince).toISOString() : null,
      membership_number: user.membershipNumber,
      bio: user.bio,
      address: user.address,
      city: user.city,
      state: user.state,
      preferred_language: user.preferredLanguage,
    }, { onConflict: "clerk_id" })
  }

  // 2. Migrate National Officers
  const officers = await convex.query("nationalOfficers:list", {})
  for (const o of officers) {
    await supabase.from("national_officers").upsert({
      name: o.name,
      name_en: o.nameEn,
      designation: o.designation,
      designation_en: o.designationEn,
      state: o.state,
      state_en: o.stateEn,
      photo_url: o.photoStorageId ? `https://your-convex-url/storage/${o.photoStorageId}` : null,
      display_order: o.displayOrder,
      is_active: o.isActive,
    }, { onConflict: "id" })
  }

  // 3. Migrate Articles
  const articles = await convex.query("articles:listAll", {})
  for (const a of articles) {
    await supabase.from("articles").upsert({
      id: a._id,
      title: a.title,
      slug: a.slug,
      content: a.content,
      excerpt: a.excerpt,
      featured_image_url: a.featuredImage ? `https://your-convex-url/storage/${a.featuredImage}` : null,
      category: a.category,
      tags: a.tags,
      language: a.language,
      status: a.status,
      published_at: a.publishedAt ? new Date(a.publishedAt).toISOString() : null,
      view_count: a.viewCount,
      featured: a.featured,
    }, { onConflict: "slug" })
  }

  // 4. Migrate Timeline Events → History
  const timeline = await convex.query("timelineEvents:listAll", {})
  for (const t of timeline) {
    await supabase.from("history").upsert({
      year: t.year,
      date_display: t.dateDisplay || String(t.year),
      title: t.title,
      description: t.description,
      significance: t.significance,
      era: t.era,
    }, { onConflict: "id" })
  }

  // 5. Migrate Blogs
  const blogs = await convex.query("blogs:listAll", {})
  for (const b of blogs) {
    await supabase.from("blogs").upsert({
      id: b._id,
      title: b.title,
      slug: b.slug,
      content: b.content,
      featured_image_url: b.featuredImage ? `https://your-convex-url/storage/${b.featuredImage}` : null,
      category: b.category,
      tags: b.tags,
      language: b.language,
      status: b.status,
      published_at: b.publishedAt ? new Date(b.publishedAt).toISOString() : null,
      view_count: b.viewCount,
      allow_comments: b.allowComments,
    }, { onConflict: "slug" })
  }

  // 6. Migrate News
  const news = await convex.query("news:listAll", {})
  for (const n of news) {
    await supabase.from("news").upsert({
      id: n._id,
      headline: n.headline,
      slug: n.slug,
      content: n.content,
      featured_image_url: n.featuredImage ? `https://your-convex-url/storage/${n.featuredImage}` : null,
      urgent: n.urgent,
      category: n.category,
      published_at: new Date(n.publishedAt).toISOString(),
      expires_at: n.expiresAt ? new Date(n.expiresAt).toISOString() : null,
      author_id: n.author, // Will need user ID mapping
      sources: n.sources,
    }, { onConflict: "slug" })
  }

  // 7. Migrate Events
  const events = await convex.query("events:listAll", {})
  for (const e of events) {
    await supabase.from("events").upsert({
      id: e._id,
      title: e.title,
      slug: e.slug,
      description: e.description,
      start_date: new Date(e.startDate).toISOString(),
      end_date: new Date(e.endDate).toISOString(),
      venue: e.venue,
      address: e.address,
      city: e.city,
      max_attendees: e.maxAttendees,
      registration_deadline: e.registrationDeadline ? new Date(e.registrationDeadline).toISOString() : null,
      featured_image_url: e.featuredImage ? `https://your-convex-url/storage/${e.featuredImage}` : null,
      category: e.category,
      status: e.status,
      is_public: e.isPublic,
    }, { onConflict: "slug" })
  }

  // 8. Migrate Join Applications
  const applications = await convex.query("joinApplications:listAll", {})
  for (const a of applications) {
    await supabase.from("join_applications").upsert({
      full_name: a.fullName,
      email: a.email,
      phone: a.phone,
      address: a.address,
      city: a.city,
      state: a.state,
      pincode: a.pincode,
      occupation: a.occupation,
      motivation: a.motivation,
      volunteering_path: a.volunteeringPath,
      status: a.status,
      created_at: new Date(a.submittedAt).toISOString(),
    }, { onConflict: "email" })
  }

  // 9. Migrate Contact Messages
  const contacts = await convex.query("contactMessages:listAll", {})
  for (const c of contacts) {
    await supabase.from("contact_messages").upsert({
      name: c.name,
      email: c.email,
      phone: c.phone,
      subject: c.subject,
      message: c.message,
      submitted_at: new Date(c.submittedAt).toISOString(),
      status: c.status,
    }, { onConflict: "id" })
  }

  console.log("✅ Migration complete!")
}

migrateAll().catch(console.error)
```

---

## 5. Dual-Write Strategy (Keep Convex + Write to Supabase)

### Update Convex Mutations to Also Write to Supabase

```typescript
// convex/supabaseSync.ts
import { internal } from "./_generated/api"
import { MutationCtx } from "./_generated/server"

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function supabaseUpsert(table: string, data: Record<string, any>, onConflict: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Supabase sync failed: ${await response.text()}`)
}

// Wrap existing mutations
export async function syncUserToSupabase(ctx: MutationCtx, userId: string) {
  const user = await ctx.db.get(userId)
  if (!user) return
  await supabaseUpsert("users", {
    clerk_id: user.clerkId,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    membership_status: user.membershipStatus,
    member_since: user.memberSince ? new Date(user.memberSince).toISOString() : null,
    membership_number: user.membershipNumber,
    bio: user.bio,
    address: user.address,
    city: user.city,
    state: user.state,
    preferred_language: user.preferredLanguage,
  }, "clerk_id")
}
```

---

## 6. Vercel Deployment Configuration

### Environment Variables (Vercel Dashboard)
```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (Server only)
CONVEX_URL=your-convex-url (Keep existing)
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_... (Server only)
CLERK_WEBHOOK_SECRET=whsec_...
```

### Next.js Config (next.config.ts)
```typescript
// No changes needed - both Convex and Supabase clients work on Vercel
```

---

## 7. Frontend Integration Updates

### Update `src/lib/supabase-rest.ts` to Use All Tables

```typescript
// Add types and queries for ALL migrated tables
export type SupabaseUser = { /* from users table */ }
export type SupabaseNationalOfficer = { /* from national_officers */ }
export type SupabaseNews = { /* from news */ }
export type SupabaseEventRegistration = { /* from event_registrations */ }
export type SupabaseMediaGallery = { /* from media_gallery */ }
export type SupabaseComment = { /* from comments */ }
export type SupabaseDonation = { /* from donations */ }
export type SupabaseContactMessage = { /* from contact_messages */ }
export type SupabaseAIConversation = { /* from ai_conversations */ }

// Add query functions for each
export const getNationalOfficers = () => query<SupabaseNationalOfficer[]>("national_officers", {
  is_active: "eq.true", order: "display_order.asc"
})

export const getNews = (category?: string) => query<SupabaseNews[]>("news", {
  ...(category ? { category: `eq.${category}` } : {}), order: "published_at.desc"
})

// ... etc for all tables
```

---

## 8. Execution Checklist

### Phase 1: Supabase Setup
- [ ] Run complete schema SQL in Supabase SQL Editor
- [ ] Enable RLS on all tables
- [ ] Create all RLS policies
- [ ] Create Clerk webhook Edge Function
- [ ] Deploy Edge Function
- [ ] Configure Clerk webhook URL in Clerk Dashboard

### Phase 2: Data Migration
- [ ] Set Convex and Supabase env vars locally
- [ ] Run migration script (`npx tsx scripts/migrate-convex-to-supabase.ts`)
- [ ] Verify row counts match
- [ ] Spot-check data integrity

### Phase 3: Dual-Write Implementation
- [ ] Add `supabaseSync.ts` to Convex
- [ ] Update all Convex mutations to call sync functions
- [ ] Test create/update/delete flows

### Phase 4: Frontend Switch
- [ ] Update `src/lib/supabase-rest.ts` with all table types/queries
- [ ] Update components to use Supabase for reads
- [ ] Keep Convex for real-time (comments, live updates)
- [ ] Test on localhost

### Phase 5: Vercel Deploy
- [ ] Add all env vars to Vercel
- [ ] Deploy to preview
- [ ] Full integration test
- [ ] Deploy to production

---

## 9. Rollback Plan

If issues arise:
1. **Frontend**: Feature flag to switch between Convex/Supabase reads
2. **Data**: Convex remains source of truth; Supabase is read-replica
3. **Auth**: Clerk webhooks write to both (idempotent upserts)
4. **Zero-downtime**: Both DBs operational simultaneously

---

## Key Files to Create/Modify

```
/supabase/schema-complete.sql          # Full schema (this prompt)
/supabase/functions/clerk-webhook/     # Clerk sync
/scripts/migrate-convex-to-supabase.ts # One-time migration
/convex/supabaseSync.ts                # Dual-write helper
/convex/users.ts                       # Add sync calls
/convex/nationalOfficers.ts            # Add sync calls
/convex/articles.ts                    # Add sync calls
/convex/timeline.ts                    # Add sync calls
/convex/blogs.ts                       # Add sync calls
/convex/news.ts                        # Add sync calls
/convex/events.ts                      # Add sync calls
/convex/joinApplications.ts            # Add sync calls
/convex/contactMessages.ts             # Add sync calls
/convex/media.ts                       # Add sync calls
/convex/comments.ts                    # Add sync calls
/convex/donations.ts                   # Add sync calls
/convex/aiConversations.ts             # Add sync calls
/src/lib/supabase-rest.ts              # Add all table queries
/next.config.ts                        # Verify no changes needed
/.env.local                            # Add Supabase vars
```

---

## Success Criteria

✅ All 15 Convex tables migrated to Supabase with correct schema
✅ Clerk webhooks sync users to Supabase (not Convex)
✅ National officers copied from Convex to Supabase
✅ All existing Convex connections remain functional
✅ Vercel deployment works with both databases
✅ Frontend reads from Supabase for content, Convex for real-time
✅ Zero data loss during migration