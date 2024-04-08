import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import UserReducers from './User/User.Slice'
import ProductReducer from './Products/Product.Slice'


const persistConfig = {
  key: 'root',
  storage,
  version:1
}

export const persistedReducer = persistReducer(persistConfig, UserReducers)

export const store = configureStore({
  reducer: {
    persistedReducer,
    ProductReducer
  },
})
export const persistor = persistStore(store)
// export type AppStore = ReturnType<typeof persistor.getState>
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
