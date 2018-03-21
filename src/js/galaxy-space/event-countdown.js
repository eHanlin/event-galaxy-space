define(['jquery', 'jqueryCountDown', 'eventChestReady'],
  ($, jqueryCountDown, eventChestReady) => {
    return (seconds, chest, targets) => {
      targets.countdown.countDown({
        timeInSecond: 3,
        displayTpl: '{hour}時{minute}分{second}秒',
        limit: 'hour',
        // 倒數計時完 callback
        callback: eventChestReady.bind(eventChestReady, chest, targets)
      })
    }
  })
