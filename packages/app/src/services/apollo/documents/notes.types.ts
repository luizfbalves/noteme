export interface findUserInterface {
  findUser: {
    name: string,
    notes: {
      id: string
      description: string
      updatedAt: string
    }[]
  }
}

export interface AllNotesInterface {
  allNotes: {
    id: string
    description: string
    updatedAt: string
  }
}