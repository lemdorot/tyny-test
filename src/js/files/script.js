// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

// Модуль работы по меню (бургер) =======================================================================================================================================================================================================================
function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}
function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}

// Вспомогательные модули блокировки прокрутки и прыжка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

menuInit();


// Анимация при скролле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
}

//Валидация формы

const form = document.querySelector('.message__form');
const nameInput = form.querySelector('.message__name');
const emailInput = form.querySelector('.message__email');
const messageInput = form.querySelector('.message__textarea');

form.addEventListener('submit', (evt) => {
	// Отменяем действие по умолчанию
	evt.preventDefault();

	// Получаем значения полей формы
	const name = nameInput.value;
	const email = emailInput.value;
	const message = messageInput.value;

	// Проверяем, что поля заполнены
	if (!name || !email || !message) {
		if (!name) {
			nameInput.nextElementSibling.innerHTML = 'Заполните поле "Ваше имя"';
			nameInput.style.border = '3px solid #FB5555';
		} else {
			nameInput.nextElementSibling.innerHTML = '';
			nameInput.style.border = '3px solid #fff';
		}

		if (!email) {
			emailInput.nextElementSibling.innerHTML = 'Заполните поле "Email"';
			emailInput.style.border = '3px solid #FB5555';
		} else {
			let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(email) == false) {
				emailInput.nextElementSibling.innerHTML = 'Введите корректный e-mail';
				emailInput.style.border = '3px solid #FB5555';
			} else {
				emailInput.nextElementSibling.innerHTML = '';
				emailInput.style.border = '3px solid #fff';
			}
		}

		if (!message) {
			messageInput.nextElementSibling.innerHTML = 'Заполните поле "Ваше сообщение"';
			messageInput.style.border = '3px solid #FB5555';
		} else {
			messageInput.nextElementSibling.innerHTML = '';
			messageInput.style.border = '3px solid #fff';
		}
		return;
	}
	console.log(`Ваше имя: ${name}`);
	console.log(`Ваш Email: ${email}`);
	console.log(`Ваше сообщение: ${message}`);
});

// Пагинация слайдера

let observer = new MutationObserver(mutations => {
	const bullets = document.querySelectorAll('.swiper-pagination-bullet');
	bullets.forEach(element => {
		if (element.nextElementSibling !== null && element.nextElementSibling.classList.contains('swiper-pagination-bullet-active')) {
			element.style.height = '10px';
			element.style.width = '10px';
		} else if (element.previousElementSibling !== null && element.previousElementSibling.classList.contains('swiper-pagination-bullet-active')) {
			element.style.height = '10px';
			element.style.width = '10px';
		} else if (element.classList.contains('swiper-pagination-bullet-active')) {
			element.style.height = '13px';
			element.style.width = '13px';
		} else {
			element.style.height = '6px';
			element.style.width = '6px';
		}
	});
});

let elem = document.querySelector('.swiper-pagination');

observer.observe(elem, { childList: true, subtree: true, attributes: true });

