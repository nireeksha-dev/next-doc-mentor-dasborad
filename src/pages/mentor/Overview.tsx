/**
 * Overview Page (Main Mentor Dashboard)
 * 
 * Central hub for mentors showing:
 * - Today's scheduled sessions with Google Meet links
 * - Task queue counts across all products (CVPro, InterviewSim+, SponsorMatch, GapMap)
 * - Unread message threads with mentees
 * - Next payout summary
 * - At-risk mentees requiring immediate attention
 * 
 * **Data Source**: 
 * - Phase 1: `mockApi.getOverview()` 
 * - Phase 2+: Replace with `api.get('/mentor/overview')`
 * 
 * **Quick Actions**:
 * - New Session: Opens session creation modal (placeholder in Phase 1)
 * - New Task: Opens task creation form (placeholder in Phase 1)
 * - Write Note: Opens note editor (placeholder in Phase 1)
 * 
 * **Risk Indicators**:
 * - High Risk badge (red): CV readiness <30%, no activity in 14+ days
 * - Medium Risk badge (amber): CV readiness 30-60%, limited progress
 * - Low Risk badge (green): On track, active engagement
 * 
 * @see src/mocks/api.ts - Mock data structure
 * @see docs/API_INTEGRATION.md - Backend endpoint specification
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  AlertTriangle, 
  Plus,
  ExternalLink,
  FileText,
  Video,
  Edit3,
  Wallet,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/mocks/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function Overview() {
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [growthInsightsOpen, setGrowthInsightsOpen] = useState(false);
  
  const { data: overview, isLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: mockApi.getOverview,
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground mt-1">
            NextDoc UK Mentor Dashboard - {new Date().toLocaleDateString('en-GB', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
          <Button variant="outline" size="sm">
            <CheckSquare className="h-4 w-4 mr-2" />
            New Task
          </Button>
          <Button size="sm">
            <Edit3 className="h-4 w-4 mr-2" />
            Write Note
          </Button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Today's Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Sessions
              </CardTitle>
              <Badge variant="secondary">{overview?.todaysSessions?.length || 0}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {overview?.todaysSessions?.length ? (
                overview.todaysSessions.map((session: any) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{session.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.startTime).toLocaleTimeString('en-GB', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} - {new Date(session.endTime).toLocaleTimeString('en-GB', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => window.open(session.googleMeetLink, '_blank', 'noopener')}
                      className="flex items-center gap-1"
                    >
                      <Video className="h-3 w-3" />
                      Join Meet
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No sessions scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* My Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-product-cvpro" />
                My Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-product-cvpro/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-product-cvpro">
                    {overview?.queueCounts?.cvproReviews || 0}
                  </div>
                  <div className="text-xs font-medium">CVPro™ Reviews</div>
                </div>
                <div className="bg-product-interviewsim/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-product-interviewsim">
                    {overview?.queueCounts?.interviewsimFeedback || 0}
                  </div>
                  <div className="text-xs font-medium">InterviewSim+™</div>
                </div>
                <div className="bg-product-sponsormatch/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-product-sponsormatch">
                    {overview?.queueCounts?.sponsormatchReviews || 0}
                  </div>
                  <div className="text-xs font-medium">SponsorMatch™</div>
                </div>
                <div className="bg-product-gapmap/10 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-product-gapmap">
                    {overview?.queueCounts?.gapmapCheckpoints || 0}
                  </div>
                  <div className="text-xs font-medium">GapMap™</div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">General Tasks</span>
                  <Badge variant="outline">{overview?.queueCounts?.generalTasks || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Unread Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-1">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Messages
              </CardTitle>
              <Badge variant="destructive">{overview?.unreadMessages?.length || 0} unread</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {overview?.unreadMessages?.length ? (
                overview.unreadMessages.map((thread: any) => (
                  <div key={thread.id} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium">Mentee {thread.menteeId.replace('mentee-', '')}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {thread.lastMessage.content}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(thread.lastMessage.timestamp).toLocaleString('en-GB')}
                      </div>
                    </div>
                    {thread.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-6 w-6 rounded-full p-2 text-xs">
                        {thread.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">All messages read</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Payout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Next Payout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">This Month Earned</div>
                <div className="text-2xl font-bold text-primary">£202.40</div>
              </div>
              <div className="space-y-1 pt-2 border-t">
                <div className="text-sm text-muted-foreground">Next Payout</div>
                <div className="text-xl font-bold">£145.60</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Scheduled: 30 Oct 2025
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                On Track
              </Badge>
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowBreakdownModal(true)}
                >
                  View Breakdown
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/mentor/earnings">
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* At-Risk Mentees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2 xl:col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                At-Risk Mentees
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overview?.atRiskMentees?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {overview.atRiskMentees.map((mentee: any) => (
                    <div key={mentee.id} className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{mentee.name}</div>
                        <Badge variant="destructive" className="text-xs">High Risk</Badge>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div>CV Readiness: {mentee.cvReadiness}%</div>
                        <div>InterviewSim: Band {mentee.interviewSimBand}</div>
                        <div>Last Activity: {new Date(mentee.lastActivity).toLocaleDateString('en-GB')}</div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Calendar className="h-3 w-3 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-success opacity-30" />
                  <p className="text-sm">All mentees are on track</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Mentor Growth Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:col-span-2 xl:col-span-4"
        >
          <Collapsible open={growthInsightsOpen} onOpenChange={setGrowthInsightsOpen}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      Mentor Growth Insights
                    </CardTitle>
                    {growthInsightsOpen ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sessions */}
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Sessions</div>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                      <div className="text-3xl font-bold">24</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          +12% vs Sept
                        </Badge>
                      </div>
                    </div>

                    {/* Mentees */}
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Mentees</div>
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">18</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          +3 new
                        </Badge>
                      </div>
                    </div>

                    {/* Earnings */}
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Earnings</div>
                        <Wallet className="h-4 w-4 text-success" />
                      </div>
                      <div className="text-3xl font-bold">£202.40</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          +8% vs Sept
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </motion.div>
      </div>

      {/* Earnings Breakdown Modal */}
      <Dialog open={showBreakdownModal} onOpenChange={setShowBreakdownModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Earnings Breakdown</DialogTitle>
            <DialogDescription>
              Detailed view of your earnings sources for this month
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Mentorship Sessions</TableCell>
                  <TableCell className="text-right font-semibold">£180.00</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    3 sessions completed
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Instagram Content</TableCell>
                  <TableCell className="text-right font-semibold">£22.40</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    2,240 views
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">General Tasks</TableCell>
                  <TableCell className="text-right font-semibold">£43.20</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    CV reviews, feedback
                  </TableCell>
                </TableRow>
                <TableRow className="border-t-2">
                  <TableCell className="font-bold">Total This Month</TableCell>
                  <TableCell className="text-right font-bold text-lg text-primary">
                    £202.40
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">Next Payout</TableCell>
                  <TableCell className="text-right font-semibold">£145.60</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    Scheduled: 30 Oct 2025
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBreakdownModal(false)}>
              Close
            </Button>
            <Button asChild>
              <Link to="/mentor/earnings">
                Go to Earnings Page
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}