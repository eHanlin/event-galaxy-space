'use strict';

define(['require', 'jquery', 'w3'], function (require, $, w3) {
  var slide = w3.slideshow('.block', 0);

  $('.right').off('click').on('click', function (event) {
    slide.next();
  });

  $('.left').off('click').on('click', function (event) {
    slide.previous();
  });
});