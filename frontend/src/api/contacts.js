export const BASE_URL = 'http://localhost:3001';

export const getContacts = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await fetch(`${BASE_URL}/contacts?q=${search}&_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

// src/api/contacts.js
export const addContact = async (contact) => {
  const response = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error('Failed to add contact');
  }
  return response.json();
};
export const getContactById = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
};

// We'll add update and delete functions later