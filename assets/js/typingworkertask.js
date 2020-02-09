var statisticsTable={statisticChar:[],statisticWord:[],statisticCharSpeed:[],statisticCharResult:[],wrongWordIndexes:[],wrongWordText:[],wrongWordHTML:"",countCharCorrect:function(t,s){this.statisticChar[t]||(this.statisticChar[t]=[]),this.statisticChar[t][s]||(this.statisticChar[t][s]=1),this.statisticChar[t][s]++,this.statisticChar[t][s]>this.mostFrequentChar&&(this.mostFrequentChar=this.statisticChar[t][s])},countCharSpeed:function(t,s,i,a){this.statisticCharSpeed[t]||(this.statisticCharSpeed[t]=[]),this.statisticCharSpeed[t][s]||(this.statisticCharSpeed[t][s]=[]),this.statisticCharSpeed[t][s].c=i,this.statisticCharSpeed[t][s].t=a},countWordCorrect:function(t,s){this.statisticWord[s]?this.statisticWord[s][1]++:(this.statisticWord[s]=[],this.statisticWord[s][0]=0,this.statisticWord[s][1]=1)},countWordIncorrect:function(t,s,i){this.wrongWordIndexes.push(t),this.wrongWordText[t]=i,this.statisticWord[s]?this.statisticWord[s][0]++:(this.statisticWord[s]=[],this.statisticWord[s][0]=1,this.statisticWord[s][1]=0)},computeCharSpeed:function(t){for(var s=[],i=[],a=[],r=0,e="",o=0,c=0,n=0,h=[],d=0;d<this.statisticCharSpeed.length;d++){a=t[d].split(""),h=this.statisticCharSpeed[d],r=a.length;for(var u=0;u<r+1;u++)h[u]?0!==d||0!==u?(e=h[u].c,n=(c=h[u].t)-o,o=c,"__"!==e&&(s[e]||(s[e]=Number.MAX_SAFE_INTEGER),s[e]>n&&(s[e]=n))):o=h[u].t:u<r&&(i[a[u]]?i[a[u]]++:i[a[u]]=1)}for(var g in s)s[g]=Math.round(6e4/(40*s[g]));this.statisticCharResult.speed=this.sortDescending(s),this.statisticCharResult.miss=this.sortDescending(i)},sortDescending:function(t){var s=[];for(var i in t)s.push([i,t[i]]);return s.sort(function(t,s){return s[1]-t[1]}),s},highlightWrongWord:function(t){for(var s=0;s<this.wrongWordIndexes.length;s++){var i=this.wrongWordIndexes[s],a=t[i];t[i]='<span class="mt-miss-word" data-toggle="tooltip_wrong_word" title="'+this.wrongWordText[i]+'">'+a+"</span>"}this.wrongWordHTML=t.join(" ")},reset:function(){this.mostFrequentChar=0,this.statisticChar=[],this.statisticWord=[],this.statisticCharSpeed=[],this.statisticCharResult=[],this.wrongWordIndexes=[],this.wrongWordText=[],this.wrongWordHTML=""}};function returnSuccess(t){postMessage({success:t})}function getAttr(t){try{if(t.data&&t.data.attr)if("string"==typeof t.data.attr||t.data.attr instanceof String)postMessage({data:statisticsTable[t.data.attr]});else if(Array.isArray(t.data.attr)){var s=[];t.data.attr.forEach(function(t){s[t]=statisticsTable[t]}),postMessage({data:s})}}catch(t){postMessage({error:JSON.stringify(t)})}}onmessage=function(t){try{switch(t.data.action){case"get":getAttr(t);break;case"stat":statisticsTable[t.data.function].apply(statisticsTable,t.data.params);break;case"guide":typingGuide[t.data.function].apply(typingGuide,t.data.params);break;case"reset":statisticsTable.reset(),returnSuccess(!0)}}catch(t){postMessage({error:JSON.stringify(t)})}};var typingGuide={currentLayout:[],collator:new Intl.Collator("co",{sensitivity:"base"}),setCurrentLayout:function(t,s){this.currentLayout=t},findIndex:function(t){try{for(var s=!1,i=0;i<this.currentLayout.length;i++){var a=this.currentLayout[i];if(-1!==a.indexOf("<br>")){var r=a.split("<br>");if(0===this.collator.compare(r[0],t)||0===this.collator.compare(r[1],t)){s=!0,postMessage({data:i});break}}else if(0===this.collator.compare(a,t)){s=!0,postMessage({data:i});break}}s||postMessage({data:-1})}catch(t){postMessage({error:JSON.stringify(t)})}}};