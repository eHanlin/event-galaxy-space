require.config({
  shim: {
    dialog: ['jquery']
  },

  paths: {
    jquery: ['../lib/jquery-3.3.1.min'],
    dialog: ['../lib/dialog-plus'],
    w3: ['../lib/w3'],
    ajax: ['../module-utils/ajax'],
    popup: ['../module-utils/popup'],
    'event-chest': ['./event-chest'],
    'event-click-link': ['./event-click-link'],
    'event-galaxy-space': ['./event-galaxy-space']
  },

  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }
})

require(['jquery', 'w3', 'dialog', 'popup',
  'event-chest', 'event-click-link', 'event-galaxy-space'], ($, w3, dialog, popup) => {
  $('.start-btn').on('click', () => {
    let d = popup.confirm('不', 'ydddddddddd')
    d.showModal()
  })
})
