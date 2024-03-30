const db = require("../db/models");
const Authors = db.Authors;
const fs = require('fs');

// populate Author
const populateAuthor = async (req, res) => {
    try {
        const filePath = '../EASTER/public/json/authors.json'; // Actual file path
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
        res.status(200).send({ status: 200, message: "Successfully initiated Authors table's data", success: true });
    }
    catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" })
    }
}

// C (Create)
const createAuthor = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Authors.create(postData);
        res.status(200).send({
            status: 200,
            data: postData,
            message: "Author created successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// R (Read)
const fetchAllAuthor = async (req, res) => {
    try {
        const result = await Authors.findAll();
        res.status(200).send({
            status: 200,
            data: result,
            message: "Fetched author successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// U (Update)
const updateAuthor = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Authors.update(
            {
                author: postData.author
            },
            {
                where: {
                    author: req.params.authorName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Author name updated successful`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

// D (Delete)
const deleteAuthor = async (req, res) => {
    try {
        await Authors.destroy(
            {
                where: {
                    author: req.params.authorName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Author deleted successfully`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

module.exports = {
    populateAuthor,
    createAuthor,
    fetchAllAuthor,
    updateAuthor,
    deleteAuthor
}