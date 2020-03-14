import mongoose from "mongoose";

const CinemaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
    isActive: {
        type: Boolean,
        default: true
    }
});

const CinemaModel = mongoose.model("cinema", CinemaSchema);

export default CinemaModel;