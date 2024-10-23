export const setSearchTriggerState = (trigger: HTMLButtonElement, isActive: boolean) => {
  trigger.setAttribute('aria-expanded', isActive.toString());
};

export const setSearchAreaState = (searchArea: HTMLDivElement, isActive: boolean) => {
  searchArea.setAttribute('aria-hidden', (!isActive).toString());
  searchArea.nextElementSibling.setAttribute('aria-hidden', (!isActive).toString());

  if (isActive) {
    const input = searchArea.querySelector<HTMLInputElement>('input');
    input.focus();
  }
};
