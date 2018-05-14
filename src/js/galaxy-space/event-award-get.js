define(['require', 'jquery', 'w3'], (require, $) => {// eslint-disable-line
  return () => {
    let ajax = require('ajax')
    ajax('GET', `/chest/award`)
      .then((data) => {
        let awards = data.content
        let awardId
        let index = 0

        $('.award-box li img').remove()
        $('.award-box li .awardSum').remove()

        for (awardId in awards) {
          let value = awards[awardId]
          let awardBlock = $(`.award-box li:eq(${index})`)
          let awardImg = `<img src='https://d220xxmclrx033.cloudfront.net/event-space/img/award/${awardId}.png' />`
          awardBlock.append(awardImg)
          awardBlock.append(`<span class="awardSum">${value}</span>`)
          index++
        }
      })
  }
})
