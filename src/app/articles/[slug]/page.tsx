import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getArticleBySlug } from "@/lib/supabase-rest"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rows = await getArticleBySlug(slug)
  const article = rows[0]
  if (!article) notFound()

  return <main className="min-h-screen bg-background">
    <section className="bg-[#003285] px-4 py-20 text-white md:py-28">
      <div className="container max-w-4xl">
        <Link href="/articles" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="size-4" /> Back to articles</Link>
        <div className="flex flex-wrap gap-2"><Badge className="bg-[#FFDA78] text-[#003285]">{article.category}</Badge><Badge variant="outline" className="border-white/30 text-white">{article.language === "en" ? "English" : "हिंदी"}</Badge></div>
        <h1 className="mt-6 text-balance text-4xl font-black leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-blue-100">{article.excerpt}</p>
        <div className="mt-8 flex items-center gap-2 text-sm text-white/70"><Calendar className="size-4 text-[#FFDA78]" /> {article.published_at ? new Date(article.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "SSD Delhi Editorial"}</div>
      </div>
    </section>
    <section className="container max-w-4xl px-4 py-12 md:py-20">
      <article className="rounded-3xl border bg-card p-6 shadow-sm md:p-12">
        <div className="mb-8 flex items-center gap-3 text-[#003285]"><BookOpen className="size-5" /><span className="font-semibold">SSD Delhi Editorial</span></div>
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
        {article.tags?.length ? <div className="mt-12 flex flex-wrap gap-2 border-t pt-8">{article.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}</div> : null}
      </article>
    </section>
  </main>
}
