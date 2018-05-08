define(['jquery', 'cookie'], ($, Cookie) => {
  let isBonusPopup = Cookie.get('isBonusPopup')
  if (!isBonusPopup) {
    $('#bonus-popup').addClass('bonus-popup-show')
    setTimeout(() => {
      $('#bonus-popup img.forward-anchor').css('display', '')
    }, 500)

    $('#bonus-popup #close-popup').on('click', event => {
      event.preventDefault()
      $('#bonus-popup').remove()
    })

    Cookie.set('isBonusPopup', true, {
      expire: 1,
    })
  }
})