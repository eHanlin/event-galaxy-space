define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => {
  return (chest, targets) => {
    let content = `
    <div>
      <span class="gifTitle">恭喜你獲得了~</span>
    </div>
    `
    confirmPopup.ok('', content, () => {

    })
  }
})
