/**
 * Earnings Page
 * 
 * Displays mentor earnings with detailed breakdown table, monthly trend chart,
 * and CSV export functionality.
 * 
 * **Data Source**: 
 * - Phase 1: `mockApi.getEarnings()` (simulated 400ms latency)
 * - Phase 2+: Replace with `api.get('/mentor/earnings')`
 * 
 * **Features**:
 * - Summary cards (This Month, Next Payout, Lifetime Earnings)
 * - Interactive Recharts LineChart showing monthly trend
 * - Export CSV with timestamp filename (client-side only in Phase 1)
 * - "Download Statement" placeholder (shows toast, no PDF yet)
 * - Detailed transaction table with status badges
 * 
 * **NHS Compliance**: 
 * Footer displays Stripe fee breakdown (3% + £0.20) for tax transparency.
 * All amounts shown are net of processing fees.
 * 
 * @see src/mocks/api.ts - Mock data structure
 * @see docs/API_INTEGRATION.md - Backend endpoint specification
 * @see src/lib/csv-export.ts - CSV generation utility
 */

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Wallet, FileDown, FileSpreadsheet, Mail, Calendar, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockApi } from '@/mocks/api';
import { downloadCSV } from '@/lib/csv-export';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Earnings() {
  const { toast } = useToast();
  const { data: earnings, isLoading } = useQuery({
    queryKey: ['earnings'],
    queryFn: mockApi.getEarnings,
  });

  const handleDownloadStatement = () => {
    toast({
      title: 'Statement Download',
      description: 'Statement downloads coming soon. Contact finance@nextdocuk.com for detailed records.',
    });
  };

  const handleExportCSV = () => {
    if (!earnings?.history) return;
    
    const csvData = earnings.history.map(item => ({
      Date: new Date(item.date).toLocaleDateString('en-GB'),
      Type: item.type,
      'Session Type': item.sessionType,
      'Mentor Fee': `£${item.mentorFee.toFixed(2)}`,
      'Platform Fee': `£${item.platformFee.toFixed(2)}`,
      'Processing Fee': `£${item.processingFee.toFixed(2)}`,
      'Net Amount': `£${item.netAmount.toFixed(2)}`,
      Status: item.status,
    }));
    
    downloadCSV(csvData, 'earnings');
    
    toast({
      title: 'CSV Export Complete',
      description: `earnings_${new Date().toISOString().split('T')[0]}.csv downloaded successfully.`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Wallet className="h-8 w-8 text-primary" />
            Earnings
          </h1>
          <p className="text-muted-foreground mt-1">
            Your mentoring performance, engagement, and payouts at a glance
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="mailto:finance@nextdocuk.com">
            <Mail className="h-4 w-4 mr-2" />
            Contact Finance
          </a>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                £{earnings?.summary.thisMonth.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  3 Sessions
                </Badge>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                £{earnings?.summary.nextPayout.amount.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Scheduled: {new Date(earnings?.summary.nextPayout.date || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <Badge className="mt-2 bg-success/10 text-success border-success/20">
                On Track
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Lifetime Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                £{earnings?.summary.lifetime.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Since joining NextDoc UK
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Earnings Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earnings?.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `£${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`£${value.toFixed(2)}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sessions"
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="instagram" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Instagram"
                  dot={{ fill: 'hsl(var(--success))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Earnings Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Earnings Breakdown</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadStatement}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportCSV}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Session Type</TableHead>
                  <TableHead className="text-right">Mentor Fee</TableHead>
                  <TableHead className="text-right">Platform Fee</TableHead>
                  <TableHead className="text-right">Processing</TableHead>
                  <TableHead className="text-right">Net Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings?.history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {new Date(item.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sessionType}</TableCell>
                    <TableCell className="text-right">£{item.mentorFee.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      £{item.platformFee.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      £{item.processingFee.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      £{item.netAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === 'Paid' ? 'default' : 'secondary'}
                        className={
                          item.status === 'Paid' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : 'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Notice */}
      <Card className="border-warning/20 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-warning-foreground">
                All earnings shown are net of Stripe processing fees (3% + £0.20 per transaction).
              </p>
              <p className="text-muted-foreground">
                Payments processed monthly by Stripe under NDG UK Ltd (Company No. 12345678).
                For detailed payout records or questions, contact finance@nextdocuk.com.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
