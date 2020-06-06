/** Carousels...
 *  ------------------------------------------------------------------------------------------------
**/
import { getNextSibling, getPreviousSibling } from './utils/siblings';


/** Action functions
 *  ------------------------------------------------------------------------------------------------
**/
const carouselGoTo = (target, carousel) => {
  // remove old active classes.
  const active = carousel.querySelectorAll('.js--carousel__slide--active');
  (active || []).forEach(
    (a) => {
      a.classList.remove('js--carousel__slide--active');
      a.classList.remove('js--carousel__slide--trans-in');
    },
  );
  const activeNav = carousel.querySelectorAll('.js--carousel__nav-link--active');
  (activeNav || []).forEach(
    (a) => {
      a.classList.remove('js--carousel__nav-link--active');
    },
  );

  // add new one
  target.classList.add('js--carousel__slide--active');

  // wait a tick for the transition class so that it animates...
  window.setTimeout(() => {
    target.classList.add('js--carousel__slide--trans-in');
    // scroll to it if required
    if (carousel.getAttribute('data-scroll-to-slide') === 'scroll') {
      console.log(target);
      target.scrollIntoView();
    }
  }, 10);
  carousel.setAttribute('data-active-slide', target.id);

  // if there's nav we should highlight the active item.
  const navForActive = carousel.querySelectorAll(`.js--carousel__nav-link[data-target=${target.id}]`);
  (navForActive || []).forEach(
    (a) => {
      a.classList.add('js--carousel__nav-link--active');
    },
  );

  // if there are counters we update those too
  const counts = carousel.querySelectorAll('.js--carousel__current-count');
  const currentlyActive = carousel.querySelector('.js--carousel__slide--active');
  (counts || []).forEach(
    (c) => {
      // eslint-disable-next-line no-param-reassign
      c.textContent = [...currentlyActive.parentNode.children].indexOf(currentlyActive) + 1;
    },
  );
};

const carouselPrevNext = (direction, carousel) => {
  console.log(direction);
  const active = document.getElementById(carousel.getAttribute('data-active-slide'));
  if (active) {
    const target = (
      direction === 'prev'
        ? getPreviousSibling(active, '.js--carousel__slide')
        : getNextSibling(active, '.js--carousel__slide')
    ) || (
      direction === 'prev'
        ? carousel.querySelector('.js--carousel__slide:last-of-type')
        : carousel.querySelector('.js--carousel__slide:first-of-type')
    );

    if (target) {
      carouselGoTo(target, carousel);
    }
  }
};

/** Handle actions
 *  ------------------------------------------------------------------------------------------------
**/
const carouselAction = (e) => {
  const carousel = e.target.closest('.js--carousel');

  if (carousel) {
    switch (e.target.getAttribute('data-action')) {
      case 'prev':
        carouselPrevNext('prev', carousel);
        break;
      case 'next':
        carouselPrevNext('next', carousel);
        break;
      case 'target':
        carouselGoTo(document.getElementById(e.target.getAttribute('data-target')), carousel);
        break;

      default:
        /** START DEBUGGING **/
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log({
            message: 'There was no usable data-action on a .js--carousel__nav-link',
            target: e.target,
          });
        }
        /** END DEBUGGING **/
        break;
    }
  }
};


/** Initialise listeners
 *  ------------------------------------------------------------------------------------------------
**/
export const init = () => {
  const carouselButtons = document.querySelectorAll('.js--carousel__nav-link');
  (carouselButtons || []).forEach(
    (butt) => {
      butt.addEventListener('click', carouselAction, false);
    },
  );

  // left/right for progress
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      const carousels = document.querySelectorAll('.js--carousel');
      (carousels || []).forEach(
        (carousel) => carouselPrevNext(e.keyCode === 37 ? 'prev' : 'next', carousel),
      );
    }
  });

  // draggable WorkGallery carousel
  const slider = document.querySelector('.WorkGallery');
  let isDown = false;
  let startX;
  let scrollLeft;
  let clickTimer;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    clickTimer = new Date();
    slider.classList.add('active');
    slider.style.scrollSnapType = 'none';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.removeProperty('scroll-snap-type');
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.removeProperty('scroll-snap-type');
    slider.classList.remove('active');
    const curTime = new Date();
    if (curTime - clickTimer < 200) {
      carouselPrevNext('next', document.querySelector('.workCarousel'));
    }
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
};

export default init;
