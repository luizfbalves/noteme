import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id?: string
  username?: string
  isLogged?: boolean
  token?: string
}

const storedUser = localStorage.getItem('noteme-user-data') || '{}'

const initialState: User = JSON.parse(storedUser) || {
  id: '',
  username: '',
  isLogged: false,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<User>) => {
      state = action.payload
      return state
    },
    clearUserData: (state) => {
      const data: User = {
        id: '',
        username: '',
        isLogged: false,
      }
      state = data
      return state
    },
  },
})

export const { userData, clearUserData } = user.actions
export default user.reducer
