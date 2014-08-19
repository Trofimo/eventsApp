var app = app || {};

app.Event = Backbone.Model.extend({
	defaults: {
		title: 'No title',
		trainer: 'Unknown',
		startDate: 'Unknown',
        endDate: 'Unknown',
		price: 'None'
	},

	idAttribute: '_id'
});
