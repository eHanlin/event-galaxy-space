require.config({
  shim: {
    jqueryConfirm: ['jquery']
  },

  paths: {
    jquery: ['../lib/jquery-3.3.1.min'],
    jqueryConfirm: ['../lib/jquery-confirm.min'],
    w3: ['../lib/w3'],
    ajax: ['../module-utils/ajax'],
    popup: ['../module-utils/popup'],
    eventChest: ['./event-chest'],
    eventClickLink: ['./event-click-link'],
    eventGalaxySpace: ['./event-galaxy-space'],
    eventSlideShow: ['./event-slide-show'],
    eventAward: ['./event-award']
  }
})

require(
  [
    'jquery',
    'jqueryConfirm',
    'w3',
    'ajax',
    'popup',
    'eventChest',
    'eventClickLink',
    'eventGalaxySpace',
    'eventSlideShow',
    'eventAward'
  ], (
    $,
    jqueryConfirm,
    w3,
    ajax,
    popup,
    eventChest,
    eventClickLink,
    eventGalaxySpace,
    eventSlideShow,
    eventAward
  ) => {})
