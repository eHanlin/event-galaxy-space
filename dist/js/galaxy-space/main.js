require.config({
  shim: {
    dialog: ['jquery'],
    jqueryCountDown: ['jquery'],
    w3: {
      exports: 'w3'
    }
  },

  paths: {
    jquery: ['../lib/jquery-3.3.1.min'],
    w3: ['../lib/w3'],
    ajax: ['../module-utils/ajax'],
    swal: ['../lib/sweetalert2'],
    countUp: ['../lib/countUp.min'],
    confirmPopup: ['../module-utils/confirm-popup'],
    jqueryCountDown: ['../lib/jquery-time-countdown.min'],
    eventChest: ['./event-chest'],
    eventClickLink: ['./event-click-link'],
    eventTotalAssets: ['./event-total-assets'],
    eventSlideShow: ['./event-slide-show'],
    eventAward: ['./event-award'],
    eventCountdown: ['./event-countdown'],
    eventDetermine: ['./event-determine'],
    eventChestUpgrade: ['./event-chest-upgrade'],
    eventChestStart: ['./event-chest-start'],
    eventChestReady: ['./event-chest-ready'],
    eventChestOpenNow: ['./event-chest-open-now'],
    eventStatusDo: ['./event-status-do'],
    eventCountUp: ['./event-count-up'],
    eventUserStatus: ['./event-user-status'],
    eventChestOpen: ['./event-chest-open'],
    eventChestsGet: ['./event-chests-get']
  },

  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }
})

require(['jquery', 'ajax'], ($, ajax) => {
  /* 一開始沒有return function的 js 必須在這裡require */
  require(['eventSlideShow'])
  require(['eventAward'])
  require(['eventTotalAssets'])
  require(['eventClickLink'])
  require(['eventUserStatus'])
  require(['eventChestsGet'])
})
