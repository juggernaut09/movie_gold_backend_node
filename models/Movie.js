const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  imdbId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  trailerLink: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrops: {
    type: Array,
    required: true
  },
  reviewIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Review'
  }
});

module.exports = mongoose.model('Movie', movieSchema);
