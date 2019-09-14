const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    name: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('departments', DepartmentSchema);
