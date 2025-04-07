const AppModel = require('../models/appModel');
const db = new AppModel('./data/users.db');
console.log('Model loaded. Calling db.init()');
db.init();
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