/* eslint-disable no-new */
import Blazy from 'blazy';

import {
  Lang,
  Country,
  getCookie,
  setCookie,
  compare,
  isNull,
  isUndefined,
  isEmpty,
  shareLinks,
  isFunction,
  Scrollable as globalScroll,
  getUrlImageStatic,
  uuid
} from './lib/global';

import './lib/bitmovin';
// import './bitmovin.local';

// import './lib/foundation-explicit-pieces';

import libs from './lib/dependancies';

window.libs = libs;

$.extend($.tmpl.tag, {
  var: {
    open: 'var $1;'
  }
});

// $(document).foundation();

const checkUpdatePlan = () => {
  // console.log('checkUpdatePlan');

  const url = window.location.href;
  if (
    url.toLowerCase().indexOf('action=updateplansuccess') !== -1 ||
    url.toLowerCase().indexOf('action=selectplansuccess') !== -1 // => Update Plan Success
  ) {
    $('#custom-modal').modal('show');
  }
};

(function($) {
  const url = window.location.pathname;

  const isRetina = () =>
    ((window.matchMedia &&
      (window.matchMedia(
        'only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)'
      ).matches ||
        window.matchMedia(
          'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)'
        ).matches)) ||
      (window.devicePixelRatio && window.devicePixelRatio >= 2)) &&
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  global.bLazy = new Blazy({
    loadInvisible: true,
    breakpoints: [
      {
        width: 420,
        src: 'data-src-small'
      }
    ],
    error: (element, message) => {
      if (message === 'missing' && element.hasAttribute('data-src-large')) {
        const image = element.getAttribute('data-src-large').split('|');
        // eslint-disable-next-line no-restricted-syntax
        for (const key in element.dataset) {
          if ({}.hasOwnProperty.call(element.dataset, key)) {
            element.removeAttribute(
              `data-${key
                .split(/(?=[A-Z])/)
                .join('-')
                .toLowerCase()}`
            );
          }
        }
        const urlImage = !isRetina ? image[1] : image[0];
        element.style.backgroundImage = `url(${urlImage}`;

        if (image.length > 0) {
          element.classList.add('b-loaded');
          setTimeout(() => {
            element.classList.remove('b-error');
          }, 300);
        }
      }
    },
    success: element => {
      if ($(element).hasClass('image-background') && !$(element).hasClass('no-checked')) {
        $(element).addClass('checking-data');
        const event = document.createEvent('Event');
        event.initEvent('loadImageComplete', true, true);
        element.dispatchEvent(event);
      } else {
        $(element)
          .parent()
          .addClass('loaded');
      }
    }
  });

  $.LoadingOverlaySetup({
    background: '#171B23',
    image: false,
    custom: `<img src="${getUrlImageStatic('img/logo.png')}"></img>`,
    customAnimation: 'fadein-logo',
    fade: [0, 300]
  });

  global.loading = {
    fadeOut: () => {
      $.LoadingOverlay('hide');
      $('#splash-screen')
        .fadeOut('slow')
        .remove();
      global.loading.isLoading = false;
    },
    isLoading: false
  };

  global.scrollToElement = selector => {
    $('html, body').animate(
      {
        scrollTop: $(selector).offset().top
      },
      600
    );
  };

  global.sliders = [];

  const createSwiper = classElement => {
    $(classElement).each((index, element) => {
      let config = {};

      if ($(element)[0].hasAttribute('data-freemode')) {
        config = {
          freeMode: true
        };
      } else {
        config = {
          slidesPerView: 'auto',
          // slidesPerView: parseInt($(element).attr('data-slides-per-view'), 10) || 5,
          // spaceBetween: parseInt($(element).attr('data-spaceBetween'), 10) || 15,
          slidesPerGroup: parseInt($(element).attr('data-slides-per-group'), 10) || 5
        };
      }
      global.sliders.push(
        new global.libs.Swiper(element, {
          ...config,
          loop: false,
          loopFillGroupWithBlank: true,
          pagination: {
            el: $(element)
              .closest('.swiper')
              .find('.swiper-pagination'),
            clickable: true
          },
          navigation: {
            nextEl: $(element).find('.swiper-button-next'),
            prevEl: $(element).find('.swiper-button-prev')
          },
          breakpoints: {
            860: {
              freeMode: true
            },
            1300: {
              slidesPerGroup: parseInt($(element).attr('data-slides-per-group'), 10) - 1 || 2
            }
          },
          on: {
            init() {
              $(this.slides)
                .removeClass('active')
                .addClass('out')
                .css('opacity', 0.05);

              $(this.slides[this.activeIndex])
                .css('opacity', 1)
                .removeClass('out');

              $(this.slides[this.activeIndex])
                .prev()
                .css('opacity', 0.2)
                .addClass('out')
                .prev()
                .css('opacity', 0.1)
                .addClass('out');

              $(
                this.slides[
                  this.activeIndex +
                    (parseInt($(element).attr('data-slides-per-view'), 10) - 1 || 4)
                ]
              )
                .next()
                .css('opacity', 0.2)
                .addClass('out')
                .next()
                .css('opacity', 0.1)
                .addClass('out');

              $(this.slides[this.activeIndex])
                .nextAll(`*:lt(${parseInt($(element).attr('data-slides-per-view'), 10) - 1 || 4})`)
                .css('opacity', 1)
                .removeClass('out');

              setTimeout(() => {
                global.bLazy.revalidate();
              }, 300);
            },
            slideChangeTransitionStart() {
              $(this.slides)
                .removeClass('active')
                .addClass('out')
                .css('opacity', 0.05);

              $(this.slides[this.activeIndex])
                .css('opacity', 1)
                .removeClass('out');

              $(this.slides[this.activeIndex])
                .prev()
                .css('opacity', 0.2)
                .addClass('out')
                .prev()
                .css('opacity', 0.1)
                .addClass('out');

              $(this.slides[this.activeIndex + 3])
                .next()
                .css('opacity', 0.2)
                .addClass('out')
                .next()
                .css('opacity', 0.1)
                .addClass('out');

              $(this.slides[this.activeIndex])
                .nextAll(`*:lt(${parseInt($(element).attr('data-slides-per-view'), 10) - 1 || 4})`)
                .css('opacity', 1)
                .removeClass('out');
            },
            slideChangeTransitionEnd() {
              global.bLazy.revalidate();
            }
          }
        })
      );
    });
  };

  $.fn.isInViewport = function() {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  global.ContinueAnimations = [];

  global.modalAnimation = null;

  global.heroSlider = null;

  document.addEventListener(
    'DOMContentLoaded',
    e => {
      if ($('.swiper.Bonus-Features-slider .swiper-slide').length < 3) {
        $('.swiper.Bonus-Features-slider').addClass('less-than-three');
      }
    },
    false
  );

  $(() => {
    checkUpdatePlan();

    $('#waypoint .load-more .load-animation').each((index, element) => {
      const animation = global.bodymovin.loadAnimation({
        container: element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: getUrlImageStatic('animations/load.json')
      });
    });

    if ($('.custom-select select').length > 0) {
      const select = $('.custom-select select').selectBoxIt({
        autoWidth: true,
        showEffect: 'fadeIn',
        showEffectSpeed: 150,
        hideEffect: 'fadeOut',
        hideEffectSpeed: 150
      });

      // Refresh the select data when the custom event is fired
      if ($('#watchtype').length > 0) {
        document.querySelector('#watchtype').addEventListener(
          'watchlist',
          () => {
            $('#watchtype')
              .data('selectBox-selectBoxIt')
              .refresh();
          },
          false
        );
      }

      select.on('change', e => {
        global.bodyVm.$emit(`update:${e.target.id}`, e.target.value);
      });
    }

    setTimeout(() => {
      if ($('.loadingoverlay').is(':visible') && !global.loading.isLoading) {
        global.loading.fadeOut();
      }
      if ($('.swiper-horizontal').length > 0) {
        createSwiper('.swiper-horizontal .swiper-container');
      }
    }, 1000);

    setTimeout(() => {
      $('.bar .color-bar').each((index, element) => {
        const percentage = $(element).attr('data-percentage');
        $(element).css('width', percentage);
      });
    }, 1300);

    if ($('.tabs').length > 0) {
      $(document).on('click', '.tabs .tabs-title', event => {
        event.preventDefault();

        $(event.currentTarget)
          .closest('.tabs')
          .find('li')
          .removeClass('is-active');
        $(event.currentTarget).addClass('is-active');

        const id = $(event.currentTarget)
          .find('a')
          .attr('href');

        $(event.currentTarget)
          .closest('.tabs-wrapper')
          .find('.tabs-panel')
          .hide()
          .removeClass('is-active');
        $(id)
          .addClass('is-active')
          .show();
        global.bLazy.revalidate();
      });

      setTimeout(() => {
        $('.tabs-panel:not(.is-active)').hide();
      }, 1000);
    }

    if ($('.swiper-top').length > 0) {
      const element = $('.swiper-top .swiper-container');

      const childrens = element.find('.swiper-wrapper').children();

      if (childrens.length > 1) {
        const swiper = new global.libs.Swiper(element, {
          loop: false,
          autoHeight: false,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: $(element)
              .closest('.swiper')
              .find('.swiper-pagination .dot ul'),
            clickable: true,
            renderBullet(index, className) {
              return `<li class="${className}"><a href="#"></a></li>`;
            }
          },
          breakpoints: {
            480: {
              autoHeight: true
            }
          },
          on: {
            init() {
              setTimeout(() => {
                global.bLazy.revalidate();
              }, 300);
            },
            slideChangeTransitionStart() {
              $('.swiper-pagination')
                .find('.current')
                .removeClass('current');
            },
            slideChangeTransitionEnd() {
              global.bLazy.revalidate();

              const indexCurrentSlide = swiper.realIndex;
              const currentSlide = swiper.slides[indexCurrentSlide];
              const text = $(currentSlide)
                .find('div[data-tracking]')
                .text();

              if (global.dataLayer) {
                global.dataLayer.push({
                  event: 'eventSend',
                  actionType: 'impression',
                  actionName: 'Navigation',
                  eventLabels: {
                    is_background: 'true',
                    eventType: 'ati',
                    container: 'page',
                    status: 'success',
                    label: 'Item in Hero rail is displayed',
                    name: text
                  }
                });
              }
            },
            transitionEnd() {
              setTimeout(() => {
                $(element)
                  .find('.b-loaded')
                  .removeClass('checking-data');
              }, 100);
            }
          }
        });

        global.heroSlider = swiper;
      } else {
        element.find('.swiper-pagination').addClass('hidden');
      }
    }

    // GO TO TOP FOOTER LINK
    if ($(document).height() > 940) {
      $('a.scrollTop').show();
      $('a.scrollTop').click(() => {
        global.scrollToElement('#anchor-scrollTop');
      });
    } else {
      $('a.scrollTop').hide();
    }
    setTimeout(() => {
      if ($(document).height() > 940) {
        $('a.scrollTop').show();
      } else {
        $('a.scrollTop').hide();
      }
    }, 5000);
    $(window).resize(() => {
      setTimeout(() => {
        if ($(document).height() > 940) {
          $('a.scrollTop').show();
        } else {
          $('a.scrollTop').hide();
        }
      }, 100);
    });

    // GO TO TOP FOOTER LINK
    // if ($(document).height() > 940) {
    //   $('a.scrollTop').show();
    //   $('a.scrollTop').on('click', event => {
    //     event.preventDefault();
    //     $('html, body').animate({
    //         scrollTop: 0
    //       },
    //       1000
    //     );
    //   });
    // } else {
    //   $('a.scrollTop').hide();
    // }
    // setTimeout(() => {
    //   if ($(document).height() > 940) {
    //     $('a.scrollTop').show();
    //     $('a.scrollTop').on('click', event => {
    //       event.preventDefault();
    //       $('html, body').animate({
    //           scrollTop: 0
    //         },
    //         1000
    //       );
    //     });
    //   } else {
    //     $('a.scrollTop').hide();
    //   }
    // }, 5000);
    // $(window).resize(() => {
    //   setTimeout(() => {
    //     if ($(document).height() > 940) {
    //       $('a.scrollTop').show();
    //       $('a.scrollTop').on('click', event => {
    //         event.preventDefault();
    //         $('html, body').animate({
    //             scrollTop: 0
    //           },
    //           1000
    //         );
    //       });
    //     } else {
    //       $('a.scrollTop').hide();
    //     }
    //   }, 100);
    // });

    if ($('.row.episode').length > 0) {
      $('.top-banner').addClass('episode-banner');
      $('.row.episode')
        .prev()
        .addClass('episode-prev');
    }

    $('.swiper .row:nth-child(2)').hover(
      function() {
        $(this)
          .closest('.swiper')
          .find('.swiper-pagination')
          .addClass('hover');
      },
      function() {
        $(this)
          .closest('.swiper')
          .find('.swiper-pagination')
          .removeClass('hover');
      }
    );

    // PLAYER FUNCTIONS //

    // PLAYER FULL SCREEN
    // $.initialize('.player-fullscreen .play-animation', (index, element) => {
    //  const autoplay =
    //    typeof $(element).attr('data-autoplay') === 'undefined' ?
    //    true :
    //    JSON.parse($(element).attr('data-autoplay'));

    //  const merge = Object.assign({
    //    loop: true,
    //    autoplay: true
    //  }, {
    //    autoplay
    //  });

    //  const animation = global.bodymovin.loadAnimation(
    //    Object.assign({
    //        container: element,
    //        renderer: 'svg',
    //        path: getUrlImageStatic('animations/play.json')
    //      },
    //      merge
    //    )
    //  );

    //  global.modalAnimation = animation;
    // });

    // PLAYER CLOSE
    // $('.close-modal').click(() => {
    //  $('body').removeClass('overflow');
    //  $('.modal-overlay, .modal').removeClass('active move playing splash');
    //  $('header.main-header').removeAttr('style');
    //  if (global.player) {
    //    clearTimeout(global.pauseSplashTimeout);
    //    global.oneTimePause = false;
    //    global.player.unload();
    //  }
    // });
  });
})(jQuery);
