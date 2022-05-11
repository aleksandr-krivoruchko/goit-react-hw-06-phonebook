import { Contact } from '../Contact/Contact';
import { useFilter } from '../../redux/persist.js';

export function ContactsList() {
  const { filteredContacts, deleteContact } = useFilter();

  return (
    <ul>
      {filteredContacts.map(({ number, name, id }) => (
        <Contact
          key={number}
          number={number}
          name={name}
          id={id}
          deleteContact={() => deleteContact(id)}
        />
      ))}
    </ul>
  );
}
