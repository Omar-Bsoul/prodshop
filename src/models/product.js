const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', ProductSchema);
