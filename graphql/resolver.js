const { find } = require('../mongo/connect');
const { GraphQLList } = require('graphql');

exports.resolver = {
    allHeroes: () => {
        return find()
            .then((result) => {
                return result;
            });
    },
    hero: ({ id }) => {
        return find({ id })
            .then(result => {
                console.log(result);
                return result[0];
            });
    }
}