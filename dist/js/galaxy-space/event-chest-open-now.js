define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo'], ($, ajax, confirmPopup, eventStatusDo) => {
  return (chest, targets) => {
    let seconds
    ajax('GET', `/chest/coolDownTime/${chest.id}`)
      .then(data => {
        seconds = data.content
        return ajax('GET', `/chest/condition/openImmediately`)
      })
      .then(data => {
        let openImmediatelyData = data.content
        let consume = openImmediatelyData['content']
        let everySecondsHour = 3600
        let remainHours = Math.ceil(seconds / everySecondsHour)
        let deductGems = remainHours * consume.everyHourDeductGems

        confirmPopup.dialog(`<h2>立即開啟寶箱需花費${deductGems}個寶石</h2><h3>確定要立即開啟寶箱嗎？<h3>`, () => {
          ajax('PUT', `/chest/open/immediately/${chest.id}`, {
            deductGems: deductGems
          }).then(data => {
            let originalGems = $('#gems').text()
            let finalGems = data.content.finalGems
            let insufficientGems = originalGems - deductGems
            let statusData = {
              status: 'OPEN'
            }

            /* 檢查餘額是否足夠 */
            if (insufficientGems < 0) {
              confirmPopup.confirm(`你的寶石不足${insufficientGems * -1}個`, `欠一屁股債了~ 快做題吧 !`, () => {})
              return false
            }

            require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
              eventCountdown(0, chest, targets, eventChestReady)
            })

            require(['eventCountUp'], eventCountUp => {
              eventCountUp('gems', originalGems, finalGems)
            })
          })
        }, () => { /* 取消 */ })
      })
  }
})
