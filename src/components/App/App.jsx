import { GlobalStyle } from 'GlobalStyles';
import { Container, NoContacts } from './App.styled';
import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import prevContacts from '../../data/prevContacts';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: prevContacts,
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts !== null && storedContacts !== undefined) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  addContact = newContact => {
    const isAlreadyExist = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isAlreadyExist) {
      Notify.warning(`${newContact.name} is already in contacts`, {
        width: '360px',
        position: 'center-top',
        distance: '110px',
        borderRadius: '0px',
        fontSize: '16px',
      });
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
    }));
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <Container>
        <ContactForm title="Phonebook" onAdd={this.addContact} />
        {this.state.contacts.length > 0 ? (
          <ContactList
            title="Contacts"
            getContacts={this.filterContact()}
            onFilter={this.handleFilterChange}
            onDelete={this.handleDeleteContact}
          />
        ) : (
          <NoContacts>No contacts in phone book</NoContacts>
        )}
        <GlobalStyle />
      </Container>
    );
  }
}
