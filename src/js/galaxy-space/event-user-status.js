define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', 'https://test.ehanlin.com.tw/ms-user-status/userStatus')
    .then((data) => {
      let name = data.name
      let studentCard = data.studentCard

      $('.userStatus .name').append(`${name}`)
      $('.userStatus .studentCard').append(`${studentCard}`)
    })
})
