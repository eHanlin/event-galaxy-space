define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  let eventChestUpgrade = {}
  eventChestUpgrade.tip = (chest) => {
    let upLevel = chest.level + 1
    ajax('GET', `http://localhost:8080/chest/condition/level${upLevel}`, null)
      .then(
        (jsonData) => {
          let data = jsonData.content.content
          let needCoins = data['coins']
          let needGems = data['gems']

          //let title = `<span class="confirm-popup-info">Lv${chest.level} -> Lv${upLevel}</span>`
          let content = `
          <div>
          <div class="confirm-grid-container">
            <div class="image-block1">
              <img class="image-block1-chest" src="./img/chest/chest6.png">
            </div>
            <div class="text-block1">
              <span>Lv1 -> Lv2</span>
            </div>
            <div class="text-block2">
              你確定要花費 <span class="confirm-popup-info"> ${needCoins}
              <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
              升級至 Lv2 寶箱嗎？
            </div>
            <div class="text-block3">請注意： 高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>
          </div>
          </div>
          `

          // let content = `<div>你確定要花費 <span class="confirm-popup-info"> ${needCoins}
          //   <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
          //   升級至 Lv2 寶箱嗎？`
          //
          // content += `請注意:高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>`

          confirmPopup.dialog(content, eventChestUpgrade.process)
        }
      )
  }

  eventChestUpgrade.process = () => {
    console.log('GGGG')
  }

  return eventChestUpgrade
})
