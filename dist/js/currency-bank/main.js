require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax'], ajax => {
      ajax('GET', `http://localhost:9090/currencyBank/transaction`)
        .then((jsonData) => {
          return jsonData.content
        })
        .then((transactions) => {
          // let retrieve = () => {
          //   for (let i = 0; i < transactions.length; i++) {
          //     let data = transactions[i]
          //     console.log(data)
          //   }
          // }
          let retrieve = () => {
            let array = {}
            for (let index in transactions) {
              let data = transactions[index]
              array.push({
                action: '123'
              })
              console.log(data)
            }
            return array
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
