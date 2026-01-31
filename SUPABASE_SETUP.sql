-- 1. Create a table for Candidates (Users claiming ranks)
create table profiles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text default 'Frontend Aspirant',
  points int default 0,
  rank text default 'Novice',
  avatar text default 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rookie',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create the Tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  points int default 100,
  status text default 'open', -- 'open', 'submitted', 'verified'
  assignee_id uuid references profiles(id),
  assignee_name text,
  submission_link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Insert some dummy data (Optional)
insert into profiles (name, role, points, rank) values 
('Alex Chen', 'Frontend Aspirant', 1200, 'Elite'),
('Sarah Connor', 'Frontend Aspirant', 450, 'Novice');

insert into tasks (title, description, points, status) values 
('Build Landing Page Hero', 'Create a high-conversion hero section with 3D elements.', 500, 'open'),
('Optimize Framer Motion', 'Reduce bundle size by implementing lazy motion.', 800, 'open');
