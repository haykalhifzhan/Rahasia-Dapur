import api from './api';

// Simpan user ke localStorage
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Ambil user dari localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Hapus user (logout)
export const logout = () => {
  localStorage.removeItem('user');
};

// Register user
export const register = (email, password) => {
  return api.post('/auth/register', { email, password });
};

// Login user
export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};