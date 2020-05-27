/** Generic Activation, Deactivation and Toggling
 *  ------------------------------------------------------------------------------------------------
 *  All methods add a generic js--active or js--inactive class to targets
 *  that can be used for styling on a case-by-case basis
**/


/** Action functions
 *  ------------------------------------------------------------------------------------------------
**/
const handleClasses = (activate, target, trigger = null) => {
  target.classList[activate ? 'add' : 'remove']('js--active');
  target.classList[activate ? 'remove' : 'add']('js--inactive');
  if (trigger) {
    trigger.classList[activate ? 'add' : 'remove']('js--active');
    trigger.classList[activate ? 'remove' : 'add']('js--inactive');
  }
  /** Animation class
   *  ----------------------------------------------------------------------------------------------
   *  we wait a tick to add it primarily for things we want to animate at first render
   *  -
   *  an additional transition class lets us easily run animations in a js environment only.
   *  For example an element that defaults to js--inactive but we want visible in .no-js
   *  shouldn't animate into it's hidden state when the .js class is added to body.
  **/
  window.setTimeout(() => target.classList[activate ? 'add' : 'remove']('js--active-trans-in'), 10);
};

const activate = (e) => {
  // we activate the target regardless but only prevent the default for left clicks.
  // means we can still open a new tab or right click if this is an anchor...
  // ref: https://www.jacklmoore.com/notes/click-events/
  if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
    e.preventDefault();
  }

  const target = document.getElementById(e.currentTarget.getAttribute('data-target'));

  // if there's no target we fail silently for now.
  if (target) {
    handleClasses(true, target, e.currentTarget);
  }
};

const activateFocus = (e) => {
  const target = document.getElementById(e.currentTarget.getAttribute('data-target'));
  const trigger = document.getElementById(e.currentTarget.getAttribute('data-trigger'));
  if (target) {
    handleClasses(true, target, trigger);
  }
};


export const deactivate = (e) => {
  // see notes in activate = (e) => {
  if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
    e.preventDefault();
  }

  const target = document.getElementById(e.currentTarget.getAttribute('data-target'));

  // if there's no target we fail silently for now.
  if (target) {
    handleClasses(false, target, e.currentTarget);
  }
};


const toggle = (e) => {
  // see notes in activate = (e) => {
  if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
    e.preventDefault();
  }

  const target = document.getElementById(e.currentTarget.getAttribute('data-target'));

  // if there's no target we fail silently for now.
  if (target) {
    /** Determine if target needs activation or deactivation
     *  --------------------------------------------------------------------------------------------
     *  we check if js--active ISN'T present rather than check for presence of .js--inactive
     *  because there's no guarentee js--inactive was added by default.
     *  this effectively gives everything toggleable a default state of .js--inactive unless we
     *  manually specify .js--active in the markup
    **/
    handleClasses(!target.classList.contains('js--active'), target, e.currentTarget);
  }
};

/** Initialise listeners
 *  ------------------------------------------------------------------------------------------------
**/
export const init = () => {
  // js--activator activates on click
  const activators = document.querySelectorAll('.js--activator');
  (activators || []).forEach(
    (el) => {
      el.addEventListener('click', activate, false);
    },
  );
  // js--activate-on-focus activates when el or any child receives focus
  const focusActivators = document.querySelectorAll('.js--activate-on-focus');
  (focusActivators || []).forEach(
    (el) => {
      el.addEventListener('focusin', activateFocus, false);
    },
  );
  // js--deactivator deactivates on click
  const deactivators = document.querySelectorAll('.js--deactivator');
  (deactivators || []).forEach(
    (el) => {
      el.addEventListener('click', deactivate, false);
    },
  );
  // js--toggler toggles active and inactive classes
  const togglers = document.querySelectorAll('.js--toggler');
  (togglers || []).forEach(
    (el) => {
      el.addEventListener('click', toggle, false);
    },
  );
};

export default init;
