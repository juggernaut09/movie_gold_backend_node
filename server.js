const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 8080;

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).send({ message: 'Internal Server Error' });
  });

// const uri = "mongodb+srv://venkattejaravi:4n2rNmv3aQTXJt@cluster0.g0wz7mt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017/myDatabase"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Movie Routes
app.use('/api/v1/movies', movieRoutes);

// Review Routes
app.use('/api/v1/reviews', reviewRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
