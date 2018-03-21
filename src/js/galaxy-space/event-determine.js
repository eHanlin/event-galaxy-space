define(['require', 'jquery'], (require, $) => {
  return (
    chest,
    targets
  ) => {
    if (chest.status === 'UNLOCKING') {
      console.log('UNLOCKING')
      $(`.platform-${chest.colorPlatform} .chest${chest.level}`).attr('data-status', 'UNLOCKING')

      if (chest.level === 5) {
        targets.countdown.css('top', '-180px')
      } else if (chest.level === 6) {
        targets.countdown.css('top', '-190px')
      }

      let ajax = require('ajax')
      ajax('GET', `http://localhost:8080/chest/coolDownTime/${chest.id}`)
        .then(data => {
          let seconds = data.content
          targets.startBtn.css('display', 'none')
          targets.upgradeBtn.css('display', 'none')
          targets.platformChest.css('filter', 'grayscale(100%)')

          require(['eventCountdown'], (eventCountdown) => {
            eventCountdown.countdownFunc(seconds, chest, targets)
          })
        })
    }
  }
})
