/**
 * Redirects to the `index.html` page.
 *
 * This function simply returns a `302` HTTP status and redirects
 * to the `public/index.html` file.
 */
 'use strict'
 var express = require('express');
 var mysql = require('mysql');
 var bodyParser = require('body-parser')

 var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password:'123456',
   database:'MOVIE_STORE'





 });

 con.connect(function(err){
   if(err) throw err;
   console.log("connected!");
 });



exports.index = function( request, response ) {
    response.statusCode = 302;
    response.setHeader("Location", "/index.html");
    response.end('<p>302. Redirecting to index.html</p>');
};
exports.recent = function( request, response ) {
  console.log('it worked1');
};
exports.topmovies = function( request, response ) {
  console.log('it worked2');
};
exports.favorite = function( request, response ) {
  console.log('it worked3');
};
exports.comingsoon = function( request, response ) {
  response.render("pages/comingsoon");
};
exports.search_index = function( request, response ) {

  response.render("pages/search_index");


};


// SELECT column-names
//   FROM table-name1 INNER JOIN table-name2
//     ON column-name1 = column-name2
//  WHERE condition
//req.body.username
exports.search = function( request, response ) {
  //console.log(request.body.query);
  var data=[];
  var query= con.query('SELECT *'+
            'from MOVIES '+
            'INNER JOIN GENRE ON MOVIES.MOV_GENRE = GENRE.GENRE_ID'+
            ' where '+
            'MOVIES.MOV_TITLE like "%'+request.body.query +'%" OR '+
            'MOVIES.MOV_DIRECTOR like "%'+request.body.query +'%" OR '  +
            'MOVIES.MOV_DIRECTOR like "%'+request.body.query +'%" OR '+
            'MOVIES.MOV_PRODUCTION_COMP like "%'+request.body.query +'%" OR '+
            'MOVIES.MOV_PROD_COUNTRY like "%'+request.body.query +'%" OR '+
            'MOVIES.MOV_ACTOR like "%'+request.body.query +'%" OR '+
            'MOVIES.MOV_GENRE like "%'+request.body.query +'%" '
          );

query.on('error',function(err){
  console.log('A database error occured');
  console.log(err);
});
query.on('result',function(result){
  data.push({'title':result.MOV_TITLE,
             'director':result.MOV_DIRECTOR,
             'production_company':result.MOV_PRODUCTION_COMP,
             'country_of_production': result.MOV_PROD_COUNTRY,
             'actor':result.MOV_ACTOR,
             genre:result.SIGN
           });




});

query.on('end', function(){
console.log(data);
response.render('pages/search',{movies:data});
con.end();
});






  //response.render('pages/search',{movies:result})
};
