import { useState } from 'react';
import { FileText, CheckCircle, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface MentorAgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
}

export function MentorAgreementModal({ open, onOpenChange, onAccept }: MentorAgreementModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { toast } = useToast();

  const handleAccept = () => {
    const consents = JSON.parse(localStorage.getItem('mentor_legal_consents') || '{}');
    
    consents.mentor_agreement = {
      version: 'v1.0',
      status: 'accepted',
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('mentor_legal_consents', JSON.stringify(consents));
    
    toast({
      title: 'Agreement Accepted',
      description: 'Mentor Agreement accepted. Thank you for your professionalism.',
    });
    
    onAccept?.();
    onOpenChange(false);
    setIsChecked(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <DialogTitle>Mentor Agreement v1.0</DialogTitle>
              <DialogDescription>NextDoc UK Legal Document</DialogDescription>
            </div>
            <Badge className="bg-primary">Legal Document</Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Educational Mentoring Scope</h3>
              <p className="text-muted-foreground leading-relaxed">
                This agreement establishes the framework for educational mentoring services provided through the NextDoc UK platform. 
                All mentoring activities are strictly educational in nature and do not constitute clinical advice, medical consultation, 
                or professional medical services. Mentors agree to provide career guidance, interview preparation, CV review, and 
                professional development support only.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. NHS Confidentiality & GMC Standards</h3>
              <p className="text-muted-foreground leading-relaxed">
                All mentors must comply with NHS confidentiality standards and the General Medical Council's Good Medical Practice 
                guidelines. No patient-identifiable information, clinical data, or confidential NHS information may be shared 
                through the platform. Mentors must maintain professional boundaries at all times and report any breaches to 
                NextDoc UK immediately.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. NextDoc UK Code of Conduct</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mentors agree to uphold NextDoc UK's Code of Conduct, which includes professional behavior, respect for mentees, 
                punctuality for scheduled sessions, constructive feedback delivery, and adherence to platform guidelines. 
                Any violation may result in suspension or termination of mentor privileges.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Data Protection & Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                NextDoc UK processes personal data in accordance with UK GDPR and the Data Protection Act 2018. Mentors consent 
                to the processing of their professional information, session records, and communications for platform operation, 
                quality assurance, and legal compliance. All data is encrypted and stored securely.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Professional Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accepting this agreement, you acknowledge your professional responsibility to provide high-quality mentoring, 
                maintain professional standards, protect mentee welfare, and comply with all applicable laws and regulations. 
                You confirm that you hold appropriate professional registration and indemnity insurance.
              </p>
            </section>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-primary hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                <ExternalLink className="h-4 w-4" />
                View Full Agreement (PDF)
              </a>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Checkbox 
              id="accept-agreement" 
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
            />
            <div className="flex-1">
              <label 
                htmlFor="accept-agreement" 
                className="text-sm font-medium leading-none cursor-pointer"
              >
                I have read and agree to the Mentor Agreement v1.0
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                By accepting, you acknowledge professional responsibility for educational mentoring within NHS standards.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAccept}
            disabled={!isChecked}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
