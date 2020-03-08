import express from "express";
import {check, validationResult} from "express-validator";
//import middlewares
import auth from "../middlewares/auth.middleware";
import authRole from "../middlewares/authRole.middleware";
//import models
import MovieModel from "../models/movie.model";
//init Router
const router = express.Router();

//@route    GET api/movies
//@desc     Get all movies
//@access   Public
router.get("/", async (req, res) => {
    try {
        const movies = await MovieModel.find({}).sort({created: -1});
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
        const movies = await MovieModel.find({category: "1"}).sort({created: -1});
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
        const movies = await MovieModel.find({category: "0"}).sort({created: -1});
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
        const movie = await MovieModel.findById(req.params.id);
        if (movie) {
            return res.json(movie);
        }
        return res.status(400).json({msg: "Movie doesn't exist"});
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/movies
//@desc     Add new movie
//@access   Private
// noinspection JSCheckFunctionSignatures
router.post(
    "/",
    [
        auth,
        authRole,
        [
            check("title", "title is required").not().isEmpty(),
            check("region", "region is required").not().isEmpty(),
            check("description", "description is required").not().isEmpty(),
            check("genre", "genre is required").not().isEmpty(),
            check("videoId", "videoId is required").not().isEmpty(),
            check("image", "image is required").not().isEmpty(),
            check("director", "director is required").not().isEmpty(),
            check("duration", "duration is required").not().isEmpty(),
            check("started", "started is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {title, region, description, genre, videoId, image, director, duration, started} = req.body;
        const createdBy = req["user"].id;
        const updatedBy = req["user"].id;

        try {
            const newStarted = new Date(started.toString());
            const currentDate = new Date();
            const category = (newStarted > currentDate) ? "0" : "1";

            const newMovie = new MovieModel({
                title,
                region,
                description,
                genre,
                videoId,
                image,
                category,
                director,
                duration,
                started,
                createdBy,
                updatedBy
            });

            const movie = await newMovie.save();

            return res.json({
                msg: "Create movie success.",
                item: movie
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).send("Server error");
        }
    }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
// noinspection JSCheckFunctionSignatures
router.put("/:id", [auth, authRole, [
    check("title", "title is required").not().isEmpty(),
    check("region", "region is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("genre", "genre is required").not().isEmpty(),
    check("videoId", "videoId is required").not().isEmpty(),
    check("image", "image is required").not().isEmpty(),
    check("director", "director is required").not().isEmpty(),
    check("duration", "duration is required").not().isEmpty(),
    check("started", "started is required").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {title, region, description, genre, videoId, image, director, duration, started} = req.body;
    const updatedBy = req["user"].id;
    const updated = new Date();

    try {
        const newStarted = new Date(started.toString());
        const currentDate = new Date();
        const category = (newStarted > currentDate) ? "0" : "1";
        const movie = await MovieModel.findById(req.params.id);

        if (movie) {
            const updateMovie = await MovieModel.findByIdAndUpdate(req.params.id, {
                title,
                region,
                description,
                genre,
                videoId,
                image,
                director,
                duration,
                started,
                category,
                updatedBy,
                updated
            }, {new: true});

            return res.json({
                msg: "Update movie success.",
                item: updateMovie
            });
        }
        return res.status(400).json({msg: "Movie doesn't exist."});
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", [auth, authRole], async (req, res) => {
    const {id} = req.params;

    try {
        const movie = await MovieModel.findById(id);
        if (movie) {
            await MovieModel.findByIdAndDelete(id);

            return res.json({msg: "Delete success."});
        }
        return res.status(400).json({msg: "Movie doesn't exist."});
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

export default router;