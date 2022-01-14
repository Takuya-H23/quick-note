ALTER TABLE notes
  ADD COLUMN is_pinned BOOLEAN;

CREATE INDEX idx_pinned_notes on notes(is_pinned);
