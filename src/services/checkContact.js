import { toast } from 'react-toastify';

export function checkExistingContact(newName, contacts) {
  const existingСontact = contacts.find(({ name }) => name === newName);

  if (existingСontact) {
    toast(`${existingСontact.name} is already in contacts`);
    return true;
  }
}
