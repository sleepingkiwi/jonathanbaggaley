export const getPreviousSibling = (elem, selector) => {
  let sibling = elem.previousElementSibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }

  return null;
};

export const getNextSibling = (elem, selector) => {
  let sibling = elem.nextElementSibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }

  return null;
};
