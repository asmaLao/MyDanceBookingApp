const express = require('express');
const router = express.Router();
const appController = require('../controllers/appControllers');
// Homepage
router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to MyDanceBookingApp!' });
});

// Login page
router.get('/login', appController.showLogin);
router.post('/login', appController.handleLogin)


// Default 404 handler
router.use((req, res) => {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found');
});
  
  // Default 500 handler
  router.use((err, req, res, next) => {
    res.status(500);
    res.type('text/plain');
    res.send('500 Internal Server Error');
});
  
  module.exports = router;
