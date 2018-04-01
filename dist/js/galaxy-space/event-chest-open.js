define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  return (chest, targets) => {
    let chestStatus = {
      status: 'OPEN'
    }
    ajax('PUT', `/chest/open/${chest.id}`, chestStatus)
      .then((data) => {
        let gotCoins = data.content.coins
        let gotGems = data.content.gems
        let finalCoins = data.content.finalCoins
        let finalGems = data.content.finalGems
        let originalCoins = finalCoins - gotCoins
        let originalGems = finalGems - gotGems

        console.log(data)
        let content = `
          <div class="open-confirm-grid-container">
            <div class="open-text-block1">
              <img class="openGifChest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/open/openChest${chest.level}.gif">
            </div>
            <div class="open-text-block2">
              <span class="gifTitle">恭喜你獲得了~ Beats Solo3 Wireless耳罩式耳機</span>
            </div>
            <div class="open-text-block3">
                <img class="gifCoinsImg" src="./img/coin.svg">
                <span class="coins">${gotCoins}</span>
                <img class="gifGemsImg" src="./img/gem.svg">
                <span class="gems">${gotGems}</span>
            </div>
            <div class="open-text-block4">
            <img class="yourGif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/award01.png">
            </div>
          </div>`
        require(['eventCountUp'], eventCountUp => {
          confirmPopup.ok('', content, () => {
            targets.readyBtn.css('display', 'none')
            targets.platformChest.remove()
            eventCountUp('coins', originalCoins, finalCoins)
            eventCountUp('gems', originalGems, finalGems)
          })
        })
      })
  }
})
