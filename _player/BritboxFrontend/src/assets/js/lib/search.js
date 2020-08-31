import { getPathURL } from './global';

const listener = () => {
  $('.autocomplete-suggestions').hide();
  global.bLazy.revalidate();
};

const resetSearch = () => {
  $('#browse, #list').removeClass('hide');
  $('#not-found, #words-searching').addClass('hide');
  $('#people, #results').empty();
  $('.autocomplete-suggestions').removeAttr('style');
  //  $('.main-content').removeAttr('style');
};

const search = term => {
  let searchUrl = global.libs.Constants.search.replace('maxresults=6', 'maxresults=30').replace('segments=US', `segments=${global.Country}`);

  if (!global.bodyVm.$store.state.auth.isLogged) {
    searchUrl = searchUrl.replace('&sub=Subscriber', '');
  }

  $.getJSON(
    searchUrl,
    { term },
    data => {
      if (data) {
        $('#browse, #list').addClass('hide');
        const {
          people,
          items: { items }
        } = data.externalResponse;

        $('#people').empty();

        if (people.length > 0) {
          const peopleData = people.map(item => {
            const [name, ...surname] = item.name.split(' ');

            item.name = name;
            item.surname = surname.join(' ');
            return item;
          });

          $('#peopleData')
            .tmpl({ data: peopleData })
            .appendTo($('#people'));
        }

        $('#results').empty();

        if (items.length > 0) {
          $('#not-found').addClass('hide');
          $('#words-searching').removeClass('hide');

          $('#resultsData')
            .tmpl({ data: items })
            .appendTo($('#results'));

          $('.autocomplete-suggestions').hide();

          global.bLazy.revalidate();
        }

        if (items.length > 0 || people.length > 0) {
          $('#words-searching b').empty();
          $('#searchWords')
            .tmpl({ text: term })
            .appendTo($('#words-searching b'));

          global.dataLayer.push({
            event: 'eventSend',
            actionType: 'search',
            actionName: 'ns_search_result',
            eventLabels: {
              eventType: 'atc',
              container: 'search',
              status: 'success',
              label: 'Search results are displayed to user',
              url: people.length + items.length
            }
          });
        }

        if (items.length === 0 && people.length === 0) {
          $('#words-searching').addClass('hide');
          $('#not-found').removeClass('hide');
        }
      }
    }
  );

  listener();
};

$(() => {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      // close search
      if ($('.top-bar').hasClass('search')) {
        $('[data-menu].active, [data-search].active').removeClass('active');
        $('.top-bar').removeClass(['data-search', 'search']);
        $('.main-content').removeAttr('style');
        $('.autocomplete-suggestions').removeAttr('style');
      }
    }
  };

  if ($('.search input').length > 0) {
    $('.search input')
      .autoComplete({
        minChars: 3,
        delay: 500,
        source(term, response) {
          let searchUrl = global.libs.Constants.search.replace('segments=US', `segments=${global.Country}`);

          if (!global.bodyVm.$store.state.auth.isLogged) {
            searchUrl = searchUrl.replace('&sub=Subscriber', '');
          }

          $.getJSON(searchUrl, { term }, data => {
            const { items } = data.externalResponse.items;
            const { people } = data.externalResponse;
            if (people.length > 0) {
              people.forEach(element => {
                items.push({
                  type: 'people',
                  title: element.name,
                  path: element.path
                });
              });
            }

            // $('#list, #browse').addClass('hide');

            $('#people, #results').empty();

            if (items.length === 0 && people.length === 0) {
              $('#not-found').removeClass('hide');
            } else {
              $('#not-found').addClass('hide');
            }

            if (term === '') {
              $('#list, #browse').removeClass('hide');
            }

            response(items);
          });
        },
        // eslint-disable-next-line no-shadow
        renderItem(item, search) {
          search = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
          const re = new RegExp(`(${search.split(' ').join('|')})`, 'gi');
          return `<div class="autocomplete-suggestion" data-val="${search}" data-path="${
            item.path
            }">${item.title.replace(re, '<b>$1</b>')}</div>`;
        },
        onSelect(e, term, item) {
          global.dataLayer.push({
            event: 'eventSend',
            actionType: 'select',
            actionName: 'ns_search_results',
            eventLabels: { url: e.target.innerText, campaignId: 'Search' }
          });
          window.location.href = getPathURL($(item).attr('data-path'));
        }
      })
      .on('keyup', event => {
        if (event.target.value.length > 2) {
          $('#list, #browse').addClass('hide');
          $('#people, #results').empty();
        }
        if (event.which === 13 && event.target.value !== '') {
          const elementSelected = $('.autocomplete-suggestion.selected');
          if (elementSelected.length > 0) {
            window.location.href = getPathURL(elementSelected.attr('data-path'));
          } else {
            search(event.target.value);
          }
        } else if (event.target.value === '') {
          resetSearch();
        }
      });
  }
});
