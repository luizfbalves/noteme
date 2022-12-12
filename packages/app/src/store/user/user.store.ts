import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserAuthType {
  isLogged: boolean
}

const initialState = {
  isLogged: false
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuth: (state: UserAuthType, action: PayloadAction<UserAuthType>) => {
      state.isLogged = action.payload.isLogged
    }
  }
})

export const { userAuth } = user.actions
export default user.reducer