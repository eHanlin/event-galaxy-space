define(['jquery', 'ajax', 'confirmPopup', 'eventStatusDo'], ($, ajax, confirmPopup, eventStatusDo) => {
  return (chest, targets) => {
    confirmPopup.dialog('確定要啟動寶箱嗎？', '', () => {
      let statusData = {
        status: 'UNLOCKING'
      }
      ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
        .then(eventStatusDo.unLocking.bind(eventStatusDo.unLocking, chest, targets))
    })
  }
})
