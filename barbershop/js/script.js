;(function() {
 var navMain = document.querySelector('.main-nav');
 var navToggle = document.querySelector('.main-nav__toggle');
 var loginLink = document.querySelector('.main-nav__user-login');


 var modalLogin = document.querySelector('.modal-content--login');
 var modalLoginClose = document.querySelector('.modal-content__close');


 var submitHaircut = document.querySelector('.haircut-form__submit');
 var customerName = document.querySelector('[name="customer__name"]');
 var customerPhone = document.querySelector('[name="customer__phone"]');
 var popup = document.querySelector('.pop-up');
 var popupClose = document.querySelector('.pop-up__confirm');


	navMain.classList.remove('main-nav--nojs');

	navToggle.addEventListener('click', function() {
		if (navMain.classList.contains('main-nav--closed')) {
			navMain.classList.remove('main-nav--closed');
			navMain.classList.add('main-nav--opened');
		} else {
			navMain.classList.add('main-nav--closed');
			navMain.classList.remove('main-nav--opened');
		}
	});


	loginLink.addEventListener('click', function(event) {
		event.preventDefault();
		modalLogin.classList.add('modal-content--open');
	});
	modalLoginClose.addEventListener('click', function(event) {
		event.preventDefault();
		modalLogin.classList.remove('modal-content--open');
	});


	submitHaircut.addEventListener('click', function(event) {
		event.preventDefault();
		if (customerName.value !== null && customerPhone.value !== null) {
			popup.classList.add('pop-up--open');	
		}
	});
	popupClose.addEventListener('click', function(event) {
		event.preventDefault();
		popup.classList.remove('pop-up--open');
	})
})();
