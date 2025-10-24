import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Upload, TrendingUp, Coins, Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Instagram() {
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(() => 
    storage.has(STORAGE_KEYS.INSTAGRAM_WAITLIST_EMAIL)
  );
  const { toast } = useToast();

  const handleNotifyMe = () => {
    // Basic email validation
    if (!email || !email.includes('@') || email.length < 5) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    // Save to localStorage (Phase 1)
    storage.set(STORAGE_KEYS.INSTAGRAM_WAITLIST_EMAIL, email);
    
    toast({
      title: "You're on the list!",
      description: `We'll notify ${email} when the program launches in Q1 2026.`,
    });
    
    setSubmitted(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <Badge className="bg-warning/10 text-warning border-warning/20">
                BETA
              </Badge>
            </div>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">NextDoc UK Mentor Voice</CardTitle>
            <p className="text-muted-foreground">
              Turn your expertise into educational content and earn extra income through NextDoc UK's
              official Instagram account. No followers needed — we handle the posting, you focus on
              creating.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              size="lg" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => setShowInterestModal(true)}
            >
              <Video className="h-5 w-5" />
              Express Interest (Beta)
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/mentor/instagram/guidelines#upload">
              <Card className="h-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                <CardHeader>
                  <Upload className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Easy Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Record a 60-90 second video on your phone. Submit through your dashboard. We handle
                    editing, posting, and engagement.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-sm">Submit 60-second videos via mobile or desktop — no editing skills required</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/mentor/instagram/guidelines#review-process">
              <Card className="h-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-success mb-2" />
                  <CardTitle className="text-xl">Track Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    See real-time analytics on views, saves, and shares. Know exactly how many
                    aspiring doctors you're helping.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-sm">See views, saves, shares for each video you create</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/mentor/instagram/guidelines#earnings">
              <Card className="h-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                <CardHeader>
                  <Coins className="h-8 w-8 text-warning mb-2" />
                  <CardTitle className="text-xl">Earn Extra</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    £10-20 per 1,000 views, paid monthly alongside your mentoring fees. Detailed
                    breakdowns in your Earnings page.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="text-sm">£10-£20 per 1,000 views depending on performance tier</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { number: 1, text: 'Submit your content for review' },
                { number: 2, text: 'NDG team publishes under @nextdocuk' },
                { number: 3, text: 'Earn based on engagement metrics' },
                { number: 4, text: 'Withdraw anytime — your IP is protected' },
              ].map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                    {step.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Get Early Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Instagram Creator Program launching Q1 2026
            </p>
            <div className="flex gap-2 max-w-md">
              <Input 
                type="email" 
                placeholder="your.email@example.com" 
                disabled={submitted}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNotifyMe()}
                className="flex-1"
              />
              <Button 
                onClick={handleNotifyMe}
                disabled={submitted}
              >
                {submitted ? 'Subscribed ✓' : 'Notify Me'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We'll notify you when the program is ready for enrollment.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Footer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium">
                All uploaded content must comply with NHS confidentiality and NDG Code of Conduct.
              </p>
              <p className="text-muted-foreground">
                Optional program — no obligation to participate.{' '}
                <Link
                  to="/mentor/instagram/guidelines"
                  className="text-primary hover:underline"
                >
                  Read Content Guidelines
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Footer */}
      <Card className="border-muted">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All Instagram Creator Program earnings are processed monthly via Stripe under NDG UK Ltd. 
              Content remains your{' '}
              <Link
                to="/mentor/instagram/guidelines#ip-rights"
                className="text-primary hover:underline"
              >
                intellectual property
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Express Interest Modal */}
      <Dialog open={showInterestModal} onOpenChange={setShowInterestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Instagram Creator Program — Coming Q1 2026</DialogTitle>
            <DialogDescription>
              We're currently onboarding a small group of mentors for beta testing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              To express interest, please email{' '}
              <a href="mailto:creators@nextdocuk.com" className="text-primary hover:underline">
                creators@nextdocuk.com
              </a>{' '}
              with:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Your name and specialty</li>
              <li>Type of content you'd like to create</li>
              <li>Estimated availability (hours/month)</li>
            </ul>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                All applicants will be contacted in December 2025 for beta access.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInterestModal(false)}>
              Close
            </Button>
            <Button asChild>
              <a href="mailto:creators@nextdocuk.com?subject=Instagram Creator Beta Interest">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default Instagram;
