// routes/recipe.routes.js
const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil resep.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Resep tidak ditemukan.' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil detail.' });
  }
});

module.exports = router;