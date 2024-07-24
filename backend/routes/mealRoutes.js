const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/meals/:id', getMeal, (req, res) => {
  res.json(res.meal);
});

router.post('/meals', async (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    ingredients: req.body.ingredients,
    calories: req.body.calories,
    protein: req.body.protein,
    carbs: req.body.carbs,
    fats: req.body.fats
  });

  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/meals/:id', getMeal, async (req, res) => {
  if (req.body.name != null) {
    res.meal.name = req.body.name;
  }
  if (req.body.ingredients != null) {
    res.meal.ingredients = req.body.ingredients;
  }
  if (req.body.calories != null) {
    res.meal.calories = req.body.calories;
  }
  if (req.body.protein != null) {
    res.meal.protein = req.body.protein;
  }
  if (req.body.carbs != null) {
    res.meal.carbs = req.body.carbs;
  }
  if (req.body.fats != null) {
    res.meal.fats = req.body.fats;
  }

  try {
    const updatedMeal = await res.meal.save();
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/meals/:id', getMeal, async (req, res) => {
  try {
    await res.meal.remove();
    res.json({ message: 'Deleted Meal' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMeal(req, res, next) {
  let meal;
  try {
    meal = await Meal.findById(req.params.id);
    if (meal == null) {
      return res.status(404).json({ message: 'Cannot find meal' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.meal = meal;
  next();
}

module.exports = router;
