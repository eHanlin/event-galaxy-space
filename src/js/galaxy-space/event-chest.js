define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    $(() => {
      $('.start-btn').css('display', 'none')
      $('.upgrade-btn').css('display', 'none')
      $('.ready-btn').css('display', 'none')
      $('.open-now-btn').css('display', 'none')

      ajax('GET', 'http://127.0.0.1:8080/chest/')
        .then(data => {
          let chests = data.content
          for (let index in chests) {
            let chest = chests[index]
            let chestId = chest.id
            let chestLevel = chest.level
            let chestStatus = chest.status
            let platformColor = chest.colorPlatform

            if (chestStatus === 'LOCKED') {

            }

            $(`.platform-${platformColor}`)
              .append(`<img class="chest${chestLevel}" title="chest${chestLevel}" src="./img/chest/chest${chestLevel}.png">`)
            $(`.platform-${platformColor} .start-btn`).css('display', '')
            $(`.platform-${platformColor} .upgrade-btn`).css('display', '')
            $(`.platform-${platformColor} .start-btn`).on('click', () => {
              popup.dialog('確定要啟動寶箱嗎？', '', () => {
                ajax('GET', `http://localhost:8080/chest/coolDownTime/${chestId}`)
                  .then((data) => {
                    let countdownTarget = $(`.platform-${platformColor} .countdown`)
                    let chestImg = $(`.platform-${platformColor} .chest${chestLevel}`)
                    let seconds = data.content

                    $(`.platform-${platformColor} .start-btn`).css('display', 'none')
                    $(`.platform-${platformColor} .upgrade-btn`).css('display', 'none')
                    $(`.platform-${platformColor} .chest${chestLevel}`).css('filter', 'grayscale(100%)')
                    require(['eventCountdown'], eventCountdown => {
                      eventCountdown.countdownFunc(seconds, countdownTarget, chestImg)
                    })
                  })
              })
            })

            $(`.platform-${platformColor} .upgrade-btn`).on('click', event => {
              popup.dialog('確定要升級寶箱嗎？', '', (upLevel) => {
                let putData = {
                  level: upLevel
                }
                ajax('PUT', `http://localhost:8080/chest/upgrade/${chestId}`, putData)
                  .then((data) => {
                    console.log(data)
                  })
              })
            })
          }
        })
    })
  })
})
