$(document).ready(function() {

	var dots = $('.slider__dots_item'),
	slides = $('.slider__content_item'),
	lButton = $('.slider__control_left'),
	rButton = $('.slider__control_right'),
	activeSlide,
	i = 0,
	len = slides.length;

	dots.on('click', function(e) {
		e.preventDefault;
		activeSlide = findActiveDot();
		var targetDataIndex = e.target.parentElement.getAttribute('data-slider-dot');
		changeActiveDot(activeSlide, targetDataIndex);

		$('[data-slider-content=' + activeSlide + ']').fadeOut(600).removeClass('active');
		$('[data-slider-content=' + targetDataIndex + ']').fadeIn(600).addClass('active');
	});

	function findActiveDot() {
		var active;
		dots.map(function() {
			if ( $(this).hasClass('active') ) {
				active = $(this).attr('data-slider-dot');
			}
		});
		return active;
	}

	function changeActiveDot(currentDataIndex, targetDataIndex) {
		$('[data-slider-dot=' + currentDataIndex + ']').removeClass('active');
		$('[data-slider-dot=' + targetDataIndex + ']').addClass('active');
	}

	rButton.on('click', function(e) {
		e.preventDefault;
		var currentDataIndex = findActiveDot();
		var targetDataIndex = currentDataIndex;

		if(currentDataIndex == slides.length) {
			targetDataIndex = 0;
		}

		$('[data-slider-content=' + currentDataIndex + ']').css({'transform': 'translateX(100%)'}).fadeOut(200).removeClass('active');
		$('[data-slider-content=' + ++targetDataIndex + ']').css({'transform': 'translateX(0)'}).fadeIn(600).addClass('active');
		changeActiveDot(currentDataIndex, targetDataIndex);
	});

	lButton.on('click', function(e) {
		e.preventDefault;
		var currentDataIndex = findActiveDot();
		var targetDataIndex = currentDataIndex;

		if(currentDataIndex == 1) {
			targetDataIndex = slides.length + 1;
		}

		$('[data-slider-content=' + currentDataIndex + ']').css({'transform': 'translateX(-100%)'}).fadeOut(200).removeClass('active');
		$('[data-slider-content=' + --targetDataIndex + ']').css({'transform': 'translateX(0%)'}).fadeIn(200).addClass('active');

		changeActiveDot(currentDataIndex, targetDataIndex);
	});

	function findActiveSlide() {
		var active;
		slides.map(function() {
			if ( $(this).hasClass('active') ) {
				active = $(this).attr('data-slider-content');
			}
		});
		return active;
	}

	// Custom select
	var $selectValue = $('#multilang').selectric();

	// Custom checkbox
	var customCheckbox = $('.custom-checkbox');
	var originCheckbox = $('#origin-checkbox');
	customCheckbox.on('click', function() {
		customCheckbox.toggleClass('checked');
		if ( customCheckbox.hasClass('checked')) {
			originCheckbox.attr('checked', 'checked');
		}
		else {
			originCheckbox.removeAttr('checked');
		}
	});

	function Popup() {
		var overlay = $('.overlay'),
		modal = $('.modal'),
		login = $('#login');

		var addListener = function() {
			login.on('click', function() {
				overlay.fadeIn();
				modal.fadeIn(300);
			});

			overlay.on('click', function(event) {
				console.log('event.currentTarget', event.currentTarget)
				console.log('event.target', event.target)
				if (event.target === event.currentTarget) {
					modal.fadeOut();
					overlay.fadeOut(300);
				}
			});			
		}
		this.main = function() {
			addListener();
		}		
	}
	new Popup().main();

	/* Scroll */
	$('.on-top').on('click', function(e){
		e.preventDefault;
		$('html, body').animate({ scrollTop: $('.l-header').offset().top }, 500);
	});

});