const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories and their associated products
router.get('/', async (req, res) => {
  try {
    // Find all categories, including their associated products
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: 'not found!' });
  }
});

// GET a tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Category not found!" });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Category.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Category creation failed" });
  }
});

// Update a tag by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "No tag found with this id!" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Category update failed" });
  }
});


// Delete a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "No tag found with this id!" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Category deletion failed" });
  }
});

module.exports = router;
