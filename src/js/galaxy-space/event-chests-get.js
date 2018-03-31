define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', `/chest/`)
    .then(data => {
      let chests = data.content
      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`.platform-${chest.colorPlatform}`)
        targets.platform
          .append(`<img class="chest${chest.level}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/chest${chest.level}.png">`)

        targets.countdown = $(`.platform-${chest.colorPlatform} .countdown`)
        targets.startBtn = $(`.platform-${chest.colorPlatform} .start-btn`)
        targets.upgradeBtn = $(`.platform-${chest.colorPlatform} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${chest.colorPlatform} .ready-btn`)
        targets.openNowBtn = $(`.platform-${chest.colorPlatform} .open-now-btn`)
        targets.platformChest = $(`.platform-${chest.colorPlatform} .chest${chest.level}`)

        require(['eventDetermine'], eventDetermine => {
          eventDetermine(chest, targets)
        })

        /* requireJs進來，click後綁定自己將參數(chest, targets)傳入 */

        /* 啟動按鈕 */
        require(['eventChestStart'], eventChestStart => {
          targets.startBtn.off('click')
          targets.startBtn.on('click', eventChestStart.bind(eventChestStart, chest, targets))
        })

        /* 立即開啟按鈕 */
        require(['eventChestOpenNow'], (eventChestOpenNow) => {
          targets.openNowBtn.off('click')
          targets.openNowBtn.on('click', eventChestOpenNow.bind(eventChestOpenNow, chest, targets))
        })

        /* 升級按鈕 */
        require(['eventChestUpgrade'], eventChestUpgrade => {
          targets.upgradeBtn.off('click')
          targets.upgradeBtn.on('click', eventChestUpgrade.tip.bind(eventChestUpgrade.tip, chest, targets))
        })

        /* 開啟寶箱 */
        require(['eventChestOpen'], eventChestOpen => {
          targets.readyBtn.off('click')
          targets.readyBtn.on('click', eventChestOpen.bind(eventChestOpen, chest, targets))
        })
      }
    })
})
