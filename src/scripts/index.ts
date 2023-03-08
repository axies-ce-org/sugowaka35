import MicroModal from 'micromodal';

// ハンバーガー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');
const item = document.querySelectorAll('#js-nav a[href^="#"]');

ham.addEventListener('click', function () {

  ham.classList.toggle('active');
  nav.classList.toggle('active');
});

item.forEach(function (button) {

  button.addEventListener('click', function() {
    ham.classList.remove('active');
    nav.classList.remove('active');
  })
});

window.addEventListener('resize', function(){
  const smWindowSize = 768;
  if (window.innerWidth < smWindowSize){
    ham.classList.remove('active');
    nav.classList.remove('active');
  }
});


MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true
});

