'use strict';

const url = "http://localhost:3000";

let button = document.querySelector(".button");
let input = document.querySelector(".input");
let police = document.querySelector(".police");
let diplomats = document.querySelector(".diplomats");
let main = document.querySelector(".main");

let table = document.createElement("table");
main.appendChild(table);

const ajax = function(method, res, callback, data) {
  const xhr = new XMLHttpRequest();
  data = data ? data : null;
  xhr.open(method, url + res);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data) );
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(JSON.parse(xhr.response));
    };
  };
};


let capitalize = (header) => {return header[0].toUpperCase() + header.slice(1)};


function headerMaker(className, header) {
  let myTableHeader = document.createElement( "th" );
  myTableHeader.textContent = capitalize(className);
  header.appendChild(myTableHeader);
};


function header () {
  let headers = ["Plate", "Car brand", "Car model", "Color", "Year"]
  let header = document.createElement("tr");
  headers.forEach(function(element) {
      headerMaker(element, header);
  });
  table.appendChild(header);
};


function printer(element) {
  let tableRow = document.createElement("tr");
  element.forEach( function(each) {
      let tableCell = document.createElement("td");
      tableCell.textContent = each;
      tableRow.appendChild(tableCell);
  });
  table.appendChild(tableRow);
};


function printOrganiser(item) {
  header();
  item.forEach( function(element, i) {
    let toPrint = [element.plate, element.car_brand, 
      element.car_model, element.color, 
      element.year];
    printer(toPrint);
  });
};


button.addEventListener( 'click', function() {
  ajax( "GET", "/search", printOrganiser, '' );
});