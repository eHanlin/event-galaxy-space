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
    'http://127.0.0.1:8080/chest/5a2f7b8a4cedfd0007b48603',
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
