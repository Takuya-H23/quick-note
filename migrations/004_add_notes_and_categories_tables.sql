CREATE TABLE note_categories (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  inserted_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id)
);


CREATE TABLE notes (
  id uuid DEFAULT uuid_generate_v4(),
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  inserted_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  user_id uuid REFERENCES users (id) ON DELETE CASCADE,
  note_category_id uuid REFERENCES note_categories (id),
  PRIMARY KEY(id)
);

CREATE INDEX idx_note_user on notes(user_id);
CREATE INDEX idx_note_category on notes(note_category_id);


