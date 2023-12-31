const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  departureAirport: {
    type: String,
    required: true
  },
  arrivalAirport: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  aircraft: {
    type: String,
  },
  crew: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }],
  airline: {
    type: String,

  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Completed']
  },
  price: {
    type: Number,

  },
  duration: {
    type: Number,
    required: true
  }
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
