/* 
  FULL Initialization Script for Apex System.
  Run this entire file in Supabase SQL Editor.
*/

-- 1. Create Profiles Table (if not exists)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text default 'Frontend Aspirant',
  points int default 0,
  rank text default 'Novice',
  avatar text default 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rookie',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create Tasks Table (if not exists)
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  points int default 100,
  status text default 'open',
  assignee_id uuid references profiles(id),
  assignee_name text,
  submission_link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Clear old data and Insert Initial Tasks
delete from tasks;

insert into tasks (title, description, points, status) values 
(
  'Replicate Apex "Glow" Card', 
  'Create a React component that replicates the "Glassmorphism + Neon Glow" effect used on our homepage. It must be responsive and follow the exact color tokens (Obsidian/Gold). Use Framer Motion for hover states.', 
  500, 
  'open'
),
(
  'Optimize Landing Page Core Vitals', 
  'Analyze the current landing page performance. Identify 3 key bottlenecks causing LCP > 2.5s. Implement code-splitting or image optimization fixes to bring the score to 95+.', 
  800, 
  'open'
),
(
  'Integrate "Star Award" Confetti', 
  'Implement a custom hook useConfetti() that triggers a gold/cyan particle explosion at the cursor position when a button is clicked. Must cleanly unmount and not cause memory leaks.', 
  600, 
  'open'
);
