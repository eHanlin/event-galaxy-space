define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    ajax('GET', 'http://127.0.0.1:8080/chest/')
      .then(data => {
        let chests = data.content
        for (let index in chests) {
          let chest = chests[index]
          let chestId = chest.id
          let chestLevel = chest.level
          let chestStatus = chest.status
          let platformColor = chest.colorPlatform
          let platformTarget = $(`.platform-${platformColor}`)
          let countdownTarget = $(`.platform-${platformColor} .countdown`)
          let startBtnTarget = $(`.platform-${platformColor} .start-btn`)
          let upgradeBtnTarget = $(`.platform-${platformColor} .upgrade-btn`)
          let readyBtnTarget = $(`.platform-${platformColor} .ready-btn`)

          $(`.platform-${platformColor}`)
            .append(`<img class="chest${chestLevel}" title="chest${chestLevel}" src="./img/chest/chest${chestLevel}.png">`)
          $(`.platform-${platformColor} .start-btn`).css('display', '')
          $(`.platform-${platformColor} .upgrade-btn`).css('display', '')

          /* 啟動寶箱 */
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
        }
      })
  })
})
