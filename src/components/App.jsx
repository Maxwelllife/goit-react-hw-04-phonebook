import 'modern-normalize/modern-normalize.css';
import { useState, useEffect } from 'react';
import SectionTitle from './Section/SectionTitle';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './app.module.css';

import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  console.log('contacts: ', contacts);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    if (contacts?.length) {
      setContacts([...contacts]);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onChangeFilterValue = event => {
    setFilter(event.target.value);
  };

  const compareContacts = () => {
    const normalizeFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const addContact = data => {
    const { name } = data;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} - this contact already in contact list`);
      return;
    } else {
      const contact = { ...data, id: nanoid() };
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={s.wrap}>
      <SectionTitle title="Phonebook">
        {/* в инфо приходит наш стейт с формы после сабмита и записываеться в параметр дата */}
        <ContactsForm catchSubmitInfo={addContact} />
      </SectionTitle>
      <SectionTitle title="Contacts">
        <Filter filterValue={filter} catchFilterInfo={onChangeFilterValue} />
        {contacts.length ? (
          <ContactList
            contacts={compareContacts()}
            contactOnDelete={deleteContacts}
          />
        ) : (
          <p>Your phonebook is empty</p>
        )}
      </SectionTitle>
    </div>
  );
};
export default App;
