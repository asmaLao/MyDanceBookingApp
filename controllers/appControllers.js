const AppModel = require('../models/appModel');
const db = new AppModel('./data/users.db');
console.log('Model loaded.');
// Render the login form
exports.showLogin=(req,res)=>{
    res.render('login', {title: 'Organiser Login'});

};
// Handles form submission and validates login
exports.handleLogin = (req, res) => {
    const { username, password } = req.body;
    console.log("Login submitted:", username, password);
    db.validateUser(username, password)
      .then(user => {
        if (user) {
          // Login successful
          console.log('Login success:', user.username);
          res.redirect('/organiser'); // this page will be created later
        } else {
          // Invalid login
          res.render('login', {
            title: 'Login Failed',
            message: 'Invalid username or password'
          });
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        res.status(500).send('Internal Server Error');
      });
  };

  exports.showOrganiserDashboard = (req, res) => {
    res.render('organiser', { title: 'Organiser Dashboard' });
  };

  exports.showAddCourseForm = (req, res) => {
    res.render('addCourse', { title: 'Add New Course' });
  };
  exports.handleAddCourse = (req, res) => {
    const { name, description, duration, startDate, time, price, location } = req.body;
  
    db.addCourse(name, description, duration, startDate, time,  price, location)
      .then(() => {
        res.redirect('/organiser');
      })
      .catch((err) => {
        console.error('Error adding course:', err);
        res.status(500).send('Internal Server Error');
      });
  };

  exports.showAllCourses = (req, res) => {
    db.getAllCourses()
      .then(courses => {
        res.render('courses', { title: 'All Courses', courses });
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  // reder the organiser course management page 
exports.showOrganiserCourses = (req, res) => {
    db.getAllCourses()
      .then(courses => {
        res.render('organiserCourses', {
          title: 'Manage Courses',
          courses: courses
        });
      })
      .catch(err => {
        console.error('Error fetching courses for organiser:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  
  
  
  exports.deleteCourse = (req, res) => {
    const courseId = req.body.id;
  
    db.deleteCourse(courseId)
      .then(() => {
        console.log(`Course ${courseId} deleted`);
        res.redirect('/organiser/courses');
      })
      .catch(err => {
        console.error('Delete failed:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  // show the edit course form
exports.showEditForm = (req, res) => {
    const courseId = req.params.id;
  
    db.getCourseById(courseId)
      .then(course => {
        res.render('editCourse', {
          title: 'Edit Course',
          course: course
        });
      })
      .catch(err => {
        console.error('Error loading course:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  // handle the update POST request
  exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const { name, description, duration, startDate, time, price, location } = req.body;
  
    db.updateCourse(courseId, {
      name,
      description,
      duration,
      startDate,
      time,
      price: parseFloat(price),
      location
    })
      .then(() => {
        res.redirect('/organiser/courses');
      })
      .catch(err => {
        console.error('Error updating course:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  // show enrolment form
exports.showEnrolForm = (req, res) => {
    const courseId = req.params.id;
  
    db.getCourseById(courseId)
      .then(course => {
        res.render('enrolForm', {
          title: 'Course Enrolment',
          course: course
        });
      })
      .catch(err => {
        console.error('Error loading enrolment form:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  // handle enrolment submission
  exports.handleEnrolment = (req, res) => {
    const courseId = req.params.id;
    const { name, email } = req.body;
  
    db.addEnrolment(courseId, name, email)
      .then(() => {
        res.send(`<p>Thank you for enrolling, ${name}! <a href="/courses">Back to courses</a></p>`);
      })
      .catch(err => {
        console.error('Enrolment error:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  exports.showClassList = (req, res) => {
    const courseId = req.params.id;
  
    db.getCourseById(courseId)
      .then(course => {
        db.getEnrolmentsByCourse(courseId)
          .then(enrolments => {
            res.render('classList', {

              title: 'Class List',
              heading: `Participants for ${course.name}`,
              course,
              enrolments
            });
          });
      })
      .catch(err => {
        console.error('Error showing class list:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  // Show organiser management page
exports.showOrganiserManagement = (req, res) => {
    db.getAllOrganisers()
      .then(organisers => {
        res.render('manageOrganisers', {
          title: 'Manage Organisers',
          organisers
        });
      })
      .catch(err => {
        console.error('Error fetching organisers:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  // Add new organiser
  exports.addOrganiser = (req, res) => {
    const { username, password } = req.body;
    db.addOrganiser(username, password)
      .then(() => res.redirect('/organisers'))
      .catch(err => {
        console.error('Error adding organiser:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  // Delete organiser
  exports.deleteOrganiser = (req, res) => {
    const organiserId = req.body.id;
    db.deleteOrganiser(organiserId)
      .then(() => res.redirect('/organisers'))
      .catch(err => {
        console.error('Error deleting organiser:', err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  
  