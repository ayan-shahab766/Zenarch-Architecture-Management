const Project = require('../models/Project');

// @desc    Fetch featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ featured: true }).populate('category', 'name slug').limit(4);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
    try {
        const categoryFilter = req.query.category ? { category: req.query.category } : {};
        const projects = await Project.find({ ...categoryFilter }).populate('category', 'name slug');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('category', 'name slug');
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title || 'Sample Project',
            description: req.body.description || 'Sample description',
            category: req.body.category,
            location: req.body.location || 'Unknown',
            area: req.body.area || 'Unknown',
            year: req.body.year || '2026',
            coverImage: req.body.coverImage || '/uploads/sample.jpg',
            gallery: req.body.gallery || [],
            architect: req.body.architect || 'Zenarch Studio',
            featured: req.body.featured || false,
        });

        let createdProject = await project.save();
        // populate before sending back so client has category name
        createdProject = await createdProject.populate('category', 'name slug');
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            area,
            year,
            coverImage,
            gallery,
            architect,
            featured,
        } = req.body;

        const project = await Project.findById(req.params.id);

        if (project) {
            project.title = title || project.title;
            project.description = description || project.description;
            project.category = category || project.category;
            project.location = location || project.location;
            project.area = area || project.area;
            project.year = year || project.year;
            project.coverImage = coverImage || project.coverImage;
            project.gallery = gallery || project.gallery;
            project.architect = architect || project.architect;
            project.featured = featured !== undefined ? featured : project.featured;

            let updatedProject = await project.save();
            updatedProject = await updatedProject.populate('category', 'name slug');
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project removed' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getFeaturedProjects,
};
