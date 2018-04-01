define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  let eventChestUpgrade = {}
  eventChestUpgrade.ask = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let needCoins = data['coins']
        let needGems = data['gems']
        let content = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-block1-chest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/chest${upLevel}.png">
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
        confirmPopup.dialog(content, eventChestUpgrade.process.bind(eventChestUpgrade.process, chest, targets))
      })
  }

  eventChestUpgrade.process = (chest, targets) => {
    let upLevel = chest.level + 1
    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let levelInfo = jsonData.content.content
        let coins = levelInfo.coins
        let gems = levelInfo.gems
        return ajax('GET', `http://localhost:8080/chest/checkBalance?coins=${coins}&gems=${gems}`, null)
      })
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
        let transactionResult
        let title, gif

        if (content.isActivation && content.isActivation === 'false') {
          confirmPopup.ok('Oooooops！ 無法再升級囉！',
            `你目前還不是銀河探險隊的正式隊員，
            馬上前往購買課程成為正式隊員再回來繼續升級寶箱拿獎品吧！ 
            <br/><a href="https://test.ehanlin.com.tw/courses_map.html">課程連結</a>`)
        } else if (content.isLevelUpSucceeded && content.isLevelUpSucceeded === 'true') {
          confirmPopup.ok('Oooooops 此寶箱已經升級過囉', '')
        } else {
          transactionResult = content[0]
          if (transactionResult && transactionResult.memo.levelUpSuccess === 'true') {
            title = '升級成功'
            gif = `<image class="confirm-popup-chest-gif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/upgradeStatus/upgradeSuccess${upLevel}.gif">`
          } else {
            title = '升級失敗'
            gif = `<image class="confirm-popup-chest-gif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/upgradeStatus/upgradeFail${chest.level}.gif">`
          }

          confirmPopup.gifImage(title, gif, () => {
            let originalCoins = $('#coins').text()
            let originalGems = $('#gems').text()
            let spendCoins = transactionResult.coins
            let spendGems = transactionResult.gems
            let finalCoins = originalCoins - spendCoins
            let finalGems = originalGems - spendGems

            require(['eventCountUp'], (eventCountUp) => {
              eventCountUp('coins', originalCoins, finalCoins)
              eventCountUp('gems', originalGems, finalGems)
            })

            require(['eventChestGet'], (eventChestGet) => {
              eventChestGet()
            })
          })
        }
      })
  }
  return eventChestUpgrade
})
