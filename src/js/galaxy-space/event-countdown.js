define(['jquery'], $ => {
  return {
    countdownFunc: (seconds, countdownTarget, chestImg) => {
      require(['jqueryCountDown'], jqueryCountDown => {
        countdownTarget.countDown({
          timeInSecond: 2,
          displayTpl: '{hour}時{minute}分{second}秒',
          limit: 'hour',
          // 倒數計時完 callback
          callback: (event) => {
            countdownTarget.css('display', 'none')
            chestImg.remove()
          }
        })
      })
    }
  }
})
