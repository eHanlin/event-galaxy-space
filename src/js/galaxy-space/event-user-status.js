define(['jquery', 'ajax'], ($, ajax) => {
  console.log('============ 1 ============')
  ajax('GET', 'https://test.ehanlin.com.tw/ms-user-status/userStatus')
    .then((data) => {
      console.log('============ 2 ============')
      console.log(data)
      console.log('============ 2 ============')
    })
})
