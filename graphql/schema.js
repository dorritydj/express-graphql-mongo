var { buildSchema } = require('graphql');

exports.schema = buildSchema(
    `type Hero {
        id: String
        name: String
        alias: String
    }
    
    type Query {
        allHero: [Hero]
        hero(id: String): Hero
    }`
);