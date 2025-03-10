const express = require('express');
const authController = require('../controllers/authController'); // Import controller

const router = express.Router();

// Endpoint untuk registrasi
router.post('/register', authController.register);

// Endpoint untuk login
router.post('/login', authController.login);

module.exports = router;