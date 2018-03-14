require.config({
  shim: {
    jqueryConfirm: ['jquery']
  },

  paths: {
    'jquery': ['../lib/jquery-3.3.1.min'],
    jqueryConfirm: ['../lib/jquery-confirm.min'],
    'w3': ['../lib/w3'],
    'ajax': ['../module-utils/ajax'],
    popup: ['../module-utils/popup'],
    'event-chest': ['./event-chest'],
    'event-click-link': ['./event-click-link'],
    'event-galaxy-space': ['./event-galaxy-space']
  }
})

require(['jquery', 'w3', 'ajax', 'jqueryConfirm', 'popup',
  'event-chest', 'event-click-link', 'event-galaxy-space'], ($, w3, ajax, jqueryConfirm, popup) => {
  $('.start-btn').on('click', () => {
    $.alert(popup.alert('GG', 'yy', () => {
      console.log('power')
    }))
  })
})
