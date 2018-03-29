define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', '/ms-user-status/userStatus')
    .then((data) => {
      console.log(data)
    })
})
