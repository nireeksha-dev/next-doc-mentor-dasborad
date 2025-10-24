import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  MessageSquare, 
  Calendar, 
  Plus, 
  Grid3X3, 
  List,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockApi } from '@/mocks/api';

export function Mentees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [pathwayFilter, setPathwayFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const { data: mentees, isLoading } = useQuery({
    queryKey: ['mentees'],
    queryFn: mockApi.getMentees,
  });

  const filteredMentees = mentees?.filter((mentee: any) => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPathway = pathwayFilter === 'all' || mentee.pathway === pathwayFilter;
    const matchesRisk = riskFilter === 'all' || mentee.riskLevel === riskFilter;
    
    return matchesSearch && matchesPathway && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return CheckCircle2;
      default: return AlertCircle;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
          <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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
          <h1 className="text-3xl font-bold">Mentees</h1>
          <p className="text-muted-foreground mt-1">
            Manage your mentees across PLAB, NHS Job Ready, and Postgraduate pathways
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Mentee
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={pathwayFilter} onValueChange={setPathwayFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by pathway" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pathways</SelectItem>
                <SelectItem value="PLAB Preparation">PLAB Preparation</SelectItem>
                <SelectItem value="NHS Job Ready">NHS Job Ready</SelectItem>
                <SelectItem value="Postgraduate Training">Postgraduate Training</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {filteredMentees?.length || 0} mentees
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentees Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredMentees?.map((mentee: any, index: number) => {
            const RiskIcon = getRiskIcon(mentee.riskLevel);
            
            return (
              <motion.div
                key={mentee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg  hover:-translate-y-1  transition-all duration-300  cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentee.avatar} alt={mentee.name} />
                          <AvatarFallback>
                            {mentee.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sm">{mentee.name}</h3>
                          <p className="text-xs text-muted-foreground">{mentee.specialty}</p>
                        </div>
                      </div>
                      <Badge variant={getRiskColor(mentee.riskLevel)} className="flex items-center gap-1">
                        <RiskIcon className="h-3 w-3" />
                        {mentee.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Pathway</div>
                        <div className="font-medium">{mentee.pathway}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Trust</div>
                        <div className="font-medium text-xs">{mentee.trust}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>CV Readiness</span>
                        <span className="font-medium">{mentee.cvReadiness}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${mentee.cvReadiness}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div>
                        <div className="text-muted-foreground">InterviewSim</div>
                        <Badge variant="outline" className="text-xs">Band {mentee.interviewSimBand}</Badge>
                      </div>
                      <div>
                        <div className="text-muted-foreground">SponsorMatch</div>
                        <Badge variant="outline" className="text-xs">{mentee.sponsorMatchShortlist}</Badge>
                      </div>
                      <div>
                        <div className="text-muted-foreground">GapMap</div>
                        <Badge variant="outline" className="text-xs">{mentee.gapMapStage}</Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredMentees?.map((mentee: any, index: number) => {
                const RiskIcon = getRiskIcon(mentee.riskLevel);
                
                return (
                  <motion.div
                    key={mentee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mentee.avatar} alt={mentee.name} />
                        <AvatarFallback>
                          {mentee.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{mentee.name}</div>
                        <div className="text-sm text-muted-foreground">{mentee.pathway} • {mentee.specialty}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium">CV: {mentee.cvReadiness}%</div>
                        <div className="text-xs text-muted-foreground">Band {mentee.interviewSimBand}</div>
                      </div>

                      <Badge variant={getRiskColor(mentee.riskLevel)} className="flex items-center gap-1">
                        <RiskIcon className="h-3 w-3" />
                        {mentee.riskLevel}
                      </Badge>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredMentees?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No mentees found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or add a new mentee.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add First Mentee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}