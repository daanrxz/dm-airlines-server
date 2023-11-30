const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Crew Routes */
const router = express.Router();

/* Require the Aircraft Model */
const Aircraft = require("server/models/aircrafts.model.js");

/* ROUTES */

// POST /api/aircraft
router.post("/aircraft", (req, res) => {
    const { id, model, manufactory, registrationNumber, capacity, rage, yearOfManufacture, status, lastMaintenanceDate } = req.body;

    router.create({ id, model, manufactory,     registrationNumber, capacity, rage, yearOfManufacture, status, lastMaintenanceDate })
        .then((response) => res.json(response))
        .catch((error) => res.json(error));
});

// GET '/api/aircraft' - Reads all aircraft
router.get("/aircraft", (req, res) => {
    Aircraft.find()
        .then((allAircrafts) => res.json(allAircrafts))
        .catch((error) => res.json(error));
});

// GET '/api/aircraft/:aircraftId' - Reads a specific aircraft
router.get("/aircraft/:aircraftId", (req, res) => {
    const { aircraftId } = req.params;
    Aircraft.findById(aircraftId)
        .then((aircraft) => res.json(aircraft))
        .catch((error) => res.json(error));
});

// PUT '/api/aircraft/:aircraftId' - Updates a specific aircraft
router.put("/aircraft/:aircraftId", (req, res) => {
    const { aircraftId } = req.params;
    const { id, model, manufactory, registrationNumber, capacity, rage, yearOfManufacture, status, lastMaintenanceDate } = req.body;

    Aircraft.findByIdAndUpdate(aircraftId, { id, model, manufactory, registrationNumber, capacity, rage, yearOfManufacture, status, lastMaintenanceDate }, { new: true })
        .then(() => {
            res.json({ message: "Aircraft updated!" });
        })
        .catch((error) => {
            res.json({ message: "Failed to update the aircraft." });
        });
});

// DELETE '/api/aircraft/:aircraftId' - Updates a specific crew member
router.put("/aircraft/:aircraftId", (req, res) => {
    const { aircraftId } = req.params;
    const { id, model, manufactory, registrationNumber, capacity, rage, yearOfManufactory, status, lastMaintenanceDate } = req.body; /* ? */

    Aircraft.findByIdAndUpdate(aircraftId, { id, model, manufactory, registrationNumber, capacity, rage, yearOfManufactory, status, lastMaintenanceDate }, { new: true })
        .then(() => {
            res.json({ message: "Aircraft updated!" });
        })
        .catch((error) => {
            res.json({ message: "Failed to update the aircraft." });
        });
});

// DELETE '/api/aircraft/:aircraftId' - Deletes a specific aircraft
router.delete('/aircraft/:aircraftId', (req, res) => {
    const { aircraftId } = req.params;

    Aircraft.findByIdAndDelete(aircraftId)
        .then(() => {
            res.json({ message: 'Aircraft deleted' });
        })
        .catch(() => {
            res.json({ error: 'Failed to delete aircraft' });
        });
});

module.exports = router;