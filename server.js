
// const express = require('express')
// const dotenv = require("dotenv").config();
// const app = express()
// const port = process.env.PORT || 5002;

// app.use("/api/contacts", require("./routes/contactRoutes"));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// }) 
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5002;
 
// Middleware to parse JSON
app.use(express.json());

// Route handling
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 
