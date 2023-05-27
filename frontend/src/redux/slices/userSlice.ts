import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface User {
  id: string
  name: string
  email: string
  role: string
}

const initialState: User = {
  id: '',
  name: '',
  email: '',
  role: ''
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const { id, name, email, role } = action.payload
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    },
    removeUser: (state) => {
      state.id = ''
      state.name = ''
      state.email = ''
      state.role = ''
    }
  }
})

export const { updateUser, removeUser } = userSlice.actions

export const userSelector = (state: RootState) => state.userReducer

export default userSlice.reducer
