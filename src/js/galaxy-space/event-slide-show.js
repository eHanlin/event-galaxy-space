define(['jquery', 'w3', 'ajax'], ($, w3, ajax) => {
  ajax('GET', `http://localhost:8080/chest/award/conditions`)
    .then(data => {
      let awards = data.content
      for (let index in awards) {
        let value = awards[index]
        let title = value.content.title
        let quantity = value.content.quantity
        let needChestLv = value.content.needChestLv
        let awardId = value.id
        let howMany

        if (quantity === 0) {
          howMany = '沒貨啦'
        }
        if (quantity > 0) {
          howMany = '還有貨喔'
        }
        $('.slide-show').append(`<img class="nature" src="./img/award/${awardId}.png">`)
        $('.slide-show-text')
          .append(
            `<span class="award">${title}</span>
             <span class="quantity">庫存狀況：${howMany}</span>
             <span class="needChestLv">所在寶箱：Lv${needChestLv}</span>
             <span class="awardNotice">此為示意圖，實際款式請以實體為主</span>`)
      }
      let nature = w3.slideshow('.nature', 3000)
      let award = w3.slideshow('.award', 3000)
      let needChestLv = w3.slideshow('.needChestLv', 3000)
      let quantity = w3.slideshow('.quantity', 3000)
      let awardNotice = w3.slideshow('.awardNotice', 3000)

      // 上一個
      $('.previous').on('click', event => {
        nature.next()
        award.next()
        needChestLv.next()
        quantity.next()
        awardNotice.next()
      })
      // 下一個
      $('.next').on('click', event => {
        nature.previous()
        award.previous()
        needChestLv.previous()
        quantity.previous()
        awardNotice.previous()
      })
    })
})
