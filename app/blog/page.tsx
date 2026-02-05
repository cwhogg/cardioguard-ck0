import Link from 'next/link'
import { getAllPosts } from '../../lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cardiovascular Health Blog — Tips & Guides | CardioGuard',
  description: 'Expert insights on cardiovascular biomarkers, heart disease prevention, and advanced testing. Get the knowledge you need to take control of your heart health.',
  openGraph: {
    title: 'Cardiovascular Health Blog — CardioGuard',
    description: 'Expert insights on cardiovascular biomarkers, heart disease prevention, and advanced testing.',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-6">
            Cardiovascular Health Insights
          </h1>
          <p className="text-xl text-textSecondary leading-relaxed mb-4">
            Get expert guidance on advanced cardiovascular testing, biomarker interpretation, and heart disease prevention strategies that go beyond basic cholesterol panels.
          </p>
          <p className="text-lg text-textMuted">
            Learn which tests cardiologists actually use and how to access them without insurance barriers.
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-backgroundElevated border border-border rounded-lg p-8 hover:bg-opacity-80 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl font-heading font-semibold text-textPrimary mb-2 md:mb-0">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  {post.date && (
                    <time className="text-textMuted font-mono text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
                
                <p className="text-textSecondary leading-relaxed mb-4">
                  {post.description}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-accent font-medium hover:underline"
                >
                  Read full article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-backgroundElevated border border-border rounded-lg p-12">
              <h2 className="text-2xl font-heading font-semibold text-textPrimary mb-4">
                Coming Soon
              </h2>
              <p className="text-textSecondary mb-6">
                We're preparing in-depth articles on cardiovascular biomarkers, testing strategies, and heart disease prevention.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primaryLight transition-colors"
              >
                Join Early Access
              </Link>
            </div>
          </div>
        )}
        
        <div className="mt-16 pt-8 border-t border-border">
          <Link 
            href="/"
            className="text-accent hover:underline font-medium"
          >
            ← Back to CardioGuard
          </Link>
        </div>
      </div>
    </div>
  )
}