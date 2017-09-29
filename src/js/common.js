$(document).ready(function() {

// const arr = [1,2,3,4,5];
// arr.map( (item) => { console.log(item) } );

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

		$('[data-slider-content=' + currentDataIndex + ']').fadeOut(600).removeClass('active');
		$('[data-slider-content=' + ++targetDataIndex + ']').fadeIn(600).addClass('active');

		changeActiveDot(currentDataIndex, targetDataIndex);
	});

	lButton.on('click', function(e) {
		e.preventDefault;
		var currentDataIndex = findActiveDot();
		var targetDataIndex = currentDataIndex;

		if(currentDataIndex == 1) {
			targetDataIndex = slides.length + 1;
		}

		$('[data-slider-content=' + currentDataIndex + ']').fadeOut(600).removeClass('active');
		$('[data-slider-content=' + --targetDataIndex + ']').fadeIn(600).addClass('active');

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

	var overlay = $('.overlay');
	var modal = $('.modal');

	$('#login').on('click', function() {
		overlay.fadeIn();
		modal.fadeIn(300);
		overlay.parent().addClass('action');
	});

	overlay.on('click', function() {
		if (event.target == event.currentTarget) {
			modal.fadeOut();
			overlay.fadeOut(300);
			overlay.parent().removeClass('action');
		}
	});


	$('.l--price button.cta').on('click', function(){
		overlay.fadeIn();
		modal.fadeIn(300);
	});
	
	overlay.on('click', function(){
		if (event.target == event.currentTarget) {
			modal.fadeOut();
			overlay.fadeOut(300);
		}
	});

	$('.on-top').on('click', function(e){
		e.preventDefault;
		scrollTo(e, 'l-header');
	});

	function scrollTo(e, attr){
		e.target.prevetnDefault;
		$('html, body').animate({ scrollTop: $('.'+attr).offset().top }, 500);
	}

});