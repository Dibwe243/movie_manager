'use strict'
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:''
});

con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
});

con.query('CREATE DATABASE MOVIE_STORE', function(err){
  if(err){
    console.log('An error occur when creating a database :'+ err);
  }
});

con.query('Use MOVIE_STORE', function(err){
  if(err){
    console.log('An error occur while attempting to use database MOVIE_STORE:'+ err);
  }
});

con.query('CREATE TABLE GENRE'+
           '(GENRE_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,'+
           'SIGN VARCHAR(255) NOT NULL,'+
           'GENRE_DESCRIPTION VARCHAR(255))',
           
            function(err){
                            if(err){
                              console.log('could not create table "GENRE" :'+ err);
                            }
});

con.query('CREATE TABLE MOVIES'+
           '(MOV_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,'+
           'MOV_TITLE VARCHAR(255) NOT NULL,'+
           'MOV_DIRECTOR VARCHAR(255) NOT NULL,'+
           'MOV_PRODUCTION_COMP VARCHAR(255),'+
           'MOV_PROD_COUNTRY VARCHAR(255), '+
           'MOV_ACTOR VARCHAR(255),'+
           'MOV_GENRE INT NOT NULL,'+
           'MOV_DESCRIPTION VARCHAR(255),'+
           'MOV_DISCLAMER VARCHAR(255),'+
           'FOREIGN KEY(MOV_GENRE) REFERENCES GENRE(GENRE_ID))',
            function(err){
                            if(err){
                              console.log('could not create table "Movies" :'+ err);
                            }
});



con.query('INSERT INTO GENRE (SIGN) VALUES ("12")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("16")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("18")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("PG")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("ALL")');


con.query('INSERT INTO MOVIES (MOV_TITLE , MOV_DIRECTOR , MOV_PRODUCTION_COMP , MOV_PROD_COUNTRY , MOV_ACTOR , MOV_GENRE) VALUES ("Life In Heaven","Simlilo","Umuzi","South Africa","Vandame",(SELECT GENRE_ID from GENRE WHERE SIGN="ALL"))');
console.log("Done");
con.end();
