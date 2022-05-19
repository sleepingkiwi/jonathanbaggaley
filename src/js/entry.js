/** imports
 *  ------------------------------------------------------------------------------------------------
**/
import { init as formsInit } from './forms';
import { init as genericIntersectionInit } from './generic-intersection';
import { init as genericActivatorsInit } from './generic-activation';
import { init as carouselInit } from './carousels';

/** Init everything that interacts with the DOM (after dom is ready)
 *  ------------------------------------------------------------------------------------------------
**/
const init = () => {
  // validation listeners for forms
  formsInit();
  // allowing elements to opt in to generic interesection observation
  // by adding .js--wants-interestion
  genericIntersectionInit();
  // a generic set of classes for toggling, activating and deactivating things!
  genericActivatorsInit();
  // set up all the carousel listeners
  carouselInit();
};

if (document.readyState === 'loading') { // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', init);
} else { // `DOMContentLoaded` has already fired
  init();
}
