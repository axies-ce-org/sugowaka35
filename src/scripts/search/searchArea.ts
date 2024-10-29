export const setSearchAreaWidthValue = (searchArea: HTMLDivElement) => {
  const searchAreaWidth = searchArea.clientWidth;
  document.body.style.setProperty('--search-area-width', `${searchAreaWidth}px`);
};

export const setSearchTriggerState = (trigger: HTMLButtonElement, isActive: boolean) => {
  trigger.setAttribute('aria-expanded', isActive.toString());
};

export const setSearchAreaState = (searchArea: HTMLDivElement, isActive: boolean) => {
  document.body.dataset.isSearching = isActive.toString();
  searchArea.setAttribute('aria-hidden', (!isActive).toString());
  searchArea.nextElementSibling.setAttribute('aria-hidden', (!isActive).toString());

  if (isActive) {
    const input = searchArea.querySelector<HTMLInputElement>('input');
    input.focus();

    if (input.value) {
      const button = input.nextElementSibling as HTMLButtonElement;
      button.disabled = false;
    }
  }
};

export const setSearchAreaTopPosition = () => {
  const { top } = document.querySelector<HTMLElement>('#js-nav').getBoundingClientRect();
  document.body.style.setProperty('--search-area-top', `${Math.max(top / 16, 2.5)}rem`);
};
