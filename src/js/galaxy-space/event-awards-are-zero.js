define(['jquery', 'confirmPopup'], ($, confirmPopup) => {
  return (message, multiResultInfo) => {
    let resultBlocks = ''
    let totalCoins = 0
    let totalGems = 0
    let finalCoins, finalGems
    for (let i = 0; i < multiResultInfo.length; i++) {
      let resultInfo = multiResultInfo[i]
      resultBlocks += `
        <div>
          等級 ${resultInfo.chestLevel} 寶箱獲得
          <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
          <span>${resultInfo.coins}</span>
          <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
          <span>${resultInfo.gems}</span>
        </div>
      `
      totalCoins += resultInfo.coins
      totalGems += resultInfo.gems
      finalCoins = resultInfo.finalCoins
      finalGems = resultInfo.finalGems
    }

    if (message === 'All awards are zero') {
      let content = `
          <div class="awards-are-zero-grid-container">
            ${resultBlocks}
            <div class="result-summary-block">
              總共獲得金幣 ${totalCoins}，寶石 ${totalGems} 
            </div>
          </div>
        `

      confirmPopup.awardIsZeroDialog('禮物已經全數發送完囉，結算所擁有寶箱', content, () => {
        // $('.shining-block').show()

        require(['eventCountUp'], eventCountUp => {
          eventCountUp('coins', parseInt($('#coins').text()), finalCoins)
          eventCountUp('gems', parseInt($('#gems').text()), finalGems)
        })
      })

      run = false
    }
  }
})
