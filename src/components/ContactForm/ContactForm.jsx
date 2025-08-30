import { useDispatch } from "react-redux";
import { useState } from "react";

import styles from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length > 7) return value;
    
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
  };

  const validatePhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length !== 7) {
      return "Номер должен содержать 7 цифр в формате XXX-XX-XX";
    }
    return "";
  };

  const handleNumberChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setNumber(formattedNumber);
    
    if (formattedNumber.length > 0) {
      const error = validatePhoneNumber(formattedNumber);
      setNumberError(error);
    } else {
      setNumberError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneError = validatePhoneNumber(number);
    if (phoneError) {
      setNumberError(phoneError);
      return;
    }

    if (name.trim() && number.trim()) {
      dispatch(addContact({ name: name.trim(), number: number.trim() }));
      setName("");
      setNumber("");
      setNumberError("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add New Contact</h2>
      
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          required
        />
      </div>
      
      <div className={styles.field}>
        <label className={styles.label}>Number</label>
        <input
          className={`${styles.input} ${numberError ? styles.inputError : ''}`}
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="XXX-XX-XX"
          required
        />
        {numberError && <span className={styles.errorText}>{numberError}</span>}
      </div>
      
      <button className={styles.button} type="submit" disabled={!!numberError}>
        Add Contact
      </button>
    </form>
  );
}
