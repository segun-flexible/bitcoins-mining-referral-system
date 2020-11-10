"use strict";

/* ===== Smooth scrolling ====== */
/*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
/* Ref: https://github.com/iamdustan/smoothscroll */

const pageNavLinks = document.querySelectorAll('.scrollto');

pageNavLinks.forEach((pageNavLink) => {
	
	pageNavLink.addEventListener('click', (e) => {
		
		e.preventDefault();
		
		var target = pageNavLink.getAttribute("href").replace('#', '');
		
		//console.log(target);
		
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });

		
    });
	
});


/* ==== Vanilla JS Back To Top Widget ====== */
/* Ref: https://github.com/vfeskov/vanilla-back-to-top */
addBackToTop({
  cornerOffset: 15, // px
  id:'back-to-top',
});



/* ======= Toggle between Signup & Login & ResetPass Modals ======= */ 
const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
const signupModal = new bootstrap.Modal(document.getElementById('signup-modal'));
const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetpass-modal'));

const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const backToLoginLink = document.getElementById('back-to-login-link');
const resetPasswordLink = document.getElementById('resetpass-link');

signupLink.addEventListener('click', function(e) {
	e.preventDefault();
	loginModal.toggle();
	signupModal.show();
});


loginLink.addEventListener('click', function(e) {
	e.preventDefault();
	signupModal.toggle();
	loginModal.show();
});


backToLoginLink.addEventListener('click', function(e) {
	e.preventDefault();
	resetPasswordModal.toggle();
	loginModal.show();
});


resetPasswordLink.addEventListener('click', function(e) {
	e.preventDefault();
	loginModal.toggle();
	resetPasswordModal.show();
});



  
  
  