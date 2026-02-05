'use client'

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div 
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}