define(['swal'], (swal) => {
  return {
    dialog: (title, content, confirm, cancel) => {
      return swal({
        title: title,
        text: content,
        showCancelButton: true,
        allowOutsideClick: false,
        background: 'url(./img/popup/comfirm.png) repeat center center / contain',
        width: '100%',
        confirmButtonText: '確認',
        cancelButtonText: '再想想'
      }).then(function (result) {
        if (result.value) {
          confirm()
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          if (cancel) {
            cancel()
          }
        }
      })
    },

    confirm: (title, content, confirm) => {
      return swal({
        title: title,
        text: content,
        allowOutsideClick: false,
        background: 'url(./img/popup/comfirm.png) repeat center center / contain',
        width: '100%',
        confirmButtonText: '確認'
      }).then(confirm)
    }
  }
})
