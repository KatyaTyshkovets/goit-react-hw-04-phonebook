
import PropTypes from 'prop-types';
import {List} from './ContactList.styled';
import {ContactItem} from '../ItemList/Item';



export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
          <ContactItem
              key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};




export default ContactList;