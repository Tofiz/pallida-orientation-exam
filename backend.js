'use strict' 

const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', express.static("./public"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'examdatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/search', function( req, res ) {
  console.log(req)
}