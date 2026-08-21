-- =========================================================
-- SSD Delhi Platform - Supabase Schema & Seed Script
-- Tables: history, articles
-- =========================================================

-- 1. HISTORY / TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INTEGER NOT NULL,
    date_display TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    significance TEXT,
    era TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and public read access
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on history"
    ON public.history FOR SELECT
    USING (true);

-- Clear existing data (optional for clean seed)
TRUNCATE TABLE public.history;

-- Insert 14 Milestones into history table
INSERT INTO public.history (year, date_display, title, description, significance, era) VALUES
(1920, '1920', 'Mooknayak Launched', 'Ambedkar starts a Marathi weekly to voice the concerns of the Depressed Classes.', 'Broke the media silence on caste oppression and gave Dalits an independent public voice.', 'Founding Era (1920–1930)'),
(1924, 'July 1924', 'Bahishkrit Hitakarini Sabha', 'Ambedkar''s first organised effort against untouchability — the institutional root of the later movement.', 'Established the rallying slogan: ''Educate, Agitate, Organise''.', 'Founding Era (1920–1930)'),
(1927, '13 March 1927', 'Samata Sainik Dal Founded', 'A volunteer corps is formally constituted, five days ahead of the Mahad action, to protect satyagrahis and spread the message of equality.', 'Created a disciplined, non-violent volunteer force for social defence and equality.', 'Founding Era (1920–1930)'),
(1927, '20 March 1927', 'Mahad Chavdar Tale Satyagraha', 'Ambedkar leads a march to assert Dalits'' right to draw water from a public lake — a defining act of the movement.', 'First collective civil rights action asserting equal access to public resources.', 'Founding Era (1920–1930)'),
(1927, '1927', 'Samaj Samata Sangh', 'A dedicated body is founded to promote social equality beyond the immediate Mahad struggle.', 'Expanded the fight from local satyagrahis to broader societal transformation.', 'Founding Era (1920–1930)'),
(1932, '1932', 'Poona Pact', 'Following the Round Table Conferences, Ambedkar agrees to reserved (rather than separate) electorates for the Depressed Classes.', 'Secured guaranteed political representation and reservations in legislatures.', 'Political & Constitutional Era (1931–1950)'),
(1936, '1936', 'Independent Labour Party', 'Ambedkar founds the ILP; SSD volunteers help carry its message into the Bombay Legislative Assembly elections.', 'United caste-oppressed communities and working classes into a unified political platform.', 'Political & Constitutional Era (1931–1950)'),
(1942, '1942', 'Scheduled Castes Federation & First SSD Session', 'A dedicated political federation is formed; SSD holds its first formal session in Nagpur, with Ambedkar present.', 'Nationalized SSD''s presence across multiple provinces in India.', 'Political & Constitutional Era (1931–1950)'),
(1944, '30 January 1944', 'Second SSD Session, Kanpur', 'Ambedkar calls SSD ''the backbone of our political party'' and sets in motion its formal constitution.', 'Formalized the SSD constitution with clear ranks and organizational tenets.', 'Political & Constitutional Era (1931–1950)'),
(1947, '1947', 'Indian Independence', 'SSD continues its work of protection and mobilisation alongside the Scheduled Castes Federation.', 'Transitioned the anti-caste movement into nation-building and constitutional reform.', 'Political & Constitutional Era (1931–1950)'),
(1950, '1949–50', 'Constitution of India', 'As Chairman of the Drafting Committee, Ambedkar enshrines the abolition of untouchability and the right to equality in India''s Constitution.', 'Article 17 legally abolished untouchability; Articles 14–16 guaranteed fundamental equality.', 'Political & Constitutional Era (1931–1950)'),
(1956, '14 October 1956', 'Conversion to Buddhism', 'Ambedkar leads a mass conversion at Deekshabhoomi, Nagpur, adding a moral and spiritual foundation to the movement.', 'Reclaimed self-respect and humanist ethics through the Buddha''s Dhamma.', 'Buddhist Revival & Legacy (1951–1956)'),
(1956, '6 December 1956', 'Mahaparinirvan', 'Ambedkar''s death is a profound loss to the movement; SSD navigates a period of leadership transition.', 'The movement resolved to preserve Babasaheb''s legacy and continue the struggle.', 'Buddhist Revival & Legacy (1951–1956)'),
(2024, 'Present Day', 'A Living Legacy', 'SSD continues nationwide, with active units — including Samta Sainik Dal Delhi — carrying the fight for equality, dignity, and social justice into a new century.', 'Active youth and women''s wings advancing education, legal aid, and social harmony.', 'Living Legacy (Present)');


