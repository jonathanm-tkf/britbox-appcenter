import './search';

global.previusMenuActive = null;
$(() => {
  $('html').click(e => {
    const menu = $('.main-header .menu.active');
    if (
      (menu.length > 0 &&
        !$(e.target).hasClass('active') &&
        !$(e.target).hasClass('icon-search') &&
        !$(e.target).closest('.top-bar').length) ||
      ($(e.target).is('a') && !$(e.target).hasClass('active'))
    ) {
      $('[data-menu].active').removeClass('active');
      $('.top-bar').removeClass(['data-explore', 'data-search', 'search']);
      menu.removeClass('active');
      $('.main-content').removeAttr('style');
    }
  });

  $('.menu').click(event => {
    event.stopPropagation();
    const element = $(event.target);

    if (element.hasClass('content')) {
      const menu = $('.main-header .menu.active');

      if (menu.length > 0 && !menu.hasClass('search')) {
        $('[data-menu].active').removeClass('active');
        $('.top-bar').removeClass(['data-explore', 'data-search', 'search']);
        menu.removeClass('active');
       /* if(menu.hasClass('search')) {
          $('.main-content').removeAttr('style');
        } */
      }
    }
  });

  $('[data-tab]').on('click', event => {
    const tab = $(event.currentTarget).attr('data-tab');
    $(event.currentTarget)
      .siblings()
      .removeClass('active');
    $(event.currentTarget).addClass('active');
    $(`#${tab}-tab`).addClass('active');
  });

  $('.close-menu').click(event => {
    event.preventDefault();
    $('.top-bar a').removeClass('active');
    const activeMenu = $('.menu').removeClass('active');
    setTimeout(() => {
      activeMenu.siblings('.top-bar').attr('class', 'top-bar');
    }, 250);
  });

  $(document).on('click', '[data-menu]', event => {
    event.preventDefault();
    const menu = $(event.currentTarget).attr('data-menu');

    if (menu === 'data-search') {
      $('.top-bar').addClass('search');
    } else {
      $('.top-bar').removeClass('search');
    }

    if ($(event.currentTarget).hasClass('active')) {
      $(event.currentTarget).removeClass('active');
      const activeMenu = $(`.menu[${menu}]`).removeClass('active');

      setTimeout(() => {
        activeMenu.siblings('.top-bar').attr('class', 'top-bar');
      }, 250);

      if (global.previusMenuActive === 'data-search') {
        $('.main-content').removeAttr('style');
        $('.menu[data-search]').removeClass('show');
        $('.top-bar').removeClass('search');
      }

      return;
    }

    $('.top-bar a').removeClass('active');

    $(event.currentTarget).addClass('active');

    const animation = new Promise(resolve => {
      const activeMenu = $('.menu').removeClass('active');

      if (menu !== 'data-search') {
        activeMenu.siblings('.top-bar').attr('class', 'top-bar');
      }
      setTimeout(() => {
        resolve(true);
      }, 300);
    });

    animation.then(() => {
      const activeMenu = $(`.menu[${menu}]`).addClass('active');
      setTimeout(() => {
        activeMenu.siblings('.top-bar').addClass(menu);
      }, 100);
      $('.menu[data-search]').removeClass('show');
    });

    if (menu === 'data-search') {
      setTimeout(() => {
        $('.main-content').css({
          overflow: 'hidden'
        });
      }, 500);

      setTimeout(() => {
        $('.search input').focus();
      }, 400);
    } else {
      $('.main-content').removeAttr('style');
    }

    global.previusMenuActive = menu;
  });
});
