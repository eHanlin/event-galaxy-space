require.config({
  paths: {
    'jquery': ['../lib/jquery-3.3.1.min'],
    'w3': ['../lib/w3'],
    'ajax': ['../module-utils/ajax-util'],
    'event-chest': ['./event-chest'],
    'event-click-link': ['./event-click-link'],
    'event-galaxy-space': ['./event-galaxy-space']
  }
})

require(['jquery', 'w3', 'ajax', 'event-chest', 'event-click-link', 'event-galaxy-space'], ($, w3) => {
})
