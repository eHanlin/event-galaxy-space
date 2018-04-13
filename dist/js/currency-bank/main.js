'use strict';

require(['config'], function () {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], function ($) {
    require(['ajax', 'moment', 'momentLocales'], function (ajax, moment, momentLocales) {
      ajax('GET', '/currencyBank/transaction').then(function (jsonData) {
        var transactions = jsonData.content;
        $('#table').bootstrapTable({
          data: transactions,
          striped: true,
          pageSize: 15,
          pageList: [15],
          pagination: true
        });
      });
    });
  });
});