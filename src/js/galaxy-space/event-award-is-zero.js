define(['jquery', 'confirmPopup'], ($, confirmPopup) => {
  confirmPopup.awardIsZeroDialog('禮物贈完', '剩下的寶箱幫你拿去當鋪了！', () => {
    $('.shining-block').show()
    for (let index = 1; index < 21; index++) {
      $('.shining-block .shining-coins')
        .append(`<img class="coins${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/coinGif.gif">`)
    }
    for (let index = 1; index < 13; index++) {
      $('.shining-block .shining-gems')
        .append(`<img class="gems${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/gemGif.gif">`)
    }
  })
})
