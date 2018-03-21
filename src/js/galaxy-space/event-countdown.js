define(['jquery'], $ => {
  return {
    countdownFunc: (seconds, chest, targets) => {
      console.log('countDown')
      require(['jqueryCountDown'], jqueryCountDown => {
        console.log('countDown')
        targets.countdown.countDown({
          timeInSecond: 200,
          displayTpl: '{hour}時{minute}分{second}秒',
          limit: 'hour',
          // 倒數計時完 callback
          callback: (event) => {
            targets.countdown.css('display', 'none')
            targets.readyBtn.removeAttr('style')
            targets.platformChest.removeAttr('style')
            targets.platformChest.attr('data-status', 'READY')
            targets.platformChest.attr('src', `./img/chest/readyChest${chest.level}.png`)
          }
        })
      })
    }
  }
})
