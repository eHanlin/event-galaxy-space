define(['jquery', 'swal'], ($, swal) => {
  let commonStyle = {
    background: 'url(https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/popup/confirm.png) repeat center center / contain',
    width: '100%',
    customClass: 'confirm-popup-modal',
    buttonsStyling: false,
    allowOutsideClick: false
  }

  let cloneCommonStyle = function (commonStyle) {
    let newStyle = {}
    let attr
    for (attr in commonStyle) {
      newStyle[attr] = commonStyle[attr]
    }
    return newStyle
  }

  return {
    dialog: (content, confirmFn, cancelFn, onOpenFn, confirmBtnText, cancelBtnText) => {
      let dialogStyle = cloneCommonStyle(commonStyle)
      dialogStyle.title = ''
      dialogStyle.html = content
      dialogStyle.showCancelButton = true
      dialogStyle.confirmButtonText = confirmBtnText ? confirmBtnText : '確定'
      dialogStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-dialog'
      dialogStyle.cancelButtonText = cancelBtnText ? cancelBtnText : '我再想想'
      dialogStyle.cancelButtonClass = 'confirm-popup-btn confirm-popup-btn-cancel'
      dialogStyle.reverseButtons = true
      dialogStyle.onOpen = () => {
        $('.swal2-header').remove()
        if (onOpenFn) {
          onOpenFn()
        }
      }

      return swal(dialogStyle).then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        } else if (result.dismiss === swal.DismissReason.cancel) {
          if (cancelFn) {
            cancelFn()
          }
        }
      })
    },

    image: (title, content, gifImageFn, buttonText) => {
      let gifStyle = cloneCommonStyle(commonStyle)
      gifStyle.title = ''
      gifStyle.html = `
          <div class="confirm-grid-gif-container">
            <div class="header-block1">${title}</div>
            <div class="content-block1 ">${content}</div>
          </div> 
        `
      gifStyle.confirmButtonText = buttonText ? buttonText : '我瞭解了'
      gifStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-gif'
      gifStyle.onOpen = () => {
        $('.swal2-header').remove()
      }

      return swal(gifStyle).then((result) => {
        if (result.value && gifImageFn) {
          gifImageFn()
        }
      })
    },

    ok: (title, content, okFn, buttonText) => {
      let okStyle = cloneCommonStyle(commonStyle)
      okStyle.title = `<span style="color: #217dbb;">${title}</span>`
      okStyle.html = `<div style="font-weight: bolder">${content}</div>`
      okStyle.confirmButtonText = buttonText ? buttonText : '我瞭解了'
      okStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-ok'

      return swal(okStyle).then((result) => {
        if (result.value && okFn) {
          okFn()
        }
      })
    }
  }
})
