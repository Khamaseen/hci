const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

const timelineRoutes = require('./routes/timelines');
const postRoutes = require('./routes/posts');

// Connecting to MongoDB Atlas (cloud db)
mongoose.connect(
  "mongodb+srv://hci-project:hci-project@hci-psmmo.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

// Middlewhare to Parse the request json body
app.use(bodyParser.json());

// CORS header inclusion
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

// Redirect requests made to '/timeline' to timeline.js routes.
app.use('/timeline', timelineRoutes);
app.use('/post', postRoutes);

// Error message handling.
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;