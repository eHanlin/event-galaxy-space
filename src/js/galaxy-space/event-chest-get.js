define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {
  return () => ajax('GET', `/chest/`)
    .then(data => {
      let chests = data.content
      /* 如果實體禮物贈完 回傳dataContent */
      let dataContent = data.content

      if (dataContent === 'luckyBagsAreZero') {
        require(['eventAwardIsZero'], eventAwardIsZero => {
          console.log('luckyBagsAreZero')
        })
      }

      $(`.platform img[class^=chest]`).remove()

      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`.platform-${chest.colorPlatform}`)
        targets.platform
          .append(`<img class="chest${chest.level}" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/chest${chest.level}.png">`)

        targets.countdown = $(`.platform-${chest.colorPlatform} .countdown`)
        targets.startBtn = $(`.platform-${chest.colorPlatform} .start-btn`)
        targets.upgradeBtn = $(`.platform-${chest.colorPlatform} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${chest.colorPlatform} .ready-btn`)
        targets.openNowBtn = $(`.platform-${chest.colorPlatform} .open-now-btn`)
        targets.platformChest = $(`.platform-${chest.colorPlatform} .chest${chest.level}`)

        require(['eventChestDetermine'], eventChestDetermine => {
          eventChestDetermine(chest, targets)
        })

        eventChestBtnOn(chest, targets)
      }
    })
})
