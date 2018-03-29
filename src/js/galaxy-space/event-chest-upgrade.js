define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  let eventChestUpgrade = {}
  eventChestUpgrade.tip = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let needCoins = data['coins']
        let needGems = data['gems']

        // let title = `<span class="confirm-popup-info">Lv${chest.level} -> Lv${upLevel}</span>`
        let content = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-block1-chest" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/chest${upLevel}.png">
            </div>
            <div class="content-block1">
              <span>Lv${chest.level} -> Lv${upLevel}</span>
            </div>
            <div class="content-block2">
              你確定要花費 <span class="confirm-popup-info"> ${needCoins}
              <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
              升級至 Lv${upLevel} 寶箱嗎？
            </div>
            <div class="content-block3">請注意： 高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>
          </div>
        `
        confirmPopup.dialog(content, eventChestUpgrade.process.bind(eventChestUpgrade, chest, targets))
      })
  }

  eventChestUpgrade.process = (chest, targets) => {
    let upLevel = chest.level + 1
    ajax('GET', `/chest/checkBalance/level${upLevel}`, null)
      .then(jsonData => {
        let insufficientMessage = jsonData.content
        if (insufficientMessage) {
          let title = 'Oooooops 餘額不足喔！'
          confirmPopup.ok(title, insufficientMessage)
          return $.Deferred().reject().promise()
        } else {
          return ajax('PUT', `/currencyBank/chest/levelUp/${chest.id}`)
        }
      })
      .then(jsonData => {
        let content = jsonData.content
        let memo = content[0].memo
        let title, gif

        console.log(memo)
        console.log(memo.levelUpSuccess)
        if (memo.levelUpSuccess === "true") {
          title = '升級成功'
          gif = `<image class="confirm-popup-chest-gif" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/upgradeStatus/upgradeSuccess${upLevel}.gif">`
        } else {
          title = '升級失敗'
          gif = `<image class="confirm-popup-chest-gif" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/upgradeStatus/upgradeFail${chest.level}.gif">`
        }

        confirmPopup.ok(title, gif, () => {
          window.location.reload()
        })

        targets.platformChest.attr('src', `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/chest${upLevel}.png`)
        targets.platformChest.attr('class', `chest${upLevel}`)
        targets.upgradeBtn.css('display', 'none')
        targets.startBtn.css('left', '27%')
      })
  }
  return eventChestUpgrade
})
