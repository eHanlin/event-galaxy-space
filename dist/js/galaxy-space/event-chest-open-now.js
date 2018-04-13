'use strict';

define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo'], function ($, ajax, confirmPopup) {
  var eventChestOpenNow = {};
  eventChestOpenNow.ask = function (chest, targets) {
    var seconds = void 0;
    ajax('GET', '/chest/coolDownTime/' + chest.id).then(function (jsonData) {
      seconds = jsonData.content;
      return ajax('GET', '/chest/condition/openImmediately');
    }).then(function (jsonData) {
      var openImmediatelyData = jsonData.content;
      var openImmediatelyInfo = openImmediatelyData['content'];
      var secondsCycle = parseInt(openImmediatelyInfo.secondsCycle);
      var spendGems = openImmediatelyInfo.spendGems;
      var cycles = Math.ceil(seconds / secondsCycle);
      var popupContent = void 0;

      spendGems = spendGems * cycles;
      popupContent = '\n            <div>\n              <h2 class="header-text">\u7ACB\u5373\u958B\u555F\u5BF6\u7BB1\u9700\u82B1\u8CBB ' + spendGems + ' \u500B\u5BF6\u77F3</h2>\n              <h3>\u78BA\u5B9A\u8981\u7ACB\u5373\u958B\u555F\u5BF6\u7BB1\u55CE\uFF1F</h3>\n            </div>\n          ';
      confirmPopup.dialog(popupContent, eventChestOpenNow.process.bind(eventChestOpenNow.process, chest, targets, spendGems));
    });
  };

  eventChestOpenNow.process = function (chest, targets, spendGems) {
    ajax('GET', '/chest/checkBalance?gems=' + spendGems).then(function (jsonData) {
      var insufficientMessage = jsonData.content;
      if (insufficientMessage) {
        var title = 'Oooooops 餘額不足喔！';
        confirmPopup.ok(title, insufficientMessage);
        return $.Deferred().reject().promise();
      } else {
        return ajax('PUT', '/chest/open/immediately/' + chest.id, { spendGems: spendGems });
      }
    }).then(function (jsonData) {
      var finalGems = jsonData.content.finalGems;

      require(['eventCountUp'], function (eventCountUp) {
        eventCountUp('gems', $('#gems').text(), finalGems);
      });

      /* 倒數計時秒數設定為 1，讓寶箱變成 ready 狀態 */
      require(['eventCountdown', 'eventChestReady'], function (eventCountdown, eventChestReady) {
        eventCountdown(0, chest, targets, eventChestReady);
      });
    });
  };

  return eventChestOpenNow;
});