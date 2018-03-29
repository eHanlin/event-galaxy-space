require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax'], ajax => {
      ajax('GET', 'https://test.ehanlin.com.tw/currencyBank/transaction')
        .then((jsonData) => {
          return jsonData.content
        })
        .then((transactions) => {
          $('#table').bootstrapTable({
            data: transactions,
            striped: true,
            pageSize: 5,
            pagination: true
          })

          $('section .fixed-table-container').css({
            border: 0
          })
        })
    })
  })
})
