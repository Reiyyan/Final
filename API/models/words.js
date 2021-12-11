const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ReiRyerson:Password123@cluster0.e3oft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

class Words {

  async getWord(wordArg) {
    try {
      await client.connect();
      const dbo = client.db("mydb");
      const wordRegex = '^' + wordArg + '$';
      const query = { 'id': { '$regex': wordRegex, $options: 'i' } }

      const wordDocument = await dbo.collection("Words").findOne(query);

      if (wordDocument !== undefined && wordDocument !== null) {
        return { status: 200, data: wordDocument }
      }
      else {
        return { status: 500, data: null }
      }

    } catch (error) {
      return { status: 500, data: null, error: error.message }
    }
    finally {
      await client.close();
    }
  }

  async addWord(wordArg) {

    try {
      await client.connect();
      const dbo = client.db("mydb");
      const newDoc = { word: wordArg, time: new Date() }
      const wordDocument = await dbo.collection("Words").insertOne(newDoc);

      if (wordDocument.acknowledged === true) {
        return { status: 200 }
      }
      else {
        return { status: 500 }
      }

    } catch (error) {
      return { status: 500 }
    }
    finally {
      await client.close();
    }
  }

}

module.exports = Words