/**
 * Instagram Content Guidelines Page
 * 
 * Displays GMC-compliant content guidelines for NHS mentors creating
 * educational Instagram content for the @nextdocuk account.
 * 
 * **Key Sections:**
 * - What to share (career tips, PLAB prep, interview advice)
 * - What NOT to share (patient data, confidential NHS info)
 * - GMC social media guidelines compliance
 * - Content review process (48-72 hour turnaround)
 * - Earnings formula (tiered by view count)
 * - Intellectual property terms
 * 
 * @see src/pages/mentor/Instagram.tsx - Landing page that links here
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Coins,
  Copyright,
  Mail,
  ArrowLeft,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function InstagramGuidelines() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Back Navigation */}
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/mentor/instagram">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Instagram Program
        </Link>
      </Button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Version 1.0</Badge>
            </div>
            <CardTitle className="text-3xl">Instagram Content Guidelines</CardTitle>
            <p className="text-muted-foreground mt-2">
              Creating NHS-compliant educational content for UK-based medical professionals
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      {/* What to Share */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        id="what-to-share"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              What to Share
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ Career Tips</div>
                <p className="text-sm text-muted-foreground">
                  Specialty selection advice, work-life balance, CPD planning
                </p>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ PLAB Preparation</div>
                <p className="text-sm text-muted-foreground">
                  Study strategies, exam techniques, time management tips
                </p>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ Interview Techniques</div>
                <p className="text-sm text-muted-foreground">
                  Common questions, STAR method, post-interview follow-up
                </p>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ Portfolio Advice</div>
                <p className="text-sm text-muted-foreground">
                  CV optimization, reflection writing, audit presentation
                </p>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ Motivational Content</div>
                <p className="text-sm text-muted-foreground">
                  Overcoming setbacks, resilience, career progression stories
                </p>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="font-semibold text-success mb-1">✅ UK Medical System</div>
                <p className="text-sm text-muted-foreground">
                  NHS structure, training pathways, registration process
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What NOT to Share */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        id="what-not-to-share"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-6 w-6 text-destructive" />
              What NOT to Share
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Patient Information</div>
                <p className="text-sm text-muted-foreground">
                  Names, photos, case details, or any identifiable data
                </p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Confidential NHS Data</div>
                <p className="text-sm text-muted-foreground">
                  Rotas, internal emails, Trust policies, staff names
                </p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Political Opinions</div>
                <p className="text-sm text-muted-foreground">
                  Controversial views, NHS funding debates, union disputes
                </p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Commercial Promotion</div>
                <p className="text-sm text-muted-foreground">
                  Non-NHS products, personal business, affiliate links
                </p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Clinical Advice</div>
                <p className="text-sm text-muted-foreground">
                  Diagnosis, treatment recommendations, drug advice
                </p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="font-semibold text-destructive mb-1">❌ Unverified Claims</div>
                <p className="text-sm text-muted-foreground">
                  Medical misinformation, anecdotal treatments, conspiracy theories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* GMC Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        id="gmc-guidelines"
      >
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-warning" />
              GMC Social Media Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              All content submitted to NextDoc UK must comply with the General Medical Council's
              2013 guidance on doctors' use of social media.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Maintain Professional Boundaries</div>
                  <p className="text-sm text-muted-foreground">
                    Content must not blur the line between your professional and personal identity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Protect Patient Confidentiality</div>
                  <p className="text-sm text-muted-foreground">
                    Never discuss individual patients or clinical cases, even anonymously.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Avoid Establishing Patient Relationships</div>
                  <p className="text-sm text-muted-foreground">
                    Do not provide clinical advice or diagnosis through social media comments.
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://www.gmc-uk.org/ethical-guidance/ethical-guidance-for-doctors/doctors-use-of-social-media"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                Read Full GMC Guidance
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Review Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        id="review-process"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Content Review Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  1
                </div>
                <div>
                  <div className="font-semibold">Submit Your Content</div>
                  <p className="text-sm text-muted-foreground">
                    Upload video (max 90 seconds), add title and description, select category
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  2
                </div>
                <div>
                  <div className="font-semibold">Compliance Review (48-72 hours)</div>
                  <p className="text-sm text-muted-foreground">
                    NDG compliance team checks for GMC guideline adherence, patient confidentiality,
                    and content quality
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  3
                </div>
                <div>
                  <div className="font-semibold">Approval or Feedback</div>
                  <p className="text-sm text-muted-foreground">
                    If approved, content is scheduled for posting. If changes needed, you'll receive
                    specific feedback
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center font-bold text-success">
                  4
                </div>
                <div>
                  <div className="font-semibold">Posted to @nextdocuk</div>
                  <p className="text-sm text-muted-foreground">
                    Content goes live with credit to your name and specialty. Engagement tracking begins
                    immediately
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center font-bold text-success">
                  5
                </div>
                <div>
                  <div className="font-semibold">Monthly Payout Calculation</div>
                  <p className="text-sm text-muted-foreground">
                    Views tracked for 30 days. Earnings calculated using tiered formula and included
                    in next payout
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Earnings Formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        id="earnings"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-success" />
              Earnings Formula
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Earnings are calculated based on total views in the first 30 days after posting, using
              a tiered system:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">£10</div>
                <div className="text-sm font-medium">per 1,000 views</div>
                <div className="text-xs text-muted-foreground mt-1">First 10k views</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">£15</div>
                <div className="text-sm font-medium">per 1,000 views</div>
                <div className="text-xs text-muted-foreground mt-1">10k - 50k views</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">£20</div>
                <div className="text-sm font-medium">per 1,000 views</div>
                <div className="text-xs text-muted-foreground mt-1">50k+ views</div>
              </div>
            </div>
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="font-semibold text-success mb-2">Example Calculation:</div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First 10,000 views @ £10/1k:</span>
                  <span className="font-medium">£100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next 40,000 views @ £15/1k:</span>
                  <span className="font-medium">£600.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next 25,000 views @ £20/1k:</span>
                  <span className="font-medium">£500.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-success">
                  <span>Total earnings (75,000 views):</span>
                  <span>£1,200.00</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Minimum payout threshold: £50/month
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Intellectual Property */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        id="intellectual-property"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copyright className="h-6 w-6 text-primary" />
              Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">You retain full ownership</span> of all content you create
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">NextDoc UK holds exclusive license</span> to post
                  content under the @nextdocuk Instagram account
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Credit attribution:</span> All posts include your
                  name and specialty
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Content removal:</span> You can request content
                  removal anytime (archived after 30 days)
                </div>
              </div>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              By submitting content, you confirm that it does not infringe on any third-party
              intellectual property rights and that you have the right to grant this license.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Questions or Concerns?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our Creator Support team is here to help with any questions about content guidelines,
              the review process, or earnings calculations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <a href="mailto:creators@nextdocuk.com">
                  <Mail className="h-4 w-4 mr-2" />
                  creators@nextdocuk.com
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/mentor/instagram">
                  Return to Instagram Program
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
