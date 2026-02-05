import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface PostData {
  slug: string
  title: string
  description: string
  type: string
  date: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

const TYPE_TO_DIR: Record<string, string> = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

async function processMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content)
  return result.toString()
}

export async function getAllPosts(type: string): Promise<PostData[]> {
  const directory = TYPE_TO_DIR[type]
  if (!directory) return []
  
  const contentDir = path.join(process.cwd(), directory)
  
  try {
    const files = fs.readdirSync(contentDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const filePath = path.join(contentDir, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const processedContent = await processMarkdown(content)
        
        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          type: data.type || type,
          date: data.date || '',
          content: processedContent,
          targetKeywords: data.targetKeywords || [],
          ideaName: data.ideaName,
          status: data.status
        }
      })
    )
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    // Directory doesn't exist or other error
    return []
  }
}

export async function getPostBySlug(type: string, slug: string): Promise<PostData | null> {
  const directory = TYPE_TO_DIR[type]
  if (!directory) return null
  
  try {
    const filePath = path.join(process.cwd(), directory, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const processedContent = await processMarkdown(content)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type: data.type || type,
      date: data.date || '',
      content: processedContent,
      targetKeywords: data.targetKeywords || [],
      ideaName: data.ideaName,
      status: data.status
    }
  } catch (error) {
    return null
  }
}