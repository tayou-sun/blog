const express = require('express');
const cors = require('cors');

const app = express().use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('/sqlite/blog.db');

//для понимания и обработки graphql 
const graphqlHTTP = require('express-graphql');

//формирование graphql-cхемы из строкм
const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    posts: [Post]
    post(id:ID!): Post
    authors: [Author]
  }

  type Mutation {
    createPost(input: Post): Post
  }

  
  type Post {
    id: ID
    autor: String,
    text: String
  }

  type Author {
    id: ID,
    name: String
  }
`);

function query(sql, single) {
    return new Promise((resolve, reject) => {
      var callback = (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      };
  
      if (single) db.get(sql, callback);
      else db.all(sql, callback);
    });
  }

  function mutation(args) {
    return new Promise((resolve, reject) => {
        database.run('INSERT INTO posts (autor,text) VALUES (?,?);', [args.author, args.text], (err) => {
            if(err) {
                reject(null);
            }
            database.get("SELECT last_insert_rowid() as id", (err, row) => {
                
                resolve({
                    id: row["id"],
                    text: args.text,
                    author: args.author
                });
            });
        });
    })
}
  


  
  const root = {
    posts: args => {
      return query(
        `SELECT * FROM posts`,
        false
      );
    },
    post: args => {
      return query(`SELECT * FROM posts WHERE id='${args.id}'`, true);
    },
    createPost: args =>{
        return mutation(args)
        
    }
  };


  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );
  
  app.listen(4201, err => {
    if (err) {
      return console.log(err);
    }
    return console.log('listening on port 4201');
  });