define(['jquery', 'swal'], ($, swal) => {
  let commonStyle = {
    background: 'url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/popup/confirm.png) repeat center center / contain',
    width: '100%',
    customClass: 'confirm-popup-modal',
    buttonsStyling: false,
    allowOutsideClick: false,
  }

  return {
    dialog: (content, confirmFn, cancelFn, onOpenFn) => {
      let dialogStyle = commonStyle
      dialogStyle.title = ''
      dialogStyle.html = content
      dialogStyle.showCancelButton = true
      dialogStyle.confirmButtonText = '確定'
      dialogStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-dialog'
      dialogStyle.cancelButtonText = '我再想想'
      dialogStyle.cancelButtonClass = 'confirm-popup-btn confirm-popup-btn-cancel'
      dialogStyle.swalStylereverseButtons = true
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

    gifImage: (title, content, gifImageFn) => {
      let gifStyle = commonStyle
      gifStyle.title = ''
      gifStyle.html = `
          <div class="confirm-grid-gif-container">
            <div class="header-block1">${title}</div>
            <div class="content-block1 ">${content}</div>
          </div> 
        `
      gifStyle.showCancelButton = true
      gifStyle.confirmButtonText = '我瞭解了'
      gifStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-gif'
      gifStyle.onOpen = () => {
        $('.swal2-header').remove()
      }

      return swal(gifStyle).then((result) => {
        if (result.value && gifImageFn) {
          gifImageFn()
        }
      })
    }
  }
})
