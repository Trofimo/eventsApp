var app = app || {};

app.Events = Backbone.Collection.extend({
	model: app.Event,
	url: '/api/events'
});
