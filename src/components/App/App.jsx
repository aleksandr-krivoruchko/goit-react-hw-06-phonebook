import { useSelector, useDispatch } from 'react-redux';
import { add, remove, getContacts, getFilterValue } from '../../redux/persist';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form } from '../Form/Form';
import { Section } from '../Section/Section';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';
import { checkExistingContact } from '../../services/checkContact';

export function App() {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
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

  function filterContacts() {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  function deleteContact(contactId) {
    dispatch(remove(contactId));
  }

  return (
    <Section title="Phonebook">
      <Form onSubmit={addContact}></Form>
      <Section title="Contacts">
        <Filter />
        <ContactsList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        ></ContactsList>
      </Section>
      <ToastContainer position="top-left" autoClose={3000} />
    </Section>
  );
}
