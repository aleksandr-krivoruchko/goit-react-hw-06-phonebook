import { configureStore } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit';

  export const add = createAction('contacts/add');
  export const remove = createAction('contacts/remove');
  export const filter = createAction('filter/filter');


const contactsReducer = createReducer([], {
  [add]: (state, action) => [...state, action.payload],
  [remove]: (state, action) => state.filter(item => item.id !== action.payload)
});

const filterReducer = createReducer("", {
  [filter]: (state, action) => action.payload
});


export const store = configureStore({
  reducer: {
  
    contacts: contactsReducer,
    filter: filterReducer
  
  }
});

