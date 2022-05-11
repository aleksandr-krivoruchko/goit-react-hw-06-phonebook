import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form } from '../Form/Form';
import { Section } from '../Section/Section';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';

export function App() {
  return (
    <Section title="Phonebook">
      <Form></Form>
      <Section title="Contacts">
        <Filter />
        <ContactsList></ContactsList>
      </Section>
      <ToastContainer position="top-left" autoClose={3000} />
    </Section>
  );
}
