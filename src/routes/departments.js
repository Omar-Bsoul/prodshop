const express = require('express');
const mongoose = require('mongoose');

module.exports = options => {
  const router = express.Router();
  const Department = mongoose.model('departments');

  router.get('/', async (req, res) => {
    const departments = await Department.find({});
    res.send(departments);
  });

  router.get('/:id', async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
      res.send(department);
    } else {
      res.status(404).send(global.resources.resourceNotFound);
    }
  });

  return router;
};
