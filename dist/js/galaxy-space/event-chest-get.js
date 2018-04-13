'use strict';

define(['jquery', 'ajax', 'eventChestBtnOn'], function ($, ajax, eventChestBtnOn) {
  return function () {
    return ajax('GET', '/chest/').then(function (data) {
      var chests = data.content;
      $('.platform img[class^=chest]').remove();

      var _loop = function _loop(index) {
        var chest = chests[index];
        var targets = {};

        targets.platform = $('.platform-' + chest.colorPlatform);
        targets.platform.append('<img class="chest' + chest.level + '" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/chest' + chest.level + '.png">');

        targets.countdown = $('.platform-' + chest.colorPlatform + ' .countdown');
        targets.startBtn = $('.platform-' + chest.colorPlatform + ' .start-btn');
        targets.upgradeBtn = $('.platform-' + chest.colorPlatform + ' .upgrade-btn');
        targets.readyBtn = $('.platform-' + chest.colorPlatform + ' .ready-btn');
        targets.openNowBtn = $('.platform-' + chest.colorPlatform + ' .open-now-btn');
        targets.platformChest = $('.platform-' + chest.colorPlatform + ' .chest' + chest.level);

        require(['eventChestDetermine'], function (eventChestDetermine) {
          eventChestDetermine(chest, targets);
        });

        eventChestBtnOn(chest, targets);
      };

      for (var index in chests) {
        _loop(index);
      }
    });
  };
});