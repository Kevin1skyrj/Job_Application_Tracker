"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";

export interface Goal {
  _id: string;
  userId: string;
  target: number;
  month: number;
  year: number;
  createdAt: string;
}

export function useGoals() {
  const { toast } = useToast();
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

  // Load current user's goals from backend
  const fetchGoals = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
      const res = await fetch(`${API_URL}/goals?userId=${user.id}&month=${month}&year=${year}`);
      const data = await res.json();
      setGoals(data ? [data] : []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load goals", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Get current month's goal
  const getCurrentMonthGoal = (): Goal | null => {
    return goals.length > 0 ? goals[0] : null;
  };

  // Set or update monthly goal
  const setMonthlyGoal = async (target: number) => {
    if (!user?.id) return;
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, target, month, year })
      });
      const data = await res.json();
      setGoals([data]);
      toast({ title: "Goal Set", description: `Monthly goal set to ${target} applications` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to set goal", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove monthly goal
  const removeMonthlyGoal = async () => {
    if (!user?.id) return;
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/goals`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, month, year })
      });
      setGoals([]);
      toast({ title: "Goal Removed", description: "Monthly goal has been removed", variant: "destructive" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove goal", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress for current month
  const calculateMonthlyProgress = (jobsThisMonth: number): { percentage: number; remaining: number } => {
    const currentGoal = getCurrentMonthGoal();
    if (!currentGoal) return { percentage: 0, remaining: 0 };
    const percentage = Math.round((jobsThisMonth / currentGoal.target) * 100);
    const remaining = Math.max(0, currentGoal.target - jobsThisMonth);
    return { percentage, remaining };
  };

  return {
    goals,
    isLoading,
    getCurrentMonthGoal,
    setMonthlyGoal,
    removeMonthlyGoal,
    calculateMonthlyProgress,
    fetchGoals,
  };
}
