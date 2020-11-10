$(document).ready(function() {
	'use strict';

	var tourStarted = false,
		tour = new Shepherd.Tour({
			defaultStepOptions: {
		       classes: 'user-tour shadow',
		    }
		});

	tour.addStep('welcome', {
		title: 'Guided Tour Example',
		text: ['Welcome! This is a guided tour example which you can use in your projects.'],
		attachTo: '#tour-trigger bottom',
		
		buttons: [
		{
			text: 'Exit',
			classes: 'shepherd-button-secondary',
			action: tour.cancel
		}, {
			text: 'Next',
			action: tour.next,
			classes: 'shepherd-button-primary'
		}
		]
	});

	tour.addStep('dashboards', {
		title: 'Dashboards',
		text: 'Dashboard examples designed for specific use cases to show you the power of the template. We will add more dashboard designs in the future as well!',
		attachTo: '.nav-dashboards right',
		buttons: [
		{
			text: 'Back',
			classes: 'shepherd-button-secondary',
			action: tour.back
		}, {
			text: 'Next',
			action: tour.next
		}
		]
	});

	tour.addStep('Widgets', {
		title: 'Widgets',
		text: 'Check out the various widgets you can use in your projects.',
		attachTo: '.nav-widgets right',
		buttons: [
		{
			text: 'Back',
			classes: 'shepherd-button-secondary',
			action: tour.back
		}, {
			text: 'Next',
			action: tour.next
		}
		]
	});

	tour.addStep('app-pages', {
		title: 'App Pages',
		text: 'Discover the useful app pages. They are based on real-world use cases too.',
		attachTo: '.nav-app-pages right',
		buttons: [
		{
			text: 'Back',
			classes: 'shepherd-button-secondary',
			action: tour.back
		}, {
			text: 'Done',
			action: tour.next
		}
		]
	});

	function handleShepherdEvent() {
		tourStarted = false;
	}

	function startTour() {
		tourStarted ? tour.cancel() : tour.start();
		tourStarted = !tourStarted;
	}

	tour.on('complete', handleShepherdEvent);
	tour.on('cancel', handleShepherdEvent);
	$('#tour-trigger').on('click', startTour);
    
	
	/*
	if($(document.body).data('trigger') == 'tutorial') {
		startTour();
	}
	*/

	
	
});