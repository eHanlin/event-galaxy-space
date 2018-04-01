define(['jquery', 'ajax', 'eventChestGet'], ($, ajax, eventChestGet) => {
  return (chest) => {
    let statusData = {
      status: 'READY'
    }
    ajax('PUT', `/chest/status/${chest.id}`, statusData)
      .then(eventChestGet)
  }
})
