

import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/userSlice';
// import searchSlice from '../pages/searchSlice';

import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice,
    // search: searchSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});