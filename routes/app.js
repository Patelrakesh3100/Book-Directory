import { Router } from "express";
import Book from "../models/book.model.js";

const bookRoute = Router();

//Find Book directory in the data_base
bookRoute.get("/", async (req, res) => {
    try {
        const findBookData = await Book.find();
        if (findBookData) {
            res.status(200).json({ message: "Show the Book directory", data: findBookData })
        } else {
            res.status(500).json({ message: "No Book data found in the directory!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
})

//Create the new data in book directory
bookRoute.post("/book", async (req, res) => {
    const { title, author, ISBN, price } = req.body;
    try {
        //    const existingData =await Book.findOne({
        //         $or : [{title},{ISBN}]
        //     });

        const existingData = await Book.findOne({ ISBN });
        if (existingData) {
            res.status(404).json({ message: "Already Book data exitsted in the database." })
        } else {
            const createData = await Book.create({ title, author, ISBN, price });
            res.status(201).json({ success: 1, message: "Book Data saved in the DataBase", data: createData })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }

})

//Update the book data
bookRoute.put("/update/:_id", async (req, res) => {
    const { _id } = req.params;
    const { title, author, price } = req.body;
    try {
        const updateBookData = await Book.findByIdAndUpdate({ _id }, { title, author, price }, { new: true });
        if (updateBookData) {
            res.status(201).json({ success: 1, message: "Book data is modified successfully.", data: updateBookData });
        } else {
            res.status(404).json({ success: 0, message: "Book Data not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
})

//Delete the book directory
bookRoute.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const bookDelete = await Book.findByIdAndDelete({ _id });
        if (bookDelete) {
            res.status(200).json({ success: 1, message: "Book data is deleted success", data: bookDelete });
        } else {
            res.status(404).json({ message: "Book data not found & already deleted!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error });
    }
})

export default bookRoute;