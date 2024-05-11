import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number
    }
})

const Book = mongoose.model("Book", bookSchema);

export default Book