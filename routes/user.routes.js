const express = require('express');
const router = express.Router();

// Import the User model
const User = require('../models/User.model');

// Middleware to check if the user is authenticated
const { isAuthenticated } = require('../middleware/jwt.middleware');

// PUT /user/edit-profile - Updates a user's profile
router.put('/edit-profile/', isAuthenticated, (req, res, next) => {
    const { name, picture, email, birthday } = req.body;
    const userId = req.payload._id; // Assuming the user's ID is stored in the JWT payload

    User.findByIdAndUpdate(userId, { name, email,picture, birthday }, { new: true })
        .then(updatedUser => {
            // Omit the password and other sensitive info in the response
            const { email, name, picture, birthday } = updatedUser;
            res.status(200).json({ email, name, picture, birthday });
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

module.exports = router;
