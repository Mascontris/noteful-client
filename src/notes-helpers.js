
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.folderId == folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.noteId == noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId == folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>  
notes.filter(note => note.folderId == folderId).length
