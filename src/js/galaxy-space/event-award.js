define(['jquery'], $ => {
  require(['ajax'], ajax => {
    ajax('GET', 'http://127.0.0.1:8080/chest/award')
    .then((data) => {
      console.log(data)
    })
  })
})
