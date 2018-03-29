define(['jquery', 'ajax', 'eventCountUp'], ($, ajax, eventCountUp) => {
  ajax('GET', `http://localhost:9090/currencyBank/totalAssets/one`)
    .then(data => {
      let finalCoins = data.content.coins
      let finalGems = data.content.gems
      $('#coins').text(0)
      //eventCountUp('coins', 0, finalCoins)
      //eventCountUp('gems', 0, finalGems)
    })
})
