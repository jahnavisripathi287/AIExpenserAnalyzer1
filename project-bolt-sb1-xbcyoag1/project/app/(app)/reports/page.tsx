'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Mail,
  Printer,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlySummary = [
  { month: 'January', income: 5500, expenses: 4200, savings: 1300, transactions: 48 },
  { month: 'February', income: 5200, expenses: 3800, savings: 1400, transactions: 42 },
  { month: 'March', income: 5800, expenses: 4500, savings: 1300, transactions: 55 },
  { month: 'April', income: 4900, expenses: 3200, savings: 1700, transactions: 38 },
  { month: 'May', income: 6100, expenses: 4800, savings: 1300, transactions: 52 },
  { month: 'June', income: 5500, expenses: 4100, savings: 1400, transactions: 45 },
];

const reportTemplates = [
  { id: 'monthly', name: 'Monthly Summary', icon: FileText, description: 'Complete monthly financial overview' },
  { id: 'quarterly', name: 'Quarterly Report', icon: FileSpreadsheet, description: '3-month financial analysis' },
  { id: 'yearly', name: 'Annual Report', icon: Calendar, description: 'Year-end financial summary' },
  { id: 'category', name: 'Category Report', icon: PieChart, description: 'Breakdown by spending category' },
];

const chartData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 4500 },
  { name: 'Apr', value: 3200 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 4100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [reportType, setReportType] = useState('monthly');

  const totalIncome = monthlySummary.reduce((sum, m) => sum + m.income, 0);
  const totalExpenses = monthlySummary.reduce((sum, m) => sum + m.expenses, 0);
  const totalSavings = monthlySummary.reduce((sum, m) => sum + m.savings, 0);

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
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and export financial reports</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Quick Export Buttons */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Download className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold">Export PDF</p>
              <p className="text-xs text-muted-foreground">Professional format</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-5 h-5 text-green-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold">Export CSV</p>
              <p className="text-xs text-muted-foreground">Spreadsheet format</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Mail className="w-5 h-5 text-purple-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold">Email Report</p>
              <p className="text-xs text-muted-foreground">Send to inbox</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Printer className="w-5 h-5 text-orange-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold">Print Report</p>
              <p className="text-xs text-muted-foreground">Hard copy</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-3xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Net Savings</p>
            <p className="text-3xl font-bold text-blue-600">${totalSavings.toLocaleString()}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Trend Chart */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Summary Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Monthly Summary</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Download
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Download CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Income</TableHead>
                  <TableHead className="text-right">Expenses</TableHead>
                  <TableHead className="text-right">Savings</TableHead>
                  <TableHead className="text-right">Transactions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlySummary.map((month) => (
                  <TableRow key={month.month}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell className="text-right text-green-600">
                      +${month.income.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -${month.expenses.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-blue-600">
                      ${month.savings.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{month.transactions}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Templates */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 rounded-xl border hover:border-primary hover:bg-muted/50 cursor-pointer transition-all"
                >
                  <template.icon className="w-8 h-8 text-primary mb-3" />
                  <p className="font-semibold">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
