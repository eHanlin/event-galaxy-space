define(['jquery'], $ => {
  $(() => {
    $('.fb').on('click', () => {
      window.open('https://www.facebook.com/ehanlin.com.tw/', 'ehanlinFB')
      return false
    })
    $('.line').on('click', () => {
      window.open('https://line.me/R/ti/p/MtsRQz_Hn5', 'ehanlinLine')
      return false
    })
    $('.logo').on('click', () => {
      window.open('/index.html', 'ehanlin')
      return false
    })
    $('.myClass').on('click', () => {
      window.open('/my/owned/Courses.html', 'myClass')
      return false
    })
    $('.myClass').on('click', () => {
      window.open('/my/owned/Courses.html', 'myClass')
      return false
    })
    $('.free').on('click', () => {
      window.open('/type/TRIAL/SalesPlans.html', 'free')
      return false
    })
  })
})
