export type findUserType = {
  findUser: {
    name: string,
    notes: {
      id: string
      description: string
      updatedAt: string
    }[]
  }
}