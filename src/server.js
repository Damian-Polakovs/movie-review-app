const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const reviewSchema = new mongoose.Schema({
  movieId: Number,
  reviewer: String,
  comment: String,
  rating: Number
});

const Review = mongoose.model('Review', reviewSchema);

mongoose.connect('mongodb+srv://s00236491:<kavrom-tibtU8-radsiz>@movie-list-app.tuqbz2f.mongodb.net/?retryWrites=true&w=majority&appName=movie-list-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
