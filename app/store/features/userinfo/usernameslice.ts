import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface UsernameState {
  username: string | null
  signupSuccessful: boolean
}

const initialState: UsernameState = {
  username: null,
  signupSuccessful: false,
}

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    updateSignupSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccessful = action.payload
    },
  },
})

export const { updateUsername, updateSignupSuccess } = usernameSlice.actions
export const selectUsername = (state: RootState) => state.username.username
export const selectSignupSuccess = (state: RootState) =>
  state.username.signupSuccessful
export default usernameSlice.reducer
