const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

for (let i = 0; i < smoothScrollTrigger.length; i++) {
  smoothScrollTrigger[i].addEventListener('click', (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger[i].getAttribute('href');
      let targetElement = document.getElementById(href.replace('#', ''));
    const target = targetElement.getBoundingClientRect().top;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
}

export{}

