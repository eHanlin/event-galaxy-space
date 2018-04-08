define(() => {
  return (chest, targets) => {
    /* requireJs進來，click後綁定自己將參數(chest, targets)傳入 */
    /* 啟動按鈕 */
    require(['eventChestStart'], eventChestStart => {
      // targets.startBtn.off('click')
      targets.startBtn.one('click', eventChestStart.bind(eventChestStart, chest, targets))
    })

    /* 立即開啟按鈕 */
    require(['eventChestOpenNow'], eventChestOpenNow => {
      // targets.openNowBtn.off('click')
      targets.openNowBtn.one('click', eventChestOpenNow.ask.bind(eventChestOpenNow.ask, chest, targets))
    })

    /* 升級按鈕 */
    require(['eventChestUpgrade'], eventChestUpgrade => {
      // targets.upgradeBtn.off('click')
      targets.upgradeBtn.one('click', eventChestUpgrade.ask.bind(eventChestUpgrade.ask, chest, targets))
    })

    /* 開啟寶箱 */
    require(['eventChestOpen'], eventChestOpen => {
      // targets.readyBtn.off('click')
      targets.readyBtn.one('click', eventChestOpen.bind(eventChestOpen, chest, targets))
    })
  }
})