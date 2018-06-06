var routes = require('./routes/index');

/**
 * Create all of the Express routes. This should contain the entire public API
 * with all REST references.
 */
exports.setup = function( app ) {

    app.get('/', routes.index);

    app.get('/recent', routes.recent);
    app.get('/topmovies', routes.topmovies);
    app.get('/favorite', routes.favorite);
    app.get('/comingsoon', routes.comingsoon);
    app.get('/search', routes.search);




};
