import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Download, 
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockApi } from '@/mocks/api';

export function Analytics() {
  const [selectedMentee, setSelectedMentee] = useState('mentee-1');
  const [timeRange, setTimeRange] = useState('6months');

  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: mockApi.getAnalytics,
  });

  const cvProgressData = [
    { month: 'Jan', readiness: 45 },
    { month: 'Feb', readiness: 52 },
    { month: 'Mar', readiness: 61 },
    { month: 'Apr', readiness: 68 },
    { month: 'May', readiness: 75 },
    { month: 'Jun', readiness: 78 },
  ];

  const interviewProgressData = [
    { month: 'Jan', band: 3 },
    { month: 'Feb', band: 4 },
    { month: 'Mar', band: 5 },
    { month: 'Apr', band: 6 },
    { month: 'May', band: 6 },
    { month: 'Jun', band: 7 },
  ];

  const cohortData = [
    { product: 'CVPro™', score: 73, change: '+5%' },
    { product: 'InterviewSim+™', score: 15, change: '+12%' },
    { product: 'SponsorMatch™', score: 82, change: '+3%' },
    { product: 'GapMap™', score: 68, change: '+8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track mentee progress and cohort performance across all NextDoc UK products
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cohortData.map((item, index) => (
          <motion.div
            key={item.product}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.product}
                  </Badge>
                  <Badge variant="success" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {item.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{item.score}{item.product.includes('InterviewSim') ? '' : '%'}</div>
                <div className="text-sm text-muted-foreground">
                  {item.product.includes('CVPro') && 'Avg CV Readiness'}
                  {item.product.includes('InterviewSim') && 'Avg Improvement'}
                  {item.product.includes('SponsorMatch') && '% Visa Cleared'}
                  {item.product.includes('GapMap') && '% On Track'}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Individual Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Individual Progress
            </CardTitle>
            <Select value={selectedMentee} onValueChange={setSelectedMentee}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mentee-1">Dr. Sarah Chen</SelectItem>
                <SelectItem value="mentee-2">Dr. Ahmed Hassan</SelectItem>
                <SelectItem value="mentee-3">Dr. Priya Sharma</SelectItem>
                <SelectItem value="mentee-4">Dr. James Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CV Readiness Trend */}
            <div>
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-product-cvpro"></div>
                CV Readiness Progress
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={cvProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'CV Readiness']} />
                  <Line 
                    type="monotone" 
                    dataKey="readiness" 
                    stroke="hsl(var(--product-cvpro))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--product-cvpro))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* InterviewSim Band Progress */}
            <div>
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-product-interviewsim"></div>
                InterviewSim+™ Band Progress
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={interviewProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 9]} />
                  <Tooltip formatter={(value) => [`Band ${value}`, 'Interview Band']} />
                  <Bar 
                    dataKey="band" 
                    fill="hsl(var(--product-interviewsim))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cohort Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SponsorMatch™ Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Shortlist per Mentee</span>
              <Badge variant="outline">7.2</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Visa Eligibility Cleared</span>
              <Badge variant="success">82%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Trust Match Success</span>
              <Badge variant="success">76%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">GapMap™ Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">On Track</span>
              <Badge variant="success">68%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Needs Review</span>
              <Badge variant="warning">22%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Behind Schedule</span>
              <Badge variant="destructive">10%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sessions Completed</span>
              <Badge variant="outline">24</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reviews Submitted</span>
              <Badge variant="outline">47</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Messages Sent</span>
              <Badge variant="outline">156</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}