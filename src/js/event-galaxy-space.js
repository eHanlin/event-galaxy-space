$(() => {
  let nature = w3.slideshow('.nature', 2000)
  let award = w3.slideshow('.award', 2000)

  $('.next').on('click', event => {
    nature.next()
    award.next()
  })
  $('.previous').on('click', event => {
    nature.previous()
    award.previous()
  })

  ajaxGet(
    '',
    null,
    data => {
      console.log(data)
    },
    () => {}
  )

  ajaxGet(
    'https://test.ehanlin.com.tw/chest/condition/award1',
    null,
    data => {
      let dataId = data.content.id
      console.log(dataId)
    },
    () => {}
  )
})
