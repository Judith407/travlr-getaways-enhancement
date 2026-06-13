const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken');


// Shows the JWT Protection
function authenticateJWT(req, res, next) {

    const authHeader = req.headers['authorization'];

    if (authHeader == null) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(401).json('Token Validation Error!');
        }

        req.auth = verified;
        next();
    });
}

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);


// Adding and updating trips are protected
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;