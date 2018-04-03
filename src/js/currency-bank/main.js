require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax', 'moment', 'momentLocales'], (ajax, moment, momentLocales) => {
      ajax('GET', `/currencyBank/transaction`)
        .then((jsonData) => {
          return jsonData.content
        })
        .then((transactions) => {
          let retrieve = () => {
            let index
            for (index in transactions) {
              let transaction = transactions[index]
              let field
              for (field in transaction) {
                if (field === 'updateTime') {

                } else if (field === 'currencyQuantity') {
                  transaction['coins'] = transaction[field].coins ? transaction[field].coins : 0
                  transaction['gems'] = transaction[field].gems ? transaction[field].gems : 0
                } else if (field === 'action') {
                  if (transaction[field].indexOf('ADD') > 0) {
                    transaction[field] = '增加'
                  } else {
                    transaction[field] = '消耗'
                  }
                }
              }
            }
            return transactions
          }

          $('#table').bootstrapTable({
            data: retrieve(),
            striped: true,
            pageSize: 15,
            pageList: [15],
            pagination: true
          })
        })
    })
  })
})
