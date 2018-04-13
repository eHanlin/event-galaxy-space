'use strict';

define(['require', 'jquery', 'w3'], function (require, $) {
  return function () {
    var ajax = require('ajax');
    ajax('GET', '/chest/award').then(function (data) {
      var awards = data.content;
      var awardId = void 0;
      var index = 0;

      $('.award-box li img').remove();
      $('.award-box li .awardSum').remove();

      for (awardId in awards) {
        var value = awards[awardId];
        var awardBlock = $('.award-box li:eq(' + index + ')');
        var awardImg = '<img src=\'https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + awardId + '.png\' />';
        awardBlock.append(awardImg);
        awardBlock.append('<span class="awardSum">' + value + '</span>');
        index++;
      }
    });
  };
});