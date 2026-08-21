export interface ArticleItem {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: "History" | "Ideology" | "Social Justice" | string;
  excerpt: string;
  content: string;
  tags: string[];
  language: "en" | "hi";
  status: "published" | "draft";
  published_at: string;
  publishedAt?: number;
  view_count: number;
  viewCount?: number;
  featured: boolean;
}

export interface TimelineMilestone {
  id: string;
  _id?: string;
  year: number;
  dateDisplay: string;
  date_display?: string;
  title: string;
  description: string;
  significance?: string;
  era: string;
}

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "art-history-1",
    _id: "art-history-1",
    title: "The Birth of a Movement: A History of Samata Sainik Dal",
    slug: "history-of-samata-sainik-dal",
    category: "History",
    excerpt: "A century-spanning look at how a corps of volunteers became the backbone of India's anti-caste struggle — from the Mahad Satyagraha to the present day.",
    content: `<p>Long before Samata Sainik Dal existed as a formal organisation, Dr. B.R. Ambedkar was already building the institutional scaffolding of a movement. In January 1920 he launched <em>Mooknayak</em> (&quot;Leader of the Voiceless&quot;), a Marathi weekly that gave a public voice to India's Depressed Classes. Four years later, in July 1924, fresh from earning a D.Sc. in Economics at the London School of Economics, he founded the Bahishkrit Hitakarini Sabha — the Depressed Classes Welfare Association — his first sustained organisational effort against untouchability.</p>

<p>It was in the run-up to the Mahad Satyagraha, however, that Samata Sainik Dal (SSD) itself took shape. Ambedkar had called for a public assertion of Dalits' right to draw water from the Chavdar Tale, a lake in Mahad that caste Hindus had barred them from using despite a 1923 resolution of the Bombay Legislative Council affirming that right. Anticipating hostility and possible violence, Ambedkar organised a dedicated corps of volunteers to protect the marchers. On 13 March 1927, five days before the march, this corps was formally constituted and named the Samata Sainik Dal — the &quot;Army of Soldiers for Equality.&quot; On 20 March 1927, Ambedkar led the march to Chavdar Tale and drank from its waters, setting off caste-Hindu backlash that would require a second Mahad conference. At that gathering, Ambedkar also called a historic meeting of women, urging them to join the struggle — a call that shaped SSD's character for generations to come.</p>

<p>The Dal quickly outgrew its original protective role. Later in 1927 Ambedkar founded the Samaj Samata Sangh to promote social equality more broadly, and in 1928 launched a fortnightly paper, <em>Samata</em>. As Ambedkar moved into electoral politics — he had been nominated to the Bombay Legislative Council in 1926 — SSD evolved into an instrument of political mobilisation as well as social protection. When he founded the Independent Labour Party in 1936, he addressed SSD volunteers directly, on 8 November 1936, explaining how the new party's aims differed from the Congress and asking the Dal to carry that message to the people.</p>

<p>SSD's institutional life deepened through the 1940s. Ambedkar founded the Scheduled Castes Federation in 1942 to give the Depressed Classes a dedicated political voice. That same year, on 20 July 1942, the first formal session of Samata Sainik Dal was held in Nagpur, with Ambedkar in attendance. A second session followed on 30 January 1944 in Kanpur, where Ambedkar told the assembled Sainiks that the Dal was &quot;the backbone of our political party&quot; and called for its ranks to grow. That session also set in motion the drafting of a formal SSD constitution, which Ambedkar personally reviewed and finalised.</p>

<p>Independence in 1947 and the adoption of the Constitution — which Ambedkar had chaired the drafting of — gave Dalits constitutional safeguards for the first time, but did not end caste discrimination in practice. SSD continued its work of protection, mobilisation and public education alongside the Scheduled Castes Federation. Then, on 14 October 1956, Ambedkar led a mass conversion to Buddhism at Deekshabhoomi in Nagpur, reframing the movement's struggle in explicitly spiritual and ethical terms as well as political ones. Deekshabhoomi remains a spiritual home for the Ambedkarite movement, and SSD's national body is headquartered there today.</p>

<p>Ambedkar's death less than two months later, on 6 December 1956, was a profound blow. Leadership transitions and ideological divisions strained the organisation's structure over the following years. Yet SSD endured. Today it counts its members in the thousands across India — including an active women's wing — and volunteers still gather each year at Chaitya Bhoomi in Mumbai on Mahaparinirvan Din and at Deekshabhoomi on Dhammachakra Pravartan Din to honour Babasaheb's memory. Regional units, including Samta Sainik Dal Delhi, carry that century-old mission of equality into a new generation.</p>`,
    tags: ["History", "Mahad Satyagraha", "Dr. Ambedkar", "Centenary", "SSD"],
    language: "en",
    status: "published",
    published_at: "2024-03-13T00:00:00Z",
    publishedAt: new Date("2024-03-13T00:00:00Z").getTime(),
    view_count: 1420,
    viewCount: 1420,
    featured: true,
  },
  {
    id: "art-ideology-2",
    _id: "art-ideology-2",
    title: "Liberty, Equality, Fraternity: The Ideology of Samata Sainik Dal",
    slug: "ideology-of-samata-sainik-dal",
    category: "Ideology",
    excerpt: "What does it mean to be a \"soldier for equality\"? The ideas that shape SSD's work — from the annihilation of caste to the embrace of Buddhism.",
    content: `<p>The name Samata Sainik Dal carries its ideology in its title. <em>Samata</em> means equality; <em>Sainik</em> means soldier. Members are not soldiers in a military sense but volunteers enlisted, disciplined and organised in service of a single goal: an India where birth no longer determines a person's worth, work, or access to public life.</p>

<p>At the centre of SSD's worldview sit three words Ambedkar placed at the heart of India's constitutional Preamble: Liberty, Equality, Fraternity. He was explicit that these could not be separated — liberty without equality becomes the liberty of the strong to dominate the weak, and equality without fraternity is merely a legal fiction unless people genuinely regard one another as equals in social life. Fraternity was, in some ways, the hardest and most necessary of the three, because it required not just new laws but a change in social consciousness.</p>

<p>That is why SSD's opposition to caste was never framed only as opposition to &quot;untouchability&quot; in the narrow sense. Ambedkar argued for the annihilation of caste as a system — the graded hierarchy of birth-based status that structured nearly every aspect of Indian social life, from who could draw water at a public tank to who could enter a temple or eat at the same table. SSD volunteers were trained to confront this system directly: protecting satyagrahis during actions like the Mahad Chavdar Tale Satyagraha, spreading awareness of the Depressed Classes' constitutional and legal rights, and keeping disruptive elements from derailing the movement's constructive work.</p>

<p>Ambedkar was equally clear that this struggle should be waged, wherever possible, through constitutional and democratic means rather than armed revolt. SSD's role was to support that project — first through bodies like the Bahishkrit Hitakarini Sabha and Samaj Samata Sangh, then through the Independent Labour Party and the Scheduled Castes Federation. When he told SSD volunteers in 1944 that the Dal was &quot;the backbone of our political party,&quot; he was describing an ideology in which grassroots organisation and electoral politics reinforced each other.</p>

<p>The final, and in many ways defining, layer of SSD's ideology arrived in 1956, when Ambedkar led a mass conversion to Buddhism at Deekshabhoomi in Nagpur. He had concluded that political and legal equality, however necessary, were not sufficient on their own — that a caste-based social order also needed to be met with a moral and religious alternative built on reason, compassion and human dignity rather than hierarchy. For SSD, Buddhism was not a retreat from the fight for social justice but an extension of it.</p>

<p>Finally, SSD's ideology has always insisted on the full participation of women. From the moment Ambedkar addressed a gathering of women at Mahad in 1927, encouraging them to join the struggle against caste, women have organised, trained and led within the Dal — a tradition that continues in SSD's active women's units today.</p>

<p>Taken together, these commitments — equality as a social and not merely legal fact, constitutional struggle over violence, the annihilation of caste as a system, a Buddhist ethical foundation, and the full inclusion of women — form the ideological core that SSD volunteers still carry forward.</p>`,
    tags: ["Ideology", "Samata", "Fraternity", "Buddhism", "Annihilation of Caste"],
    language: "en",
    status: "published",
    published_at: "2024-03-20T00:00:00Z",
    publishedAt: new Date("2024-03-20T00:00:00Z").getTime(),
    view_count: 1250,
    viewCount: 1250,
    featured: true,
  },
  {
    id: "art-social-justice-3",
    _id: "art-social-justice-3",
    title: "The Fight for Social Justice: From Mahad to Modern India",
    slug: "fight-for-social-justice",
    category: "Social Justice",
    excerpt: "A century-long struggle for dignity, representation and equal citizenship — and why it continues today.",
    content: `<p>Samata Sainik Dal was born out of a very specific fight: the right of Dalits to draw water from a public tank in Mahad. But that single act of drinking water at the Chavdar Tale on 20 March 1927 was never really about water. It was about whether a person's access to a shared public resource could be determined by the accident of their birth — and it opened a struggle that would move, over the following decades, from local satyagrahas to national constitutional debate.</p>

<p>That struggle intensified through the early 1930s. At the Round Table Conferences in London, Ambedkar argued that the Depressed Classes needed a political identity of their own — separate electorates that would let them choose their own representatives, free from the influence of caste-Hindu-dominated constituencies. That claim led to one of the most consequential and contested episodes in the movement's history: the 1932 Poona Pact, in which Ambedkar, following Mahatma Gandhi's fast against separate electorates, agreed instead to a system of reserved seats for the Depressed Classes within joint electorates. It was a compromise Ambedkar accepted but did not consider ideal, and it shaped the terms of Dalit political representation in India for the following century.</p>

<p>By the mid-1930s, the fight for social justice had become as much electoral as it was social. The Independent Labour Party, founded in 1936, gave Ambedkar's movement a formal vehicle to contest elections, and SSD volunteers helped carry its message into the Bombay Legislative Assembly elections that followed. When Ambedkar founded the Scheduled Castes Federation in 1942, the fight gained a still sharper political focus — one aimed at securing constitutional guarantees for the Depressed Classes in a soon-to-be-independent India.</p>

<p>Those guarantees arrived, at least on paper, in 1949–50. As chairman of the Constitution's Drafting Committee, Ambedkar wrote the abolition of untouchability directly into Article 17, alongside the equality provisions of Articles 14 to 16 and safeguards for Scheduled Castes and Scheduled Tribes. For SSD, this was a hard-won victory — but Ambedkar himself warned, in his final speech to the Constituent Assembly, that political equality on paper would sit uneasily alongside continuing social and economic inequality in practice. Legal equality, he argued, was a beginning, not an end point.</p>

<p>That warning shaped the movement's next turn. On 14 October 1956, Ambedkar led hundreds of thousands of followers in converting to Buddhism at Deekshabhoomi, arguing that a caste-based social order needed a moral and spiritual alternative, not only a legal one. His death seven weeks later, on 6 December 1956, left the movement to carry that unfinished work forward without its founder — through leadership transitions, organisational strain, and a changing political landscape, but without abandoning the core demand: substantive, not merely formal, equality.</p>

<p>That demand remains SSD's work today. Members continue to gather each year at Chaitya Bhoomi in Mumbai and at Deekshabhoomi in Nagpur to renew that commitment, run community and educational programmes, and organise new units — including Samta Sainik Dal Delhi — to bring the century-old fight for social justice to a new generation. The details have changed since 1927; the underlying claim has not: that dignity and equal citizenship cannot depend on the caste one is born into.</p>`,
    tags: ["Social Justice", "Constitution", "Article 17", "Poona Pact", "Citizenship"],
    language: "en",
    status: "published",
    published_at: "2024-04-14T00:00:00Z",
    publishedAt: new Date("2024-04-14T00:00:00Z").getTime(),
    view_count: 1890,
    viewCount: 1890,
    featured: true,
  },
];

