'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Award,
  TrendingUp,
  PiggyBank,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const achievements = [
  { id: '1', name: 'First Budget', description: 'Created your first budget', icon: Target, earned: true, date: '2024-01-01' },
  { id: '2', name: 'Savings Starter', description: 'Saved $1,000 in a month', icon: PiggyBank, earned: true, date: '2024-02-15' },
  { id: '3', name: 'Expense Tracker', description: 'Logged 100 expenses', icon: TrendingUp, earned: true, date: '2024-03-20' },
  { id: '4', name: 'Financial Guru', description: 'Saved $10,000 total', icon: Award, earned: false, progress: 65 },
];

const stats = {
  memberSince: 'January 2024',
  totalTransactions: 248,
  totalSaved: 8500,
  streakDays: 45,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400" />
          <CardContent className="relative pt-16 pb-6">
            <div className="absolute -top-12 left-6">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=200" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ml-28">
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> john@example.com
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> San Francisco, CA
                  </span>
                  <Badge variant="secondary" className="mt-1 sm:mt-0">Pro Member</Badge>
                </div>
              </div>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>
                    <Button className="w-full" onClick={() => setEditOpen(false)}>
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.streakDays}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.totalTransactions}</p>
            <p className="text-xs text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">${stats.totalSaved.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.memberSince.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">Member Since</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-800'
                        : 'bg-muted/50 border-border opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                      achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="font-semibold">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                    {achievement.earned ? (
                      <p className="text-xs text-green-600 mt-2">Earned {achievement.date}</p>
                    ) : (
                      <div className="mt-2 space-y-1">
                        <Progress value={achievement.progress} className="h-1" />
                        <p className="text-xs text-muted-foreground">{achievement.progress}% complete</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Goals */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Financial Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">Emergency Fund</p>
                  <p className="text-sm text-muted-foreground">Save $10,000 for emergencies</p>
                </div>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <Progress value={65} className="h-2 mt-3" />
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-muted-foreground">$6,500 saved</span>
                <span className="font-medium">65%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">Vacation Fund</p>
                  <p className="text-sm text-muted-foreground">Save $3,000 for a trip</p>
                </div>
                <Badge variant="default">Completed</Badge>
              </div>
              <Progress value={100} className="h-2 mt-3" />
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-muted-foreground">$3,000 saved</span>
                <span className="font-medium text-green-600">Goal Reached!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
