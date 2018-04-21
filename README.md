# bilibili-comment-search
A bookmarklet help you searching for comments in the video


# Use bookmarklet

Just drag the code to your bookmark bar.

Enjoy it!

```javascript
javascript:(function()%7Blet%20oList%3Bwindow.danmaku%3D%3D%3Dvoid%200%26%26fetch(%60https%3A%2F%2Fcomment.bilibili.com%2F%60%2Bcid%2B%60.xml%60).then(c%3D%3Ec.text()).then(c%3D%3Enew%20DOMParser().parseFromString(c%2C%60text%2Fxml%60)).then(c%3D%3E%7Bwindow.danmaku%3Dc%2C0%3D%3D%3D%24(%60%23dm-query%60).length%26%26(%24(%60%23bangumi_detail%60)%5B0%5D.innerHTML%2B%3D%60%3Cbr%2F%3E%3Cdiv%20style%3D%22margin%3A1rem%22%20id%3D%22dm-query%22%20onclick%3D%22searchDm()%22%20class%3D%22bpui-component%20bpui-button%20button%22%20role%3D%22button%22%3E%3Cspan%20class%3D%22bpui-button-text%22%3E%20%E6%90%9C%20%E2%99%82%20%E7%B4%A2%20%3C%2Fspan%3E%3C%2Fdiv%3E%3Cinput%20id%3D%22dm-key%22%20type%3D%22text%22%20placeholder%3D%22%E5%85%B3%E9%94%AE%E5%AD%97%22%20style%3D%22height%3Aauto%3Bwidth%3A12rem%3Bmargin%3A1rem%22%3E%3Cspan%20id%3D%22dm-count%22%3EData%20ready!%3C%2Fspan%3E%3Cdiv%20style%3D%22margin%3A1rem%22%20id%3D%22dm-sort%22%20onclick%3D%22dmSort()%22%20class%3D%22bpui-component%20bpui-button%20button%22%20role%3D%22button%22%3E%3Cspan%20class%3D%22bpui-button-text%22%3E%E8%A7%86%E9%A2%91%E6%97%B6%E5%BA%8F%3C%2Fspan%3E%3C%2Fdiv%3E%3Cul%20id%3D%22dm-list%22%3E%3C%2Ful%3E%60)%7D)%2Cstr_pad_left%3D(c%2Ce%2Cf)%3D%3E%7Breturn(Array(f%2B1).join(e)%2Bc).slice(-f)%7D%2CsearchDm%3D()%3D%3E%7Bif(%60%60!%3D%3D%24(%60%23dm-key%60)%5B0%5D.value.trim())%7B%24(%60%23dm-sort%60)%5B0%5D.innerText%3D%60%E8%A7%86%E9%A2%91%E6%97%B6%E5%BA%8F%60%3Blet%20c%3Dwindow.danmaku.evaluate('%2F%2Fd%5Bcontains(text()%2C'%2B%24(%60%23dm-key%60)%5B0%5D.value%2B')%5D'%2Cwindow.danmaku%2Cnull%2CXPathResult.ORDERED_NODE_ITERATOR_TYPE%2Cnull)%2Ce%3Dc.iterateNext()%2Cf%3D0%3Bfor(%24(%60%23dm-list%60).children().remove()%3Be%3B)%7Blet%20g%3De.attributes%5B0%5D.nodeValue.split(%60%2C%60)%5B0%5D%3B%24(%60%23dm-list%60).append(%60%3Cli%20style%3D%22margin%3A1rem%3Bheight%3A3rem%22%20value%3D%22%60%2Bg%2B%60%22%20onclick%3D%22player.seek(%60%2B(g-1)%2B%60)%22%20class%3D%22episode-item%22%3E%3Ch5%3E%60%2BsecondsToHms(g)%2B%60%3C%2Fh5%3E%3Cp%20class%3D%22ep-title%22%20title%3D%22%60%2Be.childNodes%5B0%5D.nodeValue%2B%60%22%20style%3D%22%22%3E%60%2Be.childNodes%5B0%5D.nodeValue%2B%60%3C%2Fp%3E%3C%2Fli%3E%60)%2Cconsole.log(e.childNodes%5B0%5D.nodeValue%2Cf%2B%2B)%2Ce%3Dc.iterateNext()%7DoList%3D%24(%60%23dm-list%3Eli%60)%2C%24(%60%23dm-count%60)%5B0%5D.innerText%3Df%2B%60%E6%9D%A1%E7%BB%93%E6%9E%9C%60%7Delse%20%24(%60%23dm-count%60)%5B0%5D.innerHTML%3D%60%3Cfont%20color%3D%22red%22%3EMissing%20keywords!%3Cfont%3E%60%7D%2CsecondsToHms%3Dc%3D%3E%7Bc%3D%2Bc%3Blet%20e%3DMath.floor(c%2F3600)%2Cf%3DMath.floor(c%253600%2F60)%2Cg%3DMath.floor(c%253600%2560)%3Breturn%20str_pad_left(e%2C%600%60%2C2)%2B%60%3A%60%2Bstr_pad_left(f%2C%600%60%2C2)%2B%60%3A%60%2Bstr_pad_left(g%2C%600%60%2C2)%7D%2CdmSort%3D()%3D%3E%7Bif(%60%E8%A7%86%E9%A2%91%E6%97%B6%E5%BA%8F%60%3D%3D%3D%24(%60%23dm-sort%60)%5B0%5D.innerText)%7Blet%20c%3D%24(%60%23dm-list%3Eli%60).sort(function(e%2Cf)%7Breturn%20e.value%3D%3Df.value%3F0%3Ae.value%3Ef.value%3F1%3A-1%7D)%3B%24(%60%23dm-list%3Eli%60).remove()%2Cc.each((e%2Cf)%3D%3E%24(%60%23dm-list%60).append(f.outerHTML))%2C%24(%60%23dm-sort%60)%5B0%5D.innerText%3D%60%E5%8F%91%E9%80%81%E6%97%B6%E5%BA%8F%60%7Delse%20%24(%60%23dm-list%3Eli%60).remove()%2CoList.each((c%2Ce)%3D%3E%24(%60%23dm-list%60).append(e.outerHTML))%2C%24(%60%23dm-sort%60)%5B0%5D.innerText%3D%60%E8%A7%86%E9%A2%91%E6%97%B6%E5%BA%8F%60%7D%7D)()
```