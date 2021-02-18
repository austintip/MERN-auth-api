const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models')
const router = express.Router();

// URL prefix - /api

// Signup - POST /api/signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }))
        .then(createdUser => res.json(createdUser))
        .catch(err => {
            console.log(`🔥 Error in the POST signup:`, err);
            res.json({ error: err });
        });
});

// Login - POST /api/login
router.post('/login', (req, res) => {
    res.json({ message: 'LOGIN POST' });
});

module.exports = router;