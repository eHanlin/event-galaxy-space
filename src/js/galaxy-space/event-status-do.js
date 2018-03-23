define(['jquery', 'ajax'], ($, ajax) => {
  return {
    Locked: (chest, targets) => {
      console.log('LOCKED')
    },

    unLocking: (chest, targets) => {
      console.log('UNLOCKING')
      $(`.platform-${chest.colorPlatform} .chest${chest.level}`).attr('data-status', 'UNLOCKING')

      if (chest.level === 5) {
        targets.countdown.css('top', '-180px')
      } else if (chest.level === 6) {
        targets.countdown.css('top', '-190px')
      }

      ajax('GET', `http://localhost:8080/chest/coolDownTime/${chest.id}`)
        .then(data => {
          let seconds = data.content
          targets.startBtn.css('display', 'none')
          targets.upgradeBtn.css('display', 'none')
          targets.readyBtn.css('display', 'none')
          targets.openNowBtn.removeAttr('style')
          targets.platformChest.css('filter', 'grayscale(100%)')

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
      targets.platformChest.attr('src', `./img/chest/readyChest${chest.level}.png`)
    },

    open: (chest, targets) => {
      console.log('OPEN')
      targets.openNowBtn.css('display', 'none')
      targets.countdown.css('display', 'none')
      targets.platformChest.remove()
    }
  }
})
