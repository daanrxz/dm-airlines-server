const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.put('/edit-profile/', isAuthenticated, (req, res, next) => {
    const { name, picture, birthday } = req.body;
    const userId = req.payload._id;

    User.findByIdAndUpdate(userId, { name, picture, birthday }, { new: true })
        .then(updatedUser => {
            const { email, name, picture, birthday } = updatedUser;
            res.status(200).json({ email, name, picture, birthday });
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

module.exports = router;
