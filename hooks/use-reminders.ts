"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useAuth } from "@clerk/nextjs"

export interface Reminder {
  _id: string
  userId: string
  title: string
  description?: string
  dueDate: string
  type: "interview" | "follow-up" | "deadline" | "general"
  isCompleted: boolean
  jobId?: string
  priority: "low" | "medium" | "high"
  createdAt: string
}

export function useReminders() {
  const { toast } = useToast();
  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Align base URL with lib/api.ts fallback
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Load reminders from backend
  const fetchReminders = async () => {
    if (!user?.id || !isSignedIn) return;
    setIsLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/schedules?userId=${user.id}` , {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      setReminders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load reminders", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Get active (non-completed) reminders
  const getActiveReminders = (): Reminder[] => {
    return reminders.filter(reminder => !reminder.isCompleted);
  };

  // Get overdue reminders
  const getOverdueReminders = (): Reminder[] => {
    const now = new Date();
    return reminders.filter(reminder =>
      !reminder.isCompleted && new Date(reminder.dueDate) < now
    );
  };

  // Get upcoming reminders (next 24 hours)
  const getUpcomingReminders = (): Reminder[] => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return reminders.filter(reminder =>
      !reminder.isCompleted &&
      new Date(reminder.dueDate) >= now &&
      new Date(reminder.dueDate) <= tomorrow
    );
  };

  // Add new reminder
  const addReminder = async (reminderData: Omit<Reminder, "_id" | "createdAt">) => {
    if (!user?.id || !isSignedIn) return;
    setIsLoading(true);
    try {
      const token = await getToken();
      // Derive date and time strings from dueDate to satisfy backend validation
      let dateStr: string | undefined;
      let timeStr: string | undefined;
      if (reminderData?.dueDate) {
        const dt = new Date(reminderData.dueDate);
        if (!isNaN(dt.getTime())) {
          const iso = dt.toISOString();
          dateStr = iso.split('T')[0];
          timeStr = iso.slice(11, 16);
        }
      }
      const res = await fetch(`${API_URL}/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ 
          ...reminderData, 
          userId: user.id,
          ...(dateStr && timeStr ? { date: dateStr, time: timeStr } : {}),
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Failed to create reminder');
      }
      setReminders(prev => [...prev, data]);
      toast({ title: "Reminder Created", description: `Reminder set for ${data.title}` });
      return data;
    } catch (error) {
      toast({ title: "Error", description: "Failed to create reminder", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete reminder
  const deleteReminder = async (reminderId: string) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      await fetch(`${API_URL}/schedules/${reminderId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      });
      setReminders(prev => prev.filter(r => r._id !== reminderId));
      toast({ title: "Reminder Deleted", description: "Reminder has been deleted" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete reminder", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Get reminder count for badge
  const getReminderCount = (): number => {
    return getActiveReminders().length;
  };

  // Get priority count
  const getHighPriorityCount = (): number => {
    return getActiveReminders().filter(r => r.priority === "high").length;
  };

  return {
    reminders,
    isLoading,
    getActiveReminders,
    getOverdueReminders,
    getUpcomingReminders,
    addReminder,
    deleteReminder,
    getReminderCount,
    getHighPriorityCount,
    fetchReminders,
  };
}
