import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import {check, validationResult} from "express-validator";
//import middlewares
import auth from "../middlewares/auth.middleware";
//import models
import UserModel from "../models/user.model";
//init Router
const router = express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req["user"].id).select("-password").exec();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if (!user) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({token});
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;