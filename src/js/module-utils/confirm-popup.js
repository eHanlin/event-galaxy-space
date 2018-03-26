define(['jquery', 'swal'], ($, swal) => {
  return {
    dialog: (content, okFn, cancelFn) => {
      return swal({
        title: '',
        html: content,
        showCancelButton: true,
        allowOutsideClick: false,
        background: 'url(./img/popup/confirm.png) repeat center center / contain',
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
        title: title,
        html: `<span class="confirm-popup-content">${content}</span>`,
        allowOutsideClick: false,
        background: 'url(./img/popup/confirm.png) repeat center center / contain',
        width: '100%',
        customClass: 'confirm-popup-modal',
        buttonsStyling: false,
        confirmButtonText: '我瞭解了',
        confirmButtonClass: 'confirm-popup-btn confirm-popup-btn-ok'
      }).then((result) => {
        if (result.value && okFn) {
          okFn()
        }
      })
    },

    startDialog: (content, okFn, cancelFn) => {
      return swal({
        html: content,
        showCancelButton: true,
        allowOutsideClick: false,
        background: 'url(./img/popup/confirm.png) repeat center center / contain',
        width: '100%',
        customClass: 'confirm-popup-modal',
        buttonsStyling: false,
        confirmButtonText: '確定',
        confirmButtonClass: 'confirm-popup-btn confirm-popup-btn-dialog',
        cancelButtonText: '我再想想',
        cancelButtonClass: 'confirm-popup-btn confirm-popup-btn-cancel',
        reverseButtons: true,
        onOpen: () => {
          console.log('onOpen()')
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
    }
  }
})
