define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo', 'w3'], ($, ajax, confirmPopup, eventStatusDo, w3) => {
  return (chest, targets) => {
    let content
    let statusData = {
      status: 'UNLOCKING'
    }

    if (chest.level >= 2) {
      content = `
        <div class="start-confirm-grid-container">
          <div class="content-block1">
            <span>寶箱準備啟動中...</span>
          </div>
  
          <div class="content-block2">
            <span>目前寶箱等級為Lv${chest.level}，開啟這個寶箱可能獲得</span>
          </div>  
          <div class="img-block-left-btn">
            <img class="left-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/previous.png">
          </div>
  
          <div class="img-block-right-btn">
            <img class="right-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/next.png">
          </div>
  
          <div class="content-block4">
            <span>你確定要啟動這個寶箱嗎？</span>
          </div>
        </div>
      `
    } else {
      content = `
        <div>
          <h2 class="header-text">寶箱準備啟動中...</h2>
          <h3>你確定要啟動這個寶箱嗎？</h3>
        </div>
      `
    }

    confirmPopup.dialog(content, () => {
        ajax('PUT', `/chest/status/${chest.id}`, statusData)
          .then(jsonData => {
            if (jsonData.message === 'Status of chest is already change') {
              confirmPopup.ok('Oooooops！', '此次寶箱操作，重複進行囉！')
              return
            }
            eventStatusDo.unLocking(chest, targets)
          })
      }, () => { /* 取消 */ },
      () => {
        if (chest.level < 2) return

        ajax('GET', `/chest/condition/chest${chest.level}`)
          .then(data => {
            let conditions = data.content
            let awards = conditions.content.awards
            let chestMatchAwards

            let awardsCount = awards.length
            let limit = 0
            let awardIndex
            let awardImages = ''
            let awardBlock = ''

            if (window.matchMedia('(max-width: 500px)').matches) {
              limit = 1
            } else if (window.matchMedia('(max-width: 800px)').matches) {
              limit = 3
            } else {
              limit = 5
            }

            let composeAwardBlock = (awardIndex, limit, chestMatchAwards) => {
              switch (awardIndex % limit) {
                case (limit - 1) :
                  awardImages += `<img class="img-award${awardIndex}" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/${chestMatchAwards}.png">`
                  awardBlock += `<div class="img-block-award">${awardImages}</div>`
                  awardImages = ''
                  break

                default:
                  awardImages += `<img class="img-award${awardIndex}" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/${chestMatchAwards}.png">`
              }
            }

            for (awardIndex = 0; awardIndex < awards.length; awardIndex++) {
              chestMatchAwards = awards[awardIndex]

              if (awardIndex === awardsCount - 1) {
                awardImages += `<img class="img-award${awardIndex}" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/${chestMatchAwards}.png">`
                awardBlock += `<div class="img-block-award">${awardImages}</div>`
              } else {
                composeAwardBlock(awardIndex, limit, chestMatchAwards)
              }
            }

            $('.img-block-left-btn').after(awardBlock)
            let slide = w3.slideshow('.img-block-award', 0)

            $('.right-btn').on('click', () => {
              slide.next()
            })

            $('.left-btn').on('click', () => {
              slide.previous()
            })
          })
      })
  }
})
