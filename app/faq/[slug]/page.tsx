import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '../../../lib/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('faq')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    return {
      title: 'FAQ Not Found | CardioGuard'
    }
  }
  
  return {
    title: `${post.title} | CardioGuard`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://cardioguard.com/faq/${slug}`,
    },
  }
}

export default async function FAQPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    notFound()
  }
  
  // Extract FAQ pairs from content for schema
  const faqItems: Array<{question: string, answer: string}> = []
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
  
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-accent hover:underline font-medium mb-6 inline-block"
          >
            ← Back to CardioGuard
          </Link>
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.description && (
              <p className="text-xl text-textSecondary leading-relaxed">
                {post.description}
              </p>
            )}
          </header>
        </div>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link 
              href="/blog"
              className="text-accent hover:underline font-medium"
            >
              Read Our Articles
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primaryLight transition-colors"
            >
              Get Advanced Heart Testing
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}