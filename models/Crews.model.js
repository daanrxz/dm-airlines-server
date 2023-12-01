const mongoose = require('mongoose');
const { Schema } = mongoose;


const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: '' 
  },
  birthday: {
    type: Date,

  },
  typerating: {
    type: String,
    enum: ['A319/320/321', 'A330', 'A350']
  },

  email: {
    type: String
  },
  phone: {
    type: Number
  },
  license: {
    type: Date
  },
  role: {
    type: String,
    required: true,
    enum: ['Pilot', 'Co-Pilot', 'Flight Attendant', 'Engineer']
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'On Leave', 'Retired']
  }
});

const Crew = mongoose.model('Crew', crewSchema);
module.exports = Crew;

