

export interface createNoteInterface {
  createNote: {
    id: string
    description: string
    userId: string
    updatedAt: string
  }
}

export interface AllNotesInterface {
  allNotes: {
    id: string
    description: string
    updatedAt: string
  }
}