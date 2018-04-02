define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  return (chest, targets) => {
    let chestStatus = {
      status: 'OPEN'
    }
    ajax('PUT', `/chest/open/${chest.id}`, chestStatus)
      .then((jsonData) => {
        let jsonContent = jsonData.content
        let finalCoins = jsonContent.finalCoins
        let finalGems = jsonContent.finalGems

        /* 獲得禮物內容 */
        let gainCoins = jsonContent.coins
        let gainGems = jsonContent.gems
        let gainAwardId = jsonContent.gainAwardId
        let gainAward = jsonContent.gainAward

        let luckyBag = false
        let awardImg = '', awardTitle = '', randomInRankRange = '', randomInQuantityRange = '', openLuckyBagBtn = ''

        if (gainAwardId) {
          let range, quantityRange
          luckyBag = jsonContent.luckyBag
          awardTitle = `<span class="gif-title">${gainAward}</span>`
          awardImg = `<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/${gainAwardId}.png">`

          for (range in jsonContent.randomInRankRange) {
            randomInRankRange = `${jsonContent.randomInRankRange[range]} in ${range}`
          }

          for (quantityRange in jsonContent.randomInQuantityRange) {
            randomInQuantityRange = `${jsonContent.randomInQuantityRange[quantityRange]} in ${quantityRange}`
          }

          if (luckyBag === true) {
            openLuckyBagBtn = '打開福袋'
          }
        }

        let content = `
          <div class="open-confirm-grid-container">
            <div class="open-text-block1">
              <img class="open-gif-hest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/open/openChest${chest.level}.gif">
            </div>
            <div class="open-text-block2">恭喜你獲得了
              <span class="gif-title">${awardTitle} ${randomInRankRange} ${randomInQuantityRange}</span>
            </div>
            <div class="open-text-block3">
              <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">
              <span class="coins">${gainCoins}</span>
              <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">
              <span class="gems">${gainGems}</span>
            </div>
            <div class="open-text-block4">
              ${awardImg}
            </div>
          </div>
        `
        confirmPopup.ok('', content, () => {
          /* 福袋內容 */
          if (luckyBag === true) {
            ajax('PUT', `/chest/award/luckyBag`, {awardId: gainAwardId})
              .then((jsonData) => {
                let jsonContent = jsonData.content
                let gainCoins = jsonContent.coins
                let gainGems = jsonContent.gems
                let finalCoins = jsonContent.finalCoins
                let finalGems = jsonContent.finalGems
                let title = `
                  <div class="lucky-bag">
                    <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">
                    <span class="coins">${gainCoins}</span>
                    <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">
                    <span class="gems">${gainGems}</span>
                  </div>
                `
                let bagImage = `<img class="confirm-popup-lucky-bag" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/award/${gainAwardId}.png">`

                confirmPopup.image(title, bagImage, () => {
                  require(['eventCountUp', 'eventAward'], (eventCountUp, eventAward) => {
                    targets.readyBtn.css('display', 'none')
                    targets.platformChest.remove()
                    eventCountUp('coins', $('#coins').text(), finalCoins)
                    eventCountUp('gems', $('#gems').text(), finalGems)
                  })
                })
              })
          } else {
            require(['eventCountUp', 'eventAward'], (eventCountUp, eventAward) => {
              targets.readyBtn.css('display', 'none')
              targets.platformChest.remove()
              eventCountUp('coins', $('#coins').text(), finalCoins)
              eventCountUp('gems', $('#gems').text(), finalGems)
            })
          }
        }, openLuckyBagBtn)
      })
  }
})
