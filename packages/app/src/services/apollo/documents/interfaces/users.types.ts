export interface LoginInput {
  LoginInput: {
    email: string
    password: string
  }
}

export interface CreateUserInput {
  createUser: {
    name: string
    email: string
    token?: string
  }
}
