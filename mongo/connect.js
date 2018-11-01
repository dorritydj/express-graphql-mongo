const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const name = 'HeroesDB';

exports.find = async (query = {}) => {
    return MongoClient.connect(url)
        .then((db) => {
            const dbo = db.db(name);

            const data = dbo.collection('heroes').find(query).toArray();

            db.close();

            return data;
        })
        .catch(err => {
            console.log(err);
        })
}