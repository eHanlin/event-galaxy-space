$(() => {
  let myShow = w3.slideshow('.nature', 2000)

  $('.next').on('click', event => {
    myShow.next()
  })

  $('.previous').on('click', event => {
    myShow.previous()
  })
})
