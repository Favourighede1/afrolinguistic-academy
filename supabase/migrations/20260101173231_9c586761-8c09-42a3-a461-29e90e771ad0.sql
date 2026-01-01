-- Create edo_names table for storing Edo names with meanings
CREATE TABLE public.edo_names (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  meaning TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Male/Female')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.edo_names ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (names are public educational content)
CREATE POLICY "Anyone can view Edo names"
ON public.edo_names
FOR SELECT
USING (true);

-- Create index on name for faster search
CREATE INDEX idx_edo_names_name ON public.edo_names (name);

-- Create index on gender for filtering
CREATE INDEX idx_edo_names_gender ON public.edo_names (gender);