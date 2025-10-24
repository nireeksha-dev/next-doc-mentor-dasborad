import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Video, 
  Clock, 
  Users, 
  ExternalLink, 
  Edit, 
  CheckCircle2, 
  XCircle,
  Target,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApi } from '@/mocks/api';

export function Sessions() {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: mockApi.getSessions,
  });

  const createSessionMutation = useMutation({
    mutationFn: mockApi.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'CV Clinic': return 'product-cvpro';
      case 'Interview Drill': return 'product-interviewsim';
      case 'Career Consult': return 'product-sponsormatch';
      case 'GapMap Review': return 'product-gapmap';
      default: return 'muted';
    }
  };

  const formatSessionTime = (startTime: Date, endTime: Date) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return {
      date: start.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: `${start.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })} - ${end.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`
    };
  };

  const isSessionToday = (sessionDate: Date) => {
    const today = new Date();
    const session = new Date(sessionDate);
    return today.toDateString() === session.toDateString();
  };

  const isSessionUpcoming = (sessionDate: Date) => {
    const now = new Date();
    const session = new Date(sessionDate);
    return session > now;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-40 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sessions</h1>
          <p className="text-muted-foreground mt-1">
            Manage your mentoring sessions with Google Meet integration
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <TabsList>
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="day">Day View</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* Sessions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {sessions?.filter((s: any) => isSessionToday(s.startTime)).length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Today's Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {sessions?.filter((s: any) => isSessionUpcoming(s.startTime)).length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-product-cvpro/10 flex items-center justify-center">
                <Video className="h-5 w-5 text-product-cvpro" />
              </div>
              <div>
                <div className="text-2xl font-bold">{sessions?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions?.map((session: any, index: number) => {
          const timeInfo = formatSessionTime(session.startTime, session.endTime);
          const isUpcoming = isSessionUpcoming(session.startTime);
          const isToday = isSessionToday(session.startTime);
          
          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline"
                          className={`bg-${getSessionTypeColor(session.type)}/10 text-${getSessionTypeColor(session.type)}`}
                        >
                          {session.type}
                        </Badge>
                        {isToday && (
                          <Badge variant="success" className="text-xs">
                            Today
                          </Badge>
                        )}
                        {isUpcoming && !isToday && (
                          <Badge variant="outline" className="text-xs">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {timeInfo.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4" />
                          {timeInfo.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      
                      {isUpcoming && (
                        <Button 
                          size="sm"
                          onClick={() => window.open(session.googleMeetLink, '_blank', 'noopener')}
                          className="flex items-center gap-1"
                        >
                          <Video className="h-3 w-3" />
                          Join Meet
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Mentees */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      Mentees ({session.menteeIds?.length || 0})
                    </div>
                    <div className="flex items-center gap-2">
                      {session.menteeIds?.map((menteeId: string) => (
                        <div key={menteeId} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              M{menteeId.replace('mentee-', '')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Mentee {menteeId.replace('mentee-', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Objectives */}
                  {session.objectives && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Target className="h-4 w-4" />
                        Objectives
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {session.objectives}
                      </p>
                    </div>
                  )}

                  {/* Google Meet Link */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Video className="h-4 w-4" />
                      Meeting Link
                    </div>
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                      <span className="text-sm font-mono text-muted-foreground truncate">
                        {session.googleMeetLink}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(session.googleMeetLink)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Mark Attended
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <XCircle className="h-3 w-3 mr-1" />
                      No-show
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {sessions?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No sessions scheduled</h3>
            <p className="text-muted-foreground mb-4">
              Create your first mentoring session with Google Meet integration.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule First Session
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}