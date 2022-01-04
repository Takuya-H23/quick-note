export const readFolderQuery = `
  SELECT a.id, a.name,  COUNT(b.id) notes_count
  FROM folders a 
  LEFT JOIN notes b
    ON b.folder_id = $2 
  WHERE a.user_id = $1 AND a.id = $2 
  GROUP BY a.id
`

export const readFoldersQuery = `
  SELECT * FROM folders WHERE $1 = folders.user_id
`

export const readNotesUnderFolderQuery = `
  SELECT n.id, n.title, n.copy FROM notes AS n
  WHERE n.user_id = $1 AND n.folder_id = $2
`

export const readNoteDetailQuery = `
  SELECT * FROM notes 
  WHERE notes.id = $1
`

export const createFolderQuery = `
  INSERT INTO folders(name, user_id) VALUES($1, $2)
`

export const createNoteQuery = `
  INSERT INTO notes(title, description, copy, user_id, folder_id) VALUES($1, $2, $3, $4, $5)
`

export const deleteNoteQuery = `
  DELETE FROM notes WHERE notes.user_id = $1 AND notes.id = $2
`
