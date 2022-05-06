// import { configureStore, createAction, createReducer, createSlice } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// export const filter = createAction('filter/filter');
// const filterReducer = createReducer("", {
//   [filter]: (_, action) => action.payload
// });

// //!=======SLICE=====================
//  const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducers: {
//     add(state, action) {
//       state.push(action.payload);
//     },
//     remove(state, action) {
//       return state.filter(item => item.id !== action.payload);
//     }
//   }
//  }
// )
// export const { add, remove } = contactsSlice.actions;

// //!========PERSIST=================
// const persistConfig = {
//   key: 'contacts',
//   storage,
// }

// const persistedContactsReducer = persistReducer(persistConfig, contactsSlice.reducer)
// // const persistedFilterReducer = persistReducer(persistConfig, filterReducer)

// // !====STORE=========================
// export const store = configureStore({
//   reducer: {
//     contacts: persistedContactsReducer,
//     filter: filterReducer
//   },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

// });
// export const persistor = persistStore(store);
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

  export const add = createAction('contacts/add');
  export const remove = createAction('contacts/remove');
export const filter = createAction('filter/filter');
  

const contactsReducer = createReducer(
  [], {
  [add]: (state, action) => [...state, action.payload],
  [remove]: (state, action) => state.filter(item => item.id !== action.payload)
});

const filterReducer = createReducer("", {
  [filter]: (_, action) => action.payload
});

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
      contacts: contactsReducer,
    filter: filterReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

