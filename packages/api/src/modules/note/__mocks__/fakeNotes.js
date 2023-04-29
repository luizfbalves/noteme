import { randomUUID } from 'node:crypto'

import { Note } from '../entities/note.entity'

export const fakeNotes = [
  {
    id: randomUUID(),
    description: 'first jest note',
    user: {
      id: randomUUID(),
      name: 'jestuser',
      email: 'jest@mail.com',
    },
    userId: randomUUID(),
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: randomUUID(),
    description: 'second jest note',
    user: {
      id: randomUUID(),
      name: 'jestuser',
      email: 'jest2@mail.com',
    },
    userId: randomUUID(),
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: randomUUID(),
    description: 'thrid jest note',
    user: {
      id: randomUUID(),
      name: 'jestuser',
      email: 'jest3@mail.com',
    },
    userId: randomUUID(),
    createdAt: new Date(),
    updateAt: new Date(),
  },
].map((note) => Object.assign(new Note(), note))
