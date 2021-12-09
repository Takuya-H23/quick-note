CREATE TABLE  users (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password_hash VARCHAR NOT NULL,
  PRIMARY KEY(id),
  UNIQUE(email)
);
