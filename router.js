var routes = require('./routes/index');

/**
 * Create all of the Express routes. This should contain the entire public API
 * with all REST references.
 */
exports.setup = function( app ) {

    app.get('/', routes.index);

};