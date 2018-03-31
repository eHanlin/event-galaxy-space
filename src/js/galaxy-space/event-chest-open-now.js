define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo', 'require'], ($, ajax, confirmPopup, eventStatusDo, require) => {
  return (chest, targets) => {
    let seconds
    ajax('GET', `/chest/coolDownTime/${chest.id}`)
      .then(jsonData => {
        seconds = jsonData.content
        return ajax('GET', `/chest/condition/openImmediately`)
      })
      .then(jsonData => {
        let openImmediatelyData = jsonData.content
        let openImmediatelyInfo = openImmediatelyData['content']
        let secondsCycle = parseInt(openImmediatelyInfo.secondsCycle)
        let spendGems = openImmediatelyInfo.spendGems
        let cycles = Math.ceil(seconds / secondsCycle)
        let popupContent
        spendGems = spendGems * cycles

        popupContent = `
          <div>
            <h2 class="header-text">立即開啟寶箱需花費 ${spendGems} 個寶石</h2>
            <h3>確定要立即開啟寶箱嗎？</h3>
          </div>
        `
        confirmPopup.dialog(popupContent, () => {
          ajax('PUT', `/chest/open/immediately/${chest.id}`, {
            spendGems: spendGems
          }).then(data => {
            let originalGems = $('#gems').text()
            let finalGems = data.content.finalGems
            let insufficientGems = originalGems - spendGems
            let delay = () => {
              return new Promise((resolve) => {
                setTimeout(resolve, 1200)
              })
            }

            /* 檢查餘額是否足夠 */
            if (insufficientGems < 0) {
              let title = 'Oooooops 餘額不足喔！'
              confirmPopup.ok(title, `還缺 ${insufficientGems * -1} 寶石喔！`)
            }

            require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
              eventCountdown(0, chest, targets, eventChestReady)
            })

            require(['eventCountUp'], eventCountUp => {
              eventCountUp('gems', originalGems, finalGems)
            })

            delay().then(() => {
              window.location.reload()
            })
          })
        }, () => { /* 取消 */ })
      })
  }
})
