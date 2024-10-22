export const toggleSearchArea = (searchArea: HTMLElement) => {
  const input = searchArea.querySelector<HTMLInputElement>('input');
  const overlay = searchArea.nextElementSibling;

  searchArea.classList.toggle('is-active');
  overlay.classList.toggle('is-active');

  if (searchArea.classList.contains('is-active')) {
    input.focus();
  }
};
