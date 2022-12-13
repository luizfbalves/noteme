import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { fetchUserAuth } from "../thunks"

export interface UserType {
  username?: string
  email?: string
  isLogged: boolean
  isLoading: boolean
}

const initialState: UserType = {
  username: '',
  email: '',
  isLogged: false,
  isLoading: false
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state: UserType, action: PayloadAction<UserType>) => {
      state = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state = action.payload
      }
    }),
      builder.addDefaultCase((state) => {
        state.isLoading = true
        state.isLogged = false
      })
  }
},
)

export const { userData } = user.actions
export default user.reducer