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

// R (Read)
const fetchAllBook = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const result = await Books.findAll({
            order: ['id']
        });
        if (result.length == 0) {
            res.status(200).send({ status: 200, message: 'No books exists in the database', data: result })
        }
        else {
            for (let i in result) {
                result[i].age = currentYear - result[i].year;
            }
            res.status(200).send({
                status: 200,
                data: result,
                message: "Fetched books successfully",
            });
        }} catch (error) {
            res.status(500).send({ status: 500, data: error, message: "API Error" });
        }
    }

// borrowed books
const borrowedBooks = async (req, res) => {
        try {
            const result = await Books.findAll({ where: { borrowed: true } })
            res.status(200).send({ status: 200, success: true, message: "Number of borrowed books are" + result.length, data: result });
        } catch (error) {
            res.status(500).send({ status: 500, success: false, message: "Something went wrong" })
        }
    }

    // borrowable books
    const borrowableBooks = async (req, res) => {
        try {
            const result = await Books.findAll({ where: { borrowed: false } })
            res.status(200).send({ status: 200, success: true, data: result, message: 'Borrowable books' });
        } catch (error) {
            res.status(500).send({ status: 500, success: false, message: "Something went wrong" })
        }
    }

    const borrowBook = async (req, res) => {
        try {
            const role = req.session.user.role;
            if (role == 'member') {
                const result = await Books.update({
                    borrowed: true,
                },
                    {
                        where: {
                            borrowed: false,
                            title: req.params.title
                        },
                    })
                if (result) {
                    res.status(200).send({ status: 200, message: "You borrowed the book" + req.params.title, success: true });
                } else {
                    res.status(200).send({ status: 500, message: `The book ${req.params.title}, is already borrowed`, success: false });
                }
            }
            else {
                res.status(500).send({ status: 500, success: false, message: "Only members can borrow books" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, success: false, message: "Something went wrong" });
        }
    }

    const returnBook = async (req, res) => {
        try {
            const role = req.session.user.role;
            if (role == 'admin') {
                const result = await Books.update({
                    borrowed: false,
                },
                    {
                        where: {
                            borrowed: true,
                            title: req.params.title
                        },
                    })
                if (result) {
                    res.status(200).send({ status: 200, message: "You returned the book titled" + req.params.title, success: true });
                } else {
                    res.status(200).send({ status: 500, message: `The book ${req.params.title}, is already returned`, success: false });
                }
            }
            else {
                res.status(500).send({ status: 500, success: false, message: "Only admin can return books" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, success: false, message: "Something went wrong" });
        }
    }

    const currentAge = async (req, res) => {
        try {
            const currentYear = new Date().getFullYear();
            const bookYear = await Books.findOne({
                where: { title: req.params.title },
                attributes: ["year"]
            });
            if (!bookYear) {
                res.status(401).send({ success: false, status: 401, message: "Book year with given title does not exist" })
            }
            else {
                let age = currentYear - bookYear.year;
                res.status(200).send({ status: 200, data: age, success: true, message: "Current age of book found successful" })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: "Something went wrong", success: false })
        }
    }

    const JKRowlingBooks = async (req, res) => {
        try {
            const currentYear = new Date().getFullYear();
            let result = await db.sequelize.query("SELECT * from books WHERE author='J.K. Rowling'", { type: db.sequelize.QueryTypes.SELECT });
            if (result.length == 0) {
                res.status(200).send({ status: 200, message: 'No books with author J.K. Rowling exists', data: result })
            }
            else {
                for (let i in result) {
                    result[i].age = currentYear - result[i].year;
                }
                res.status(200).send({ status: 200, message: 'All J.K. Rowling books fetched', data: result, success: true })
            }
        } catch (err) {
            res.status(500).send({ status: 500, error: err, message: 'Something went wrong', success: false });
        }
    }

    const currentlyBorrowedBooks = async (req, res) => {
        try {
            const currentYear = new Date().getFullYear();
            let result = await db.sequelize.query("SELECT * from books WHERE borrowed=true", { type: db.sequelize.QueryTypes.SELECT });
            if (result.length == 0) {
                res.status(200).send({ status: 200, message: 'No borrowed books are there in the database', data: result })
            }
            else {
                for (let i in result) {
                    result[i].age = currentYear - result[i].year;
                }
                res.status(200).send({ status: 200, message: 'All borrowed books fetched successfully', data: result, success: true })
            }
        } catch (err) {
            res.status(500).send({ status: 500, error: err, message: 'Something went wrong', success: false });
        }
    }

    const orderAllBooksByAge = async (req, res) => {
        try {
            const currentYear = new Date().getFullYear();
            // By relying on the fact that the books having recent/early year dates will have lesser age e.x. age = current year - year of publishing and as we want oldest books to come first
            let result = await db.sequelize.query("SELECT * from books ORDER BY year ASC", { type: db.sequelize.QueryTypes.SELECT });
            if (result.length == 0) {
                res.status(200).send({ status: 200, message: 'No books exists in the database', data: result })
            }
            else {
                for (let i in result) {
                    result[i].age = currentYear - result[i].year;
                }
                res.status(200).send({ status: 200, message: 'All books ordered by their age are fetched', data: result, success: true })
            }
        } catch (err) {
            res.status(500).send({ status: 500, error: err, message: 'Something went wrong', success: false });
        }
    }

    module.exports = {
        populateBook,
        createBook,
        updateBook,
        deleteBook,
        fetchAllBook,
        borrowedBooks,
        borrowableBooks,
        borrowBook,
        returnBook,
        currentAge,
        JKRowlingBooks,
        currentlyBorrowedBooks,
        orderAllBooksByAge,
    }