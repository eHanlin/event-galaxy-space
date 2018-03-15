require.config({
  shim: {
    dialog: ['jquery']
  },

  paths: {
    jquery: ['../lib/jquery-3.3.1.min'],
    w3: ['../lib/w3'],
    ajax: ['../module-utils/ajax'],
    swal: ['../lib/sweetalert2'],
    popup: ['../module-utils/popup'],
    eventChest: ['./event-chest'],
    eventClickLink: ['./event-click-link'],
    eventGalaxySpace: ['./event-galaxy-space'],
    eventSlideShow: ['./event-slide-show'],
    eventAward: ['./event-award']
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
    'eventChest',
    'eventClickLink',
    'eventGalaxySpace',
    'eventSlideShow',
    'eventAward'
  ], ($,
    w3,
    ajax,
    popup,
    eventChest,
    eventClickLink,
    eventGalaxySpace,
    eventSlideShow,
    eventAward) => {
  $('.start-btn').on('click', function () {
    popup.confirm('測試', 'GG')
  })
})
