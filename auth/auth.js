require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDAO = require('../models/UserDAO');

exports.login = function (req, res, next) {
  const { username, password } = req.body;
  userDAO.lookupOrganiser(username)
    .then(user => {
      if (!user) {
        return res.render('login', { title: 'Login Failed', message: 'Invalid username or password' });
      }
      console.log('User found:', user);

      return bcrypt.compare(password, user.password).then(match => {
        if (!match) {
          console.log('Password mismatch for user:', username);  
          return res.render('login', { title: 'Login Failed', message: 'Invalid username or password' });
        }
      const payload = { username: user.username };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.cookie('jwt', accessToken);
      next();
    });
 })
    .catch(err => {
      console.error('Login error:', err);
      res.status(500).send('Internal Server Error');
    });
};

exports.verify = function (req, res, next) {
  console.log('JWT from cookie:', req.cookies.jwt);  
  const accessToken = req.cookies.jwt;
  if (!accessToken) {
    
    return res.status(403).send();
  }
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
   
   res.status(401).send();
  }
};
