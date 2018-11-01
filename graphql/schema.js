const { buildSchema } = require('graphql');

exports.schema = buildSchema(
    `type Hero {
        id: String
        name: String
        alias: String
    }

    type City {
        id: String
        name: String
        protectors: [Hero]
    }

    type Query {
        getHeroes: [Hero]
        getHero(id: String): Hero
        getCities: [City]
        getCity(id: String): City
    }

    type Mutation {
        addHero(name: String!, alias: String!): Hero
    }`
);