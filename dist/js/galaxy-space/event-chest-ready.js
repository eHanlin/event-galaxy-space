"use strict";define(["jquery","ajax","eventChestGet","confirmPopup"],function($,ajax,eventChestGet,confirmPopup){return function(chest){ajax("PUT","/chest/status/"+chest.id,{status:"READY"}).then(function(jsonData){"Status of chest is already change"!==jsonData.message?eventChestGet():confirmPopup.ok("Oooooops！","此次寶箱操作，重複進行囉！")})}});