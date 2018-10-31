var { graphql, buildSchema } = require('graphql');
var express = require('express');
var graphqlHttp = require('express-graphql');

var { schema } = require('./graphql/schema');
var { resolver } = require('./graphql/resolver');

var { start } = require('./mongo/connect');

const port = 3000;
var app = express();

start(() => {
    console.log('Starting server');

    app.use('/graphql', graphqlHttp({
        schema: schema,
        rootValue: resolver,
        graphiql: true
    }));

    app.listen(port);
});