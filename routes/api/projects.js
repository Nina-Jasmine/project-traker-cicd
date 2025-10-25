const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

// ✅ GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new project
router.post('/', async (req, res) => {
  try {
    const { name, dueDate, course, status } = req.body;

    // Basic validation
    if (!name || !course) {
      return res.status(400).json({ message: 'Project name and course are required.' });
    }

    // Create new project
    const newProject = await Project.create({
      name,
      dueDate,
      course,
      status
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
});

//put /api/projects/:id - update project by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete /api/projects/:id - delete project by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
