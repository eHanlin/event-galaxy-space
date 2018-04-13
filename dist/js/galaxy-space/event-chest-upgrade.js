'use strict';

define(['jquery', 'ajax', 'confirmPopup'], function ($, ajax, confirmPopup) {
  var eventChestUpgrade = {};
  eventChestUpgrade.ask = function (chest, targets) {
    var upLevel = chest.level + 1;

    ajax('GET', '/chest/condition/level' + upLevel, null).then(function (jsonData) {
      var data = jsonData.content.content;
      var needCoins = data['coins'];
      var needGems = data['gems'];
      var content = '\n          <div class="confirm-grid-upgrade-container">\n            <div class="image-block1">\n              <img class="image-block1-chest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/chest' + upLevel + '.png">\n            </div>\n            <div class="content-block1">\n              <span>Lv' + chest.level + ' -> Lv' + upLevel + '</span>\n            </div>\n            <div class="content-block2">\n              \u4F60\u78BA\u5B9A\u8981\u82B1\u8CBB <span class="confirm-popup-info"> ' + needCoins + '\n              <span class="confirm-popup-warning">\u500B e \u5E63</span>\u3001 ' + needGems + ' <span class="confirm-popup-warning">\u500B \u5BF6\u77F3 </span></span>\n              \u5347\u7D1A\u81F3 Lv' + upLevel + ' \u5BF6\u7BB1\u55CE\uFF1F\n            </div>\n            <div class="content-block3">\u8ACB\u6CE8\u610F\uFF1A \u9AD8\u7B49\u7684\u5BF6\u7BB1\u6709\u66F4\u597D\u7684\u5BF6\u85CF\u7B49\u8457\u4F60\uFF0C\u4F46\u5347\u7D1A\u5BF6\u7BB1\u6709\u4E00\u5B9A\u5931\u6557\u7684\u6A5F\u7387\u5594!</div>\n          </div>\n        ';
      confirmPopup.dialog(content, eventChestUpgrade.process.bind(eventChestUpgrade.process, chest));
    });
  };

  eventChestUpgrade.process = function (chest) {
    var upLevel = chest.level + 1;
    var loadingTarget = $('#loading');
    loadingTarget.css('display', '');
    ajax('GET', '/chest/condition/level' + upLevel, null).then(function (jsonData) {
      var levelInfo = jsonData.content.content;
      var coins = levelInfo.coins;
      var gems = levelInfo.gems;
      return ajax('GET', '/chest/checkBalance?coins=' + coins + '&gems=' + gems, null);
    }).then(function (jsonData) {
      var insufficientMessage = jsonData.content;
      if (insufficientMessage) {
        var title = 'Oooooops 餘額不足喔！';
        confirmPopup.ok(title, insufficientMessage);
        loadingTarget.css('display', 'none');
        return $.Deferred().reject().promise();
      } else {
        return ajax('PUT', '/currencyBank/chest/levelUp/' + chest.id);
      }
    }).then(function (jsonData) {
      var content = jsonData.content;
      if (content.isActivation && content.isActivation === 'false') {
        confirmPopup.ok('Oooooops！ 無法再升級囉！', '\u4F60\u76EE\u524D\u9084\u4E0D\u662F\u9280\u6CB3\u63A2\u96AA\u968A\u7684\u6B63\u5F0F\u968A\u54E1\uFF0C\n            \u99AC\u4E0A\u524D\u5F80\u8CFC\u8CB7\u8AB2\u7A0B\u6210\u70BA\u6B63\u5F0F\u968A\u54E1\u518D\u56DE\u4F86\u7E7C\u7E8C\u5347\u7D1A\u5BF6\u7BB1\u62FF\u734E\u54C1\u5427\uFF01 \n            <br/><a href="https://test.ehanlin.com.tw/courses_map.html">\u8AB2\u7A0B\u9023\u7D50</a>');
      } else if (content.isLevelUpSucceeded && content.isLevelUpSucceeded === 'true') {
        confirmPopup.ok('Oooooops 此寶箱已經升級過囉', '');
      } else {
        var result = eventChestUpgrade.determineLevelUpSuccess(content, chest);
        confirmPopup.image(result.text, result.gif, function () {
          var originalCoins = parseInt($('#coins').text());
          var originalGems = parseInt($('#gems').text());
          var spendCoins = result.coins;
          var spendGems = result.gems;
          var finalCoins = originalCoins - spendCoins;
          var finalGems = originalGems - spendGems;

          require(['eventChestGet', 'eventCountUp'], function (eventChestGet, eventCountUp) {
            eventChestGet();
            eventCountUp('coins', originalCoins, finalCoins);
            eventCountUp('gems', originalGems, finalGems);
          });
        });
      }
    }).done(function () {
      loadingTarget.css('display', 'none');
    });
  };

  eventChestUpgrade.determineLevelUpSuccess = function (content, chest) {
    var result = content[0];
    var upLevel = chest.level + 1;
    if (result && result.memo.levelUpSuccess === 'true') {
      result.text = '升級成功';
      result.gif = '<image class="confirm-popup-chest-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/upgradeStatus/upgradeSuccess' + upLevel + '.gif">';
    } else {
      result.text = '升級失敗';
      result.gif = '<image class="confirm-popup-chest-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/upgradeStatus/upgradeFail' + chest.level + '.gif">';
    }
    return result;
  };

  return eventChestUpgrade;
});