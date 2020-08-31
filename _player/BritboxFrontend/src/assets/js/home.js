/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
  tns
} from '../../../node_modules/tiny-slider/src/tiny-slider';
import './lib/jquery.vnm.percentWithinViewport.min';

// (function(window) {
//   function extend(a, b) {
//     for (const key in b) {
//       if (b.hasOwnProperty(key)) {
//         a[key] = b[key];
//       }
//     }
//     return a;
//   }

//   function DotNav(el, options) {
//     this.nav = el;
//     this.options = extend({}, this.options);
//     extend(this.options, options);
//     this._init();
//   }

//   DotNav.prototype.options = {};

//   DotNav.prototype._init = function() {
//     const hop = this.nav.parentNode.className.indexOf('dotstyle-hop') !== -1;

//     const dots = [].slice.call(this.nav.querySelectorAll('li'));
//     let current = 0;
//     const self = this;

//     dots.forEach((dot, idx) => {
//       dot.addEventListener('click', ev => {
//         ev.preventDefault();
//         if (idx !== current) {
//           dots[current].className = '';

//           // special case
//           if (hop && idx < current) {
//             dot.className += ' current-from-right';
//           }

//           setTimeout(() => {
//             dot.className += ' current';
//             current = idx;
//             if (typeof self.options.callback === 'function') {
//               self.options.callback(current);
//             }
//           }, 25);
//         }
//       });
//     });
//   };

//   window.DotNav = DotNav;
// })(window);

global.slider = null;
global.savePercentage = 0;

global.onScroll = () => {
  const withinViewportArray = $('.vertical').percentWithinViewport();

  $.each(withinViewportArray, (index, element) => {
    setTimeout(() => {
      const percentVisible = parseInt($(element).attr('data-percent-viewport'), 10);

      if (
        percentVisible >= 26 &&
        !$('.vertical').hasClass('fixed') &&
        percentVisible > global.savePercentage
      ) {
        $('.vertical').addClass('fixed');
        $('body').mCustomScrollbar('scrollTo', '.vertical');
        global.savePercentage = 0;
      } else if (percentVisible === 0) {
        $('.vertical').removeClass('fixed');
      } else if ($('.visible').hasClass('fixed') && percentVisible > 90) {
        $('body').mCustomScrollbar('scrollTo', '.vertical');
      }

      global.savePercentage = percentVisible;
    }, 100);
  });
};

$(() => {
  // if (typeof tns !== 'undefined' && $('#vertical').length > 0) {
  //   global.slider = tns({
  //     container: '#vertical',
  //     controls: false,
  //     items: 3,
  //     axis: 'vertical',
  //     mode: 'carousel',
  //     mouseDrag: true,
  //     nav: false,
  //     center: true,
  //     startIndex: 1,
  //     loop: false
  //   });

  //   $('.vertical').bind('mousewheel DOMMouseScroll', e => {
  //     let scrollTo = null;

  //     if (e.type === 'mousewheel') {
  //       scrollTo = e.originalEvent.wheelDelta * -1;
  //     } else if (e.type === 'DOMMouseScroll') {
  //       scrollTo = 20 * e.originalEvent.detail;
  //     }

  //     const swiperActive = $('.vertical .item.active');
  //     const dots = $('.dotstyle .current');

  //     const element = swiperActive;

  //     if (e.originalEvent.wheelDelta >= 0) {
  //       if (element.attr('id') !== 'vertical-item2') {
  //         global.slider.goTo('prev');

  //         element
  //           .removeClass('active')
  //           .prev()
  //           .addClass('active');

  //         dots.removeClass('current');
  //         if (dots.prev().length > 0) {
  //           dots.prev().addClass('current');
  //         } else {
  //           dots
  //             .closest('ul')
  //             .find('[data-id="4"]')
  //             .addClass('current');
  //         }
  //       } else {
  //         $('.vertical').removeClass('fixed');
  //         $('html, body').animate({
  //             scrollTop: $('.middle').offset().top
  //           },
  //           'normal',
  //           () => {
  //             $('.vertical').removeClass('fixed');
  //           }
  //         );
  //       }
  //     } else if (element.attr('id') !== 'vertical-item4') {
  //       global.slider.goTo('next');
  //       element
  //         .removeClass('active')
  //         .next()
  //         .addClass('active');
  //       dots.removeClass('current');

  //       if (dots.next().length > 0) {
  //         dots.next().addClass('current');
  //       } else {
  //         dots
  //           .closest('ul')
  //           .find('[data-id="3"]')
  //           .addClass('current');
  //       }
  //     } else if ($('.vertical').hasClass('fixed')) {
  //       $('.vertical').removeClass('fixed');
  //     } else {
  //       $('html, body').animate({
  //           scrollTop: $('.bottom').offset().top + 10
  //         },
  //         'normal',
  //         () => {
  //           $('.vertical').removeClass('fixed');
  //         }
  //       );
  //     }

  //     if (scrollTo) {
  //       e.preventDefault();
  //       $(this).scrollTop(scrollTo + $(this).scrollTop());
  //     }
  //   });
  // }

  // [].slice.call(document.querySelectorAll('.dotstyle > ul')).forEach(nav => new DotNav(nav));

  // $(document).on('click', '.dotstyle > ul li a', e => {
  //   e.stopPropagation();
  //   const element = $(e.currentTarget).closest('ul');
  //   element.find('li').removeClass('current');
  //   $(e.currentTarget)
  //     .closest('li')
  //     .addClass('current');

  //   const selected = $(e.currentTarget)
  //     .closest('li')
  //     .attr('data-id');
  //   global.slider.goTo(selected - 1);
  //   const list = element
  //     .closest('.dotstyle')
  //     .next()
  //     .find('.item');
  //   list.removeClass('active');

  //   $(list[parseInt(selected, 10)]).addClass('active');
  // });

  if ($('#horizontal-scroll').length > 0) {
    const style = $('#horizontal-scroll')[0].style;
    style.webkitAnimationPlayState = 'running';

    $('.action-play a').click(e => {
      e.preventDefault();
      $(e.currentTarget)
        .find('i')
        .toggleClass('stop');

      if (style.webkitAnimationPlayState === 'running') {
        style.webkitAnimationPlayState = 'paused';
        // IE FIX
        style.animationPlayState = 'paused';
      } else {
        style.webkitAnimationPlayState = 'running';
        // IE FIX
        style.animationPlayState = 'running';
      }
    });
  }

  if ($('.slider').length > 0) {
    const swiper = new global.libs.Swiper('.slider .swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      mousewheelControl: true,
      lazyLoadingInPrevNext: true,
      loop: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 296,
        depth: 100,
        modifier: 1,
        slideShadows: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        slideChangeTransitionEnd() {
          global.bLazy.revalidate();
        }
      }
    });
  }
});
