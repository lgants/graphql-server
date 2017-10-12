// by requiring `babel/register` all successive `require`s will be Babel'd
require('babel-core/register');
require('./server.js');

import express from 'express';
import schema from './schema';
// new dependencies
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

let app  = express();
let PORT = 3000;

// parse POST body as text
// enforcing new content type is a good pattern for servers that mix GraphQL with REST
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL
  graphql(schema, req.body)
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});

// curl -XPOST -H "Content-Type:application/graphql"  -d 'query RootQueryType { count }' http://localhost:3000/graphql
// ^can omit query type:
// curl -XPOST -H 'Content-Type:application/graphql'  -d '{ count }' http://localhost:3000/graphql

// mutation 
// curl -XPOST -H 'Content-Type:application/graphql' -d 'mutation RootMutationType { updateCount }' http://localhost:3000/graphql
