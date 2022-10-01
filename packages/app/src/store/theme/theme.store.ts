import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TTheme {
  mode: 'dark' | 'light'
}

const initialState: TTheme = {
  mode: 'dark',
}

export const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<TTheme>) => {
      state.mode = action.payload.mode
    },
  },
})

export const { setMode } = theme.actions

export default theme.reducer
