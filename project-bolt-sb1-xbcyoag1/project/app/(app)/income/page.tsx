'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

const incomeSources = [
  { id: '1', name: 'Salary', icon: '💼', color: '#22c55e' },
  { id: '2', name: 'Freelancing', icon: '💻', color: '#3b82f6' },
  { id: '3', name: 'Business', icon: '🏢', color: '#8b5cf6' },
  { id: '4', name: 'Bonus', icon: '🎁', color: '#f59e0b' },
  { id: '5', name: 'Investments', icon: '📈', color: '#10b981' },
  { id: '6', name: 'Others', icon: '💰', color: '#6b7280' },
];

const sampleIncome = [
  { id: '1', source: 'Salary', description: 'Monthly Salary', amount: 5500, date: '2024-01-01', recurring: true },
  { id: '2', source: 'Freelancing', description: 'Web Development Project', amount: 1200, date: '2024-01-10', recurring: false },
  { id: '3', source: 'Investments', description: 'Dividend Income', amount: 150, date: '2024-01-15', recurring: true },
  { id: '4', source: 'Bonus', description: 'Performance Bonus', amount: 500, date: '2024-01-20', recurring: false },
  { id: '5', source: 'Freelancing', description: 'Logo Design', amount: 300, date: '2024-01-22', recurring: false },
  { id: '6', source: 'Salary', description: 'Monthly Salary', amount: 5500, date: '2024-02-01', recurring: true },
];

const monthlyTrend = [
  { name: 'Jan', income: 7150 },
  { name: 'Feb', income: 5650 },
  { name: 'Mar', income: 6200 },
  { name: 'Apr', income: 7400 },
  { name: 'May', income: 5800 },
  { name: 'Jun', income: 6100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IncomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const filteredIncome = sampleIncome.filter((income) => {
    const matchesSearch = income.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === 'all' || income.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const totalIncome = filteredIncome.reduce((sum, inc) => sum + inc.amount, 0);

  const getSourceColor = (sourceName: string) => {
    const source = incomeSources.find((s) => s.name === sourceName);
    return source?.color || '#6b7280';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Income</h1>
          <p className="text-muted-foreground">Track all your income sources</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/income/add">
            <Button className="shadow-lg shadow-primary/25 bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Income
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <Card className="stat-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalIncome.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>+15.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Monthly Average</p>
            <p className="text-2xl font-bold">${(totalIncome / 2).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Recurring</p>
            <p className="text-2xl font-bold">${(5500 + 150).toLocaleString()}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Income Trend Chart */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Income Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="incomeGradientLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="name" className="text-xs" tickLine={false} axisLine={false} />
                  <YAxis className="text-xs" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search income..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {incomeSources.map((source) => (
                    <SelectItem key={source.id} value={source.name}>
                      <div className="flex items-center gap-2">
                        <span>{source.icon}</span>
                        <span>{source.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Income Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncome.map((income) => (
                <TableRow key={income.id} className="group">
                  <TableCell>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: `${getSourceColor(income.source)}20`,
                        color: getSourceColor(income.source),
                      }}
                    >
                      {income.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{income.description}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(income.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {income.recurring ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800">
                        Recurring
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">One-time</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    +${income.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
