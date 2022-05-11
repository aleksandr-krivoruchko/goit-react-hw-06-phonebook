import { nanoid } from 'nanoid';
import {
  combineReducers,
  createAction,
  createReducer,
  createSlice,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { checkExistingContact } from '../services/checkContact';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});
export const { add, remove } = contactsSlice.actions;

export const filter = createAction('filter/filter');

const filterReducer = createReducer('', {
  [filter]: (_, action) => action.payload,
});

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

//!=============Selectors==========================
export const getContacts = state => state.contacts;
export const getFilterValue = state => state.filter;

//!============Hooks=============================
export const useFilter = () => {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  function filterContacts() {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
  return {
    filteredContacts: filterContacts(),
    deleteContact: id => dispatch(remove(id)),
  };
};

export const useAddContact = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  function addContact(name, number) {
    if (checkExistingContact(name, contacts)) {
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(add(contact));
  }

  return addContact;
};
