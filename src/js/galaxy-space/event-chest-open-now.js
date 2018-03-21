define(['jquery', 'ajax', 'popup', 'eventStatusDo'], ($, ajax, popup, eventStatusDo) => {
  return (chest, targets) => {
    popup.dialog('確定要立即開啟寶箱嗎？', '', () => {
      let statusData = {
        status: 'OPEN'
      }
      ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
        .then(eventStatusDo.open.bind(eventStatusDo.open, chest, targets))
    })
  }
})
