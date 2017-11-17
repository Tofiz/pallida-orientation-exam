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
  console.log('Connected to database!');
});

app.get('/search', function(req, res) {
  console.log(req.query.car_brand);
  let selector = '';
  if (Object.keys(req.query).length > 0) {
    selector += "WHERE"
    selector += req.query.plate ? ` plate = \'${req.query.plate}\' AND` : ''
    selector += req.query.car_brand ? ` car_brand = \'${req.query.car_brand}\' AND` : ''
    selector += req.query.car_model ? ` car_model = \'${req.query.car_model}\' AND` : ''
    selector += req.query.color ? ` color = \'${req.query.color}\' AND` : ''
    selector += req.query.year ? ` year = \'${req.query.year}\' AND` : ''
  } 
  if (selector.endsWith('AND')) {
    selector = selector.substr(0, selector.length - 5);
  }; 
  
  let qu = `
  SELECT plate, car_brand, car_model, color, year FROM licence_plates
  ${selector};`;

  console.log(qu);

  connection.query(qu, function(err, result) {
    if (err) {
      console.log(err.toString());
      return;
    }
    res.json(result);
  });
});

app.listen(3000, function() {
  console.log("The server is up and running on port 3000")
})