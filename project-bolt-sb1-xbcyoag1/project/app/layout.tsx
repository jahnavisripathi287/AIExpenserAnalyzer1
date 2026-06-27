import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ExpenseAI - AI-Powered Personal Expense Tracker',
  description: 'Track expenses, manage budgets, and get AI-powered financial insights',
  openGraph: {
    title: 'ExpenseAI - AI-Powered Personal Expense Tracker',
    description: 'Track expenses, manage budgets, and get AI-powered financial insights',
    images: [
      {
        url: 'https://images.pexels.com/photo-1460920427454-489679d7b4be?w=1200',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://images.pexels.com/photo-1460920427454-489679d7b4be?w=1200',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
