/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Crew Routes */
const router = express.Router();

/* Require the Crew Model */
const Crew = require("../models/Crews.model"); // Adjust the path as necessary

/* ROUTES */

// POST '/api/crews' - Creates a new crew member
router.post("/crews", (req, res) => {
    const { name, birthday, email, phone, typerating, license, role, status, profilePicture } = req.body;

    Crew.create({ name, birthday, email, phone, typerating, license, role, status, profilePicture })
        .then(response => res.json({ crewId: response._id }))
        .catch(error => res.json(error));
});

// GET '/api/crews' - Reads all crew members
router.get("/crews", (req, res) => {
    Crew.find()
        .then(allCrews => res.json(allCrews))
        .catch(error => res.json(error));
});

// GET '/api/crews/:crewId' - Reads a specific crew member
router.get("/crews/:crewId", (req, res) => {
    const { crewId } = req.params;

    Crew.findById(crewId)
        .then(crewMember => res.json(crewMember))
        .catch(error => res.json(error));
});

// PUT '/api/crews/:crewId' - Updates a specific crew member
router.put("/crews/:crewId", (req, res) => {
    const { crewId } = req.params;
    const { name, birthday, email, phone, typerating, license, role, status, profilePicture } = req.body;

    Crew.findByIdAndUpdate(crewId, { name, birthday, email, phone, typerating, license, role, status, profilePicture }, { new: true })
        .then(updatedCrew => {
            res.json({ message: "Crew member updated!", updatedCrew });
        })
        .catch(error => {
            res.json({ message: "Failed to update crew member.", error });
        });
});

// DELETE '/api/crews/:crewId' - Deletes a specific crew member
router.delete('/crews/:crewId', (req, res) => {
    const { crewId } = req.params;

    Crew.findByIdAndDelete(crewId)
        .then(() => {
            res.json({ message: 'Crew member deleted' });
        })
        .catch(error => {
            res.json({ error: 'Failed to delete crew member', error });
        });
});

/* Export the router */
module.exports = router;
