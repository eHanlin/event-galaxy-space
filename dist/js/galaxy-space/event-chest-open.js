'use strict';

define(['jquery', 'ajax', 'confirmPopup'], function ($, ajax, confirmPopup) {
  return function (chest, targets) {
    var chestStatus = {
      status: 'OPEN'
    };
    ajax('PUT', '/chest/open/' + chest.id, chestStatus).then(function (jsonData) {
      var jsonContent = jsonData.content;
      var finalCoins = jsonContent.finalCoins;
      var finalGems = jsonContent.finalGems;

      /* 獲得禮物內容 */
      var gainCoins = jsonContent.coins ? jsonContent.coins : 0;
      var gainGems = jsonContent.gems ? jsonContent.gems : 0;
      var gainAwardId = jsonContent.gainAwardId;
      var gainAward = jsonContent.gainAward;

      var luckyBag = jsonContent.luckyBag;
      var awardImg = '',
          awardTitle = '',
          openLuckyBagBtn = '';
      var content = void 0,
          openTextBlock3 = '',
          openTextBlock4 = '';

      if (gainAwardId) {
        awardTitle = '<span class="gif-title">' + gainAward + '</span>';
        awardImg = '<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + gainAwardId + '.png">';
        openTextBlock3 = '\n            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n            <span>' + gainCoins + '</span>\n            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n            <span>' + gainGems + '</span>\n          ';
        openTextBlock4 = awardImg;
      } else {
        openTextBlock4 = '\n            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n            <span class="coins-lg">' + gainCoins + '</span>\n            <br/>\n            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n            <span class="gems-lg">' + gainGems + '</span>\n          ';
      }

      content = '\n          <div class="open-confirm-grid-container">\n            <div class="open-text-block1">\n              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/open/openChest' + chest.level + '.gif">\n            </div>\n            <div class="open-text-block2">\u606D\u559C\u4F60\u7372\u5F97\u4E86\n              <span class="gif-title">' + awardTitle + '</span>\n            </div>\n            <div class="open-text-block3">\n              ' + openTextBlock3 + '\n            </div>\n            <div class="open-text-block4">\n              ' + openTextBlock4 + '\n            </div>\n          </div>\n        ';

      var afterOpen = function afterOpen(finalCoins, finalGems) {
        require(['eventCountUp'], function (eventCountUp) {
          targets.readyBtn.css('display', 'none');
          targets.platformChest.remove();
          eventCountUp('coins', $('#coins').text(), finalCoins);
          eventCountUp('gems', $('#gems').text(), finalGems);
        });
      };

      if (gainAwardId && luckyBag === false) {
        confirmPopup.dialog(content,
        /* 導頁至領取㽪品 */
        function () {
          afterOpen(finalCoins, finalGems);
          window.open('https://test.ehanlin.com.tw/Events/winner_info.html?id=space', 'winner_info');
        },
        /* confirmFn */
        afterOpen.bind(afterOpen, finalCoins, finalGems),
        /* onOpenFn */
        function () {}, '回填領獎', '我瞭解了');
      } else {
        if (luckyBag === true) {
          openLuckyBagBtn = '打開福袋';
        }

        confirmPopup.ok('', content, function () {
          /* 福袋內容 */
          if (luckyBag === true) {
            ajax('PUT', '/chest/award/luckyBag', { awardId: gainAwardId, chestId: chest.id }).then(function (jsonData) {
              var jsonContent = jsonData.content;
              var gainCoins = jsonContent.coins;
              var gainGems = jsonContent.gems;
              var finalCoins = jsonContent.finalCoins;
              var finalGems = jsonContent.finalGems;
              var title = '\n                    <div class="lucky-bag">\n                      <span>\u798F\u888B\u6253\u958B\u56C9\uFF0C\u5F97\u5230 </span>\n                      <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n                      <span>' + gainCoins + '</span>\n                      <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n                      <span>' + gainGems + '</span>\n                    </div>\n                  ';
              var bagImage = '<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + gainAwardId + '.png">';

              confirmPopup.image(title, bagImage, afterOpen.bind(afterOpen, finalCoins, finalGems));
            });
          } else {
            afterOpen(finalCoins, finalGems);
          }
        }, openLuckyBagBtn);
      }
    });
  };
});