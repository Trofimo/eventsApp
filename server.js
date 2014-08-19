'use strict';

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var Event = new mongoose.Schema({
	title: String,
	trainer: String,
	startDate: String,
    endDate: String,
	price: String
});

//Models
var EventModel = mongoose.model( 'Event', Event );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Get a list of all events
app.get( '/api/events', function( request, response ) {
	return EventModel.find( function( err, events ) {
		if( !err ) {
			return response.send( events );
		} else {
			return console.log( err );
		}
	});
});

//Get a single event by id
app.get( '/api/events/:id', function( request, response ) {
	return EventModel.findById( request.params.id, function( err, event ) {
		if( !err ) {
			return response.send( event );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new event
app.post( '/api/events', function( request, response ) {
	var event = new EventModel({

		title: request.body.title,
		trainer: request.body.trainer,
		startDate: request.body.startDate,
        endDate: request.body.endDate,
		price: request.body.price

	});
	event.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
		return response.send( event );
	});
});

//Update a event
app.put( '/api/events/:id', function( request, response ) {
	console.log( 'Updating event ' + request.body.title );
	return EventModel.findById( request.params.id, function( err, event ) {

		event.title = request.body.title;
		event.trainer = request.body.trainer;
		event.startDate = request.body.startDate;
		event.endDate = request.body.endDate;
		event.price = request.body.price;

		return event.save( function( err ) {
			if( !err ) {
				console.log( 'event updated' );
			} else {
				console.log( err );
			}
			return response.send( event );
		});
	});
});

//Delete a event
app.delete( '/api/events/:id', function( request, response ) {
	console.log( 'Deleting event with id: ' + request.params.id );
	return EventModel.findById( request.params.id, function( err, event ) {
		return event.remove( function( err ) {
			if( !err ) {
				console.log( 'Event removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

//Start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
