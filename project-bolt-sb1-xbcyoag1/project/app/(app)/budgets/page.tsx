'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  PieChart,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const budgets = [
  { id: '1', name: 'Food & Dining', category: 'Food', budget: 500, spent: 420, color: '#ef4444' },
  { id: '2', name: 'Transportation', category: 'Transport', budget: 200, spent: 180, color: '#f97316' },
  { id: '3', name: 'Shopping', category: 'Shopping', budget: 300, spent: 350, color: '#eab308' },
  { id: '4', name: 'Entertainment', category: 'Entertainment', budget: 150, spent: 95, color: '#06b6d4' },
  { id: '5', name: 'Bills & Utilities', category: 'Bills', budget: 400, spent: 280, color: '#22c55e' },
  { id: '6', name: 'Healthcare', category: 'Medical', budget: 200, spent: 45, color: '#f43f5e' },
];

const categories = [
  { id: '1', name: 'Food', icon: '🍽️' },
  { id: '2', name: 'Transport', icon: '🚗' },
  { id: '3', name: 'Shopping', icon: '🛍️' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Bills', icon: '📄' },
  { id: '6', name: 'Medical', icon: '❤️' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BudgetsPage() {
  const [addBudgetOpen, setAddBudgetOpen] = useState(false);

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const getStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return { status: 'exceeded', icon: AlertTriangle, color: 'text-red-500' };
    if (percentage >= 80) return { status: 'warning', icon: AlertTriangle, color: 'text-yellow-500' };
    return { status: 'good', icon: CheckCircle, color: 'text-green-500' };
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
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">Plan and track your spending limits</p>
        </div>
        <Dialog open={addBudgetOpen} onOpenChange={setAddBudgetOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-lg shadow-primary/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Budget Name</Label>
                <Input id="name" placeholder="e.g., Monthly Food Budget" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-4" onClick={() => setAddBudgetOpen(false)}>
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Overview Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Monthly Budget</p>
                  <p className="text-3xl font-bold">${totalBudget.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Spent</p>
                <p className="text-2xl font-semibold">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{overallPercentage.toFixed(1)}% used</span>
                <span>${(totalBudget - totalSpent).toLocaleString()} remaining</span>
              </div>
              <Progress value={overallPercentage} className="h-3 bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const statusInfo = getStatus(budget.spent, budget.budget);
          const StatusIcon = statusInfo.icon;
          const remaining = budget.budget - budget.spent;

          return (
            <Card key={budget.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${budget.color}20` }}
                    >
                      <Target className="w-5 h-5" style={{ color: budget.color }} />
                    </div>
                    <div>
                      <p className="font-semibold">{budget.name}</p>
                      <p className="text-xs text-muted-foreground">{budget.category}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Spent</span>
                    <span className="font-semibold">${budget.spent.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className="h-2"
                    style={{
                      background: `${budget.color}20`,
                    }}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {percentage >= 100 ? (
                        <span className="text-red-500 font-medium">
                          Exceeded by ${(Math.abs(remaining)).toLocaleString()}
                        </span>
                      ) : (
                        <>${remaining.toLocaleString()} left</>
                      )}
                    </span>
                    <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {percentage >= 80 && percentage < 100 && (
                  <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Almost at limit! Consider reducing spending.
                    </p>
                  </div>
                )}

                {percentage >= 100 && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900">
                    <p className="text-xs text-red-700 dark:text-red-400">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Budget exceeded! Review your spending.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
