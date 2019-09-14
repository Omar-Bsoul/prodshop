const express = require('express');
const mongoose = require('mongoose');

module.exports = options => {
  const router = express.Router();
  const Product = mongoose.model('products');

  const { validateObjectId, validateNewProduct } = require('../validators/index');

  router.get('/', async (req, res) => {
    const department = req.query.department;
    if (department) {
      if (validateObjectId(department)) {
        const products = await Product.find({ department: mongoose.Types.ObjectId(department) });
        res.send(products);
      } else {
        res.status(400).send(global.resources.invalidId);
      }
    } else {
      const products = await Product.find({});
      res.send(products);
    }
  });

  router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send(global.resources.resourceNotFound);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const product = new Product(await validateNewProduct(req.body));
      res.status(201).send(await product.save());
    } catch (error) {
      if (error.isJoi) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(global.resources.internalServerError);
      }
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        const validatedProduct = await validateNewProduct(req.body);
        const { name, description, price, pictures } = validatedProduct;
        product.name = name;
        product.description = description;
        product.price = price;
        product.pictures = pictures;

        res.send(await product.save());
      } else {
        res.status(404).send(global.resources.resourceNotFound);
      }
    } catch (error) {
      if (error.isJoi) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(global.resources.internalServerError);
      }
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount) {
        res.send(product);
      } else {
        res.status(404).send(global.resources.resourceNotFound);
      }
    } catch (error) {
      res.status(500).send(global.resources.internalServerError);
    }
  });

  return router;
};
