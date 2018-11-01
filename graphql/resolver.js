const { find, add, aggregate } = require('../mongo/connect');
const { GraphQLList } = require('graphql');

function mapID(arr) {
    return arr.map(item => {
        return Object.assign({ id: item._id.toString() }, item);
    });
}

exports.resolver = {
    getHeroes: () => {
        return find({}, 'heroes')
            .then((found) => {
                return mapID(found);
            });
    },
    getCities: () => {
        return aggregate([{
            $lookup: {
                from: 'heroes',
                foreignField: '_id',
                localField: 'protectors',
                as: 'protectors'
            }
        }], null, 'cities')
            .then(found => {
                return found.map(city => {
                    city.id = city._id.toString();
                    city.protectors = mapID(city.protectors);

                    return city;
                });
            })
    },
    getCity: (city) => {
        return aggregate([
            {
                $lookup: {
                    from: 'heroes',
                    foreignField: '_id',
                    localField: 'protectors',
                    as: 'protectors'
                }
            }
        ], city.id, 'cities')
            .then(found => {
                return found.map(city => {
                    city.id = city._id.toString();
                    city.protectors = mapID(city.protectors);

                    return city;
                })[0];
            })
    },
    getHero: (hero) => {
        return find(hero, 'heroes')
            .then(found => {
                return mapID(found)[0];
            });
    },
    addHero: (hero) => {
        return find(hero, 'heroes')
            .then(found => {
                return found.length === 0 ?
                    add(hero).then(added => added.ops) :
                    found;
            })
            .then(result => {
                return mapID(result)[0];
            });
    }
}