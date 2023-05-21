import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import ContactFrom from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Container, MainTitle, SubTitle, Message, Section } from './App.styled';

const initialValue = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));

  const visibleContacts =
    localContacts?.length > 0 ? localContacts : initialValue;

  const [contacts, setContacts] = useState(visibleContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const checkName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibileContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactFrom onSubmit={addContact} />
      <Section>
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} changeFilter={changeFilter} />
            <ContactList
              contactsList={getVisibileContacts()}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <Message>No contacts</Message>
        )}
      </Section>
    </Container>
  );
};

export default App;