export const DEFAULT_TIMELINE: TimelineMilestone[] = [
  {
    id: "1920-mooknayak",
    _id: "1920-mooknayak",
    year: 1920,
    dateDisplay: "1920",
    title: "Mooknayak Launched",
    description: "Ambedkar starts a Marathi weekly to voice the concerns of the Depressed Classes.",
    significance: "Broke the media silence on caste oppression and gave Dalits an independent public voice.",
    era: "Founding Era (1920–1930)",
  },
  {
    id: "1924-bahishkrit",
    _id: "1924-bahishkrit",
    year: 1924,
    dateDisplay: "July 1924",
    title: "Bahishkrit Hitakarini Sabha",
    description: "Ambedkar's first organised effort against untouchability — the institutional root of the later movement.",
    significance: "Established the rallying slogan: 'Educate, Agitate, Organise'.",
    era: "Founding Era (1920–1930)",
  },
  {
    id: "1927-ssd-founded",
    _id: "1927-ssd-founded",
    year: 1927,
    dateDisplay: "13 March 1927",
    title: "Samata Sainik Dal Founded",
    description: "A volunteer corps is formally constituted, five days ahead of the Mahad action, to protect satyagrahis and spread the message of equality.",
    significance: "Created a disciplined, non-violent volunteer force for social defence and equality.",
    era: "Founding Era (1920–1930)",
  },
  {
    id: "1927-mahad-satyagraha",
    _id: "1927-mahad-satyagraha",
    year: 1927,
    dateDisplay: "20 March 1927",
    title: "Mahad Chavdar Tale Satyagraha",
    description: "Ambedkar leads a march to assert Dalits' right to draw water from a public lake — a defining act of the movement.",
    significance: "First collective civil rights action asserting equal access to public resources.",
    era: "Founding Era (1920–1930)",
  },
  {
    id: "1927-samaj-samata-sangh",
    _id: "1927-samaj-samata-sangh",
    year: 1927,
    dateDisplay: "1927",
    title: "Samaj Samata Sangh",
    description: "A dedicated body is founded to promote social equality beyond the immediate Mahad struggle.",
    significance: "Expanded the fight from local satyagrahis to broader societal transformation.",
    era: "Founding Era (1920–1930)",
  },
  {
    id: "1932-poona-pact",
    _id: "1932-poona-pact",
    year: 1932,
    dateDisplay: "1932",
    title: "Poona Pact",
    description: "Following the Round Table Conferences, Ambedkar agrees to reserved (rather than separate) electorates for the Depressed Classes.",
    significance: "Secured guaranteed political representation and reservations in legislatures.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1936-ilp",
    _id: "1936-ilp",
    year: 1936,
    dateDisplay: "1936",
    title: "Independent Labour Party",
    description: "Ambedkar founds the ILP; SSD volunteers help carry its message into the Bombay Legislative Assembly elections.",
    significance: "United caste-oppressed communities and working classes into a unified political platform.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1942-scf-ssd-session",
    _id: "1942-scf-ssd-session",
    year: 1942,
    dateDisplay: "1942",
    title: "Scheduled Castes Federation & First SSD Session",
    description: "A dedicated political federation is formed; SSD holds its first formal session in Nagpur, with Ambedkar present.",
    significance: "Nationalized SSD's presence across multiple provinces in India.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1944-kanpur-session",
    _id: "1944-kanpur-session",
    year: 1944,
    dateDisplay: "30 January 1944",
    title: "Second SSD Session, Kanpur",
    description: "Ambedkar calls SSD 'the backbone of our political party' and sets in motion its formal constitution.",
    significance: "Formalized the SSD constitution with clear ranks and organizational tenets.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1947-independence",
    _id: "1947-independence",
    year: 1947,
    dateDisplay: "1947",
    title: "Indian Independence",
    description: "SSD continues its work of protection and mobilisation alongside the Scheduled Castes Federation.",
    significance: "Transitioned the anti-caste movement into nation-building and constitutional reform.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1950-constitution",
    _id: "1950-constitution",
    year: 1950,
    dateDisplay: "1949–50",
    title: "Constitution of India",
    description: "As Chairman of the Drafting Committee, Ambedkar enshrines the abolition of untouchability and the right to equality in India's Constitution.",
    significance: "Article 17 legally abolished untouchability; Articles 14–16 guaranteed fundamental equality.",
    era: "Political & Constitutional Era (1931–1950)",
  },
  {
    id: "1956-buddhism",
    _id: "1956-buddhism",
    year: 1956,
    dateDisplay: "14 October 1956",
    title: "Conversion to Buddhism",
    description: "Ambedkar leads a mass conversion at Deekshabhoomi, Nagpur, adding a moral and spiritual foundation to the movement.",
    significance: "Reclaimed self-respect and humanist ethics through the Buddha's Dhamma.",
    era: "Buddhist Revival & Legacy (1951–1956)",
  },
  {
    id: "1956-mahaparinirvan",
    _id: "1956-mahaparinirvan",
    year: 1956,
    dateDisplay: "6 December 1956",
    title: "Mahaparinirvan",
    description: "Ambedkar's death is a profound loss to the movement; SSD navigates a period of leadership transition.",
    significance: "The movement resolved to preserve Babasaheb's legacy and continue the struggle.",
    era: "Buddhist Revival & Legacy (1951–1956)",
  },
  {
    id: "present-day-legacy",
    _id: "present-day-legacy",
    year: 2024,
    dateDisplay: "Present Day",
    title: "A Living Legacy",
    description: "SSD continues nationwide, with active units — including Samta Sainik Dal Delhi — carrying the fight for equality, dignity, and social justice into a new century.",
    significance: "Active youth and women's wings advancing education, legal aid, and social harmony.",
    era: "Living Legacy (Present)",
  },
];
