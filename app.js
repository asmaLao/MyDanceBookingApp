require('dotenv').config();
const express =require('express');
const mustache = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
// Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set up the public folder 
const public = path.join(__dirname, 'public');
app.use(express.static(public));

// Set up mustache as view engine
app.engine('mustache', mustache());
app.set('view engine','mustache');
app.set('views',path.join(__dirname,'views'));
const router = require('./routes/appRoutes');
app.use('/', router);

//start server
const port = 9000;
app.listen(port, () => {
  console.log(`Server started on port ${port}. Ctrl^C to quit.`);
});

module.exports = app;
