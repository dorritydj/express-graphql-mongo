const { buildSchema } = require('graphql');

exports.schema = buildSchema(
    `type Hero {
        id: String
        name: String
        alias: String
    }

    type Query {
        getHeroes: [Hero]
        getHero(id: String): Hero
    }

    type Mutation {
        addHero(name: String!, alias: String!): Hero
    }`
);