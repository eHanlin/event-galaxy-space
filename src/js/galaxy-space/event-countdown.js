define(['jquery'], $ => {
  return {
    countdownFunc: (seconds, chest, targets) => {
      console.log('countDown')
      require(['jqueryCountDown'], jqueryCountDown => {
        console.log('countDown')
        targets.chest.countDown({
          timeInSecond: 10,
          displayTpl: '{hour}時{minute}分{second}秒',
          limit: 'hour',
          // 倒數計時完 callback
          callback: (event) => {
            targets.countdown.css('display', 'none')
            targets.readyBtn.removeAttr('style')
            targets.chest.removeAttr('style')
            targets.chest.attr('data-status', 'READY')
            targets.chest.attr('src', `./img/chest/readyChest${chest.level}.png`)
          }
        })
      })
    }
  }
})
