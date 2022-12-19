import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserType {
  id?: string
  username?: string
  token?: string
  email?: string
  error?: unknown
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
    }
  },
},
)

export const { userData } = user.actions
export default user.reducer