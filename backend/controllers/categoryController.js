const Category = require('../models/Category');
const Project = require('../models/Project');

// @desc    Fetch all categories with project count
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find({}).lean();

        const categoriesWithCount = await Promise.all(
            categories.map(async (cat) => {
                const count = await Project.countDocuments({ category: cat._id });

                return {
                    ...cat,
                    projectCount: count
                };
            })
        );

        res.json(categoriesWithCount);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');

        const categoryExists = await Category.findOne({ slug });

        if (categoryExists) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }

        const category = await Category.create({ name, slug });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: 'Category removed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
};
