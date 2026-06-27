'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  TrendingUp,
  PiggyBank,
  Filter,
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
import { format } from 'date-fns';

const notifications = [
  {
    id: '1',
    type: 'budget_alert',
    title: 'Budget Warning: Shopping',
    message: 'You have exceeded your shopping budget by $50. Consider reducing further spending.',
    timestamp: new Date(2024, 0, 15, 10, 30),
    read: false,
    severity: 'high',
  },
  {
    id: '2',
    type: 'insight',
    title: 'AI Insight: Food Spending',
    message: 'Your food expenses increased by 22% compared to last month. This is mainly from restaurant dining.',
    timestamp: new Date(2024, 0, 15, 9, 0),
    read: false,
    severity: 'medium',
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Upcoming Payment',
    message: 'Your Netflix subscription ($15.99) renews in 3 days. Make sure you have sufficient funds.',
    timestamp: new Date(2024, 0, 14, 18, 45),
    read: true,
    severity: 'low',
  },
  {
    id: '4',
    type: 'budget_alert',
    title: 'Budget Alert: Transportation',
    message: 'You have used 90% of your transportation budget. $20 remaining for this month.',
    timestamp: new Date(2024, 0, 14, 12, 0),
    read: true,
    severity: 'medium',
  },
  {
    id: '5',
    type: 'insight',
    title: 'Savings Potential',
    message: 'Based on your spending patterns, you could save an additional $200/month by optimizing subscriptions.',
    timestamp: new Date(2024, 0, 13, 15, 30),
    read: true,
    severity: 'low',
  },
  {
    id: '6',
    type: 'reminder',
    title: 'Weekly Summary Ready',
    message: 'Your weekly financial summary is ready. You saved 15% more than last week!',
    timestamp: new Date(2024, 0, 12, 8, 0),
    read: true,
    severity: 'low',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationStyle = (type: string, severity: string) => {
    if (type === 'budget_alert') {
      return {
        bg: severity === 'high' ? 'bg-red-50 dark:bg-red-950/30' : 'bg-yellow-50 dark:bg-yellow-950/30',
        border: severity === 'high' ? 'border-red-200 dark:border-red-900' : 'border-yellow-200 dark:border-yellow-900',
        icon: AlertTriangle,
        iconColor: severity === 'high' ? 'text-red-500' : 'text-yellow-500',
      };
    }
    if (type === 'insight') {
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200 dark:border-blue-900',
        icon: TrendingUp,
        iconColor: 'text-blue-500',
      };
    }
    return {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-900',
      icon: Bell,
      iconColor: 'text-green-500',
    };
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
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your financial alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
              <SelectItem value="budget_alert">Budget Alerts</SelectItem>
              <SelectItem value="insight">AI Insights</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'budget_alert').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filteredNotifications.map((notification) => {
          const style = getNotificationStyle(notification.type, notification.severity);
          const Icon = style.icon;

          return (
            <motion.div
              key={notification.id}
              variants={itemVariants}
              className={`relative rounded-xl border p-4 ${style.bg} ${style.border} ${
                !notification.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center flex-shrink-0 ${style.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(notification.timestamp, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
