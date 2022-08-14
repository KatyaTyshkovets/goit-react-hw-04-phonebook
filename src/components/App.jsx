import React, { Component } from "react";
import { nanoid } from "nanoid";
import Wrapper from "./Wrapper";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";




export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
 
  };

  formSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) =>
      contacts.find(contact => contact.name === newContact.name)
        ? alert(`${name} is already in contacts.`)
        : {
          contacts: [newContact, ...contacts],
        }
    );
  };  
  
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normolizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizeFilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };


  componentDidMount() {
    console.log('App ComponentDidMount');
   const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);

     if (parsedContact) {
       this.setState({ contacts: parsedContact });
     }
  }
  componentDidUpdate(_, prevState) {
    console.log('App ComponentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();


    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
       <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Wrapper>
    );
}

  
};

