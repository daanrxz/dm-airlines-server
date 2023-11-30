const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const aircraftSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  range: {
    type: Number,
    required: true
  },
  yearOfManufacture: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Maintenance', 'Retired']
  },
  lastMaintenanceDate: {
    type: Date
  }
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);
module.exports = Aircraft;