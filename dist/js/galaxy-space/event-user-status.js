define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', `/ms-user-status/userStatus`)
    .then((data) => {
      let name = data.name
      let studentCard = data.studentCard

      console.log('========= 我就是id ========')
      console.log(data.id)
      console.log('========= 我就是id ========')

      $('.user-status .login').remove()
      $('.user-status .name').append(`${name}`)
      $('.user-status .student-card').append(`${studentCard}`)
      $('.user-status .logout').append(`登出`)
    })

  $('.user-status .logout').on('click', () => {
    ajax('PUT', `/Users/521d946be4b0d765448570bd/!logout`)
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })

  $('.user-status .name').on('click', () => {
    window.location.href = '/my/owned/Courses.html'
  })
  $('.user-status .student-card').on('click', () => {
    window.location.href = '/my/owned/Courses.html'
  })
  $('.user-status .login').on('click', () => {
    window.location.href = '/Users/login.html'
  })
})
