var routes = require('./routes/index');
// var express = require('express');
// var mysql = require('mysql');
//ar bodyParser = require('body-parser')

/**
 * Create all of the Express routes. This should contain the entire public API
 * with all REST references.
 */
 // create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
exports.setup = function( app ) {

    app.get('/', routes.index);
    app.get('/test', function(req, res) {
    res.render('./pages/test', {body: 'The test page!' });
    });

    app.get('/recent', routes.recent);
    app.get('/topmovies', routes.topmovies);
    app.get('/favorite', routes.favorite);
    app.get('/comingsoon', routes.comingsoon);
    app.get('/search_index', routes.search_index);
    app.post('/search',routes.search);





};
