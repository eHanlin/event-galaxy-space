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

          /* 寶箱升級 */
          $(`.platform-${platformColor} .upgrade-btn`).on('click', event => {
            popup.dialog('確定要升級寶箱嗎？', '', () => {
              let putData = {
                level: chestLevel + 1
              }
              require(['ajax'], ajax => {
                ajax('PUT', `http://localhost:8080/chest/upgrade/${chestId}`, putData)
                  .then((data) => {
                    console.log(data)
                    ajax('GET', 'http://localhost:9090/currencyBank/totalAssets/one')
                      .then(data => {
                        console.log(data)
                      })
                  })
              })
            })
          })
        }
      })
  })
})
