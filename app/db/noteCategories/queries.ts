export const readNoteCategoriesQuery = `
  SELECT * FROM note_categories
`

export const createNoteCategoryQuery = `
  INSERT INTO note_categories(name) VALUES($1)
`
