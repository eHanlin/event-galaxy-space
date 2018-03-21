define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    $(`.platform-${platformColor} .start-btn`).on('click', () => {
      popup.dialog('確定要啟動寶箱嗎？', '', () => {
        ajax('PUT', `http://localhost:8080/chest/status/${chestId}`, {
          status: 'UNLOCKING'
        })
          .then(() => {
            require(['eventDetermine'], eventDetermine => {
              eventDetermine(
                chestStatus,
                platformColor,
                chestLevel,
                chestId,
                startBtnTarget,
                upgradeBtnTarget,
                platformTarget,
                countdownTarget,
                readyBtnTarget
              )
            })
          })
      })
    })
  })
})
