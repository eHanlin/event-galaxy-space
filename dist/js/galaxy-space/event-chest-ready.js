'use strict';

define(['jquery', 'ajax', 'eventChestGet'], function ($, ajax, eventChestGet) {
  return function (chest) {
    var statusData = {
      status: 'READY'
    };
    ajax('PUT', '/chest/status/' + chest.id, statusData).then(eventChestGet);
  };
});