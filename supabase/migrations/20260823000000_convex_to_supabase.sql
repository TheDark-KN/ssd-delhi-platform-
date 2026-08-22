-- Applied to the connected project through Supabase MCP.
-- This migration is intentionally additive and safe to rerun.

create table if not exists public.users (id uuid primary key default gen_random_uuid(), clerk_id text unique not null, email text not null, name text not null default '', phone text, profile_photo_url text, role text not null default 'visitor', membership_status text not null default 'pending', member_since timestamptz, membership_number text, bio text, address text, city text not null default '', state text not null default '', preferred_language text not null default 'en', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.history (id uuid primary key default gen_random_uuid(), year integer not null, date_display text not null, title text not null, description text not null, significance text, era text not null, created_at timestamptz not null default now());
create table if not exists public.national_officers (id uuid primary key default gen_random_uuid(), name text not null, name_en text, designation text not null, designation_en text, state text not null, state_en text, photo_url text, display_order integer not null default 0, is_active boolean not null default true, created_at timestamptz not null default now());
create table if not exists public.comments (id uuid primary key default gen_random_uuid(), content_type text not null, content_id uuid not null, user_id uuid not null references public.users(id) on delete cascade, parent_comment_id uuid references public.comments(id) on delete cascade, content text not null, created_at timestamptz not null default now(), edited boolean not null default false, edited_at timestamptz, approved boolean not null default false, likes integer not null default 0);
create table if not exists public.event_registrations (id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade, user_id uuid not null references public.users(id) on delete cascade, registered_at timestamptz not null default now(), attended boolean not null default false, attended_at timestamptz, unique(event_id,user_id));
create table if not exists public.media_gallery (id uuid primary key default gen_random_uuid(), file_url text not null, title text not null, description text, type text not null, category text not null, tags text[] not null default '{}', uploaded_by uuid references public.users(id) on delete set null, uploaded_at timestamptz not null default now(), year integer, featured boolean not null default false);
create table if not exists public.ai_conversations (id uuid primary key default gen_random_uuid(), session_id text not null, user_id uuid references public.users(id) on delete set null, messages jsonb not null default '[]', started_at timestamptz not null default now(), last_message_at timestamptz not null default now(), language text not null default 'en');
create table if not exists public.donations (id uuid primary key default gen_random_uuid(), user_id uuid references public.users(id) on delete set null, amount numeric(12,2) not null check (amount > 0), currency text not null default 'INR', status text not null default 'pending', payment_method text, transaction_id text unique, created_at timestamptz not null default now(), message text);
create table if not exists public.contact_messages (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, subject text not null, message text not null, submitted_at timestamptz not null default now(), status text not null default 'new');

alter table public.users enable row level security;
alter table public.history enable row level security;
alter table public.national_officers enable row level security;
alter table public.comments enable row level security;
alter table public.event_registrations enable row level security;
alter table public.media_gallery enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.donations enable row level security;
alter table public.contact_messages enable row level security;

create index if not exists history_year_idx on public.history(year);
create index if not exists comments_content_idx on public.comments(content_type, content_id, created_at);
create index if not exists event_registrations_event_idx on public.event_registrations(event_id);
create index if not exists media_gallery_category_idx on public.media_gallery(category);
create index if not exists ai_conversations_session_idx on public.ai_conversations(session_id);
create index if not exists donations_user_idx on public.donations(user_id);
