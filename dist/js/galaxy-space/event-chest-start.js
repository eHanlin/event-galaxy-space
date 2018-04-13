'use strict';

define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo', 'w3'], function ($, ajax, confirmPopup, eventStatusDo, w3) {
  return function (chest, targets) {
    var content = void 0;
    var statusData = {
      status: 'UNLOCKING'
    };

    if (chest.level >= 2) {
      content = '\n        <div class="start-confirm-grid-container">\n          <div class="content-block1">\n            <span>\u5BF6\u7BB1\u6E96\u5099\u555F\u52D5\u4E2D...</span>\n          </div>\n  \n          <div class="content-block2">\n            <span>\u76EE\u524D\u5BF6\u7BB1\u7B49\u7D1A\u70BALv' + chest.level + '\uFF0C\u958B\u555F\u9019\u500B\u5BF6\u7BB1\u53EF\u80FD\u7372\u5F97</span>\n          </div>  \n          <div class="img-block-left-btn">\n            <img class="left-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/previous.png">\n          </div>\n  \n          <div class="img-block-right-btn">\n            <img class="right-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/next.png">\n          </div>\n  \n          <div class="content-block4">\n            <span>\u4F60\u78BA\u5B9A\u8981\u555F\u52D5\u9019\u500B\u5BF6\u7BB1\u55CE\uFF1F</span>\n          </div>\n        </div>\n      ';
    } else {
      content = '\n        <div>\n          <h2 class="header-text">\u5BF6\u7BB1\u6E96\u5099\u555F\u52D5\u4E2D...</h2>\n          <h3>\u4F60\u78BA\u5B9A\u8981\u555F\u52D5\u9019\u500B\u5BF6\u7BB1\u55CE\uFF1F</h3>\n        </div>\n      ';
    }

    confirmPopup.dialog(content, function () {
      ajax('PUT', '/chest/status/' + chest.id, statusData).then(eventStatusDo.unLocking.bind(eventStatusDo.unLocking, chest, targets));
    }, function () {/* 取消 */}, function () {
      if (chest.level < 2) return;

      ajax('GET', '/chest/condition/chest' + chest.level).then(function (data) {
        var conditions = data.content;
        var awards = conditions.content.awards;
        var chestMatchAwards = void 0;

        var awardsCount = awards.length;
        var limit = 0;
        var awardIndex = void 0;
        var awardImages = '';
        var awardBlock = '';

        if (window.matchMedia('(max-width: 500px)').matches) {
          limit = 1;
        } else if (window.matchMedia('(max-width: 800px)').matches) {
          limit = 3;
        } else {
          limit = 5;
        }

        var composeAwardBlock = function composeAwardBlock(awardIndex, limit, chestMatchAwards) {
          switch (awardIndex % limit) {
            case limit - 1:
              awardImages += '<img class="img-award' + awardIndex + '" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + chestMatchAwards + '.png">';
              awardBlock += '<div class="img-block-award">' + awardImages + '</div>';
              awardImages = '';
              break;

            default:
              awardImages += '<img class="img-award' + awardIndex + '" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + chestMatchAwards + '.png">';
          }
        };

        for (awardIndex = 0; awardIndex < awards.length; awardIndex++) {
          chestMatchAwards = awards[awardIndex];

          if (awardIndex === awardsCount - 1) {
            awardImages += '<img class="img-award' + awardIndex + '" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + chestMatchAwards + '.png">';
            awardBlock += '<div class="img-block-award">' + awardImages + '</div>';
          } else {
            composeAwardBlock(awardIndex, limit, chestMatchAwards);
          }
        }

        $('.img-block-left-btn').after(awardBlock);
        var slide = w3.slideshow('.img-block-award', 0);

        $('.right-btn').on('click', function () {
          slide.next();
        });

        $('.left-btn').on('click', function () {
          slide.previous();
        });
      });
    });
  };
});