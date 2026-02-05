import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '../../../lib/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('blog-post')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | CardioGuard'
    }
  }
  
  return {
    title: `${post.title} | CardioGuard`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://cardioguard.com/blog/${slug}`,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)
  
  if (!post) {
    notFound()
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'CardioGuard'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CardioGuard'
    }
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
            href="/blog"
            className="text-accent hover:underline font-medium mb-6 inline-block"
          >
            ← Back to Blog
          </Link>
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.date && (
              <time className="text-textMuted font-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
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
              ← More Articles
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