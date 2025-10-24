import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Bell, Video, Shield, LogOut, FileText, CheckCircle, ExternalLink, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth';
import { MentorAgreementModal } from '@/components/legal/MentorAgreementModal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

export function Settings() {
  const { user, logout } = useAuthStore();
  const [emailDigest, setEmailDigest] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [legalConsents, setLegalConsents] = useState<any>(() => 
    JSON.parse(localStorage.getItem('mentor_legal_consents') || '{}')
  );

  // Calculate mentor badge tier and progress
  const sessionsCompleted = user?.sessionsCompleted || 0;
  const mentorTier = user?.mentorTier || 'Associate';
  
  const getMentorTierInfo = () => {
    if (sessionsCompleted < 50) {
      return {
        tier: 'Associate',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        nextTier: 'Senior',
        sessionsToNext: 50 - sessionsCompleted,
        progress: (sessionsCompleted / 50) * 100,
      };
    } else if (sessionsCompleted < 200) {
      return {
        tier: 'Senior',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        nextTier: 'Principal',
        sessionsToNext: 200 - sessionsCompleted,
        progress: ((sessionsCompleted - 50) / 150) * 100,
      };
    } else {
      return {
        tier: 'Principal',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200',
        nextTier: null,
        sessionsToNext: 0,
        progress: 100,
      };
    }
  };

  const tierInfo = getMentorTierInfo();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-full">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your mentor profile and preferences
          </p>
        </div>

        {/* Mentor Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Card className={`border-2 ${tierInfo.borderColor} ${tierInfo.bgColor}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className={`h-6 w-6 ${tierInfo.color}`} />
                Mentor Badge
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className={`${tierInfo.bgColor} ${tierInfo.color} ${tierInfo.borderColor}`}
                    >
                      {tierInfo.tier} Mentor
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">Based on total mentoring sessions completed</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Sessions Completed: {sessionsCompleted}
                  </span>
                  {tierInfo.nextTier && (
                    <span className="text-sm font-medium">
                      {tierInfo.sessionsToNext} sessions to {tierInfo.nextTier} Mentor
                    </span>
                  )}
                </div>
                <Progress value={tierInfo.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Associate</div>
                  <Badge 
                    variant={tierInfo.tier === 'Associate' ? 'default' : 'outline'}
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    0-49 sessions
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Senior</div>
                  <Badge 
                    variant={tierInfo.tier === 'Senior' ? 'default' : 'outline'}
                    className="bg-warning/10 text-warning border-warning/20"
                  >
                    50-199 sessions
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Principal</div>
                  <Badge 
                    variant={tierInfo.tier === 'Principal' ? 'default' : 'outline'}
                    className="bg-purple-100 text-purple-600 border-purple-200"
                  >
                    200+ sessions
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'SM'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialties">Specialties</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user?.specialties?.map((specialty) => (
                      <Badge key={specialty} variant="outline">{specialty}</Badge>
                    ))}
                    <Button variant="outline" size="sm">+ Add Specialty</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell mentees about your experience..."
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set your weekly availability for session scheduling (Europe/London timezone)
                </p>
                
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <Label className="w-20">{day}</Label>
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="09:00" className="w-20 p-2" />
                      <span className="text-muted-foreground">to</span>
                      <Input type="time" defaultValue="17:00" className="w-20 p-2" />
                      <Switch />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Digest</Label>
                    <p className="text-xs text-muted-foreground">Daily summary</p>
                  </div>
                  <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Report</Label>
                    <p className="text-xs text-muted-foreground">Performance overview</p>
                  </div>
                  <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Meeting Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Meeting Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Google Meet</strong> (Default)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sessions require manual Google Meet link paste.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legal & Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Legal & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Manage your agreements and consents
                </p>

                {/* Mentor Agreement Row */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium text-sm">Mentor Agreement v1.0</span>
                    </div>
                    {legalConsents?.mentor_agreement?.status === 'accepted' ? (
                      <div className="flex items-center gap-2 text-xs text-success">
                        <CheckCircle className="h-3 w-3" />
                        Accepted: {formatDate(legalConsents.mentor_agreement.timestamp)}
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">Not accepted</Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAgreementModal(true)}
                  >
                    {legalConsents?.mentor_agreement?.status === 'accepted' ? 'View' : 'Accept'}
                  </Button>
                </div>

                {/* Instagram Addendum Row */}
                <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span className="font-medium text-sm">Instagram Content Addendum</span>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Coming Q1 2026</div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Learn More
                  </Button>
                </div>

                {/* External Links */}
                <div className="pt-3 border-t space-y-2">
                  <a 
                    href="#" 
                    className="flex items-center justify-between text-sm hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>Privacy Notice</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-between text-sm hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>Code of Conduct</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-between text-sm hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>Cookie Policy</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4">
                <Button
                  variant="destructive"
                  onClick={logout}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Legal Agreement Modal */}
      <MentorAgreementModal 
        open={showAgreementModal}
        onOpenChange={setShowAgreementModal}
        onAccept={() => {
          setLegalConsents(JSON.parse(localStorage.getItem('mentor_legal_consents') || '{}'));
        }}
      />
      </div>
    </TooltipProvider>
  );
}