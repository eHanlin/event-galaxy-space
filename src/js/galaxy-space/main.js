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
    eventGalaxySpace: ['./event-galaxy-space'],
    eventSlideShow: ['./event-slide-show'],
    eventAward: ['./event-award'],
    eventCountdown: ['./event-countdown'],
    eventDetermine: ['./event-determine'],
    eventChestUpgrade: ['./event-chest-upgrade'],
    eventChestStart: ['./event-chest-start'],
    eventChestReady: ['./event-chest-ready'],
    eventChestOpenNow: ['./event-chest-open-now'],
    eventStatusDo: ['./event-status-do'],
    eventCountUp: ['./event-count-up']
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
  require(['eventGalaxySpace'])
  require(['eventClickLink'])

  ajax('GET', 'http://127.0.0.1:8080/chest/')
    .then(data => {
      let chests = data.content
      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`.platform-${chest.colorPlatform}`)
        targets.platform
          .append(`<img class="chest${chest.level}" title="chest${chest.level}" src="./img/chest/chest${chest.level}.png">`)

        targets.countdown = $(`.platform-${chest.colorPlatform} .countdown`)
        targets.startBtn = $(`.platform-${chest.colorPlatform} .start-btn`)
        targets.upgradeBtn = $(`.platform-${chest.colorPlatform} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${chest.colorPlatform} .ready-btn`)
        targets.openNowBtn = $(`.platform-${chest.colorPlatform} .open-now-btn`)
        targets.platformChest = $(`.platform-${chest.colorPlatform} .chest${chest.level}`)

        targets.readyBtn.on('click', () => console.log('OPEN'))

        require(['eventDetermine'], eventDetermine => {
          eventDetermine(chest, targets)
        })

        /* 啟動按鈕 */
        require(['eventChestStart'], eventChestStart => {
          targets.startBtn.on('click', eventChestStart.bind(eventChestStart, chest, targets))
        })

        /* 立即開啟按鈕 */
        require(['eventChestOpenNow'], (eventChestOpenNow) => {
          targets.openNowBtn.on('click', eventChestOpenNow.bind(eventChestOpenNow, chest, targets))
        })

        require(['eventChestUpgrade'], eventChestUpgrade => {
          targets.upgradeBtn.on('click', eventChestUpgrade.tip.bind(eventChestUpgrade.tip, chest, targets))
        })
      }
    })
})
