define(['jquery'], $ => {
  require(['ajax'], ajax => {
    ajax('GET', 'http://127.0.0.1:8080/chest/')
      .then(data => {})

    ajax(
      'GET',
      'http://localhost:9090/currencyBank/totalAssets/one'
    ).then(data => {
      $('.coins').append(data.content.coins)
      $('.gems').append(data.content.gems)
    })
  })
})
