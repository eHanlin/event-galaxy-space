define(['require', 'jquery', 'ajax', 'confirmPopup', 'eventChestInspection', 'eventTotalAssets'],
  (require, $, ajax, confirmPopup, eventChestInspection, eventTotalAssets) => {
    let title =
      `
    <span style="font-size:22px; top:150px;">
    經過一年的努力，我們終於在銀河中找到一片適合安定下來的土地，在這片土地上，<br>有一些厲害的魔法師居住著，透過他們的魔法將封存
    的寶箱都打開啦!趕快來看看你獲得了哪些寶藏吧!
    </span><br><br><br>
    `
    let okContent =
      `
      <span style="font-size:24px;">哇!獲得了好多寶藏呢~記得在7/20之前完成資料回填，贈品將會在8/6開始陸續寄出。<br>
      下學期我們將會在魔法世界展開冒險，記得回來唷!</span>
      <br>
      <br>
      <br>
      `

    let autoOpenedFunc = (jsonDataContent, openedChestsIndex, openedChestsCount) => {
      if (openedChestsIndex > openedChestsCount - 1) {
        let chestIds = []
        for (let i = 0; i < jsonDataContent.length; i++) {
          chestIds.push(jsonDataContent[i].chestId)
          console.log(chestIds)
        }
        confirmPopup.ok('', okContent, () => {
          ajax('POST', `/chest/award/notePopupAutoOpened`, chestIds)
            .then(data => {
              console.log(data)
            })
        })
        return
      }

      /* 獲得禮物內容 */
      let chestId = jsonDataContent[openedChestsIndex].chestId
      let level = jsonDataContent[openedChestsIndex].level
      let gainCoins = jsonDataContent[openedChestsIndex].coins
      let gainGems = jsonDataContent[openedChestsIndex].gems
      let gainAwardId = jsonDataContent[openedChestsIndex].gainAwardId
      let gainAward = jsonDataContent[openedChestsIndex].gainAward
      let luckyBag = jsonDataContent[openedChestsIndex].luckyBag
      let awardImg = '',
        awardTitle = '',
        openLuckyBagBtn = ''
      let content, openTextBlock3 = '',
        openTextBlock4 = ''

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
              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest${level}.gif">
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

      if (gainAwardId && luckyBag === false) {
        confirmPopup.dialog(content, {
          confirmFn: autoOpenedFunc.bind(autoOpenedFunc, jsonDataContent, openedChestsIndex + 1, openedChestsCount),
          confirmBtnText: '確認',
          isShowCancelButton: false
        })
      } else {
        if (luckyBag === true) {
          openLuckyBagBtn = '打開福袋'
        }

        confirmPopup.ok('', content, () => {
          /* 福袋內容 */
          if (luckyBag === true) {
            ajax(
                'POST', `/chest/award/luckyBag/${chestId}`, {
                  awardId: gainAwardId,
                  chestId: chestId,
                  level: level
                })
              .then((jsonData) => {
                let jsonContent = jsonData.content
                let title, gainCoins, gainGems

                if (eventChestInspection(jsonData.message, jsonData.content)) {
                  return
                }

                gainCoins = jsonContent.coins
                gainGems = jsonContent.gems
                title = `
                      <div class="lucky-bag">
                        <span>福袋打開囉，得到 </span>
                        <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
                        <span>${gainCoins}</span>
                        <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
                        <span>${gainGems}</span>
                      </div>
                    `
                let bagImage = `<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`

                confirmPopup.luckyBagImage(title, bagImage, () => {
                  autoOpenedFunc(jsonDataContent, openedChestsIndex + 1, openedChestsCount)
                })
              })
          } else {
            autoOpenedFunc(jsonDataContent, openedChestsIndex + 1, openedChestsCount)
          }
        }, openLuckyBagBtn)
      }
    }

    confirmPopup.ok('', title, () => {
      ajax('GET', `/chest/autoOpened`)
        .then(jsonData => {
          let openedChestsIndex = 0
          let openedChestsCount = jsonData.content.length
          autoOpenedFunc(jsonData.content, openedChestsIndex, openedChestsCount)
        })
    }, '確認')
  })
