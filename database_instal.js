'use strict'
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'123456'
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




con.query('CREATE TABLE MOVIES'+
           '(MOV_ID INT AUTO_INCREMENT NOT NULL,'+
           'MOV_TITLE VARCHARD(40) NOT NULL,'+
           'MOV_DIRECTOR VARCHARD(40) NOT NULL'+
           'MOV_PRODUCTION_COMP VARCHARD(40) '+
           'MOV_PROD_COUNTRY VARCHARD(40) '+
           'MOV_ACTOR VARCHARD(40) '+
           'MOV_GENRE INT NOT NULL'+
           'MOV_DESCRIPTION VARCHARD(500)'+
           'MOV_DISCLAMER VARCHARD(255)'+
           'PRIMARY KEY(MOV_ID)'+
           'FOREING KEY(MOV_GENRE))',
            function(err){
                            if(err){
                              console.log('could not create table "Movies" :'+ err);
                            }
});

con.query('CREATE TABLE GENRES'+
           '(GENRE_ID INT AUTO_INCREMENT NOT NULL,'+
           'SIGN VARCHARD(3) NOT NULL,'+
           'GENRE_DESCRIPTION VARCHARD(255)'+

           'PRIMARY KEY(GENRE_ID))',
            function(err){
                            if(err){
                              console.log('could not create table "GENRE" :'+ err);
                            }
});

con.query('INSERT INTO GENRE (SIGN) VALUES ("12")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("16")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("18")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("PG")');
con.query('INSERT INTO GENRE (SIGN) VALUES ("ALL")');

con.query('INSERT INTO MOVIES (MOV_TITLE , MOV_DIRECTOR , MOV_PRODUCTION_COMP , MOV_PROD_COUNTRY , MOV_ACTOR , MOV_GENRE VALUES ("Life In Heaven","Simlilo","Umuzi","South Africa","Vandame",(SELECT GENRE_ID from GENRES WHERE SIGN="ALL")');
console.log("Done");
con.end();
