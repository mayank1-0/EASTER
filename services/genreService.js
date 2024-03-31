const db = require("../db/models");
const Genres = db.Genres;
const Books = db.Books;
const fs = require('fs');

// populate Genre
const populateGenre = async (req, res) => {
    try {
        const filePath = '../EASTER/public/json/genres.json'; // Actual file path
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
        res.status(200).send({ status: 200, message: "Successfully initiated Genres table's data", success: true });
    }
    catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" })
    }
}

// C (Create)
const createGenre = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Genres.create(postData);
        res.status(200).send({
            status: 200,
            data: postData,
            message: "Genre created successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// R (Read)
const fetchAllGenre = async (req, res) => {
    try {
        const result = await Genres.findAll();
        res.status(200).send({
            status: 200,
            data: result,
            message: "Fetched genres successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// U (Update)
const updateGenre = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Genres.update(
            {
                genre: postData.genre
            },
            {
                where: {
                    genre: req.params.genreName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Genre name updated successful`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

// D (Delete)
const deleteGenre = async (req, res) => {
    try {
        const genreDependentBooks = await Books.findAll({
            where: { genre: req.params.genreName }
        })
        if (genreDependentBooks == 0) {
            await Genres.destroy(
                {
                    where: {
                        genre: req.params.genreName,
                    },
                }
            );
            res.status(200).send({ status: 200, message: "Genre deletion successful", success: true })
        }
        else {
            res
                .status(409)
                .send({
                    status: 409,
                    message: `Genre cannot be deleted as there are books present in the database with the selected genre`,
                });
        }
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

module.exports = {
    populateGenre,
    createGenre,
    fetchAllGenre,
    updateGenre,
    deleteGenre
}