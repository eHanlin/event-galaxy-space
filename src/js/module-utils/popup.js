define(['swal'], (swal) => {
  return {
    confirm: (title, content, confirmFn) => {
      if (!confirmFn) {
        confirmFn = () => {}
      }

      return swal({
        title: title,
        text: content,
        showCancelButton: true,
        allowOutsideClick: false,
        width: '100%',
        confirmButtonText: '確認',
        cancelButtonText: '再想想'
      }).then(confirmFn)
    }
  }
})
