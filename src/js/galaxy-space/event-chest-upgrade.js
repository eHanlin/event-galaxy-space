define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    /* 寶箱升級 */
    $(`.platform-${platformColor} .upgrade-btn`).on('click', event => {
      popup.dialog('確定要升級寶箱嗎？', '', () => {
        let putData = {
          level: chestLevel + 1
        }
        require(['ajax'], ajax => {
          ajax('PUT', `http://localhost:8080/chest/upgrade/${chestId}`, putData)
            .then((data) => {
              console.log(data)
              ajax('GET', 'http://localhost:9090/currencyBank/totalAssets/one')
                .then(data => {
                  console.log(data)
                })
            })
        })
      })
    })
  })
})
