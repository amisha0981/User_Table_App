// server file
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./Route/user');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);


app.get("/", (req, res) => {
  res.send("hello world i am here to help you!!");  
});

mongoose.connect(process.env.DB).then(() => {
  console.log("mongodb is connected!!");
}).catch((error) => {
  console.log(error);
});

const port = process.env.PORT || 5000;

app.listen(port,function () {
  console.log(`server is running on port ${port} `);
});

