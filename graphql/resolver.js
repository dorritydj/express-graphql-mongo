const { find, add } = require('../mongo/connect');
const { GraphQLList } = require('graphql');

function mapID(arr) {
    return arr.map(item => {
        return { id: item._id.toString(), ...item };
    });
}

exports.resolver = {
    getHeroes: () => {
        return find()
            .then((found) => {
                return mapID(found);
            });
    },
    getHero: (hero) => {
        return find(hero)
            .then(found => {
                return mapID(found)[0];
            });
    },
    addHero: (hero) => {
        return find(hero)
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