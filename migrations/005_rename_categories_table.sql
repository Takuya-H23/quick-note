ALTER TABLE notes
DROP COLUMN note_category_id;

ALTER TABLE note_categories RENAME TO folders;

ALTER TABLE notes
ADD COLUMN folder_id uuid REFERENCES folders (id);

CREATE INDEX idx_note_folder on notes(folder_id);
