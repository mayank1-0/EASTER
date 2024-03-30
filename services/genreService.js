const db = require("../db/models");
const Genres = db.Genres;
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
        await Genres.destroy(
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
                message: `Genre deleted successfully`,
            });
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