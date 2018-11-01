const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/';
const name = 'HeroesDB';

exports.find = (query = {}) => {
    return MongoClient.connect(url)
        .then((db) => {
            const dbo = db.db(name);

            if (query !== {} && query.id) {
                query._id = new ObjectID(query.id);
                delete query.id;
            }

            const found = dbo.collection('heroes').find(query).toArray();

            db.close();

            return found;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.add = (query = {}) => {
    return MongoClient.connect(url)
        .then(db => {
            const dbo = db.db(name);

            const added = dbo.collection('heroes').insertOne(query);

            db.close();

            return added;
        })
}