/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  //Pages Routes
  'GET /' : 'home',
  'GET /about' : 'about',

  //Users routes
  'POST /user/signup' : 'user/signup',
  'POST /user/signin' : 'user/signin',

  //Listings routes
  //List all jobs
  'GET /listings/' : 'listing/all',

  //Search listings according to title
  'GET /search-listings/:title' : 'listing/search',

  //Read a particular listing in dashboard
  'GET /listings/:id' : 'listing/show',

  //Filter listings
  "GET /filter-listings" : "listing/filter",

  // //Read a particular record for general users
  'GET /details/:id' : 'listing/show',

  //Create a new record
  'POST /listings/new' : 'listing/new',

  //Edit a job post
  "PUT /listings/edit/:id" : "listing/edit",

  //Delete a listing
  "DELETE /listings/delete/:id" : "listing/delete",

  //Listing for each owner === My Listings route for logged in employers
  "GET /listings/me": "listing/my-listings",

  //Job application now
  "POST /job/apply" : "application/apply"
};
