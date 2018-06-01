"use strict";define(["jquery","ajax","confirmPopup","eventChestInspection","eventAwardAreZero"],function(n,s,e,t,c){return function(i,a){s("POST","/chest/open/"+i.id).then(function(o){var l,g=o.content,p=g.finalCoins,r=g.finalGems,m=g.coins?g.coins:0,d=g.gems?g.gems:0,v=g.gainAwardId,f=g.gainAward,x=g.luckyBag,u="",h="",w="",k="";if(!t(o.message,o.content)&&!c(o.message,o.content)){v?(u='<span class="gif-title">'+f+"</span>",w='\n            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">\n            <span>'+m+'</span>\n            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">\n            <span>'+d+"</span>\n          ",k='<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/'+v+'.png">'):k='\n            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">\n            <span class="coins-lg">'+m+'</span>\n            <br/>\n            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">\n            <span class="gems-lg">'+d+"</span>\n          ",l='\n          <div class="open-confirm-grid-container">\n            <div class="open-text-block1">\n              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest'+i.level+'.gif">\n            </div>\n            <div class="open-text-block2">恭喜你獲得了\n              <span class="gif-title">'+u+'</span>\n            </div>\n            <div class="open-text-block3">\n              '+w+'\n            </div>\n            <div class="open-text-block4">\n              '+k+"\n            </div>\n          </div>\n        ";var y=function(s,e){require(["eventCountUp"],function(t){a.readyBtn.css("display","none"),a.platformChest.remove(),t("coins",parseInt(n("#coins").text()),s),t("gems",parseInt(n("#gems").text()),e)})};v&&!1===x?e.dialog(l,function(){y(p,r),window.open("https://test.ehanlin.com.tw/Events/winner_info.html?id=space","winner_info")},y.bind(y,p,r),function(){},"回填領獎","我瞭解了"):(!0===x&&(h="打開福袋"),e.ok("",l,function(){!0===x?s("POST","/chest/award/luckyBag/"+i.id,{awardId:v,chestId:i.id,level:i.level}).then(function(n){var s,t,c,i,a,o=n.content;if("Lucky bag is already opened"!==n.message){s=o.coins,t=o.gems,c=o.finalCoins,i=o.finalGems,a='\n                    <div class="lucky-bag">\n                      <span>福袋打開囉，得到 </span>\n                      <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">\n                      <span>'+s+'</span>\n                      <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">\n                      <span>'+t+"</span>\n                    </div>\n                  ";var l='<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/'+v+'.png">';e.luckyBagImage(a,l,y.bind(y,c,i))}else e.ok("Oooooops！","福袋已經開啟過囉！")}):y(p,r)},h))}})}});