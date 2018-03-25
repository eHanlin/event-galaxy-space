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
        confirmButtonClass: 'confirm-popup-btn confirm-popup-btn-ok',
        cancelButtonText: '我再想想',
        cancelButtonClass: 'confirm-popup-btn confirm-popup-btn-cancel',
        reverseButtons: true,
        onOpen: () => {
          $('.swal2-header').remove()
        }
      }).then(function (result) {
        if (result.value) {
          okFn()
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          if (cancelFn) {
            cancelFn()
          }
        }
      })
    },

    confirm: (title, content, confirm) => {
      return swal({
        title: title,
        html: content,
        allowOutsideClick: false,
        background: 'url(./img/popup/confirm.png) repeat center center / contain',
        width: '100%',
        confirmButtonText: '確認'
      }).then(confirm)
    }
  }
})
