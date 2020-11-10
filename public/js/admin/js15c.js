$(document).ready(function() {
	'use strict';

	var $window = $(window),
		$body = $('body'),
		$searchWrapper = $('#main-search-input-wrapper'),
		$container = $('#masonry');

	function adaptToScreenSize() {
		$body.toggleClass('compact', $window.width() <= 1200);
		$body.toggleClass('mobile', $window.width() <= 768);
	}

	$('.js-cloak').removeClass('js-cloak');

	adaptToScreenSize();
	$searchWrapper.hide();

	/* ======= Activate Bootstrap tooltip and popover ======= */
	$('[data-toggle="tooltip"]').tooltip({container: 'body'});
	$('[data-toggle="popover"]').popover({container: 'body'});
	
	/* hide tooltip on click */
	$('[data-toggle="tooltip"]').click(function () {
        $('[data-toggle="tooltip"]').tooltip("hide");
    });

	/* ======= metisMenu ======= */
	/* ref: https://github.com/onokumus/metisMenu */
	$('#menu').metisMenu();

	/* ======= Fixed Header animation ======= */
	$window
		.on('scroll', function() {
			 if ($window.scrollTop() > 0 ) {
				 $('#header').addClass('header-change');
			 }
			 else {
				 $('#header').removeClass('header-change');
			 }
		})
		.on('resize', adaptToScreenSize)
		.on('load', function() {
			$body.removeClass('preload');
		});

	/* ======= Toggle between Signup & Login Modals ======= */
	$('#signup-link').on('click', function(e) {
		$('#signup-modal').modal();
		$('#login-modal').modal('toggle');
		e.preventDefault();
	});

	$('#login-link').on('click', function(e) {
		$('#login-modal').modal();
		$('#signup-modal').modal('toggle');
		e.preventDefault();
	});

	/* ======= Masonry with ImageLoaded ======= */
	/* Ref: http://masonry.desandro.com/appendix.html#imagesloaded */
	// initialize Masonry after all images have loaded
	$container.imagesLoaded(function() {
		$container.masonry({
			itemSelector: '.masonry-item'
		});
	});


	// re-apply masonry layout after content-wrapper transition (i.e. side-panel collapse)
	$('#content-wrapper').on('transitionend webkitTransitionEnd oTransitionEnd', function(ev) {
		if(ev.target && !$(ev.target).hasClass('masonry-item')) {
			$container.masonry();
		}
	});

	// Hook up event for closing modules
	$body.on('click', '.close-module', function(ev) {
		if($container.data('masonry')) {
			$container.masonry('remove', $(ev.target).closest('.masonry-item'));
		} else {
			$(ev.target).closest('.module').remove();
		}
	});

	/* ======= Modules ======= */
	/* Rotate the collapse arrow icon when module is collapsed/expanded */
	function toggleIcon(ev) {
		var $target = $(ev.target),
			$targetFa;

		// toggle module icons
		if($target.hasClass('module-content')) {
			$target.closest('.module').toggleClass('collapsed', ev.data.collapsed);
		}

		// toggle accordion icons
		if($target.hasClass('panel-collapse')) {
			$targetFa = $target.prev().find('.fa');
			if($targetFa.hasClass('fa-plus-square') || $targetFa.hasClass('fa-minus-square')) {
				$targetFa.toggleClass('fa-plus-square', ev.data.collapsed)
					.toggleClass('fa-minus-square', ev.data.collapsed);
			} else if($targetFa.hasClass('fa-caret-right') || $targetFa.hasClass('fa-caret-down')) {
				$targetFa.toggleClass('fa-caret-right', ev.data.collapsed)
					.toggleClass('fa-caret-down', ev.data.collapsed);
			}
		}
	}

	$body.on('hide.bs.collapse', { collapse: false }, toggleIcon);
	$body.on('show.bs.collapse', { collapse: true }, toggleIcon);

	/* ======= Main Navigation ======= */

	$('#main-nav-toggle').click(function() {
		$body.toggleClass('nav-toggled');
	});


	/* ====== Side Panel ======= */
	$('#side-panel-toggle').click(function(){
		if($(this).hasClass('panel-show')){
		$("#side-panel").animate({
		  right: "-=320" //same as the panel width
		  }, 500);
		  $(this).removeClass('panel-show').addClass('panel-hide')
		}
		else {
		$("#side-panel").animate({
		  right: "+=320" //same as the panel width
		  }, 500);
		  $(this).removeClass('panel-hide').addClass('panel-show');
		  $(this).tooltip('hide');
		}
	});

	// Close the panel by clicking the close button
	$('#side-panel .close').on('click', function(){
		$('#side-panel-toggle.panel-show').click();
	});


	/* ======= Fullscreen Modal ======= */
	$('#modal-view-controller').on('click', function(){
		$(this).closest('.modal').toggleClass('modal-fullscreen');
	});

	/* ========= Main Search ======== */

	$('#main-search-toggle').on('click', function(){
		$searchWrapper.toggle();
		$('#main-search-input').trigger('focus');

	});

	$('#clear-search').on('click', function(){
		$(this).closest('#main-search').find('#main-search-toggle').trigger("click");
	});


	$('#main-search-input').on('keydown', function() {
		var $this = $(this);
		if ($this.val() !== "Search..." && $this.val().length > 0) {
			$this.closest('form').find('#clear-search').show()
				.one('click', function() {
					$this.val('');
					$this.trigger('blur');
				});
		}
	}).on('blur', function() {
		var $this = $(this);

		if($this.val().length === 0) {
			$(this).closest('form').find('#clear-search').hide();
		}

	});

	/* ===== Top Alert Close ======= */
	$('#top-alert-close').on('click', function(){
		$(this).closest('#top-alert').slideUp();
	});

	/* ========= Misc ========  */
	$('.cursor-pointer').on('click', function() {
		$(this)
		.closest('.input-group-icon-click')
		.find('input')
		.focus();
	});
});