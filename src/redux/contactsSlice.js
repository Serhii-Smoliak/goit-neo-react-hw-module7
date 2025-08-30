import { createSelector, createSlice } from "@reduxjs/toolkit";

import { addContact, fetchContacts, deleteContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const rejectContact = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const pendingContact = (state) => {
  state.loading = true;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.rejected, rejectContact)
      .addCase(fetchContacts.pending, pendingContact)
      .addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
        state.loading = false;
        state.items = contacts;
      })

      .addCase(addContact.rejected, rejectContact)
      .addCase(addContact.pending, pendingContact)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })

      .addCase(deleteContact.rejected, rejectContact)
      .addCase(deleteContact.pending, pendingContact)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== payload);
      });
  },
});

export const selectContacts = ({ contacts }) => contacts.items;

export const selectLoading = ({ contacts }) => contacts.loading;
export const selectError = ({ contacts }) => contacts.error;
export const selectFilteredContacts = createSelector(
  selectContacts,
  selectNameFilter,
  (contacts, filter) => {
    if (contacts.length) {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
    return [];
  }
);

export const contactsReducer = contactsSlice.reducer;
