define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo'], ($, ajax, confirmPopup, eventStatusDo) => {
  return (chest, targets) => {
    let content = `
    <div class="start-confirm-grid-container">
        <div class="content-block1">
          <span class="content-text1">寶箱準備啟動中...</span>
        </div>
        <div class="content-block2">
          <span class="content-text2">目前寶箱等級為Lv1，開啟這個寶箱可能獲得</span>
        </div>

        <div class="content-block3">
          <div class="img-block1">
            <img class="left-btn" src="./img/previous.png">
          </div>
          <div class="img-block2">
            <img class="img-award1" src="./img/award/award01.png">
          </div>
          <div class="img-block3">
            <img class="img-award2" src="./img/award/award02.png">
          </div>
          <div class="img-block4">
            <img class="img-award3" src="./img/award/award03.png">
          </div>
          <div class="img-block5">
            <img class="img-award4" src="./img/award/award04.png">
          </div>
          <div class="img-block6">
            <img class="img-award5" src="./img/award/award05.png">
          </div>
          <div class="img-block7">
            <img class="right-btn" src="./img/next.png">
          </div>
        </div>

        <div class="content-block4">
          <span class="content-text3">你確定要啟動這個寶箱嗎？</span>
        </div>
    </div>`

    confirmPopup.dialog(content, () => {
      let statusData = {
        status: 'UNLOCKING'
      }
      ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
        .then(eventStatusDo.unLocking.bind(eventStatusDo.unLocking, chest, targets))
    }, () => { /* 取消 */ })
  }
})
