import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Car name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Car category is required'],
        trim: true,
    },
    tankCapacity: {
        type: Number,
        required: [true, 'Car tank capacity is required']
    },
    average: {
        type: Number,
        required: [true, 'Car average KM is required']
    },
    transmission: {
        enum: ['auto', 'manual'],
    },
    capacity: {
        type: Number,
        required: [true, 'Car capacity is required']
    },
    isRented: {
        type: Boolean,
        default: false
    },
    priceForDay: {
        type: Number,
        required: [true, 'Car price for day is required']
    },
});

const Car = mongoose.model("Car", carSchema);

export default Car;