const db = require("../db/models");
const Languages = db.Languages;
const fs = require('fs');

// populate Language
const populateLanguage = async (req, res) => {
    try {
        const filePath = '../EASTER/public/json/languages.json'; // Actual file path
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
        res.status(200).send({ status: 200, message: "Successfully initiated Language table's data", success: true });
    }
    catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" })
    }
}
// C (Create)
const createLanguage = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Languages.create(postData);
        res.status(200).send({
            status: 200,
            data: postData,
            message: "Language created successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// R (Read)
const fetchAllLanguage = async (req, res) => {
    try {
        const result = await Languages.findAll();
        res.status(200).send({
            status: 200,
            data: result,
            message: "Fetched languages successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// U (Update)
const updateLanguage = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Languages.update(
            {
                language: postData.language
            },
            {
                where: {
                    language: req.params.languageName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Language name updated successful`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

// D (Delete)
const deleteLanguage = async (req, res) => {
    try {
        await Languages.destroy(
            {
                where: {
                    language: req.params.languageName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `Language deleted successfully`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

module.exports = {
    populateLanguage,
    createLanguage,
    fetchAllLanguage,
    updateLanguage,
    deleteLanguage
}