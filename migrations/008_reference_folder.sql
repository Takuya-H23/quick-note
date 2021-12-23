ALTER TABLE notes
  ADD COLUMN copy VARCHAR(150),
  ADD COLUMN folder_id uuid REFERENCES folders (id) ON DELETE CASCADE;

CREATE INDEX idx_note_folder on notes(folder_id);

