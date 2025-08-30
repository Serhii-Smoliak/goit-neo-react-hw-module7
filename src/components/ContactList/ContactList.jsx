import { useSelector, useDispatch } from "react-redux";

import styles from "./ContactList.module.css";
import {
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/contactsOps";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading contacts...</div>;
  }

  if (!contacts || contacts.length === 0) {
    return <div className={styles.empty}>No contacts found. Add your first contact above!</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Contact</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className={styles.tableRow}>
              <td className={styles.tableCell}>
                <div className={styles.contactInfo}>
                  <span className={styles.contactIcon}>👤</span>
                  <span className={styles.contactName}>{contact.name}</span>
                </div>
              </td>
              <td className={styles.tableCell}>
                <div className={styles.phoneInfo}>
                  <span className={styles.phoneIcon}>📞</span>
                  <span className={styles.phoneNumber}>{contact.number}</span>
                </div>
              </td>
              <td className={styles.tableCell}>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
