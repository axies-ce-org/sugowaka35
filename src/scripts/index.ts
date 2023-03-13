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


// モーダル
MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true
});


// サイドバー ハイライト
const headings = document.querySelectorAll('.title');
let toc = '<ul id="fixed-toc">';

headings.forEach( function(heading, index) {
  heading.id = 'heading-0' + (index+1);
  let id = heading.id;
  toc = toc + '<li><a href="#' + id + '">' + heading.textContent + '</a></li>';
});
toc = toc + '</ul>';
document.querySelector('.sub-menu').insertAdjacentHTML('afterbegin', toc);

window.addEventListener('scroll', function() {
  let scroll = window.scrollY;//スクロール量を取得
  let hight = window.innerHeight;//画面の高さを取得
  let offset = 200;
  const toc_completed = document.getElementById('fixed-toc');
  headings.forEach( function( heading , index) {
      let i = index + 1;
      let target = document.querySelector('#fixed-toc li:nth-of-type(' + i + ') > a');
      let pos = heading.getBoundingClientRect().top + scroll;//見出しの位置
      if (scroll > pos - hight + offset) {//スクロール量が見出しを超えた
          if (headings[index + 1] !== undefined) {// 次の見出しがある＝最後の見出しではない
              let next_pos = headings[index + 1].getBoundingClientRect().top + scroll;//次の見出しの位置
              if (scroll > next_pos - hight + offset) { // スクロール量が次の見出しも超えている
                  target.classList.remove('current');
              } else if (target.classList.contains('current') == true) { // すでにcurrentがついている
                  return;
              } else if (i == 1 && toc_completed.classList.contains('active') == false){// 1つ目
                  target.classList.add('current')
              } else { // 次の見出しは見えてない
                  target.classList.add('current');
              }
          } else { //最後の見出しの時
              target.classList.add('current');
          }
      } else { //スクロール量が見出しを超えてない
          target.classList.remove('current');
      }
  });
});
