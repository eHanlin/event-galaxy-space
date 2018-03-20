define(['jquery'], $ => {
  return (
    status,
    platformColor,
    chestLevel,
    chestId,
    startBtnTarget,
    upgradeBtnTarget,
    platformTarget,
    countdownTarget,
    readyBtnTarget
  ) => {
    if (status === 'UNLOCKING') {
      console.log('UNLOCKING')
      $(`.platform-${platformColor} .chest${chestLevel}`).attr('data-status', 'UNLOCKING')
      require(['ajax'], ajax => {
        ajax('GET', `http://localhost:8080/chest/coolDownTime/${chestId}`)
          .then(data => {
            let seconds = data.content

            startBtnTarget.css('display', 'none')
            upgradeBtnTarget.css('display', 'none')
            $(`.platform-${platformColor} .chest${chestLevel}`).css('filter', 'grayscale(100%)')

            require(['eventCountdown'], eventCountdown => {
              eventCountdown.countdownFunc(seconds, platformTarget, countdownTarget, readyBtnTarget, chestLevel, platformColor)
            })
          })
      })
    }
  }
})
