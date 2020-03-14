import express from "express";
import {check, validationResult} from "express-validator";
//import model
import CinemaModel from "../models/cinema.model";
//import middleware
import auth from "../middlewares/auth.middleware";
import authRole from "../middlewares/authRole.middleware";
//init Router
const router = express.Router();

//@route    GET api/cinemas
//@desc     Get all cinemas
//@access   Public
router.get("/", async (req, res) => {
    try {
        const cinemas = await CinemaModel.find({}).sort({created: -1}).exec();
        res.json(cinemas);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/cinemas
//@desc     create a cinema
//@access   Private
// noinspection JSCheckFunctionSignatures
router.post("/",
    [
        auth, authRole,
        [
            check("name", "Name cinema is required.")
                .not()
                .isEmpty(),
            check("seatsAvailable", "seatsAvailable is numeric.")
                .isNumeric(),
            check("address", "Address is required.")
                .not()
                .isEmpty(),
            check("star", "Star is numeric.")
                .isNumeric(),
            check("city", "City is required.")
                .not()
                .isEmpty(),
            check("image", "Image is required.")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({msg: errors.array()});
        }

        const {name, seatsAvailable, address, star, city, image} = req.body;
        const createdBy = req["user"].id;
        const updatedBy = req["user"].id;

        try {
            const newCinema = new CinemaModel({
                name,
                seatsAvailable,
                address,
                star,
                city,
                image,
                createdBy,
                updatedBy
            });

            const cinema = await newCinema.save();

            return res.json({
                msg: "Create movie success.",
                item: cinema
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).send("Server error");
        }
    }
);

export default router;