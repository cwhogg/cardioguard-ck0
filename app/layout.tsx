import type { Metadata } from 'next'
import { Inter, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
  description: 'Get advanced cardiovascular biomarkers (ApoB, Lp(a), hs-CRP) without waiting for insurance approval. Direct-to-consumer heart testing for proactive prevention.',
  keywords: ['cardiovascular biomarkers', 'apolipoprotein b test', 'lipoprotein a test', 'advanced lipid panel', 'heart disease prevention', 'direct consumer testing'],
  authors: [{ name: 'CardioGuard' }],
  creator: 'CardioGuard',
  publisher: 'CardioGuard',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cardioguard.com',
    siteName: 'CardioGuard',
    title: 'Get the Best Cardiovascular Biomarkers Without Insurance Headaches',
    description: 'Access ApoB, Lp(a), and advanced lipid testing that cardiologists recommend but insurance often won\'t cover. Take control of your heart health.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get the Best Cardiovascular Biomarkers Without Insurance Headaches',
    description: 'Access ApoB, Lp(a), and advanced lipid testing that cardiologists recommend but insurance often won\'t cover.',
  },
  alternates: {
    canonical: 'https://cardioguard.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-textPrimary font-body antialiased">
        {children}
      </body>
    </html>
  )
}