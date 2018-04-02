require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax'], ajax => {
      ajax('GET', `http://localhost:9090/currencyBank/transaction`)
        .then((jsonData) => {
          return jsonData.content
        })
        .then(() => {
          let transactions = () => {
            let data = []
            for (let i = 0; i < transactions.length; i++) {
              data.push({
                action: '123'
              })
            }
            return data
          }
          $('#table').bootstrapTable({
            data: transactions(),
            striped: true,
            pageSize: 15,
            pageList: [15],
            pagination: true
          })

          $('section .fixed-table-container').css({
            border: 0
          })
        })
    })
  })
})
