import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getBlogBySlug } from "@/lib/supabase-rest"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rows = await getBlogBySlug(slug)
  const blog = rows[0]
  if (!blog) notFound()

  return <main className="min-h-screen bg-background">
    <section className="bg-[#003285] px-4 py-20 text-white md:py-28">
      <div className="container max-w-4xl">
        <Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="size-4" /> Back to blog</Link>
        <Badge className="bg-[#FFDA78] text-[#003285]">{blog.category}</Badge>
        <h1 className="mt-6 text-balance text-4xl font-black leading-tight md:text-6xl">{blog.title}</h1>
        <div className="mt-8 flex items-center gap-2 text-sm text-white/70"><Calendar className="size-4 text-[#FFDA78]" /> {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "SSD Delhi Community"}</div>
      </div>
    </section>
    <section className="container max-w-4xl px-4 py-12 md:py-20">
      <article className="rounded-3xl border bg-card p-6 shadow-sm md:p-12">
        <div className="mb-8 flex items-center gap-3 text-[#003285]"><MessageCircle className="size-5" /><span className="font-semibold">A story from the SSD Delhi community</span></div>
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }} />
        {blog.tags?.length ? <div className="mt-12 flex flex-wrap gap-2 border-t pt-8">{blog.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}</div> : null}
      </article>
    </section>
  </main>
}
