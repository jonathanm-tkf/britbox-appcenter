/* eslint quotes: 0 */
/*!
 * Salvattore 1.0.9 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.salvattore = factory();
  }
})(this, () => {
  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  if (!window.matchMedia) {
    window.matchMedia = (function() {
      // For browsers that support matchMedium api such as IE 9 and webkit
      let styleMedia = window.styleMedia || window.media;

      // For those that don't support matchMedium
      if (!styleMedia) {
        const style = document.createElement('style');

        const script = document.getElementsByTagName('script')[0];

        let info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info =
          ('getComputedStyle' in window && window.getComputedStyle(style, null)) ||
          style.currentStyle;

        styleMedia = {
          matchMedium(media) {
            const text = `@media ${media}{ #matchmediajs-test { width: 1px; } }`;

            // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
            if (style.styleSheet) {
              style.styleSheet.cssText = text;
            } else {
              style.textContent = text;
            }

            // Test if media query is true or false
            return info.width === '1px';
          }
        };
      }

      return function(media) {
        return {
          matches: styleMedia.matchMedium(media || 'all'),
          media: media || 'all'
        };
      };
    })();
  }

  /*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
  (() => {
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
      return false;
    }

    const localMatchMedia = window.matchMedia;

    const hasMediaQueries = localMatchMedia('only all').matches;

    let isListening = false;

    let timeoutID = 0;
    // setTimeout for debouncing 'handleChange'

    const queries = [];
    // Contains each 'mql' and associated 'listeners' if 'addListener' is used

    const handleChange = function(evt) {
      // Debounce
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        for (let i = 0, il = queries.length; i < il; i++) {
          const mql = queries[i].mql;

          const listeners = queries[i].listeners || [];

          const matches = localMatchMedia(mql.media).matches;

          // Update mql.matches value and call listeners
          // Fire listeners only if transitioning to or from matched state
          if (matches !== mql.matches) {
            mql.matches = matches;

            for (let j = 0, jl = listeners.length; j < jl; j++) {
              listeners[j].call(window, mql);
            }
          }
        }
      }, 30);
    };

    window.matchMedia = function(media) {
      const mql = localMatchMedia(media);

      const listeners = [];

      let index = 0;

      mql.addListener = function(listener) {
        // Changes would not occur to css media type so return now (Affects IE <= 8)
        if (!hasMediaQueries) {
          return;
        }

        // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
        // There should only ever be 1 resize listener running for performance
        if (!isListening) {
          isListening = true;
          window.addEventListener('resize', handleChange, true);
        }

        // Push object only if it has not been pushed already
        if (index === 0) {
          index = queries.push({
            mql,
            listeners
          });
        }

        listeners.push(listener);
      };

      mql.removeListener = function(listener) {
        for (let i = 0, il = listeners.length; i < il; i++) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
          }
        }
      };

      return mql;
    };
  })();

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license

  (function() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
      window.cancelAnimationFrame =
        window[`${vendors[x]}CancelAnimationFrame`] ||
        window[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  })();

  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

  if (typeof window.CustomEvent !== 'function') {
    (function() {
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }

      CustomEvent.prototype = window.Event.prototype;

      window.CustomEvent = CustomEvent;
    })();
  }

  /* jshint laxcomma: true */
  const salvattore = (function(global, document) {
    const self = {};

    const grids = [];

    let mediaRules = [];

    let mediaQueries = [];

    const addToDataSet = function(element, key, value) {
      // uses dataset function or a fallback for <ie10
      if (element.dataset) {
        element.dataset[key] = value;
      } else {
        element.setAttribute(`data-${key}`, value);
      }
    };

    self.obtainGridSettings = function obtainGridSettings(element) {
      // returns the number of columns and the classes a column should have,
      // from computing the style of the ::before pseudo-element of the grid.

      const computedStyle = global.getComputedStyle(element, ':before');

      const content = computedStyle.getPropertyValue('content').slice(1, -1);

      let matchResult = content.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/);

      let numberOfColumns = 1;

      let columnClasses = [];

      if (matchResult) {
        numberOfColumns = matchResult[1];
        columnClasses = matchResult[2];
        columnClasses = columnClasses ? columnClasses.split('.') : ['column'];
      } else {
        matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
        if (matchResult) {
          columnClasses = matchResult[1];
          numberOfColumns = matchResult[2];
          if (numberOfColumns) {
            numberOfColumns = numberOfColumns.split('.');
          }
        }
      }

      return {
        numberOfColumns,
        columnClasses
      };
    };

    self.addColumns = function addColumns(grid, items) {
      // from the settings obtained, it creates columns with
      // the configured classes and adds to them a list of items.

      const settings = self.obtainGridSettings(grid);

      const numberOfColumns = settings.numberOfColumns;

      const columnClasses = settings.columnClasses;

      const columnsItems = new Array(+numberOfColumns);

      const columnsFragment = document.createDocumentFragment();

      let i = numberOfColumns;

      let selector;

      while (i-- !== 0) {
        selector = `[data-columns] > *:nth-child(${numberOfColumns}n-${i})`;
        columnsItems.push(items.querySelectorAll(selector));
      }

      columnsItems.forEach(rows => {
        const column = document.createElement('div');

        const rowsFragment = document.createDocumentFragment();

        // column.className = columnClasses.length === 0 ? 'swiper-wrapper' : columnClasses.join(' ');
        column.className = columnClasses.join(' ');

        Array.prototype.forEach.call(rows, row => {
          rowsFragment.appendChild(row);
        });
        column.appendChild(rowsFragment);
        columnsFragment.appendChild(column);
      });

      grid.appendChild(columnsFragment);
      addToDataSet(grid, 'columns', numberOfColumns);
    };

    self.removeColumns = function removeColumns(grid) {
      // removes all the columns from a grid, and returns a list
      // of items sorted by the ordering of columns.

      const range = document.createRange();
      range.selectNodeContents(grid);

      const columns = Array.prototype.filter.call(
        range.extractContents().childNodes,
        node => node instanceof global.HTMLElement
      );

      const numberOfColumns = columns.length;

      const numberOfRowsInFirstColumn = columns[0].childNodes.length;

      const sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns);

      Array.prototype.forEach.call(columns, (column, columnIndex) => {
        Array.prototype.forEach.call(column.children, (row, rowIndex) => {
          sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
        });
      });

      const container = document.createElement('div');
      addToDataSet(container, 'columns', 0);

      sortedRows.filter(child => !!child).forEach(child => {
        container.appendChild(child);
      });

      return container;
    };

    self.recreateColumns = function recreateColumns(grid) {
      // removes all the columns from the grid, and adds them again,
      // it is used when the number of columns change.

      global.requestAnimationFrame(() => {
        self.addColumns(grid, self.removeColumns(grid));
        const columnsChange = new CustomEvent('columnsChange');
        grid.dispatchEvent(columnsChange);
      });
    };

    self.mediaQueryChange = function mediaQueryChange(mql) {
      // recreates the columns when a media query matches the current state
      // of the browser.

      if (mql.matches) {
        Array.prototype.forEach.call(grids, self.recreateColumns);
      }
    };

    self.getCSSRules = function getCSSRules(stylesheet) {
      // returns a list of css rules from a stylesheet

      let cssRules;
      try {
        cssRules = stylesheet.sheet.cssRules || stylesheet.sheet.rules;
      } catch (e) {
        return [];
      }

      return cssRules || [];
    };

    self.getStylesheets = function getStylesheets() {
      // returns a list of all the styles in the document (that are accessible).

      const inlineStyleBlocks = Array.prototype.slice.call(document.querySelectorAll('style'));
      inlineStyleBlocks.forEach((stylesheet, idx) => {
        if (stylesheet.type !== 'text/css' && stylesheet.type !== '') {
          inlineStyleBlocks.splice(idx, 1);
        }
      });

      return Array.prototype.concat.call(
        inlineStyleBlocks,
        Array.prototype.slice.call(document.querySelectorAll("link[rel='stylesheet']"))
      );
    };

    self.mediaRuleHasColumnsSelector = function mediaRuleHasColumnsSelector(rules) {
      // checks if a media query css rule has in its contents a selector that
      // styles the grid.

      let i;
      let rule;

      try {
        i = rules.length;
      } catch (e) {
        i = 0;
      }

      while (i--) {
        rule = rules[i];
        if (rule.selectorText && rule.selectorText.match(/\[data-columns\](.*)::?before$/)) {
          return true;
        }
      }

      return false;
    };

    self.scanMediaQueries = function scanMediaQueries() {
      // scans all the stylesheets for selectors that style grids,
      // if the matchMedia API is supported.

      const newMediaRules = [];

      if (!global.matchMedia) {
        return;
      }

      self.getStylesheets().forEach(stylesheet => {
        Array.prototype.forEach.call(self.getCSSRules(stylesheet), rule => {
          // rule.media throws an 'not implemented error' in ie9 for import rules occasionally
          try {
            if (rule.media && rule.cssRules && self.mediaRuleHasColumnsSelector(rule.cssRules)) {
              newMediaRules.push(rule);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
        });
      });

      // remove matchMedia listeners from the old rules
      const oldRules = mediaRules.filter(el => newMediaRules.indexOf(el) === -1);
      mediaQueries.filter(el => oldRules.indexOf(el.rule) !== -1).forEach(el => {
        el.mql.removeListener(self.mediaQueryChange);
      });
      mediaQueries = mediaQueries.filter(el => oldRules.indexOf(el.rule) === -1);

      // add matchMedia listeners to the new rules
      newMediaRules.filter(el => mediaRules.indexOf(el) === -1).forEach(rule => {
        const mql = global.matchMedia(rule.media.mediaText);
        mql.addListener(self.mediaQueryChange);
        mediaQueries.push({ rule, mql });
      });

      // swap mediaRules with the new set
      mediaRules.length = 0;
      mediaRules = newMediaRules;
    };

    self.rescanMediaQueries = function rescanMediaQueries() {
      self.scanMediaQueries();
      Array.prototype.forEach.call(grids, self.recreateColumns);
    };

    self.nextElementColumnIndex = function nextElementColumnIndex(grid, fragments) {
      // returns the index of the column where the given element must be added.

      const children = grid.children;

      const m = children.length;

      let lowestRowCount = 0;

      let child;

      let currentRowCount;

      let i;

      let index = 0;
      for (i = 0; i < m; i++) {
        child = children[i];
        currentRowCount =
          child.children.length + (fragments[i].children || fragments[i].childNodes).length;
        if (lowestRowCount === 0) {
          lowestRowCount = currentRowCount;
        }
        if (currentRowCount < lowestRowCount) {
          index = i;
          lowestRowCount = currentRowCount;
        }
      }

      return index;
    };

    self.createFragmentsList = function createFragmentsList(quantity) {
      // returns a list of fragments

      const fragments = new Array(quantity);

      let i = 0;

      while (i !== quantity) {
        fragments[i] = document.createDocumentFragment();
        i++;
      }

      return fragments;
    };

    self.appendElements = function appendElements(grid, elements) {
      // adds a list of elements to the end of a grid

      const columns = grid.children;

      const numberOfColumns = columns.length;

      const fragments = self.createFragmentsList(numberOfColumns);

      Array.prototype.forEach.call(elements, element => {
        const columnIndex = self.nextElementColumnIndex(grid, fragments);
        fragments[columnIndex].appendChild(element);
      });

      Array.prototype.forEach.call(columns, (column, index) => {
        column.appendChild(fragments[index]);
      });
    };

    self.prependElements = function prependElements(grid, elements) {
      // adds a list of elements to the start of a grid

      const columns = grid.children;

      const numberOfColumns = columns.length;

      const fragments = self.createFragmentsList(numberOfColumns);

      let columnIndex = numberOfColumns - 1;

      elements.forEach(element => {
        const fragment = fragments[columnIndex];
        fragment.insertBefore(element, fragment.firstChild);
        if (columnIndex === 0) {
          columnIndex = numberOfColumns - 1;
        } else {
          columnIndex -= 1;
        }
      });

      Array.prototype.forEach.call(columns, (column, index) => {
        column.insertBefore(fragments[index], column.firstChild);
      });

      // populates a fragment with n columns till the right
      const fragment = document.createDocumentFragment();

      let numberOfColumnsToExtract = elements.length % numberOfColumns;

      while (numberOfColumnsToExtract-- !== 0) {
        fragment.appendChild(grid.lastChild);
      }

      // adds the fragment to the left
      grid.insertBefore(fragment, grid.firstChild);
    };

    self.registerGrid = function registerGrid(grid) {
      if (global.getComputedStyle(grid).display === 'none') {
        return;
      }

      // retrieve the list of items from the grid itself
      const range = document.createRange();
      range.selectNodeContents(grid);

      const items = document.createElement('div');
      items.appendChild(range.extractContents());

      addToDataSet(items, 'columns', 0);
      self.addColumns(grid, items);
      grids.push(grid);
    };

    self.init = function init() {
      // adds required CSS rule to hide 'content' based
      // configuration.

      const css = document.createElement('style');
      css.innerHTML =
        '[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}';
      document.head.appendChild(css);

      // scans all the grids in the document and generates
      // columns from their configuration.

      const gridElements = document.querySelectorAll('[data-columns]');
      Array.prototype.forEach.call(gridElements, self.registerGrid);
      self.scanMediaQueries();
    };

    self.init();

    return {
      appendElements: self.appendElements,
      prependElements: self.prependElements,
      registerGrid: self.registerGrid,
      recreateColumns: self.recreateColumns,
      rescanMediaQueries: self.rescanMediaQueries,
      init: self.init,

      // maintains backwards compatibility with underscore style method names
      append_elements: self.appendElements,
      prepend_elements: self.prependElements,
      register_grid: self.registerGrid,
      recreate_columns: self.recreateColumns,
      rescan_media_queries: self.rescanMediaQueries
    };
  })(window, window.document);

  return salvattore;
});
