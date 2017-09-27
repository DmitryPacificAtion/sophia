// const arr = [1,2,3,4,5];
// arr.map( (item) => {console.log(item)} );


// Слайдер
const d = document;
const sliderContentItems = d.querySelectorAll('.slider__content_item');
const sliderDotsItems = d.querySelectorAll('.slider__dots_item');
function slider() {
	let i = 0, len = sliderDotsItems.length - 1;
	function findActive() {
		for (; i < len; i++) {
			if ( sliderDotsItems[i].classList.contains('active') ) break;
			else continue;
		}
	}
	function removeActive() {
		sliderContentItems[i].classList.remove('active');
		sliderDotsItems[i].classList.remove('active');
	}
	function addActive() {
		sliderContentItems[i].classList.add('active');
		sliderDotsItems[i].classList.add('active');
	}
	function startSider() {
		removeActive();
		// Проверка на последний активный элемент в слайдере
		if (i === len) {
			i = 0;
		}
		else {
			++i;
		}
		addActive();
	}
	function setEventsOnSlider() {
		let sliderDots = d.querySelector('.slider__dots');
		let controls = d.querySelector('.slider__control_left');
		sliderDots.addEventListener('click', function(event) {
			if (event.target.parentElement.hasAttribute('data-slider-dot')){
				console.log(event.target.parentElement);
				removeActive();
				// С помощью дата атрибутов вычисляем елемент на котором произошел клик
				i = event.target.parentElement.getAttribute('data-slider-dot') - 1;
				addActive();
			}
		});
	}
	setEventsOnSlider();
	setInterval( startSider, 6500 );
	clearInterval( startSider );
}
slider();

// const d = document;
// const slider = d.querySelector('.l-slider');
// const sContent = d.querySelector('.slider__content');
// const itemCount = d.querySelectorAll('.slider__content_item').length;
// const sDots = d.querySelectorAll('.slider__dots_item');
// const sControls = d.querySelector('.slider__control button');
// let pos = 0;

// function setTransform() {
//   sContent.style = 'translate3d(' + (-pos * sContent.offsetWidth) + 'px,0,0)';
// }

// function prev() {
//   pos = Math.max(pos - 1, 0);
//   setTransform();
// }

// function next() {
//   pos = Math.min(pos + 1, itemCount - 1);
//   setTransform();
// }

// window.addEventListener('resize', setTransform);
