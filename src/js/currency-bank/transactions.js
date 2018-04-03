$(() => {
  moment.locale('zh-tw')
  ajax('GET', `http://localhost:9090/currencyBank/transaction`)
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
            let updateTime
            let formatTime
            if (field === 'updateTime') {
              updateTime = transaction[field]
              updateTime = new Date(Date.parse(updateTime))
              formatTime = moment(updateTime.toString()).format('dddd')
              console.log(formatTime)
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
