define(['jquery', 'swal'], ($, swal) => {
  return {
    dialog: (content, okFn, cancelFn, onOpenFn) => {
      return swal({
        title: '',
        html: content,
        showCancelButton: true,
        allowOutsideClick: false,
        background: 'url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/popup/confirm.png) repeat center center / contain',
        width: '100%',
        customClass: 'confirm-popup-modal',
        buttonsStyling: false,
        confirmButtonText: '確定',
        confirmButtonClass: 'confirm-popup-btn confirm-popup-btn-dialog',
        cancelButtonText: '我再想想',
        cancelButtonClass: 'confirm-popup-btn confirm-popup-btn-cancel',
        reverseButtons: true,
        onOpen: () => {
          $('.swal2-header').remove()
          if (onOpenFn) {
            onOpenFn()
          }
        }
      }).then((result) => {
        if (result.value && okFn) {
          okFn()
        } else if (result.dismiss === swal.DismissReason.cancel) {
          if (cancelFn) {
            cancelFn()
          }
        }
      })
    },

    ok: (title, content, okFn) => {
      return swal({
        title: ``,
        html: `
          <div class="confirm-grid-ok-container">
            <div class="header-block1">${title}</div>
            <div class="content-block1 ">${content}</div>
          </div> 
        `,
        allowOutsideClick: false,
        background: 'url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/popup/confirm.png) repeat center center / contain',
        width: '100%',
        customClass: 'confirm-popup-modal',
        buttonsStyling: false,
        confirmButtonText: '我瞭解了',
        confirmButtonClass: 'confirm-popup-btn confirm-popup-btn-ok',
        onOpen: () => {
          $('.swal2-header').remove()
        }
      }).then((result) => {
        if (result.value && okFn) {
          okFn()
        }
      })
    }
  }
})
