# bilibili-comment-search
A bookmarklet help you searching for comments in the video


# Use bookmarklet

Just drag the code to your bookmark bar.

Enjoy it!

```javascript
javascript:let oList;window.danmaku===void 0&&fetch('https://comment.bilibili.com/'+cid+'.xml').then(c=>c.text()).then(c=>new window.DOMParser().parseFromString(c,'text/xml')).then(c=>{window.danmaku=c,0===$('#dm-query').length&&($('#bangumi_detail')[0].innerHTML+='<br/><div style="margin:1rem" id="dm-query" onclick="searchDm()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text"> \u641C \u2642 \u7D22 </span></div><input id="dm-key" type="text" placeholder="\u5173\u952E\u5B57" style="height:auto;width:12rem;margin:1rem"><span id="dm-count">Data ready!</span><div style="margin:1rem" id="dm-sort" onclick="dmSort()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">\u89C6\u9891\u65F6\u5E8F</span></div><ul id="dm-list"></ul>')}),str_pad_left=(c,e,f)=>{return(Array(f+1).join(e)+c).slice(-f)},searchDm=()=>{if(''!==$('#dm-key')[0].value.trim()){$('#dm-sort')[0].innerText='\u89C6\u9891\u65F6\u5E8F';let c=window.danmaku.evaluate('//d[contains(text(),\''+$('#dm-key')[0].value+'\')]',window.danmaku,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null),e=c.iterateNext(),f=0;for($('#dm-list').children().remove();e;){let g=e.attributes[0].nodeValue.split(',')[0];$('#dm-list').append('<li style="margin:1rem;height:3rem" value="'+g+'" onclick="player.seek('+(g-1)+')" class="episode-item"><h5>'+secondsToHms(g)+'</h5><p class="ep-title" title="'+e.childNodes[0].nodeValue+'" style="">'+e.childNodes[0].nodeValue+'</p></li>'),console.log(e.childNodes[0].nodeValue,f++),e=c.iterateNext()}oList=$('#dm-list>li'),$('#dm-count')[0].innerText=f+'\u6761\u7ED3\u679C'}else $('#dm-count')[0].innerHTML='<font color="red">Missing keywords!<font>'},secondsToHms=c=>{c=+c;let e=Math.floor(c/3600),f=Math.floor(c%3600/60),g=Math.floor(c%3600%60);return str_pad_left(e,'0',2)+':'+str_pad_left(f,'0',2)+':'+str_pad_left(g,'0',2)},dmSort=()=>{if('\u89C6\u9891\u65F6\u5E8F'===$('#dm-sort')[0].innerText){let c=$('#dm-list>li').sort(function(e,f){return e.value==f.value?0:e.value>f.value?1:-1});$('#dm-list>li').remove(),c.each((e,f)=>$('#dm-list').append(f.outerHTML)),$('#dm-sort')[0].innerText='\u53D1\u9001\u65F6\u5E8F'}else $('#dm-list>li').remove(),oList.each((c,e)=>$('#dm-list').append(e.outerHTML)),$('#dm-sort')[0].innerText='\u89C6\u9891\u65F6\u5E8F'};
```
