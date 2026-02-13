import api from './api';

// Ambil semua resep
export const getRecipes = () => {
  return api.get('/recipes');
};

// Ambil detail resep berdasarkan ID
export const getRecipeById = (id) => {
  return api.get(`/recipes/${id}`);
};