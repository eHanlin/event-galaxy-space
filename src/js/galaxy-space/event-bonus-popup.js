define(['jquery', 'cookie', 'ajax'], ($, Cookie, ajax) => {
  let isBonusPopup = Cookie.get('isBonusPopup')
  let bonusPopupTarget = $('#bonus-popup')

  if (!isBonusPopup) {
    ajax('GET', `/chest/condition/bonusPopup`)
      .then(jsonData => {
        // let image = jsonData.content.content.image
        bonusPopupTarget.css('background-image', `url(${image})`)
        bonusPopupTarget.addClass('bonus-popup-show')
        setTimeout(() => {
          $('#bonus-popup img.forward-anchor').css('display', '')
        }, 1000)

        $('#bonus-popup #close-popup').on('click', event => {
          event.preventDefault()
          $('#bonus-popup').remove()
        })

        Cookie.set('isBonusPopup', true, {
          expire: 1
        })
      })
  }
})
