"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type TaskStatus = "open" | "submitted" | "verified";

export interface Task {
    id: string;
    title: string;
    description: string;
    points: number;
    status: TaskStatus;
    assignee_id?: string;
    assignee_name?: string;
    submission_link?: string;
}

export interface User {
    id: string;
    name: string;
    role: string;
    points: number;
    rank: string;
    avatar: string;
}

interface ApexContextType {
    user: User;
    tasks: Task[];
    candidates: User[];
    addTask: (task: Omit<Task, "id" | "status">) => Promise<void>;
    submitTask: (taskId: string, link: string, candidateName: string) => Promise<void>; // Updated for real scenario
    verifyTask: (taskId: string) => Promise<void>;
    refreshData: () => Promise<void>;
}

const ApexContext = createContext<ApexContextType | undefined>(undefined);

export function ApexProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [candidates, setCandidates] = useState<User[]>([]);

    // Hardcoded Admin for now (You, Antriksh)
    const [user] = useState<User>({
        id: "admin-1",
        name: "Antriksh",
        role: "Founder & AI Architect",
        points: 999999,
        rank: "Apex Founder",
        avatar: "/assets/founder.jpg",
    });

    const refreshData = async () => {
        // 1. Fetch Tasks
        const { data: tasksData } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (tasksData) setTasks(tasksData as any);

        // 2. Fetch Candidates (Profiles)
        const { data: profilesData } = await supabase
            .from("profiles")
            .select("*")
            .order("points", { ascending: false });

        if (profilesData) setCandidates(profilesData as any);
    };

    // Initial Load
    useEffect(() => {
        refreshData();

        // Real-time Subscription
        const channel = supabase
            .channel('realtime_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => refreshData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => refreshData())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const addTask = async (newTask: Omit<Task, "id" | "status">) => {
        // Optimistic Update (optional, skipping for simplicity)
        await supabase.from("tasks").insert([{
            title: newTask.title,
            description: newTask.description,
            points: newTask.points,
            status: "open"
        }]);
    };

    const submitTask = async (taskId: string, link: string, candidateName: string) => {
        // For MVP: We just create a profile for the candidate if they don't exist?
        // OR just update the text. Let's start simple: Update task row.

        await supabase.from("tasks").update({
            status: "submitted",
            submission_link: link,
            assignee_name: candidateName
        }).eq("id", taskId);
    };

    const verifyTask = async (taskId: string) => {
        // 1. Get the task to find points and assignee
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        // 2. Update Task Status
        await supabase.from("tasks").update({ status: "verified" }).eq("id", taskId);

        // 3. Find Candidate and Award Points (if linked)
        // Note: Since we don't have Auth fully linked, we might have to find profile by name or just skip points for MVP if no ID.
        // For now, let's assume we just verify the task status visibly.

        // Send Email
        const subject = `Task Completed: ${task.title}`;
        const body = `Movement Report:\n\nCandidate ${task.assignee_name || 'Unity'} has completed the task: ${task.title}.\nStatus: Verified\nPoints Awarded: ${task.points}\n\nApex Intelligence System`;

        setTimeout(() => {
            window.open(`mailto:apexintelligence.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        }, 1000);
    };

    return (
        <ApexContext.Provider
            value={{ user, tasks, candidates, addTask, submitTask, verifyTask, refreshData }}
        >
            {children}
        </ApexContext.Provider>
    );
}

export function useApex() {
    const context = useContext(ApexContext);
    if (!context) throw new Error("useApex must be used within ApexProvider");
    return context;
}
