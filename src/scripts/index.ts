const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

for (let i = 0; i < smoothScrollTrigger.length; i++) {
  smoothScrollTrigger[i].addEventListener('click', (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger[i].getAttribute('href');
      let targetElement = document.getElementById(href.replace('#', ''));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.pageYOffset;
    const target = rect + offset - 40;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
}

export{}

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
