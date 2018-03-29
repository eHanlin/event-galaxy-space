define(['require', 'jquery', 'w3'], (require, $, w3) => {
  let slide = w3.slideshow('.block', 0)
  let ajax = require('ajax')
  ajax('GET', '/chest/award')
    .then((data) => {
      let index = 0
      let awards = data.content
      let award

      for (award in awards) {
        let awardId = award.split('#')[0]
        let indexId = awardId.split('award')[1]
        let value = awards[award]
        let awardBlock = $('.award-box li:eq(' + index + ')')
        let awardImg

        if (indexId < 10) {
          awardImg = `<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/award/award0${indexId}.png' />`
        }

        if (indexId > 10) {
          awardImg = `<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/award/${awardId}.png' />`
        }

        awardBlock.append(awardImg)
        awardBlock.append(`<span class="awardSum">${value}</span>`)
        index++
      }
    })

  $('.right').on('click', event => {
    slide.next()
  })
  $('.left').on('click', event => {
    slide.previous()
  })
})
