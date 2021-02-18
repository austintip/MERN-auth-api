const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models')
const router = express.Router();
const { createUserToken } = require('../middleware/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken')

// URL prefix - /api

// Signup - POST /api/signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }))
        .then(createdUser => res.status(201).json({
            token: createUserToken(req, createdUser),
            user: createdUser
        }))
        .catch(err => {
            console.log(`🔥 Error in the POST signup:`, err);
            res.status(401).json({ error: err.message });
        });
});

// Login - POST /api/login
router.post('/login', (req, res) => {
    // if login  details are correct
    db.User.findOne({ email: req.body.email })
        .then(user => {
            // create and send a token via createUserToken
            res.status(201).json({
                token: createUserToken(req, user),
                user: user
            });
        }).catch(err => {
            //send an error
            console.log(`🔥 Error in the POST login route`)
            res.status(401).json({
                error: err.message
            })
        })
});

// GET  /api/private - Test route
router.get(
    '/private',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.status(200).json({
            message: 'Thou hast been granted permission to access this message'
        })
    }
)

//PUT - /api/user
router.put(
    '/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // get the token from the req headers
        let token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        // decode the token to get those sweet payload deets
        // update a uer based on the id form token and update info from body
        db.User.findByIdAndUpdate(decoded.id, { name: req.body.name })
        .then(user => {
            res.status(201).json(user);
        });
    });


module.exports = router;