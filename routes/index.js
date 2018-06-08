/**
 * Redirects to the `index.html` page.
 *
 * This function simply returns a `302` HTTP status and redirects
 * to the `public/index.html` file.
 */

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
exports.search = function( request, response ) {

  response.render("pages/search");

};

exports.search_result = function( request, response ) {
  response.render("pages/search_result");
};
