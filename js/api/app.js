const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

const timelineRoutes = require('./routes/timelines');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

// Connecting to MongoDB Atlas (cloud db)
mongoose.connect(
  "mongodb+srv://hci-project:hci-project@hci-psmmo.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

// Middlewhare to Parse the request json body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// CORS header inclusion
app.use((req, res, next) => {
  console.log("seee")
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Expose-Headers", 'x-auth-token');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

        return res.status(200).json({});
    }
    next();
  });

// Redirect requests made to '/timeline' to timeline.js routes.
app.use('/timeline', timelineRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

// Error message handling.
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;