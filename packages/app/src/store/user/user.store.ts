import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserType {
  id?: string
  username?: string
  isLogged?: boolean
  isLoading?: boolean
}

const storedUser = localStorage.getItem('noteme-user-data') || '{}'

const initialState: UserType = JSON.parse(storedUser) || {
  id: '',
  username: '',
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
        username: '',
        isLoading: false,
        isLogged: false
      }
      state = data
      return state
    }

  }

},
)

export const { userData, clearUserData } = user.actions
export default user.reducer