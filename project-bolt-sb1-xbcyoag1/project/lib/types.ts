export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          currency: string;
          timezone: string;
          language: string;
          theme: string;
          notifications_enabled: boolean;
          email_notifications: boolean;
          push_notifications: boolean;
          monthly_budget: number;
          financial_goal: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
          timezone?: string;
          language?: string;
          theme?: string;
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          push_notifications?: boolean;
          monthly_budget?: number;
          financial_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
          timezone?: string;
          language?: string;
          theme?: string;
          notifications_enabled?: boolean;
          email_notifications?: boolean;
          push_notifications?: boolean;
          monthly_budget?: number;
          financial_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          type: 'expense' | 'income';
          icon: string | null;
          color: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          type: 'expense' | 'income';
          icon?: string | null;
          color?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          type?: 'expense' | 'income';
          icon?: string | null;
          color?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          amount: number;
          description: string | null;
          merchant: string | null;
          notes: string | null;
          tags: string[] | null;
          payment_method: string | null;
          location: string | null;
          receipt_url: string | null;
          date: string;
          is_recurring: boolean;
          recurring_frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          amount: number;
          description?: string | null;
          merchant?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          payment_method?: string | null;
          location?: string | null;
          receipt_url?: string | null;
          date?: string;
          is_recurring?: boolean;
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          amount?: number;
          description?: string | null;
          merchant?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          payment_method?: string | null;
          location?: string | null;
          receipt_url?: string | null;
          date?: string;
          is_recurring?: boolean;
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      income: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          amount: number;
          description: string | null;
          source: string | null;
          notes: string | null;
          tags: string[] | null;
          date: string;
          is_recurring: boolean;
          recurring_frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          amount: number;
          description?: string | null;
          source?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          date?: string;
          is_recurring?: boolean;
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          amount?: number;
          description?: string | null;
          source?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          date?: string;
          is_recurring?: boolean;
          recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      budgets: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          name: string;
          amount: number;
          period: 'daily' | 'weekly' | 'monthly' | 'yearly';
          start_date: string;
          end_date: string | null;
          alert_threshold: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          name: string;
          amount: number;
          period: 'daily' | 'weekly' | 'monthly' | 'yearly';
          start_date: string;
          end_date?: string | null;
          alert_threshold?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          name?: string;
          amount?: number;
          period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
          start_date?: string;
          end_date?: string | null;
          alert_threshold?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'budget_alert' | 'reminder' | 'insight' | 'warning' | 'info';
          is_read: boolean;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: 'budget_alert' | 'reminder' | 'insight' | 'warning' | 'info';
          is_read?: boolean;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'budget_alert' | 'reminder' | 'insight' | 'warning' | 'info';
          is_read?: boolean;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      ai_insights: {
        Row: {
          id: string;
          user_id: string;
          type: 'spending_summary' | 'recommendation' | 'prediction' | 'alert' | 'health_score';
          title: string;
          content: string;
          severity: 'low' | 'medium' | 'high' | null;
          metadata: Json | null;
          is_dismissed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'spending_summary' | 'recommendation' | 'prediction' | 'alert' | 'health_score';
          title: string;
          content: string;
          severity?: 'low' | 'medium' | 'high' | null;
          metadata?: Json | null;
          is_dismissed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'spending_summary' | 'recommendation' | 'prediction' | 'alert' | 'health_score';
          title?: string;
          content?: string;
          severity?: 'low' | 'medium' | 'high' | null;
          metadata?: Json | null;
          is_dismissed?: boolean;
          created_at?: string;
        };
      };
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          created_at?: string;
        };
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Expense = Database['public']['Tables']['expenses']['Row'];
export type Income = Database['public']['Tables']['income']['Row'];
export type Budget = Database['public']['Tables']['budgets']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type AiInsight = Database['public']['Tables']['ai_insights']['Row'];
export type ChatMessage = Database['public']['Tables']['chat_history']['Row'];

export interface ExpenseWithCategory extends Expense {
  category?: Category | null;
}

export interface IncomeWithCategory extends Income {
  category?: Category | null;
}

export interface BudgetWithCategory extends Budget {
  category?: Category | null;
  spent: number;
  remaining: number;
  percentage: number;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyBudget: number;
  budgetUsed: number;
  savingsRate: number;
  expenseChange: number;
  incomeChange: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
