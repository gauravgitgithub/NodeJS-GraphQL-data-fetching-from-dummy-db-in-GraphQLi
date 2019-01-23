var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema'); //importing schema file





app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true //enables graphiql in browser for querying
}));



app.listen(
    8000, () =>{
        console.log('App listening on port 8000')
    }
)