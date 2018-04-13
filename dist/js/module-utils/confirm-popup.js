'use strict';

define(['jquery', 'swal'], function ($, swal) {
  var commonStyle = {
    background: 'url(https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/popup/confirm.png) repeat center center / contain',
    width: '100%',
    customClass: 'confirm-popup-modal',
    buttonsStyling: false,
    allowOutsideClick: false
  };

  var cloneCommonStyle = function cloneCommonStyle(commonStyle) {
    var newStyle = {};
    var attr = void 0;
    for (attr in commonStyle) {
      newStyle[attr] = commonStyle[attr];
    }
    return newStyle;
  };

  return {
    dialog: function dialog(content, confirmFn, cancelFn, onOpenFn, confirmBtnText, cancelBtnText) {
      var dialogStyle = cloneCommonStyle(commonStyle);
      dialogStyle.title = '';
      dialogStyle.html = content;
      dialogStyle.showCancelButton = true;
      dialogStyle.confirmButtonText = confirmBtnText ? confirmBtnText : '確定';
      dialogStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-dialog';
      dialogStyle.cancelButtonText = cancelBtnText ? cancelBtnText : '我再想想';
      dialogStyle.cancelButtonClass = 'confirm-popup-btn confirm-popup-btn-cancel';
      dialogStyle.reverseButtons = true;
      dialogStyle.onOpen = function () {
        $('.swal2-header').remove();
        if (onOpenFn) {
          onOpenFn();
        }
      };

      return swal(dialogStyle).then(function (result) {
        if (result.value && confirmFn) {
          confirmFn();
        } else if (result.dismiss === swal.DismissReason.cancel) {
          if (cancelFn) {
            cancelFn();
          }
        }
      });
    },

    image: function image(title, content, gifImageFn, buttonText) {
      var gifStyle = cloneCommonStyle(commonStyle);
      gifStyle.title = '';
      gifStyle.html = '\n          <div class="confirm-grid-gif-container">\n            <div class="header-block1">' + title + '</div>\n            <div class="content-block1 ">' + content + '</div>\n          </div> \n        ';
      gifStyle.confirmButtonText = buttonText ? buttonText : '我瞭解了';
      gifStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-gif';
      gifStyle.onOpen = function () {
        $('.swal2-header').remove();
      };

      return swal(gifStyle).then(function (result) {
        if (result.value && gifImageFn) {
          gifImageFn();
        }
      });
    },

    ok: function ok(title, content, okFn, buttonText) {
      var okStyle = cloneCommonStyle(commonStyle);
      okStyle.title = '<span style="color: #217dbb;">' + title + '</span>';
      okStyle.html = '<div style="font-weight: bolder">' + content + '</div>';
      okStyle.confirmButtonText = buttonText ? buttonText : '我瞭解了';
      okStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-ok';

      return swal(okStyle).then(function (result) {
        if (result.value && okFn) {
          okFn();
        }
      });
    }
  };
});