define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  return (chest, targets) => {
    let chestStatus = {
      status: 'OPEN'
    }
    ajax('PUT', `/chest/open/${chest.id}`, chestStatus)
      .then((data) => {
        let gotCoins = data.content.coins
        let gotGems = data.content.gems
        let content = `
          <div class="open-confirm-grid-container">
            <div class="open-text-block1">
              <img class="openGifChest" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/chest/open/openChest${chest.level}.gif">
            </div>
            <div class="open-text-block2">
              <span class="gifTitle">恭喜你獲得了~</span>
            </div>
            <div class="open-text-block3">
                <img class="gifCoinsImg" src="./img/coin.svg">
                <span class="coins">${gotCoins}</span>
                <img class="gifGemsImg" src="./img/gem.svg">
                <span class="gems">${gotGems}</span>
            </div>
            <div class="open-text-block4">
              <img class="yourGif" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/award/award01.png">
            </div>
          </div>`
        confirmPopup.ok('', content, () => {

        })
      })
  }
})
