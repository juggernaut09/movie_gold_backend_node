const express = require('express');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const {reviewBody} = req.body;
        const {imdbId} = req.body;
        const review = new Review({body : reviewBody});
        const response = await review.save();

        const updateMovie = await Movie.findOneAndUpdate(
            {imdbId},
            {$push : {reviewIds : new ObjectId(response._id)}}
        )
        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
})

router.get('/:reviewId', async (req, res, next) => {
    try{
        const {reviewId} = req.params;
        const response = await Review.findById(new ObjectId(reviewId));
        if(!response){
            next({
                "error": "Invalid reviewId"
            });
        }
        res.status(200).json(response);

    } catch(error) {
        next(error);
    }
    

});

router.get('/details/:imdbId', async(req, res, next) => {
    try{
        const {imdbId} = req.params;
        const response = await Movie.findOne({imdbId});
        if(!response){
            next({
                "message" : "Invalid imdbId"
            })
        }
        const reviewIds = response.reviewIds;
        const reviewTexts = [];

        for (const reviewId of reviewIds) {
            const reviewResponse = await Review.findById(reviewId);
            reviewTexts.push(reviewResponse.body);
        }
        res.status(200).json(reviewTexts);

    } catch(error) {
        next(error);
    }
});

module.exports = router;