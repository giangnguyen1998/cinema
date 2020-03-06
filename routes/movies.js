const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");

const Movie = require("../models/Movie");

//@route    GET api/movies
//@desc     Get all movies
//@access   Public
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({created: -1});
        res.json(movies);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/movies/nowShowing
//@desc     Get all movies now showing
//@access   Public
router.get("/nowShowing", async (req, res) => {
    try {
        const movies = await Movie.find({category: "1"}).sort({created: -1});
        res.json(movies);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/movies/comingSoon
//@desc     Get all movies coming soon
//@access   Public
router.get("/comingSoon", async (req, res) => {
    try {
        const movies = await Movie.find({category: "0"}).sort({created: -1});
        res.json(movies);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/movies/:id
//@desc     Get movie
//@access   Public
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/movies
//@desc     Add new movie
//@access   Private
router.post(
    "/",
    [
        auth,
        [
            check("title", "title is required").not().isEmpty(),
            check("region", "region is required").not().isEmpty(),
            check("description", "description is required").not().isEmpty(),
            check("genre", "genre is required").not().isEmpty(),
            check("videoId", "videoId is required").not().isEmpty(),
            check("image", "image is required").not().isEmpty(),
            check("director", "director is required").not().isEmpty(),
            check("duration", "duration is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        const {title, region, description, genre, videoId, image, director, duration} = req.body;
        const createdBy = req.user.id;
        const updatedBy = req.user.id;

        try {
            const newMovie = new Movie({
                title,
                region,
                description,
                genre,
                videoId,
                image,
                director,
                duration,
                createdBy,
                updatedBy
            });

            const movie = await newMovie.save();

            res.json(movie);
        } catch (e) {
            console.error(e.message);
            res.status(500).send("Server error");
        }
    }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", (req, res) => {
    res.send("Update contact");
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", (req, res) => {
    res.send("Delete contact");
});

module.exports = router;