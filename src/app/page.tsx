"use client";

import { motion } from "framer-motion";
import { Plus, Trophy, Users, Zap, Mail, Linkedin, Globe } from "lucide-react";
import { useApex } from "@/store/apex-context";
import { TaskCard } from "@/components/ui/task-card";
import { CreateTaskModal } from "@/components/ui/create-task-modal";
import { useState } from "react";

export default function Home() {
  const { user, tasks, candidates } = useApex();
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  return (
    <main className="min-h-screen bg-grid p-8 pb-24 relative">
      {/* Header Section */}
      <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl shadow-apex-gold/10"
          >
            <img src="/assets/logo.jpg" alt="Apex Intelligence" className="h-full w-full object-cover" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-2 inline-flex items-center gap-2 rounded-full border border-apex-gold/30 bg-apex-gold/10 px-3 py-1 text-xs font-bold tracking-widest text-apex-gold uppercase"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Apex Intelligence System
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-qaveria text-6xl font-normal text-white"
            >
              Task <span className="font-argeta italic text-apex-gold">Command</span>
            </motion.h1>

            <div className="mt-2 flex items-center gap-3">
              <img src={user.avatar} alt="Founder" className="h-8 w-8 rounded-full border border-white/20" />
              <p className="text-gray-400 font-brideside text-lg tracking-wide">
                Logged in as <span className="text-white relative inline-block underline decoration-apex-cyan/50 decoration-2 underline-offset-4">{user.name}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Stats Cards */}
          <div className="hidden md:flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 backdrop-blur-md transition-colors hover:bg-white/10">
            <Trophy className="h-5 w-5 text-apex-gold" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Admin Level</p>
              <p className="font-qaveria text-xl text-white">{user.rank}</p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 rounded-xl bg-apex-gold px-6 py-3 font-bold text-black transition-all hover:scale-105 hover:bg-yellow-300 active:scale-95 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            New Mission
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Task Board (Left) */}
        <section className="lg:col-span-3">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-argeta text-4xl text-white flex items-center gap-2">
              <Zap className="text-apex-cyan h-8 w-8" /> Deployment Board
            </h2>

            <div className="flex bg-apex-gray/50 rounded-lg p-1 border border-white/5">
              {["all", "open", "submitted", "verified"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-sm font-bold rounded-md transition-all capitalize ${filter === f
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredTasks.map((task, i) => (
              <TaskCard key={task.id} task={task} isAdmin={user.role.includes("Founder")} />
            ))}
          </div>
        </section>

        {/* Sidebar (Right) */}
        <aside className="space-y-8">
          {/* Candidates List */}
          <div className="rounded-2xl border border-white/5 bg-apex-gray/30 p-6 backdrop-blur-xl">
            <h3 className="mb-6 flex items-center gap-2 font-qaveria text-2xl text-white border-b border-white/10 pb-4">
              <Users className="h-5 w-5 text-apex-cyan" /> Apex Candidates
            </h3>

            <div className="space-y-4">
              {candidates.map((candidate, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={candidate.id}
                  className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="relative">
                    <img src={candidate.avatar} alt={candidate.name} className="h-12 w-12 rounded-full border-2 border-white/10 group-hover:border-apex-gold/50 transition-colors" />
                    {i === 0 && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-apex-gold text-[10px] font-bold text-black border border-black">
                        1
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-base text-white font-qaveria">{candidate.name}</p>
                    <p className="text-xs text-gray-500 font-mono tracking-wide">{candidate.role}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-apex-gold font-argeta">{candidate.points}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{candidate.rank}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact / Links Card */}
          <div className="rounded-2xl border border-white/5 bg-apex-gray/30 p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-bold text-gray-400 text-xs uppercase tracking-widest">Official Channels</h3>
            <div className="space-y-3">
              <a href="https://www.linkedin.com/company/apex-intelligence-ai/" target="_blank" className="flex items-center gap-3 text-sm text-white hover:text-apex-cyan transition-colors">
                <Linkedin className="h-4 w-4" /> Apex Intelligence AI
              </a>
              <a href="mailto:apexintelligence.official@gmail.com" className="flex items-center gap-3 text-sm text-white hover:text-apex-gold transition-colors">
                <Mail className="h-4 w-4" /> apexintelligence.official
              </a>
            </div>
          </div>
        </aside>
      </div>

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
