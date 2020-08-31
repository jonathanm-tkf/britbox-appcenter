import { getUrlImageStatic } from './lib/global';

$(() => {
  $('.collections .alphabeth.primary-state a').click(() => {
    $('.alphabeth').removeClass('primary-state');
  });
  $('.collections .alphabeth.primary-state a[data-letter=All]').click(() => {
    $('.alphabeth').addClass('primary-state');
  });
  $('.navigation .category').click(() => {
    $('.main-content').toggleClass('genre');
  });

  $('.navigation-overlay').click(() => {
    $('.main-content').toggleClass('genre');
  });

  // $('.load-animation').each((index, element) => {
  //   const animation = global.bodymovin.loadAnimation({
  //     container: element,
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     path: getUrlImageStatic('animations/load.json')
  //   });
  // });
});
