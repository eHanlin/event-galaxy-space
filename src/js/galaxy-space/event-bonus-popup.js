define(['jquery', 'cookie', 'ajax'], ($, Cookie, ajax) => { // eslint-disable-line
  let isBonusPopup = Cookie.get('isBonusPopup')
  let bonusPopupTarget = $('#bonus-popup')

  if (!isBonusPopup) {
    ajax('GET', `/currencyMission/admin/eventRule`)
      .then(jsonData => {
        let image = jsonData.content
        if (!image) {
          return
        }

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
