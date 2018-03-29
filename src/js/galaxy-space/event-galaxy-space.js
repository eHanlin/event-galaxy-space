define(['jquery', 'ajax'], ($, ajax) => {
  ajax('GET', 'https://test.ehanlin.com.tw/currencyBank/totalAssets/one')
    .then(data => {
      $('#coins').append(data.content.coins)
      $('#gems').append(data.content.gems)
    })

  // ajax('GET', 'https://www.ehanlin.com.tw/ms-user-status/userStatus')
  //   .then(data => {
  //     console.log(data)
  //   })
})
