const axios = require('axios');
const baseURL = 'http://localhost:8080';

// Make a request for a user with a given ID
export async function Login(username, password) {
    let response = await axios.post(`${baseURL}/users/login`, { username, password })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })

    return response;
}

export async function SignUp(username, password) {
    let response = await axios.post(`${baseURL}/users/signup`, { username, password })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })

    return response;
}