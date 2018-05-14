define(['jquery', 'ajax', 'eventChestGet', 'eventChestInspection'], ($, ajax, eventChestGet, eventChestInspection) => {
  return (chest) => {
    let statusInfo = {
      status: 'READY'
    }
    ajax('POST', `/chest/ready/${chest.id}`, statusInfo)
      .then((jsonData) => {
        if (eventChestInspection(jsonData.message, jsonData.content)) {
          return
        }
        eventChestGet()
      })
  }
})
