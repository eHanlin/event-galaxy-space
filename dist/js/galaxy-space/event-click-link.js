'use strict';

define(['jquery'], function ($) {
  $(function () {
    $('.fb').on('click', function () {
      window.open('https://www.facebook.com/ehanlin.com.tw/', 'ehanlinFB');
      return false;
    });
    $('.line').on('click', function () {
      window.open('https://line.me/R/ti/p/MtsRQz_Hn5', 'ehanlinLine');
      return false;
    });
    $('.logo').on('click', function () {
      window.open('/index.html', 'ehanlin');
      return false;
    });
    $('.my-class').on('click', function () {
      window.open('/my/owned/Courses.html', 'myClass');
      return false;
    });
    $('.free').on('click', function () {
      window.open('/type/TRIAL/SalesPlans.html', 'free');
      return false;
    });
    $('.return-btn').on('click', function () {
      window.open('/Events/winner_info.html?id=space', 'returnAward');
      return false;
    });
    $('.shareBtn').on('click', function () {
      window.open('https://docs.google.com/forms/d/1UywZQWyOc4XMPIfFKs8I2UpCa30dRXX164LYNs7zwss/', 'share');
      return false;
    });
    $('.activity').on('click', function () {
      window.location = '/event/space/activity-notice.html';
    });
    $('.bank').on('click', function () {
      window.open('/event/space/currency-bank.html', 'ehanlinBank');
      return false;
    });
  });
});