define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', 'https://test.ehanlin.com.tw/ms-user-status/userStatus')
    .then((data) => {
      let name = data.name
      let studentCard = data.studentCard

      console.log('========= 我就是id ========')
      console.log(data.id)
      console.log('========= 我就是id ========')

      $('.userStatus .login').css('display', 'none')
      $('.userStatus .name').append(`${name}`)
      $('.userStatus .studentCard').append(`${studentCard}`)
      $('.userStatus .logout').append(`登出`)
    })

  $('.userStatus .logout').on('click', () => {
    ajax('PUT', 'https://test.ehanlin.com.tw/Users/521d946be4b0d765448570bd/!logout')
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })

  $('.userStatus .name').on('click', () => {
    window.location.href = '/my/owned/Courses.html'
  })
  $('.userStatus .studentCard').on('click', () => {
    window.location.href = '/my/owned/Courses.html'
  })
})