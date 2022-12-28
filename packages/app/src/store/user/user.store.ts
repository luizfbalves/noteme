import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserType {
  id?: string
  username?: string
  token?: string
  email?: string
  error?: any
  isLogged?: boolean
  isLoading?: boolean
}

const initialState: UserType = {
  isLogged: false,
  isLoading: false
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<UserType>) => {
      state = action.payload
      return state
    },
    clearUserData: (state) => {
      const data: UserType = {
        id: '',
        email: '',
        token: '',
        username: '',
        error: '',
        isLoading: false,
        isLogged: false
      }
      state = data

      return state
    }

  },
},
)

export const { userData, clearUserData } = user.actions
export default user.reducer