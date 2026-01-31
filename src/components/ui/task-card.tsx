"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, ExternalLink, Star } from "lucide-react";
import { Task, useApex } from "@/store/apex-context";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface TaskCardProps {
    task: Task;
    isAdmin?: boolean;
}

export function TaskCard({ task, isAdmin }: TaskCardProps) {
    const { verifyTask } = useApex();

    const handleVerify = (e: React.MouseEvent) => {
        // Get button position for confetti origin
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Trigger Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ["#fbbf24", "#ffffff", "#22d3ee"], // Gold, White, Cyan
            disableForReducedMotion: true,
            zIndex: 9999,
        });

        verifyTask(task.id);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative group overflow-hidden rounded-xl border border-white/5 bg-apex-gray/50 p-6 backdrop-blur-sm transition-all hover:border-apex-gold/50 hover:bg-apex-gray/80",
                task.status === "verified" && "border-green-500/30 opacity-70"
            )}
        >
            {/* Background Glow Effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-apex-gold/5 blur-3xl transition-all group-hover:bg-apex-gold/10" />

            <div className="relative z-10 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <span className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-gray-400 font-mono">
                            {task.points} Stars
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-apex-gold transition-colors font-qaveria tracking-wide">
                            {task.title}
                        </h3>
                    </div>
                    <div className="text-apex-gold">
                        {task.status === "verified" ? (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : task.status === "submitted" ? (
                            <Clock className="h-6 w-6 animate-pulse text-yellow-500" />
                        ) : (
                            <Star className="h-6 w-6" />
                        )}
                    </div>
                </div>

                <p className="text-sm text-gray-400 font-brideside leading-relaxed">{task.description}</p>

                {/* Footer / Actions */}
                <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
                    {task.submissionLink && (
                        <a
                            href={task.submissionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-apex-cyan hover:underline font-bold"
                        >
                            View Submission <ExternalLink className="h-3 w-3" />
                        </a>
                    )}

                    {isAdmin && task.status === "submitted" && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleVerify}
                            className="ml-auto flex items-center gap-2 rounded-lg bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                        >
                            <Star className="h-4 w-4 fill-current" />
                            Verify & Award
                        </motion.button>
                    )}

                    {isAdmin && task.status === "open" && (
                        <span className="text-xs text-gray-600 italic font-mono">Waiting for submission...</span>
                    )}

                    {task.status === "verified" && (
                        <span className="text-sm font-bold text-green-500 font-argeta tracking-wider">COMPLETED</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
