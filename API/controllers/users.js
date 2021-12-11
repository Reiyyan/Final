const UsersModel = require("../models/users");

async function UserLogin(username, password) {
    try {
        const user = new UsersModel();
        const result = await user.loginUser(username, password);
        return result
    }
    catch (err) {
        return err
    }
}

async function SignUp(username, password) {
    try {
        const user = new UsersModel();
        const result = await user.SignUpUser(username, password);
        return result
    }
    catch (err) {
        return err
    }
}

module.exports = { UserLogin, SignUp };