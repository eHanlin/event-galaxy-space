define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection', 'eventAwardAreZero'],
  ($, ajax, confirmPopup, eventChestInspection, eventAwardAreZero) => {
    return (chest, targets) => {
      let coins, gems
      let title =
        `
    <img style="position:absolute; left:200px; top:20px;" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/upgradeStatus/upgradeFail2.gif">
    <span style="position:absolute; font-size:22px; left:500px; top:150px;">
    經過一年的努力，我們終於在銀河中找到一片適合安定下來的土地，<br>
    在這片土地上，有一些厲害的魔法師居住著，透過他們的魔法將封存<br>
    的寶箱都打開啦!趕快來看看你獲得了哪些寶藏吧!
    </span><br><br><br><br><br><br><br><br>
    `
      let okContent =
        `
      <span style="font-size:24px;">哇!獲得了好多寶藏呢~記得在7/20之前完成資料回填，贈品將會在8/6開始陸續寄出。<br>
      下學期我們將會在魔法世界展開冒險，記得回來唷!</span>
      <br>
      <br>
      <br>
      `

      confirmPopup.ok('', title, () => {
        autoOpenedFunc(0)
        // confirmPopup.ok('', okContent, () => {}, '確認')
      }, '確認')

      let autoOpenedFunc = (index) => {
        ajax('GET', `http://localhost:8080/chest/autoOpened`)
          .then(jsonData => {
            let jsonDataContent = jsonData.content
            let finalCoins = 5234
            let finalGems = 2443
            /* 獲得禮物內容 */
            let chestId = jsonDataContent[index].chestId
            let gainCoins = jsonDataContent[index].coins
            let gainGems = jsonDataContent[index].gems
            let gainAwardId = jsonDataContent[index].gainAwardId
            let gainAward = jsonDataContent[index].gainAward
            let luckyBag = jsonDataContent[index].luckyBag
            let awardImg = '',
              awardTitle = '',
              openLuckyBagBtn = ''
            let content,
              openTextBlock3 = '',
              openTextBlock4 = ''

            if (eventChestInspection(jsonData.message, jsonData.content)) {
              return
            } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
              return
            }

            if (gainAwardId) {
              awardTitle = `<span class="gif-title">${gainAward}</span>`
              awardImg = `<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`
              openTextBlock3 = `
            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span>${gainCoins}</span>
            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span>${gainGems}</span>
          `
              openTextBlock4 = awardImg
            } else {
              openTextBlock4 = `
            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span class="coins-lg">${gainCoins}</span>
            <br/>
            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span class="gems-lg">${gainGems}</span>
          `
            }

            content = `
          <div class="open-confirm-grid-container">
            <div class="open-text-block1">
              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest${chest.level}.gif">
            </div>
            <div class="open-text-block2">恭喜你獲得了
              <span class="gif-title">${awardTitle}</span>
            </div>
            <div class="open-text-block3">
              ${openTextBlock3}
            </div>
            <div class="open-text-block4">
              ${openTextBlock4}
            </div>
          </div>
        `

            let afterOpen = (finalCoins, finalGems) => {
              require(['eventCountUp'], (eventCountUp) => {
                targets.readyBtn.css('display', 'none')
                targets.platformChest.remove()
                eventCountUp('coins', parseInt($('#coins').text()), finalCoins)
                eventCountUp('gems', parseInt($('#gems').text()), finalGems)
              })
            }

            if (gainAwardId && luckyBag === false) {
              confirmPopup.dialogForOpenFinalPage(content,
                /* confirmFn */
                () => {
                  autoOpenedFunc(index + 1)
                  afterOpen.bind(afterOpen, finalCoins, finalGems)
                },
                /* onOpenFn */
                () => {},
                '確認')
            } else {
              if (luckyBag === true) {
                openLuckyBagBtn = '打開福袋'
              }

              confirmPopup.ok('', content, () => {
                /* 福袋內容 */
                if (luckyBag === true) {
                  ajax(
                      'POST', `http://localhost:8080/chest/award/luckyBag/${chestId}`, {
                        awardId: gainAwardId,
                        chestId: chestId,
                        level: chest.level
                      })
                    .then((jsonData) => {
                      let jsonContent = jsonData.content
                      let finalCoins, finalGems, title

                      if (jsonData.message === 'Lucky bag is already opened') {
                        confirmPopup.ok('Oooooops！', '福袋已經開啟過囉！')
                        return
                      }

                      // gainCoins = jsonContent.coins
                      // gainGems = jsonContent.gems
                      finalCoins = jsonContent.finalCoins
                      finalGems = jsonContent.finalGems

                      coins = jsonDataContent[index].luckyBagGain.coins
                      gems = jsonDataContent[index].luckyBagGain.gems
                      title = `
                      <div class="lucky-bag">
                        <span>福袋打開囉，得到 </span>
                        <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
                        <span>${coins}</span>
                        <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
                        <span>${gems}</span>
                      </div>
                    `
                      let bagImage = `<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`

                      confirmPopup.luckyBagImage(title, bagImage, () => {
                        autoOpenedFunc(index + 1)
                        afterOpen.bind(afterOpen, finalCoins, finalGems)
                      })
                    })
                } else {
                  afterOpen(finalCoins, finalGems)
                }
              }, openLuckyBagBtn)
            }
          })
      }
    }
  })
