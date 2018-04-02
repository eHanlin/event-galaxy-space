define(['require', 'jquery', 'w3'], (require, $, w3) => {
  let slide = w3.slideshow('.block', 0)

  $('.right').off('click').on('click', event => {
    slide.next()
  })

  $('.left').off('click').on('click', event => {
    slide.previous()
  })
})
