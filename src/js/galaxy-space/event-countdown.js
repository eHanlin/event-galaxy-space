define(['jquery', 'jqueryCountDown'], ($, jqueryCountDown) => {
  return (seconds, chest, targets, callback) => {
    targets.countdown.countDown({
      timeInSecond: 4,
      displayTpl: '{hour}時 {minute}分 {second}秒',
      limit: 'hour',
      // 倒數計時完 callback
      callback: callback.bind(callback, chest, targets)
    })
  }
})
