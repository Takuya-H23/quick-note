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

export const createFolderQuery = `
  INSERT INTO folders(name, slug, user_id) VALUES($1, $2, $3)
`

export const createNoteQuery = `
  INSERT INTO notes(title, description, user_id, folder_id) VALUES($1, $2, $3, $4)
`
