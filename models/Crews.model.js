const mongoose = require('mongoose');
const { Schema } = mongoose;


const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Pilot', 'Co-Pilot', 'Flight Attendant', 'Engineer']
  },
  id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'On Leave', 'Retired']
  }
});

const Crew = mongoose.model('Crew', crewSchema);
module.exports = Crew;

