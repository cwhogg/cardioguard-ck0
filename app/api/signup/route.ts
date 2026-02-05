import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }
    
    const siteId = process.env.SITE_ID || 'cardioguard'
    const emailKey = `email_signups:${siteId}`
    const countKey = `email_signups_count:${siteId}`
    
    // Check if email already exists
    const existingEmails = await redis.lrange(emailKey, 0, -1)
    if (existingEmails && existingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'This email is already registered.' },
        { status: 400 }
      )
    }
    
    // Store email and increment counter
    await redis.rpush(emailKey, email)
    await redis.incr(countKey)
    
    // Set TTL for email list (optional - 90 days)
    await redis.expire(emailKey, 60 * 60 * 24 * 90)
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}