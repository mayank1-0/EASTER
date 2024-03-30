const db = require("../db/models");
const Books = db.Books;
const fs = require('fs');

// populate Book
const populateBook = async (req, res) => {
    try {
        const filePath = '../EASTER/public/json/books.json'; // Actual file path
        fs.readFile(filePath, async (err, data) => {
            if (err) {
                throw err;
            }
            const jsonData = JSON.parse(data);
            // Process the data as needed
            for (let key in jsonData) {
                console.log(jsonData[key].query);
                await db.sequelize.query(jsonData[key].query);
            }
        });
        res.status(200).send({ status: 200, message: "Successfully initiated Book table's data", success: true });
    }
    catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" })
    }
}
// C (Create)
const createBook = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Books.create(postData);
        res.status(200).send({
            status: 200,
            data: postData,
            message: "Book created successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// R (Read)
const fetchAllBook = async (req, res) => {
    try {
        const result = await Books.findAll();
        res.status(200).send({
            status: 200,
            data: result,
            message: "Fetched books successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// U (Update)
const updateBook = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Books.update(
            {
                book: postData.book
            },
            {
                where: {
                    book: req.params.bookName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Book name updated successful`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

// D (Delete)
const deleteBook = async (req, res) => {
    try {
        await Books.destroy(
            {
                where: {
                    book: req.params.bookName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Book deleted successfully`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

module.exports = {
    populateBook,
    createBook,
    fetchAllBook,
    updateBook,
    deleteBook
}