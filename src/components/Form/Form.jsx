import { useState } from 'react';
import { Btn, FormStyle, Label, Input } from './FormStyle.styled';
import { useAddContact } from '../../redux/persist';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const addContact = useAddContact();

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    addContact(name, number);

    reset();
  }

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <FormStyle onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
        />
      </Label>

      <Label>
        Number
        <Input
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
        />
      </Label>
      <Btn type="submit">Add contact</Btn>
    </FormStyle>
  );
}
