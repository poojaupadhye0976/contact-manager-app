export const BASE_URL = 'http://localhost:3001/api';

export const getContacts = async ({ page = 1, limit = 8, search = '' }) => {
  let url = `${BASE_URL}/contacts?_page=${page}&_limit=${limit}&_sort=name`;
  
  if (search) {
    url += `&name_like=${search}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 8);
  const data = await response.json();
  
  return {
    data,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
};
export const getContactById = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
};

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

export const updateContact = async ({ id, ...contact }) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  return response.json();
};

export const deleteContact = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
  return id;
};