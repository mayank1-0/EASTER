// Passport.js logic
const authMember = (req, res, next) => {
    // passport logic for req.session.user.role == "member"
}

const authAdmin = (req, res, next) => {
    // passport logic for req.session.user.role == "member"
}

module.exports = { authMember, authAdmin };