const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();
const appController = require('../controllers/appControllers');

// homepage
router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to MyDanceBookingApp!' });
});

// login page
router.get('/login', appController.showLogin);
// router.post('/login', appController.handleLogin)
router.post('/login', auth.login, appController.showOrganiserDashboard);


// Logout
router.get('/logout', appController.handleLogout);

// organiser page
router.get('/organiser', auth.verify, appController.showOrganiserDashboard);
//management page
router.get('/organiser/courses', auth.verify, appController.showOrganiserCourses);


// addCourse page
router.get('/courses/new', auth.verify, appController.showAddCourseForm);
router.post('/courses/new', auth.verify, appController.handleAddCourse);

//cources page
router.get('/courses', appController.showAllCourses);
router.post('/courses/delete', auth.verify,  appController.deleteCourse);

// edit page
router.get('/courses/edit/:id', auth.verify, appController.showEditForm);
router.post('/courses/edit/:id', auth.verify, appController.updateCourse);
// enrolement
router.get('/courses/enrol/:id', appController.showEnrolForm);
router.post('/courses/enrol/:id', appController.handleEnrolment);

//class list
router.get('/courses/:id/classlist', appController.showClassList);

// View and manage organisers
router.get('/organisers', auth.verify,  appController.showOrganiserManagement);

//router.get('/organisers', auth.verify,  appController.showOrganiserManagement);
router.post('/organisers/add', auth.verify, appController.addOrganiser);
router.post('/organisers/delete', auth.verify,  appController.deleteOrganiser);

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
