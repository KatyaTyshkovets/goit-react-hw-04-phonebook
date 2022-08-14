import  { useState, useMemo} from "react";
import { nanoid } from "nanoid";
import Wrapper from "./Wrapper";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import useLocalStorage from "./hooks/useLocalStorage";
import dataContacts from './data/dataContacts.json'

 




  export const App = () => {
  
    const [contacts, setContacts] = useLocalStorage('contacts', dataContacts);
    const [filter, setFilter] = useState('');
  
  const formSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${name} is already in contacts.`)
      : setContacts([newContact, ...contacts]);
      
  };
  
  const changeFilter = e => setFilter(e.currentTarget.value);
  

  const getVisibleContacts = useMemo( () => 
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ),
  [contacts, filter]
  );
  
  const deleteContact = contactId => {
    setContacts(prevFilter => prevFilter.filter(contact => contact.id !== contactId));
  };
  
  
  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts}
        onDeleteContact={deleteContact}
      />
    </Wrapper>
  );
}

  


