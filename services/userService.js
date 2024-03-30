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

const userSignUp = async (req, res) => {
    try {
        let postData = {};
        let data = req.body;
        postData.fullName = data.firstName + ' ' + data.lastName;
        postData.username = data.username;
        postData.password = data.password;
        postData.role = "member";
        const userData = await Users.create(postData);
        res.send({
            status: 200,
            data: userData,
            message: "User created successfully",
        });
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res.status(500).send({
                status: 500,
                data: e.name,
                message: "User with same username already exists",
            });
        } else if (e.name === "SequelizeValidationError") {
            console.log('1111 ', e);
            res.status(500).send({
                status: 500,
                data: e.name,
                message: `Invalid ${e.errors[0].path}`,
            });
        } else {
            console.log('2222 ', e);
            res
                .status(500)
                .send({ status: 500, data: e, message: "API Error Message" });
        }
    }
};

module.exports = {
    populateUser,
    createUser,
    fetchAllUser,
    updateUser,
    deleteUser,
    userSignUp,
}