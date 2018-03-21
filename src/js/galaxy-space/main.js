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

require(['jquery', 'ajax'], ($, ajax) => {
  require(['eventSlideShow'])
  require(['eventAward'])

  ajax('GET', 'http://127.0.0.1:8080/chest/')
    .then(data => {
      let chests = data.content
      for (let index in chests) {
        console.log(index)
        let chest = chests[index]
        let platformColor = chest.colorPlatform
        let targets = {}

        targets.platform = $(`.platform-${platformColor}`)
        targets.countdown = $(`.platform-${platformColor} .countdown`)
        targets.startBtn = $(`.platform-${platformColor} .start-btn`)
        targets.upgradeBtn = $(`.platform-${platformColor} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${platformColor} .ready-btn`)
        targets.platformChest = $(`.platform-${platformColor} .chest${chest.level}`)

        targets.platform
          .append(`<img class="chest${chest.level}" title="chest${chest.level}" src="./img/chest/chest${chest.level}.png">`)
        targets.startBtn.css('display', '')
        targets.upgradeBtn.css('display', '')

        require(['eventDetermine'], eventDetermine => {
          eventDetermine(chest, targets)
        })
      }
    })
})
