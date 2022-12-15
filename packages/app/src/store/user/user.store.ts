import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { fetchUserAuth } from "../thunks"

export interface UserType {
  username?: string
  token?: string
  email?: string
  error?: unknown
  isLogged: boolean
  isLoading: boolean
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
  extraReducers(builder) {
    builder.addCase(fetchUserAuth.pending, (state) => {
      state.isLogged = false
      state.isLoading = true
      return state
    })
    builder.addCase(fetchUserAuth.fulfilled, (state) => {
      state.isLogged = true
      state.isLoading = false
      return state
    })
    builder.addCase(fetchUserAuth.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      return state
    })
  }
},
)

export const { userData } = user.actions
export default user.reducer