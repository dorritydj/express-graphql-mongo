const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/';
const name = 'HeroesDB';

exports.find = (query = {}, collection) => {
    return MongoClient.connect(url)
        .then((db) => {
            const dbo = db.db(name);

            if (query !== {} && query.id) {
                query._id = new ObjectID(query.id);
                delete query.id;
            }

            const found = dbo.collection(collection).find(query).toArray();

            db.close();

            return found;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.aggregate = (query = [], matchID = null, collection) => {
    return MongoClient.connect(url)
        .then(db => {
            const dbo = db.db(name);

            if (matchID !== null) {
                query.unshift({
                    $match: {
                        _id: new ObjectID(matchID)
                    }
                })
            }

            const aggregated = dbo.collection(collection).aggregate(query).toArray();

            db.close();

            return aggregated;
        })
}

exports.add = (query = {}, collection) => {
    return MongoClient.connect(url)
        .then(db => {
            const dbo = db.db(name);

            const added = dbo.collection(collection).insertOne(query);

            db.close();

            return added;
        })
}