define(['jquery'], $ => {
  require(['ajax'], ajax => {
    ajax('GET', 'http://127.0.0.1:8080/chest/award')
      .then((data) => {
        let index = 0
        let awards = data.content
        console.log(awards)

        for (let award in awards) {
          let awardId = award.split('#')[0]
          let value = awards[award]
          console.log(awardId)
          console.log(value)

          $('.award-box .block1:eq('index')')
        }
      })
  })
})
