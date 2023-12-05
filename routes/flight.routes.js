/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");
/* Configure an Express Router for the Flight Routes */
const router = express.Router();
/* Require the Flight Model */
const Flight = require("../models/Flights.model"); // Adjust the path as necessary

/* ROUTES */
// POST '/api/flight' - Creates a new flight
router.post("/flights", (req, res) => {
  const { flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, /* aircraft, crew, */ airline, status, price, duration } = req.body;
  Flight.create({ flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime,/*  aircraft, crew, */ airline, status, price, duration })
    
  .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/api/flights' - Reads all flights
router.get("/flights", (req, res) => {
  Flight.find()
    /* .populate('aircraft crew') // Populate aircraft and crew details */
    .then((allFlights) => res.json(allFlights))
    .catch((error) => res.json(error));
});

// GET '/api/flights/:flightId' - Reads a specific flight
router.get('/flights/:flightId', (req, res) => {
  Flight.findById(req.params.flightId)
      .populate('crew') // This will include crew member details
      .then(flight => res.json(flight))
      .catch(err => res.status(500).json(err));
});

// PUT '/api/flights/:flightId' - Updates a specific flight
router.put("/flights/:flightId", (req, res) => {
  const { flightId } = req.params;
  const { flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, /* aircraft, crew, */ airline, status, price, duration } = req.body;
  Flight.findByIdAndUpdate(flightId, { flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, /* aircraft, crew, */ airline, status, price, duration }, { new: true })
    .then((updatedFlight) => {
      res.json({ message: "Flight Updated!", updatedFlight });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update Flight.", error });
    });
});

// DELETE '/api/flights/:flightId' - Deletes a specific flight
router.delete('/flights/:flightId', (req, res) => {
  const { flightId } = req.params;
  Flight.findByIdAndDelete(flightId)
    .then(() => {
      res.json({ message: 'Flight deleted successfully' });
    })
    .catch((error) => {
      res.json({ error: 'Failed to delete Flight', error });
    });
})
/* Export the router */
module.exports = router;
