/** Generic Activation, Deactivation and Toggling
 *  ------------------------------------------------------------------------------------------------
 *  All methods add a generic js--active or js--inactive class to targets
 *  that can be used for styling on a case-by-case basis
**/


/** Action functions
 *  ------------------------------------------------------------------------------------------------
**/
const openPopup = (e) => {
  // we open the popup regardless but only prevent the default for left clicks.
  // means we can still open a new tab or right click...
  // ref: https://www.jacklmoore.com/notes/click-events/
  if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
    e.preventDefault();
  }

  const target = document.getElementById(e.currentTarget.getAttribute('data-target'));
  if (target) {
    const scroll = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop;
    document.body.setAttribute('data-scroll-pos', scroll);
    document.body.classList.add('js--has-popup');

    target.classList.add('js--popup-active');
    // wait a tick for the transition class so that it animates...
    window.setTimeout(() => target.classList.add('js--popup-active-trans-in'), 10);
  }
};


export const closePopups = () => {
  document.body.classList.remove('js--has-popup');
  window.scrollTo(0, document.body.getAttribute('data-scroll-pos') || 0);
  const activePopups = document.querySelectorAll('.js--popup-active');
  (activePopups || []).forEach(
    (active) => {
      active.classList.remove('js--popup-active-trans-in');
      active.classList.remove('js--popup-active');
    },
  );
};

/** Initialise listeners
 *  ------------------------------------------------------------------------------------------------
**/
export const init = () => {
  const popupTriggers = document.querySelectorAll('.js--popup-trigger');
  (popupTriggers || []).forEach(
    (trigger) => {
      trigger.addEventListener('click', openPopup, false);
    },
  );
  const popupClosers = document.querySelectorAll('.js--popup-close');
  (popupClosers || []).forEach(
    (closer) => {
      closer.addEventListener('click', closePopups, false);
    },
  );
};

export default init;
