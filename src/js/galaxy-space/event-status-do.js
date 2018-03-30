define(['jquery', 'ajax'], ($, ajax) => {
  return {
    locked: (chest, targets) => {
      console.log('LOCKED')
      targets.startBtn.removeAttr('style')
      targets.upgradeBtn.removeAttr('style')

      if (chest.level === 6) {
        targets.upgradeBtn.css('display', 'none')
        targets.startBtn.css('left', '27%')
      }
    },

    unLocking: (chest, targets) => {
      console.log('UNLOCKING')
      $(`.platform-${chest.colorPlatform} .chest${chest.level}`).attr('data-status', 'UNLOCKING')

      ajax('GET', `/chest/coolDownTime/${chest.id}`)
        .then(data => {
          let seconds = data.content
          targets.startBtn.css('display', 'none')
          targets.upgradeBtn.css('display', 'none')
          targets.readyBtn.css('display', 'none')
          targets.openNowBtn.removeAttr('style')
          targets.platformChest.css('filter', 'grayscale(100%)')

          $('.start-btn').css('display', 'none')
          $('.upgrade-btn').css('left', '27%')
          require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
            eventCountdown(seconds, chest, targets, eventChestReady)
          })
        })
    },

    ready: (chest, targets) => {
      console.log('READY')
      targets.countdown.css('display', 'none')
      targets.startBtn.css('display', 'none')
      targets.upgradeBtn.css('display', 'none')
      targets.readyBtn.removeAttr('style')
      targets.platformChest.removeAttr('style')
      targets.platformChest.attr('data-status', 'READY')
      targets.platformChest.attr('src', `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/readyChest${chest.level}.png`)
    },

    open: (chest, targets) => {
      console.log('OPEN')
      targets.openNowBtn.css('display', 'none')
      targets.countdown.css('display', 'none')
      targets.platformChest.remove()
    }
  }
})
