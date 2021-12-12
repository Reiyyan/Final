const { MongoClient } = require("mongodb");
const axios = require('axios');
const apiKey = "3e636134-8c57-4b3a-81bb-ea3412ad9a85";

const uri = "mongodb+srv://ReiRyerson:Password123@cluster0.e3oft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

class Words {

  // If word not available in mongoDB or word is expired fetch new word
  async getWordFromAPI(wordArg) {
    let response = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordArg}?key=${apiKey}`)
      .then(function (response) {
        // console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      })
    return response;
  }

  // Check DB for word
  async getWord(wordArg) {
    try {
      await client.connect();
      const dbo = client.db("mydb");
      const wordRegex = '^' + wordArg + '$';
      const query = { 'word': { '$regex': wordRegex, $options: 'i' } }

      const wordDocument = await dbo.collection("Words").findOne(query);

      // Word found in DB
      if (wordDocument !== undefined && wordDocument !== null && this.timeDifference(wordDocument.time)) {
        console.log("Found document");
        // console.log(wordDocument);
        return wordDocument.data
      }
      // Word not found or time expired
      else {
        let response = await this.getWordFromAPI(wordArg);
        console.log("Word not fonud, API CAll");
        // console.log(response);
        if (response.status === 200) {
          await this.addWord(wordArg, response.data);
        }
        return response.data;
      }

    } catch (error) {
      return { status: 500, data: [], error: error.message }
    }
    finally {
      await client.close();
    }
  }

  async addWord(wordArg, wordObject) {
    try {
      const wordRegex = '^' + wordArg + '$';
      const query = { 'word': { '$regex': wordRegex, $options: 'i' } }

      await client.connect();
      const dbo = client.db("mydb");

      const update = { $set: { word: wordArg, data: wordObject, time: new Date() } };
      const options = { upsert: true };
      const wordDocument = await dbo.collection("Words").updateOne(query, update, options);
      // .insertOne(newDoc);
      console.log(wordDocument);
      if (wordDocument.acknowledged === true) {
        return { status: 200, data: [] }
      }
      else {
        return { status: 500, data: [] }
      }

    } catch (error) {
      console.log(error.message);
      return { status: 500, data: [] }
    }
    finally {
      await client.close();
    }
  }

  timeDifference(subtractor) {
    let now = new Date();
    let oldDate = new Date(subtractor);
    let result = (now - oldDate) / 60000;
    return (result < 10);
  }

}

test = new Words();
let x = test.getWord("test");

module.exports = Words