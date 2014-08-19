var app = app || {};

app.MainView = Backbone.View.extend({
	el: $( '#events' ),

	initialize: function() {
		this.collection = new app.Events();
		this.collection.fetch();
		this.render();

		this.listenTo( this.collection, 'add', this.renderEvent );
		this.listenTo( this.collection, 'reset', this.render );
	},

	events: {
		'click #add': 'addEvent'
	},

	addEvent: function( e ) {
		e.preventDefault();

		var formData = {};

		$( '#addEvent div' ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() != "" )
			{
				if( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split( ' ' ), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if( el.id === 'startDate' || el.id === 'endDate') {
					formData[ el.id ] = $( '#startDate' ).datepicker( 'getDate' ).getTime();
				} else {
					formData[ el.id ] = $( el ).val();
				}
			}
		});

		this.collection.create( formData );
	},

	// render library by rendering each event in its collection
	render: function() {
		this.collection.each(function( item ) {
			this.renderEvent( item );
		}, this );
	},

	// render a event by creating a EventView and appending the
	// element it renders to the library's element
	renderEvent: function( item ) {
		var eventView = new app.EventView({
			model: item
		});
		this.$el.append( eventView.render().el );
	}
});
