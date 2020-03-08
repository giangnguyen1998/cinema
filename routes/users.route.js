import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import {check, validationResult} from "express-validator";
//import middleware
import auth from "../middlewares/auth.middleware";
//import models
import UserModel from "../models/user.model";
//init Router
const router = express.Router();

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post("/", [
    check("name", "Please add name")
        .not()
        .isEmpty(),
    check("email", "Please include a valid email")
        .isEmail(),
    check("password", "Please enter a password with 6 or more characters")
        .isLength({min: 6}),
    check("phone", "Please enter a phone number with 10 characters")
        .not()
        .isEmpty()
        .isLength({min: 10, max: 10})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, role, phone} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new UserModel({
            name,
            email,
            password,
            phone,
            role
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
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

//@route    PUT api/users/:id
//@desc     Update user
//@access   Private
// noinspection JSCheckFunctionSignatures
router.put("/:id", [
    auth, [
        check("name", "Please add name")
            .not()
            .isEmpty(),
        check("phone", "Please enter a phone number with 10 characters")
            .not()
            .isEmpty()
            .isLength({min: 10, max: 10})
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, password, phone} = req.body;
    const updated = new Date();

    try {
        let user = await UserModel.findById(req.params.id);

        if (user) {
            let data = {};

            if (password !== "") {
                const salt = await bcrypt.genSalt(10);

                const hashPassword = await bcrypt.hash(password, salt);

                data = {
                    name,
                    password: hashPassword,
                    phone,
                    updated
                };
            } else {
                data = {
                    name,
                    phone,
                    updated
                }
            }

            const updateUser = await UserModel.findByIdAndUpdate(req.params.id, data, {new: true});

            const payload = {
                user: {
                    id: updateUser.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        msg: "Update user success.",
                        token: token
                    });
                });

        } else {
            return res.status(400).json({msg: "User doesn't exists."});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;