import { useDispatch } from "react-redux";

import styles from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contact}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.number}>{number}</p>
      </div>
      <button
        className={styles.button}
        onClick={handleDelete}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}
