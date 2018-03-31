define(['jquery', 'ajax', 'eventCountUp'], ($, ajax, eventCountUp) => {
  ajax('GET', `/currencyBank/totalAssets/one`)
    .then(data => {
      let finalCoins = data.content.coins
      let finalGems = data.content.gems

      eventCountUp('coins', finalCoins, finalCoins)
      eventCountUp('gems', finalGems, finalGems)
    })
})
