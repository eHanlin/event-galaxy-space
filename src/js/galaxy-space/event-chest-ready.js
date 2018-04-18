define(['jquery', 'ajax', 'eventChestGet', 'confirmPopup'], ($, ajax, eventChestGet, confirmPopup) => {
  return (chest) => {
    let statusData = {
      status: 'READY'
    }
    ajax('PUT', `/chest/status/${chest.id}`, statusData)
      .then((jsonData) => {
        if (jsonData.message === 'Status of chest is already change') {
          confirmPopup.ok('Oooooops！', '此次寶箱操作，重複進行囉！')
          return
        }

        eventChestGet()
      })
  }
})
