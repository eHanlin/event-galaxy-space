require.config({
  shim: {
    dialog: ['jquery'],
    jqueryCountDown: ['jquery']
  },

  paths: {
    jquery: ['../lib/jquery-3.3.1.min'],
    w3: ['../lib/w3'],
    ajax: ['../module-utils/ajax'],
    swal: ['../lib/sweetalert2'],
    popup: ['../module-utils/popup'],
    jqueryCountDown: ['../lib/jquery-time-countdown.min'],
    eventChest: ['./event-chest'],
    eventClickLink: ['./event-click-link'],
    eventGalaxySpace: ['./event-galaxy-space'],
    eventSlideShow: ['./event-slide-show'],
    eventAward: ['./event-award'],
    eventCountdown: ['./event-countdown'],
    eventDetermine: ['./event-determine'],
    eventChestUpgrade: ['./event-chest-upgrade']
  },

  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }
})

require(
  [
    'jquery',
    'w3',
    'ajax',
    'popup',
    'jqueryCountDown',
    'eventChest',
    'eventClickLink',
    'eventGalaxySpace',
    'eventSlideShow',
    'eventAward',
    'eventCountdown',
    'eventDetermine',
    'eventChestUpgrade'
  ], (
    $,
    w3,
    ajax,
    popup,
    jqueryCountDown,
    eventChest,
    eventClickLink,
    eventGalaxySpace,
    eventSlideShow,
    eventAward,
    eventCountdown,
    eventDetermine,
    eventChestUpgrade
  ) => {})
