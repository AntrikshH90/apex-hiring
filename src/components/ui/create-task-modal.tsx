"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Star } from "lucide-react";
import { useState } from "react";
import { useApex } from "@/store/apex-context";

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
    const { addTask } = useApex();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(100);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask({
            title,
            description,
            points: Number(points),
        });
        onClose();
        // Reset form
        setTitle("");
        setDescription("");
        setPoints(100);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-apex-gray p-6 shadow-2xl shadow-apex-gold/10"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-qaveria text-2xl text-white">New Mission</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-bold text-gray-400">Title</label>
                                <input
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white placeholder-gray-600 focus:border-apex-gold focus:outline-none focus:ring-1 focus:ring-apex-gold"
                                    placeholder="e.g. Design System Upgrade"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-bold text-gray-400">Description</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white placeholder-gray-600 focus:border-apex-gold focus:outline-none focus:ring-1 focus:ring-apex-gold"
                                    placeholder="Brief details about the task..."
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-bold text-gray-400">Reward (Stars)</label>
                                <div className="relative">
                                    <Star className="absolute left-3 top-3.5 h-4 w-4 text-apex-gold" />
                                    <input
                                        type="number"
                                        min="10"
                                        max="5000"
                                        step="10"
                                        value={points}
                                        onChange={(e) => setPoints(Number(e.target.value))}
                                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white focus:border-apex-gold focus:outline-none focus:ring-1 focus:ring-apex-gold"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-apex-gold px-6 py-2 text-sm font-bold text-black hover:bg-yellow-400"
                                >
                                    <Save className="h-4 w-4" />
                                    Create Mission
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
