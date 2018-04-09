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
    $('.my-class').on('click', () => {
      window.open('/my/owned/Courses.html', 'myClass')
      return false
    })
    $('.free').on('click', () => {
      window.open('/type/TRIAL/SalesPlans.html', 'free')
      return false
    })
    $('.return-btn').on('click', () => {
      window.open('/Events/winner_info.html?id=space', 'returnAward')
      return false
    })
    $('.shareBtn').on('click', () => {
      window.open('https://docs.google.com/forms/d/1UywZQWyOc4XMPIfFKs8I2UpCa30dRXX164LYNs7zwss/', 'share')
      return false
    })
    $('.activity').on('click', () => {
      window.open('/event/space/activity-notice.html', 'activity')
      return false
    })
    $('.bank').on('click', () => {
      window.open('/event/space/currency-bank.html', 'ehanlinBank')
      return false
    })
  })
})
