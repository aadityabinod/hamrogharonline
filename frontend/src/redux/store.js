import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { combineReducers, persistStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user: userReducer})

const persistConfig={
  key:'root',
  storage,
  version: 1,
}

const persistReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: {user: userReducer},
  reducer: persistReducer,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store);