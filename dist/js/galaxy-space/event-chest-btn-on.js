'use strict';

define(function () {
  return function (chest, targets) {
    /* requireJs進來，click後綁定自己將參數(chest, targets)傳入 */
    /* 啟動按鈕 */
    require(['eventChestStart'], function (eventChestStart) {
      targets.startBtn.off('click');
      targets.startBtn.on('click', eventChestStart.bind(eventChestStart, chest, targets));
    });

    /* 立即開啟按鈕 */
    require(['eventChestOpenNow'], function (eventChestOpenNow) {
      targets.openNowBtn.off('click');
      targets.openNowBtn.on('click', eventChestOpenNow.ask.bind(eventChestOpenNow.ask, chest, targets));
    });

    /* 升級按鈕 */
    require(['eventChestUpgrade'], function (eventChestUpgrade) {
      targets.upgradeBtn.off('click');
      targets.upgradeBtn.on('click', eventChestUpgrade.ask.bind(eventChestUpgrade.ask, chest, targets));
    });

    /* 開啟寶箱 */
    require(['eventChestOpen'], function (eventChestOpen) {
      targets.readyBtn.off('click');
      targets.readyBtn.on('click', eventChestOpen.bind(eventChestOpen, chest, targets));
    });
  };
});