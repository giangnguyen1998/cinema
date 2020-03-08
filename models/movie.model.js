import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    started: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const MovieModel = mongoose.model("movie", MovieSchema);

export default MovieModel;