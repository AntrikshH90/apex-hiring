/* 
  SQL Script to seed Apex System with specific Frontend Developer hiring tasks.
  Run this in Supabase SQL Editor.
*/

-- Optional: Clear existing tasks to start fresh
truncate table tasks; 

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
