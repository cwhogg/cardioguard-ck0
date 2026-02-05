'use client'

import { useState } from 'react'
import { JsonLd } from '../components/content/JsonLd'

interface SignupFormState {
  email: string;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
}

export default function HomePage() {
  const [formState, setFormState] = useState<SignupFormState>({
    email: '',
    isLoading: false,
    message: '',
    isSuccess: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState(prev => ({ ...prev, isLoading: true, message: '' }))

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formState.email }),
      })

      const data = await response.json()

      if (data.success) {
        setFormState({
          email: '',
          isLoading: false,
          message: 'Thanks! We\'ll notify you when early access opens.',
          isSuccess: true
        })
      } else {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          message: data.error || 'Something went wrong. Please try again.',
          isSuccess: false
        }))
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        message: 'Network error. Please try again.',
        isSuccess: false
      }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, email: e.target.value }))
  }

  return (
    <>
      <JsonLd 
        type="Organization"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CardioGuard",
          "url": "https://cardioguard.com",
          "logo": "https://cardioguard.com/logo.png",
          "description": "Advanced Heart Testing Without Insurance Barriers",
          "sameAs": [
            "https://twitter.com/cardioguard",
            "https://linkedin.com/company/cardioguard"
          ]
        }}
      />
      
      <JsonLd 
        type="WebSite"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CardioGuard",
          "url": "https://cardioguard.com",
          "description": "Get advanced cardiovascular biomarkers (ApoB, Lp(a), hs-CRP) without waiting for insurance approval."
        }}
      />
      
      <JsonLd 
        type="FAQPage"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the best markers for cardiovascular health?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most predictive cardiovascular biomarkers include ApoB (apolipoprotein B), Lp(a) (lipoprotein a), hs-CRP (high-sensitivity C-reactive protein), and advanced lipid panels. These tests provide far more accurate risk assessment than basic cholesterol panels that most insurance covers."
              }
            },
            {
              "@type": "Question",
              "name": "Does insurance cover LP(a) test?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most insurance plans don't cover Lp(a) testing routinely, requiring specific medical justification or family history documentation. This creates barriers for proactive cardiovascular screening, which is why direct-to-consumer options are becoming essential for comprehensive heart health assessment."
              }
            },
            {
              "@type": "Question",
              "name": "What is a preferred cardiac biomarker?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Leading cardiologists consider ApoB the single best predictor of cardiovascular disease risk, as it measures all atherogenic particles. Combined with Lp(a) for genetic risk and hs-CRP for inflammation, these biomarkers provide a comprehensive cardiovascular risk profile."
              }
            },
            {
              "@type": "Question",
              "name": "What tests are not covered by insurance?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Insurance often excludes advanced cardiovascular biomarkers like ApoB, Lp(a), particle size testing, and comprehensive inflammatory markers. These tests are considered 'preventive' rather than diagnostic, creating coverage gaps for proactive health management."
              }
            }
          ]
        }}
      />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="font-heading font-bold text-xl text-textPrimary">CardioGuard</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-textSecondary hover:text-accent transition-colors">Features</a>
                <a href="#faq" className="text-textSecondary hover:text-accent transition-colors">FAQ</a>
                <a href="#pricing" className="text-textSecondary hover:text-accent transition-colors">Pricing</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-textPrimary mb-6 leading-tight">
                Get the Best Cardiovascular Biomarkers Without Insurance Headaches
              </h1>
              <p className="text-xl md:text-2xl text-textSecondary mb-8 leading-relaxed">
                Access ApoB, Lp(a), and advanced lipid testing that cardiologists recommend but insurance often won't cover. Take control of your heart health with the tests that actually predict your risk.
              </p>
              
              {/* Email Signup Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                    disabled={formState.isLoading}
                    className="form-input flex-1"
                  />
                  <button
                    type="submit"
                    disabled={formState.isLoading || formState.isSuccess}
                    className="btn btn-primary whitespace-nowrap min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState.isLoading ? 'Joining...' : 'Join Early Access'}
                  </button>
                </div>
                {formState.message && (
                  <p className={`mt-3 text-sm ${formState.isSuccess ? 'text-accent' : 'text-primary'}`}>
                    {formState.message}
                  </p>
                )}
              </form>
              
              <p className="text-textMuted text-sm">
                Join 2,847+ health-conscious professionals getting early access
              </p>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="features" className="py-20 px-4 bg-backgroundElevated">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary text-center mb-12">
              Advanced Heart Testing That Actually Matters
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-textPrimary mb-4">
                  Tests Worth Getting (Finally Accessible)
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  ApoB, Lp(a), hs-CRP, and advanced lipid panels—the biomarkers leading cardiologists use but most people can't easily access. No physician orders required.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-textPrimary mb-4">
                  Insurance Navigation Included
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  Get guidance on which tests insurance might cover, specific CPT codes to request, and appeals strategies. Plus direct-pay options when coverage fails.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-textPrimary mb-4">
                  Risk Tracking That Actually Matters
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  Understand what your biomarker trends mean for your 10-year cardiovascular risk. Clear explanations of when levels matter and what actions to take.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary mb-6">
                Why Standard Cholesterol Tests Miss the Mark
              </h2>
              <p className="text-xl text-textSecondary leading-relaxed">
                Your insurance covers basic cholesterol, but the tests cardiologists actually rely on? That's where we come in.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">
                  The Insurance Problem
                </h3>
                <ul className="space-y-3 text-textSecondary">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✗</span>
                    Standard lipid panels miss 50% of heart attacks
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✗</span>
                    ApoB testing requires "medical necessity" justification
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✗</span>
                    Lp(a) coverage limited to family history cases
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✗</span>
                    Advanced testing requires specialist referrals
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-xl text-accent mb-4">
                  The CardioGuard Solution
                </h3>
                <ul className="space-y-3 text-textSecondary">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    Direct access to ApoB, Lp(a), and hs-CRP testing
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    No physician gatekeeping or insurance pre-auth
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    CPT codes and appeals guidance when needed
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    Clear interpretation of your cardiovascular risk
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 bg-backgroundElevated">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  What are the best markers for cardiovascular health?
                </h3>
                <p className="text-textSecondary">
                  The most predictive cardiovascular biomarkers include ApoB (apolipoprotein B), Lp(a) (lipoprotein a), hs-CRP (high-sensitivity C-reactive protein), and advanced lipid panels. These tests provide far more accurate risk assessment than basic cholesterol panels that most insurance covers.
                </p>
              </div>
              
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  Does insurance cover LP(a) test?
                </h3>
                <p className="text-textSecondary">
                  Most insurance plans don't cover Lp(a) testing routinely, requiring specific medical justification or family history documentation. This creates barriers for proactive cardiovascular screening, which is why direct-to-consumer options are becoming essential for comprehensive heart health assessment.
                </p>
              </div>
              
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  What is a preferred cardiac biomarker?
                </h3>
                <p className="text-textSecondary">
                  Leading cardiologists consider ApoB the single best predictor of cardiovascular disease risk, as it measures all atherogenic particles. Combined with Lp(a) for genetic risk and hs-CRP for inflammation, these biomarkers provide a comprehensive cardiovascular risk profile.
                </p>
              </div>
              
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  What tests are not covered by insurance?
                </h3>
                <p className="text-textSecondary">
                  Insurance often excludes advanced cardiovascular biomarkers like ApoB, Lp(a), particle size testing, and comprehensive inflammatory markers. These tests are considered 'preventive' rather than diagnostic, creating coverage gaps for proactive health management.
                </p>
              </div>
              
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  How accurate is basic cholesterol test really?
                </h3>
                <p className="text-textSecondary">
                  Standard cholesterol panels miss approximately 50% of people who will have heart attacks, as they don't measure particle number or size. ApoB testing provides a much more accurate assessment of atherogenic risk by counting all harmful lipid particles.
                </p>
              </div>
              
              <div className="card">
                <h3 className="font-heading font-semibold text-lg text-textPrimary mb-3">
                  Why is LP(a) test so expensive?
                </h3>
                <p className="text-textSecondary">
                  Lp(a) testing costs are high due to specialized laboratory requirements and limited insurance coverage. The test requires specific antibodies and isn't included in standard lipid panels, making it a separate, often out-of-pocket expense for most patients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary mb-6">
              Take Control of Your Cardiovascular Health
            </h2>
            <p className="text-xl text-textSecondary mb-8">
              Don't wait for a cardiac event to get the testing you need. Join thousands of health-conscious professionals who refuse to let insurance dictate their health monitoring.
            </p>
            
            {!formState.isSuccess && (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                    disabled={formState.isLoading}
                    className="form-input flex-1"
                  />
                  <button
                    type="submit"
                    disabled={formState.isLoading}
                    className="btn btn-primary whitespace-nowrap min-w-[140px] disabled:opacity-50"
                  >
                    {formState.isLoading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </div>
                {formState.message && (
                  <p className="mt-3 text-sm text-primary">
                    {formState.message}
                  </p>
                )}
              </form>
            )}
            
            {formState.isSuccess && (
              <div className="bg-backgroundElevated border border-accent rounded-lg p-6 max-w-md mx-auto">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-accent font-medium">
                  Welcome to CardioGuard! We'll notify you as soon as early access opens.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-textPrimary">CardioGuard</span>
                </div>
                <p className="text-textMuted text-sm">
                  Advanced Heart Testing Without Insurance Barriers
                </p>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-textPrimary mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="/compare" className="text-textMuted hover:text-accent text-sm">Compare Tests</a></li>
                  <li><a href="/pricing" className="text-textMuted hover:text-accent text-sm">Pricing</a></li>
                  <li><a href="/blog" className="text-textMuted hover:text-accent text-sm">Heart Health Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-textPrimary mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="/faq" className="text-textMuted hover:text-accent text-sm">FAQ</a></li>
                  <li><a href="/blog/apolipoprotein-b-guide" className="text-textMuted hover:text-accent text-sm">ApoB Guide</a></li>
                  <li><a href="/blog/lipoprotein-a-testing" className="text-textMuted hover:text-accent text-sm">Lp(a) Testing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-textPrimary mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-textMuted hover:text-accent text-sm">About</a></li>
                  <li><a href="/privacy" className="text-textMuted hover:text-accent text-sm">Privacy</a></li>
                  <li><a href="/terms" className="text-textMuted hover:text-accent text-sm">Terms</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-textMuted text-sm">
                © 2024 CardioGuard. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}