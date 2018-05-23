define(['jquery', 'cookie', 'ajax'], ($, Cookie, ajax) => { // eslint-disable-line
  let isBonusPopup = Cookie.get('isBonusPopup')
  let bonusPopupTarget = $('#bonus-popup')

  if (!isBonusPopup) {
    ajax('GET', `/chest/condition/bonusPopup`)
      .then(jsonData => {
        let bonusPopupContent = jsonData.content.content
        let image
        if (!bonusPopupContent.show) {
          return
        }
        image = jsonData.content.content.image
        bonusPopupTarget.css('background-image', `url(${image})`)
        bonusPopupTarget.addClass('bonus-popup-show')

        $('#bonus-popup').on('click', event => {
          $(event.currentTarget).remove()
        })

        Cookie.set('isBonusPopup', true, {
          expire: 1
        })
      })
  }
})
