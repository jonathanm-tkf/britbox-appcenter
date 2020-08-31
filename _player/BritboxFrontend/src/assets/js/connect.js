/* eslint-disable */

/// var count;
/// $('input.pinlogin-field').on('input', function () {
///  console.log('cambio');
/// });

document.addEventListener('DOMContentLoaded', function (event) {

  let loginpin = new global.libs.Pinlogin(document.querySelector('#loginpin'), {
    type: 'text',
    fields: 6,
    reset: false,
    hideinput: false,
    pattern: '^[a-zA-Z0-9]+$',
    complete: function (pin) {
      $('#connect-button').prop('disabled', false).focus();
      return false;
    },
    keydown: function (e, field, nr) {
      $('#loginpin').removeClass('error');
      $('.alert-txt').html('');
    }
  });
});


