"use strict";define(["jquery","ajax","confirmPopup"],function($,ajax,confirmPopup){return function(chest,targets){ajax("PUT","/chest/open/"+chest.id,{status:"OPEN"}).then(function(jsonData){var content,jsonContent=jsonData.content,finalCoins=jsonContent.finalCoins,finalGems=jsonContent.finalGems,gainCoins=jsonContent.coins?jsonContent.coins:0,gainGems=jsonContent.gems?jsonContent.gems:0,gainAwardId=jsonContent.gainAwardId,gainAward=jsonContent.gainAward,luckyBag=jsonContent.luckyBag,awardTitle="",openLuckyBagBtn="",openTextBlock3="",openTextBlock4="";if(function(message,targets){var isNormallyOpen=!0;return"Chest is already opened"===message?(confirmPopup.ok("Oooooops！","此寶箱已經開啟過囉！"),targets.readyBtn.css("display","none"),targets.platformChest.remove(),isNormallyOpen=!1):"寶箱正在運作中"===message&&(confirmPopup.ok("Oooooops！","寶箱正在運作中，請重新整理網頁"),isNormallyOpen=!1),isNormallyOpen}(jsonData.message,targets)){gainAwardId?(awardTitle='<span class="gif-title">'+gainAward+"</span>",openTextBlock3='\n            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n            <span>'+gainCoins+'</span>\n            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n            <span>'+gainGems+"</span>\n          ",openTextBlock4='<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/'+gainAwardId+'.png">'):openTextBlock4='\n            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n            <span class="coins-lg">'+gainCoins+'</span>\n            <br/>\n            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n            <span class="gems-lg">'+gainGems+"</span>\n          ",content='\n          <div class="open-confirm-grid-container">\n            <div class="open-text-block1">\n              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/chest/open/openChest'+chest.level+'.gif">\n            </div>\n            <div class="open-text-block2">恭喜你獲得了\n              <span class="gif-title">'+awardTitle+'</span>\n            </div>\n            <div class="open-text-block3">\n              '+openTextBlock3+'\n            </div>\n            <div class="open-text-block4">\n              '+openTextBlock4+"\n            </div>\n          </div>\n        ";var afterOpen=function(finalCoins,finalGems){require(["eventCountUp"],function(eventCountUp){targets.readyBtn.css("display","none"),targets.platformChest.remove(),eventCountUp("coins",$("#coins").text(),finalCoins),eventCountUp("gems",$("#gems").text(),finalGems)})};gainAwardId&&!1===luckyBag?confirmPopup.dialog(content,function(){afterOpen(finalCoins,finalGems),window.open("https://test.ehanlin.com.tw/Events/winner_info.html?id=space","winner_info")},afterOpen.bind(afterOpen,finalCoins,finalGems),function(){},"回填領獎","我瞭解了"):(!0===luckyBag&&(openLuckyBagBtn="打開福袋"),confirmPopup.ok("",content,function(){!0===luckyBag?ajax("PUT","/chest/award/luckyBag",{awardId:gainAwardId,chestId:chest.id,level:chest.level}).then(function(jsonData){var gainCoins,gainGems,finalCoins,finalGems,title,jsonContent=jsonData.content;if("Lucky bag is already opened"!==jsonData.message){gainCoins=jsonContent.coins,gainGems=jsonContent.gems,finalCoins=jsonContent.finalCoins,finalGems=jsonContent.finalGems,title='\n                    <div class="lucky-bag">\n                      <span>福袋打開囉，得到 </span>\n                      <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/coin.svg">\n                      <span>'+gainCoins+'</span>\n                      <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/gem.svg">\n                      <span>'+gainGems+"</span>\n                    </div>\n                  ";var bagImage='<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/'+gainAwardId+'.png">';confirmPopup.image(title,bagImage,afterOpen.bind(afterOpen,finalCoins,finalGems))}else confirmPopup.ok("Oooooops！","福袋已經開啟過囉！")}):afterOpen(finalCoins,finalGems)},openLuckyBagBtn))}})}});