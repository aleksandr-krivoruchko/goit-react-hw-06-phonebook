import { useState, useEffect } from 'react';

import { Form } from '../Form/Form';
import { Section } from '../Section/Section';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [contacts, setContacts] = useState(() => getContactsFromStorage());
  const [filterName, setFilter] = useState('');

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

    setContacts(state => [...state, contact]);
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
    const normalizedFilter = filterName.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  //  Удаление контакта
  function deleteContact(contactId) {
    setContacts(state => state.filter(({ id }) => id !== contactId));
  }

  //  Получение контактов из хранилища
  function getContactsFromStorage() {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  }

  //  Запись контактов в хранилище
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Section title="Phonebook">
      <Form onSubmit={addContact}></Form>
      <Section title="Contacts">
        <Filter filter={filterName} setFilter={setFilter}></Filter>
        <ContactsList
          contacts={filterContacts()}
          deleteContact={deleteContact}></ContactsList>
      </Section>
      <ToastContainer position="top-left" autoClose={3000} />
    </Section>
  );
}
