import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, filter } from '../../redux/store';
import { Form } from '../Form/Form';
import { Section } from '../Section/Section';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);

  // Получение данных формы  и добавление контакта
  function addContact(name, number) {
    if (checkExistingContact(name)) {
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(add(contact));
  }

  // Проверка на существующий контакт
  function checkExistingContact(newName) {
    const existingСontact = contacts.find(({ name }) => name === newName);

    if (existingСontact) {
      toast(`${existingСontact.name} is already in contacts`);
      return true;
    }
  }

  //Фильтрация контактов по имени
  function filterContacts() {
    const normalizedFilter = filterValue.toLowerCase();
console.log(normalizedFilter);
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  //  Удаление контакта
  function deleteContact(contactId) {
    dispatch(remove(contactId));
  }


  //  Запись контактов в хранилище
  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);
  return (
    <Section title="Phonebook">
      <Form onSubmit={addContact}></Form>
      <Section title="Contacts">
        <Filter />
        <ContactsList
          contacts={filterContacts()}
          deleteContact={deleteContact}></ContactsList>
      </Section>
      <ToastContainer position="top-left" autoClose={3000} />
    </Section>
  );
}
