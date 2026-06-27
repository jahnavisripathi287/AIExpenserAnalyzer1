'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  PiggyBank,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: TrendingUp, text: 'How much did I spend on food this month?' },
  { icon: PiggyBank, text: 'Give me budget recommendations' },
  { icon: AlertCircle, text: 'Any unusual spending patterns?' },
  { icon: Lightbulb, text: 'Tips to save more money' },
];

const sampleResponses: Record<string, string> = {
  food: "Based on your records, you've spent **$850 on food** this month. That's 22% higher than last month. Your top food expenses were:\n\n• Grocery Shopping - $420\n• Restaurant Dining - $280\n• Coffee & Snacks - $150\n\n💡 **Tip**: Consider meal prepping on weekends to reduce restaurant expenses by up to 40%.",
  budget: "Here are my **budget recommendations** for you:\n\n📋 **Current Budget Status:**\n• Food: 84% used ($420/$500)\n• Transport: 90% used ($180/$200)\n• Shopping: ⚠️ 117% used ($350/$300)\n\n💡 **Suggestions:**\n1. Your shopping budget needs adjustment - increase by $100 or cut back\n2. Consider consolidating subscriptions\n3. Set aside $200/week for groceries\n\nWould you like me to help you create a new budget?",
  unusual: "I detected **3 unusual spending patterns**:\n\n🔴 **High Alert:**\n• Shopping expenses increased by 47% this week\n• Multiple entertainment purchases on weekdays (unusual for you)\n\n🟡 **Moderate:**\n• Transportation costs doubled compared to average\n\n📊 **Insight:** You tend to spend more in the third week of each month. Consider setting budget alerts for this period.",
  save: "Here are **personalized saving tips** based on your spending:\n\n💰 **Quick Wins (Save $200/mo):**\n1. Cancel 2 unused subscriptions (-$30)\n2. Switch to a cheaper streaming plan (-$10)\n3. Use public transport twice a week (-$60)\n4. Reduce food delivery by 50% (-$100)\n\n📈 **Long-term Goals:**\n• Set up automatic savings transfer of $500/month\n• Create an emergency fund goal of $3,000\n• Consider a high-yield savings account\n\n🎯 **Your saving potential:** You can save **$5,800** this year with these changes!",
  default: "I'm your AI financial assistant! I can help you with:\n\n• 📊 Spending analysis and insights\n• 💰 Budget recommendations\n• 🔔 Unusual spending alerts\n• 💡 Personalized saving tips\n• 📈 Financial predictions\n\nJust ask me anything about your finances!",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI financial assistant. I can help you understand your spending, create budgets, and find ways to save more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
      return sampleResponses.food;
    }
    if (lowerMessage.includes('budget') || lowerMessage.includes('recommend')) {
      return sampleResponses.budget;
    }
    if (lowerMessage.includes('unusual') || lowerMessage.includes('pattern') || lowerMessage.includes('alert')) {
      return sampleResponses.unusual;
    }
    if (lowerMessage.includes('save') || lowerMessage.includes('tip') || lowerMessage.includes('money')) {
      return sampleResponses.save;
    }
    return sampleResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">Get personalized financial insights</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <p key={i} className="font-semibold">
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        }
                        if (line.startsWith('•')) {
                          return (
                            <p key={i} className="ml-2">
                              {line}
                            </p>
                          );
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <Input
                placeholder="Ask about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                className="flex-1 rounded-xl h-12"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="h-12 px-6 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggestions Panel */}
        <div className="hidden lg:block w-72 space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Quick Questions</h3>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.text}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <suggestion.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">AI Capabilities</h3>
            <div className="space-y-2">
              {[
                'Spending analysis',
                'Budget recommendations',
                'Savings tips',
                'Fraud detection',
                'Financial predictions',
                'Expense categorization',
              ].map((cap) => (
                <Badge key={cap} variant="secondary" className="mr-2 mb-2">
                  {cap}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
