define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', 'https://test.ehanlin.com.tw/ms-user-status/userStatus')
    .then((data) => {
      let name = data.name
      let studentCard = data.studentCard

      console.log('========= 我就是id ========')
      console.log(data.id)
      console.log('========= 我就是id ========')
      $('.userStatus .name').append(`${name}`)
      $('.userStatus .studentCard').append(`${studentCard}`)
      $('.userStatus .logout').append(`登出`)
    })
})
