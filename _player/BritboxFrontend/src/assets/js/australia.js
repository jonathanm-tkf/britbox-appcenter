/* eslint-disable no-useless-escape */
import { getUrlImageStatic } from './lib/global';

function ValidateEmail(inputText) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.value.match(mailformat)) {
    return true;
  }
  return false;
}

$(() => {
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
      } else {
        style.webkitAnimationPlayState = 'running';
      }
    });
  }

  $('form').on('submit', e => {
    // validation code here
    if (!ValidateEmail($('.input-wrapper input')[0])) {
      e.preventDefault();
    }
  });

  $('.input-wrapper input').keyup(() => {
    const validate = ValidateEmail($('.input-wrapper input')[0]);

    const element = $('.input-wrapper input').next();

    if (!element.hasClass('error-message')) {
      $('.input-wrapper input')
        .parent()
        .append(
          '<div class="error-message"><i class="icon-error-circle"></i> Please enter a valid email address.</div>'
        );
    }

    if ($('.input-wrapper input').val() === '') {
      $('.input-wrapper input').removeClass('error');
      $('.error-message').fadeOut('fast');

      return true;
    }

    if (validate) {
      $('.input-wrapper input').removeClass('error');
      $('.error-message').fadeOut('fast');
      $('.input-wrapper button').removeAttr('disabled');
    } else {
      $('.input-wrapper input').addClass('error');
      $('.error-message').fadeIn('fast');
      $('.input-wrapper button').attr('disabled', true);
    }
  });

  $('.animation.thank-you').each((index, element) => {
    const animation = global.bodymovin.loadAnimation({
      container: element,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: getUrlImageStatic('animations/thank-you-animation.json')
    });
  });
});
