define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  let eventChestUpgrade = {}
  eventChestUpgrade.tip = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `http://localhost:8080/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let needCoins = data['coins']
        let needGems = data['gems']

        // let title = `<span class="confirm-popup-info">Lv${chest.level} -> Lv${upLevel}</span>`
        let content = `
          <div class="confirm-grid-container">
            <div class="image-block1">
              <img class="image-block1-chest" src="./img/chest/chest6.png">
            </div>
            <div class="content-block1">
              <span>Lv1 -> Lv2</span>
            </div>
            <div class="content-block2">
              你確定要花費 <span class="confirm-popup-info"> ${needCoins}
              <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
              升級至 Lv2 寶箱嗎？
            </div>
            <div class="content-block3">請注意： 高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>
          </div>
          `

        // let content = `<div>你確定要花費 <span class="confirm-popup-info"> ${needCoins}
        //   <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
        //   升級至 Lv2 寶箱嗎？`
        //
        // content += `請注意:高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>`

        confirmPopup.dialog(content, eventChestUpgrade.process.bind(eventChestUpgrade, chest, targets))
      })
  }

  eventChestUpgrade.process = (chest, targets) => {
    let upLevel = chest.level + 1
    ajax('GET', `http://localhost:8080/chest/checkBalance/level${upLevel}`, null)
      .then(jsonData => {
        let insufficientMessage = jsonData.content
        if (insufficientMessage) {
          let title = 'Oooooops 餘額不足喔！'
          confirmPopup.ok(title, insufficientMessage)
          return $.Deferred().reject().promise()
        } else {
          return ajax('PUT', `http://localhost:9090/currencyBank/chest/levelUp/${chest.id}`, {
            level: upLevel
          })
        }
      })
      .then(jsonData => {
        let successGif = `<image class="confirm-popup-chest-gif" src="./img/chest/upgradeStatus/upgradeSuccess${upLevel}.gif">`
        confirmPopup.ok('升級成功', successGif)
        targets.platformChest.attr('src', `./img/chest/chest${upLevel}.png`)
        targets.platformChest.attr('title', `chest${upLevel}`)
        targets.platformChest.attr('class', `chest${upLevel}`)
      })
  }

  return eventChestUpgrade
})