-- 2. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    featured_image_url TEXT,
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    language TEXT NOT NULL DEFAULT 'en',
    status TEXT NOT NULL DEFAULT 'published',
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    view_count INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and public read access
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on articles"
    ON public.articles FOR SELECT
    USING (status = 'published');

-- Insert or Update 3 Core Articles
INSERT INTO public.articles (title, slug, content, excerpt, category, tags, language, status, published_at, view_count, featured)
VALUES
(
    'The Birth of a Movement: A History of Samata Sainik Dal',
    'history-of-samata-sainik-dal',
    '<p>Long before Samata Sainik Dal existed as a formal organisation, Dr. B.R. Ambedkar was already building the institutional scaffolding of a movement. In January 1920 he launched <em>Mooknayak</em> ("Leader of the Voiceless"), a Marathi weekly that gave a public voice to India''s Depressed Classes. Four years later, in July 1924, fresh from earning a D.Sc. in Economics at the London School of Economics, he founded the Bahishkrit Hitakarini Sabha — the Depressed Classes Welfare Association — his first sustained organisational effort against untouchability.</p><p>It was in the run-up to the Mahad Satyagraha, however, that Samata Sainik Dal (SSD) itself took shape. Ambedkar had called for a public assertion of Dalits'' right to draw water from the Chavdar Tale, a lake in Mahad that caste Hindus had barred them from using despite a 1923 resolution of the Bombay Legislative Council affirming that right. Anticipating hostility and possible violence, Ambedkar organised a dedicated corps of volunteers to protect the marchers. On 13 March 1927, five days before the march, this corps was formally constituted and named the Samata Sainik Dal — the "Army of Soldiers for Equality." On 20 March 1927, Ambedkar led the march to Chavdar Tale and drank from its waters, setting off caste-Hindu backlash that would require a second Mahad conference. At that gathering, Ambedkar also called a historic meeting of women, urging them to join the struggle — a call that shaped SSD''s character for generations to come.</p><p>The Dal quickly outgrew its original protective role. Later in 1927 Ambedkar founded the Samaj Samata Sangh to promote social equality more broadly, and in 1928 launched a fortnightly paper, <em>Samata</em>. As Ambedkar moved into electoral politics — he had been nominated to the Bombay Legislative Council in 1926 — SSD evolved into an instrument of political mobilisation as well as social protection. When he founded the Independent Labour Party in 1936, he addressed SSD volunteers directly, on 8 November 1936, explaining how the new party''s aims differed from the Congress and asking the Dal to carry that message to the people.</p><p>SSD''s institutional life deepened through the 1940s. Ambedkar founded the Scheduled Castes Federation in 1942 to give the Depressed Classes a dedicated political voice. That same year, on 20 July 1942, the first formal session of Samata Sainik Dal was held in Nagpur, with Ambedkar in attendance. A second session followed on 30 January 1944 in Kanpur, where Ambedkar told the assembled Sainiks that the Dal was "the backbone of our political party" and called for its ranks to grow. That session also set in motion the drafting of a formal SSD constitution, which Ambedkar personally reviewed and finalised.</p><p>Independence in 1947 and the adoption of the Constitution — which Ambedkar had chaired the drafting of — gave Dalits constitutional safeguards for the first time, but did not end caste discrimination in practice. SSD continued its work of protection, mobilisation and public education alongside the Scheduled Castes Federation. Then, on 14 October 1956, Ambedkar led a mass conversion to Buddhism at Deekshabhoomi in Nagpur, reframing the movement''s struggle in explicitly spiritual and ethical terms as well as political ones. Deekshabhoomi remains a spiritual home for the Ambedkarite movement, and SSD''s national body is headquartered there today.</p><p>Ambedkar''s death less than two months later, on 6 December 1956, was a profound blow. Leadership transitions and ideological divisions strained the organisation''s structure over the following years. Yet SSD endured. Today it counts its members in the thousands across India — including an active women''s wing — and volunteers still gather each year at Chaitya Bhoomi in Mumbai on Mahaparinirvan Din and at Deekshabhoomi on Dhammachakra Pravartan Din to honour Babasaheb''s memory. Regional units, including Samta Sainik Dal Delhi, carry that century-old mission of equality into a new generation.</p>',
    'A century-spanning look at how a corps of volunteers became the backbone of India''s anti-caste struggle — from the Mahad Satyagraha to the present day.',
    'History',
    ARRAY['History', 'Mahad Satyagraha', 'Dr. Ambedkar', 'Centenary', 'SSD'],
    'en',
    'published',
    '2024-03-13T00:00:00Z',
    1420,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags;

INSERT INTO public.articles (title, slug, content, excerpt, category, tags, language, status, published_at, view_count, featured)
VALUES
(
    'Liberty, Equality, Fraternity: The Ideology of Samata Sainik Dal',
    'ideology-of-samata-sainik-dal',
    '<p>The name Samata Sainik Dal carries its ideology in its title. <em>Samata</em> means equality; <em>Sainik</em> means soldier. Members are not soldiers in a military sense but volunteers enlisted, disciplined and organised in service of a single goal: an India where birth no longer determines a person''s worth, work, or access to public life.</p><p>At the centre of SSD''s worldview sit three words Ambedkar placed at the heart of India''s constitutional Preamble: Liberty, Equality, Fraternity. He was explicit that these could not be separated — liberty without equality becomes the liberty of the strong to dominate the weak, and equality without fraternity is merely a legal fiction unless people genuinely regard one another as equals in social life. Fraternity was, in some ways, the hardest and most necessary of the three, because it required not just new laws but a change in social consciousness.</p><p>That is why SSD''s opposition to caste was never framed only as opposition to "untouchability" in the narrow sense. Ambedkar argued for the annihilation of caste as a system — the graded hierarchy of birth-based status that structured nearly every aspect of Indian social life, from who could draw water at a public tank to who could enter a temple or eat at the same table. SSD volunteers were trained to confront this system directly: protecting satyagrahis during actions like the Mahad Chavdar Tale Satyagraha, spreading awareness of the Depressed Classes'' constitutional and legal rights, and keeping disruptive elements from derailing the movement''s constructive work.</p><p>Ambedkar was equally clear that this struggle should be waged, wherever possible, through constitutional and democratic means rather than armed revolt. SSD''s role was to support that project — first through bodies like the Bahishkrit Hitakarini Sabha and Samaj Samata Sangh, then through the Independent Labour Party and the Scheduled Castes Federation. When he told SSD volunteers in 1944 that the Dal was "the backbone of our political party," he was describing an ideology in which grassroots organisation and electoral politics reinforced each other.</p><p>The final, and in many ways defining, layer of SSD''s ideology arrived in 1956, when Ambedkar led a mass conversion to Buddhism at Deekshabhoomi in Nagpur. He had concluded that political and legal equality, however necessary, were not sufficient on their own — that a caste-based social order also needed to be met with a moral and religious alternative built on reason, compassion and human dignity rather than hierarchy. For SSD, Buddhism was not a retreat from the fight for social justice but an extension of it.</p><p>Finally, SSD''s ideology has always insisted on the full participation of women. From the moment Ambedkar addressed a gathering of women at Mahad in 1927, encouraging them to join the struggle against caste, women have organised, trained and led within the Dal — a tradition that continues in SSD''s active women''s units today.</p><p>Taken together, these commitments — equality as a social and not merely legal fact, constitutional struggle over violence, the annihilation of caste as a system, a Buddhist ethical foundation, and the full inclusion of women — form the ideological core that SSD volunteers still carry forward.</p>',
    'What does it mean to be a "soldier for equality"? The ideas that shape SSD''s work — from the annihilation of caste to the embrace of Buddhism.',
    'Ideology',
    ARRAY['Ideology', 'Samata', 'Fraternity', 'Buddhism', 'Annihilation of Caste'],
    'en',
    'published',
    '2024-03-20T00:00:00Z',
    1250,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags;

INSERT INTO public.articles (title, slug, content, excerpt, category, tags, language, status, published_at, view_count, featured)
VALUES
(
    'The Fight for Social Justice: From Mahad to Modern India',
    'fight-for-social-justice',
    '<p>Samata Sainik Dal was born out of a very specific fight: the right of Dalits to draw water from a public tank in Mahad. But that single act of drinking water at the Chavdar Tale on 20 March 1927 was never really about water. It was about whether a person''s access to a shared public resource could be determined by the accident of their birth — and it opened a struggle that would move, over the following decades, from local satyagrahas to national constitutional debate.</p><p>That struggle intensified through the early 1930s. At the Round Table Conferences in London, Ambedkar argued that the Depressed Classes needed a political identity of their own — separate electorates that would let them choose their own representatives, free from the influence of caste-Hindu-dominated constituencies. That claim led to one of the most consequential and contested episodes in the movement''s history: the 1932 Poona Pact, in which Ambedkar, following Mahatma Gandhi''s fast against separate electorates, agreed instead to a system of reserved seats for the Depressed Classes within joint electorates. It was a compromise Ambedkar accepted but did not consider ideal, and it shaped the terms of Dalit political representation in India for the following century.</p><p>By the mid-1930s, the fight for social justice had become as much electoral as it was social. The Independent Labour Party, founded in 1936, gave Ambedkar''s movement a formal vehicle to contest elections, and SSD volunteers helped carry its message into the Bombay Legislative Assembly elections that followed. When Ambedkar founded the Scheduled Castes Federation in 1942, the fight gained a still sharper political focus — one aimed at securing constitutional guarantees for the Depressed Classes in a soon-to-be-independent India.</p><p>Those guarantees arrived, at least on paper, in 1949–50. As chairman of the Constitution''s Drafting Committee, Ambedkar wrote the abolition of untouchability directly into Article 17, alongside the equality provisions of Articles 14 to 16 and safeguards for Scheduled Castes and Scheduled Tribes. For SSD, this was a hard-won victory — but Ambedkar himself warned, in his final speech to the Constituent Assembly, that political equality on paper would sit uneasily alongside continuing social and economic inequality in practice. Legal equality, he argued, was a beginning, not an end point.</p><p>That warning shaped the movement''s next turn. On 14 October 1956, Ambedkar led hundreds of thousands of followers in converting to Buddhism at Deekshabhoomi, arguing that a caste-based social order needed a moral and spiritual alternative, not only a legal one. His death seven weeks later, on 6 December 1956, left the movement to carry that unfinished work forward without its founder — through leadership transitions, organisational strain, and a changing political landscape, but without abandoning the core demand: substantive, not merely formal, equality.</p><p>That demand remains SSD''s work today. Members continue to gather each year at Chaitya Bhoomi in Mumbai and at Deekshabhoomi in Nagpur to renew that commitment, run community and educational programmes, and organise new units — including Samta Sainik Dal Delhi — to bring the century-old fight for social justice to a new generation. The details have changed since 1927; the underlying claim has not: that dignity and equal citizenship cannot depend on the caste one is born into.</p>',
    'A century-long struggle for dignity, representation and equal citizenship — and why it continues today.',
    'Social Justice',
    ARRAY['Social Justice', 'Constitution', 'Article 17', 'Poona Pact', 'Citizenship'],
    'en',
    'published',
    '2024-04-14T00:00:00Z',
    1890,
    true
);

-- 3. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Community',
    tags TEXT[] NOT NULL DEFAULT '{}',
    language TEXT NOT NULL DEFAULT 'en',
    status TEXT NOT NULL DEFAULT 'published',
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    view_count INTEGER NOT NULL DEFAULT 0,
    allow_comments BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on blogs"
    ON public.blogs FOR SELECT
    USING (status = 'published');

-- 4. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    venue TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    max_attendees INTEGER,
    registration_deadline TIMESTAMPTZ,
    featured_image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Program',
    status TEXT NOT NULL DEFAULT 'upcoming',
    is_public BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on events"
    ON public.events FOR SELECT
    USING (is_public = true);

-- Insert Sample Event (Foundation Day)
INSERT INTO public.events (title, slug, description, start_date, end_date, venue, address, city, category, status, is_public)
VALUES (
    'SSD Delhi Foundation Day Gathering',
    'ssd-delhi-foundation-day-gathering',
    'Two days of remembrance and service. SSD Delhi Foundation Day is a time to honour the movement''s legacy, gather in fraternity, and renew our promise of service.',
    '2026-09-23 10:00:00+00',
    '2026-09-24 17:00:00+00',
    'Ambedkar Bhawan',
    'Rani Jhansi Road',
    'New Delhi',
    'Community Gathering',
    'upcoming',
    true
) ON CONFLICT (slug) DO NOTHING;

-- 5. JOIN APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.join_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    occupation TEXT NOT NULL,
    motivation TEXT NOT NULL,
    volunteering_path TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.join_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public submission on join_applications"
    ON public.join_applications FOR INSERT
    WITH CHECK (true);

-- 6. DASHBOARD SNAPSHOTS TABLE
CREATE TABLE IF NOT EXISTS public.dashboard_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_key TEXT NOT NULL UNIQUE,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.dashboard_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on dashboard_snapshots"
    ON public.dashboard_snapshots FOR SELECT
    USING (true);

