'use strict';

define(['jquery', 'w3', 'ajax'], function ($, w3, ajax) {

  $(window).resize(function () {
    if (window.matchMedia('(max-width: 800px)').matches) {
      $('.slide-show-award-introduce .needChestLv').hide();
      $('.slide-show-award-introduce .awardNotice').hide();
    } else {
      $('.slide-show-award-introduce .needChestLv').show();
      $('.slide-show-award-introduce .awardNotice').show();
    }
  });

  ajax('GET', '/chest/award/conditions').then(function (data) {
    var awards = data.content;

    for (var index in awards) {
      var award = awards[index];
      var awardContent = award.content;
      var title = awardContent.title;
      var quantity = parseInt(awardContent.quantity);
      var needChestLv = awardContent.needChestLv;
      var notice = awardContent.notice;
      var awardId = award.id;
      var howMany = void 0;
      var awardInfo = void 0;

      if (quantity === 0) {
        howMany = '沒貨啦';
      } else if (quantity > 0) {
        howMany = '還有貨喔';
      }

      if (window.matchMedia('(max-width: 800px)').matches) {
        awardInfo = '\n            <div class="slide-show">\n              <img class="award-show" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + awardId + '.png">\n            </div>\n            <div class="slide-show-award-introduce">\n              <span class="award">' + title + '</span>\n              <span class="quantity">\u5EAB\u5B58\uFF1A' + howMany + '</span>\n              <span class="needChestLv"></span>\n              <span class="awardNotice"></span>\n            </div>\n          ';
      } else {
        awardInfo = '\n            <div class="slide-show">\n              <img class="award-show" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/' + awardId + '.png">\n            </div>\n            <div class="slide-show-award-introduce">\n              <span class="award">' + title + '</span>\n              <span class="quantity">\u5EAB\u5B58\uFF1A' + howMany + '</span>\n              <span class="needChestLv">\u6240\u5728\u5BF6\u7BB1\uFF1ALv' + needChestLv + '</span>\n              <span class="awardNotice">' + notice + '</span>\n            </div>\n          ';
      }

      $('#award-info').append(awardInfo);
    }

    var awardShow = w3.slideshow('.award-show', 3000);
    var awardIntroduce = w3.slideshow('.slide-show-award-introduce', 3000);

    // 上一個
    $('.previous').on('click', function (event) {
      awardShow.next();
      awardIntroduce.next();
    });
    // 下一個
    $('.next').on('click', function (event) {
      awardShow.previous();
      awardIntroduce.previous();
    });
  });
});