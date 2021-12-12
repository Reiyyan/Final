const axios = require('axios');
// const apiKey = "3e636134-8c57-4b3a-81bb-ea3412ad9a85";

const baseURL = 'http://localhost:8080';

export async function getWord(word) {
    let response = await axios.get(`${baseURL}/words/${word}`)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })

    return response;
}