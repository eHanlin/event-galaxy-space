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
            <span class="content-text1">寶箱準備啟動中...</span>
          </div>

          <div class="content-block2">
            <span class="content-text2">目前寶箱等級為Lv${chest.level}，開啟這個寶箱可能獲得</span>
          </div>

          <div class="img-block-left-btn">
            <img class="left-btn" src="./img/previous.png">
          </div>

          <div class="img-block-right-btn">
            <img class="right-btn" src="./img/next.png">
          </div>

          <div class="content-block4">
            <span class="content-text3">你確定要啟動這個寶箱嗎？</span>
          </div>
      </div>`
    }

    if (chest.level < 2) {
      content = `
      <div>
          <h2>寶箱準備啟動中...</h2>
          <h3>你確定要啟動這個寶箱嗎？</h3>
      </div>
      `
    }

    confirmPopup.dialog(content, () => {
      ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
          .then(eventStatusDo.unLocking.bind(eventStatusDo.unLocking, chest, targets))
    }, () => { /* 取消 */ },
      () => {
        ajax('GET', `http://127.0.0.1:8080/chest/condition/chest${chest.level}`)
          .then(data => {
            let conditions = data.content
            let awards = conditions.content.awards
            let chestMatchAwards
            let awardsImg1 = ''
            let awardsImg2 = ''
            let awardsImg3 = ''
            let awardsImg4 = ''
            let awardsImg5 = ''
            let imgBlock1 = ''
            let imgBlock2 = ''
            let imgBlock3 = ''
            let imgBlock4 = ''
            let imgBlock5 = ''
            for (let awardIndex in awards) {
              chestMatchAwards = awards[awardIndex]

              if (awardIndex < 5) {
                awardsImg1 += `
                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`
                imgBlock1 = `<div class="img-block-award block1">${awardsImg1}</div>`
              } else if (awardIndex >= 5 && awardIndex < 10) {
                awardsImg2 += `
                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`
                imgBlock2 = `<div class="img-block-award block2">${awardsImg2}</div>`
              } else if (awardIndex >= 10 && awardIndex < 15) {
                awardsImg3 += `
                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`
                imgBlock3 = `<div class="img-block-award block3">${awardsImg3}</div>`
              } else if (awardIndex >= 15 && awardIndex < 20) {
                awardsImg4 += `
                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`
                imgBlock4 = `<div class="img-block-award block4">${awardsImg4}</div>`
              } else if (awardIndex >= 20 && awardIndex < 25) {
                awardsImg5 += `
                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`
                imgBlock5 = `<div class="img-block-award block5">${awardsImg5}</div>`
              }
            }

            $(`.img-block-left-btn`).after(`${imgBlock1}${imgBlock2}${imgBlock3}${imgBlock4}${imgBlock5}`)
            let slide = w3.slideshow(`.img-block-award`, 0)

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
