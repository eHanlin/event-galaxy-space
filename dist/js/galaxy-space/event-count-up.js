'use strict';

define(['countUp'], function (CountUp) {
  return function (id, start, end) {
    var options = {
      useEasing: true,
      useGrouping: true,
      separator: ''
    };

    var decimal = 0;
    var transitionDuration = 5;
    var transition = new CountUp(id, start, end, decimal, transitionDuration, options);

    transition.start();
  };
});