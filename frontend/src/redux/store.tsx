import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { Provider } from 'react-redux'

export const store = configureStore({
  reducer: {
    userReducer
  }
})
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
