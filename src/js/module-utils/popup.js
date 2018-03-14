define(() => {
  return {
    confirm: (title, content, confirmFn) => {
      return {
        title: '<h5>' + title + '</h5>',
        content: '<span style=\'font-size: 20px\'>' + content + '</span>',
        useBootstrap: false,
        buttons: {
          cancelButton: {
            text: '再想想',
            btnClass: 'btn-blue'
          },
          confirmButton: {
            text: '確認',
            btnClass: 'btn-blue',
            action: confirmFn
          }
        }
      }
    },

    alert: (title, content, confirmFn) => {
      if (!confirmFn) {
        confirmFn = () => {}
      }

      return {
        title: title,
        content: content,
        boxWidth: '800px',
        useBootstrap: false,
        buttons: {
          confirmButton: {
            text: '!!!!',
            btnClass: 'btn-blue',
            action: confirmFn
          }
        }
      }
    }
  }
})
