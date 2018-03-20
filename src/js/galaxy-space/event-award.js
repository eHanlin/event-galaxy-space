define(['jquery'], ($) => {
  let slide = w3.slideshow('.block', 0)
  require(['ajax'], ajax => {
    ajax('GET', 'http://127.0.0.1:8080/chest/award')
      .then((data) => {
        let index = 0
        let awards = data.content

        for (let award in awards) {
          let awardId = award.split('#')[0]
          let value = awards[award]
          let awardBlock = $('.award-box li:eq(' + index + ')')
          let awardImg = `<img src='./img/award/${awardId}.png' />`

          awardBlock.append(awardImg)
          awardBlock.append(`<span class="awardSum">${value}</span>`)
          index++
        }
      })
  })

  $('.right').on('click', event => {
    slide.next()
  })
  $('.left').on('click', event => {
    slide.previous()
  })
})
