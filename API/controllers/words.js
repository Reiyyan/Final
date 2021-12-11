const WordsModel = require("../models/words");

async function GetWord(wordArg) {
    try {
        const words = new WordsModel();
        const result = await words.getWord(wordArg);
        return result
    }
    catch (err) {
        return err
    }
}

async function AddWord(wordDoc) {
    try {
        const words = new WordsModel();
        const result = await words.addWord(wordDoc);
        return result
    }
    catch (err) {
        return err
    }
}

module.exports = { GetWord, AddWord };