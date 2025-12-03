-- Add 'reason' column to wins table
ALTER TABLE wins ADD COLUMN IF NOT EXISTS reason TEXT;
