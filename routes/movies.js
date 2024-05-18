const express = require('express');
const Movie = require('../models/Movie');
const movies_data = require('../utils/constants');

const router = express.Router();
// /api/v1/movies

router.get('/', async (req, res) => {
    try {   
        const movies = await Movie.find();
        if(movies.length === 0) {
        const _response = await Movie.insertMany(movies_data.movies_data);
        const new_movies = await Movie.find();
        res.status(200).json(new_movies);
        } else {
            res.status(200).json(movies);
        }
        
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/:imdbId', async(req, res) => {
    try {
        const {imdbId} = req.params;
        const movie = await Movie.findOne({ imdbId });
        if(!movie){
            res.status(404).send({message: "Movie Not Found!"});
        }
        res.status(200).json(movie);
    }
    catch (err){
        res.status(500).send(err);
    }
})

router.post('/', async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.post('/bulk', async (req, res) => {
    try {   
        const movies = req.body;
        await Movie.insertMany(movies);
        res.status(201).send({
            "Bulk Insertion" : "Success"
        });
    } catch(err) {
        res.status(400).send(error);
    }
});

module.exports = router;