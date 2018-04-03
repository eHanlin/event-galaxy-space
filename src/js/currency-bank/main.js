require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax', 'moment', 'momentLocales'], (ajax, moment, momentLocales) => {
      ajax('GET', `/currencyBank/transaction`)
        .then((jsonData) => {
          let transactions = jsonData.content
          $('#table').bootstrapTable({
            data: transactions,
            striped: true,
            pageSize: 15,
            pageList: [15],
            pagination: true
          })
        })
    })
  })
})
