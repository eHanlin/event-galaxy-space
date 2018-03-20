define(['jquery'], $ => {
  return {
    countdownFunc: (seconds, platformTarget, countdownTarget, readyBtnTarget, chestLevel, platformColor) => {
      require(['jqueryCountDown'], jqueryCountDown => {
        countdownTarget.countDown({
          timeInSecond: 10,
          displayTpl: '{hour}時{minute}分{second}秒',
          limit: 'hour',
          // 倒數計時完 callback
          callback: (event) => {
            countdownTarget.css('display', 'none')
            readyBtnTarget.removeAttr('style')
            $(`.platform-${platformColor} .chest${chestLevel}`).removeAttr('style')
            $(`.platform-${platformColor} .chest${chestLevel}`).attr('data-status', 'READY')
            $(`.platform-${platformColor} .chest${chestLevel}`).attr('src', `./img/chest/readyChest${chestLevel}.png`)
          }
        })
      })
    }
  }
})
