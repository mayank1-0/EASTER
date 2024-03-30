const db = require("../db/models");
const Users = db.Users;
const fs = require('fs');

// populate User
const populateUser = async (req, res) => {
    try {
        const filePath = '../EASTER/public/json/users.json'; // Actual file path
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
        res.status(200).send({ status: 200, message: "Successfully initiated User table's data", success: true });
    }
    catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" })
    }
}
// C (Create)
const createUser = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Users.create(postData);
        res.status(200).send({
            status: 200,
            data: postData,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// R (Read)
const fetchAllUser = async (req, res) => {
    try {
        const result = await Users.findAll();
        res.status(200).send({
            status: 200,
            data: result,
            message: "Fetched users successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, data: error, message: "API Error" });
    }
}

// U (Update)
const updateUser = async (req, res) => {
    try {
        let postData = req.body;
        const result = await Users.update(
            {
                user: postData.user
            },
            {
                where: {
                    user: req.params.userName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `User name updated successful`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

// D (Delete)
const deleteUser = async (req, res) => {
    try {
        await Users.destroy(
            {
                where: {
                    user: req.params.userName,
                },
            }
        );
        res
            .status(200)
            .send({
                status: 200,
                message: `User deleted successfully`,
            });
    } catch (e) {
        res.status(500).send({ status: 500, data: e, message: "API Error" });
    }
}

module.exports = {
    populateUser,
    createUser,
    fetchAllUser,
    updateUser,
    deleteUser
}