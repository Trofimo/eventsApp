var app = app || {};


$(function() {
	$( '#startDate' ).datepicker();
    $( '#endDate' ).datepicker();

	new app.MainView();
});
