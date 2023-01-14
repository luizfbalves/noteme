import { randomUUID } from 'node:crypto'

import { User } from '../user.entity'

export const fakeUsers = [
  {
    id: randomUUID(),
    email: 'jest1@mail.com',
    name: 'jest1',
    createdAt: new Date(),
    updatedAt: new Date(),
    notes: [
      {
        id: randomUUID(),
        description: 'jestnote1',
        userId: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: randomUUID(),
    email: 'jest2@mail.com',
    name: 'jest2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: randomUUID(),
    email: 'jest2@mail.com',
    name: 'jest2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
].map((user) => Object.assign(new User(), user))
