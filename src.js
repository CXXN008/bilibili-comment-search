let oList
dmLoad = () => fetch(`https://comment.bilibili.com/` + cid + `.xml`).then(d => d.text()).then(s => new DOMParser().parseFromString(s, `text/xml`)).then(x => window.danmaku = x)

str_pad_left = (s, p, l) => {
  return (new Array(l + 1).join(p) + s).slice(-l)
}

searchDm = () => {
  if ($(`#dm-key`)[0].value.trim() !== ``) {
    $(`#dm-sort`)[0].innerText = `视频时序`
    let nodes = window.danmaku.evaluate("//d[contains(text(),'" + $(`#dm-key`)[0].value + "')]", window.danmaku, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    let result = nodes.iterateNext()
    let count = 0
    $(`#dm-list`).children().remove()
    while(result){
      let time = result.attributes[0].nodeValue.split(`,`)[0]
      $(`#dm-list`).append(`<li style="margin:1rem;height:4rem;position: relative;display: inline-block;vertical-align: top;width: 8rem;cursor: pointer;background-color: #fff;border: 1px solid #e5e9ef;border-radius: 4px;padding: 8px;" value="` + time + `" onclick="player.seek(` + (time - 1) + `)"><h5 style="font-weight:bold!important">` + secondsToHms(time) + `</h5><a style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;height:3rem;width:8rem" title="` + result.childNodes[0].nodeValue + `">` + result.childNodes[0].nodeValue + `</a></li>`)
      console.log(result.childNodes[0].nodeValue, count++)
      result = nodes.iterateNext()
    }
    oList = $(`#dm-list>li`)
    $(`#dm-count`)[0].innerText = count + `条结果`
  }else $(`#dm-count`)[0].innerHTML = `<font color="red">Missing keywords!<font>`
}

secondsToHms = d => {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)
  let hDisplay = h
  let mDisplay = m
  let sDisplay = s
  return str_pad_left(hDisplay, `0`, 2) + `:` + str_pad_left(mDisplay, `0`, 2) + `:` + str_pad_left(sDisplay, `0`, 2)
}

dmSort = () => {
  if ($(`#dm-sort`)[0].innerText === `视频时序`) {
    let sList = $(`#dm-list>li`).sort((a, b) => {
      if (a.value == b.value) return 0
      if (a.value > b.value) return 1
      else return -1
    })
    $(`#dm-list>li`).remove()
    if (0 < sList.length) {
      console.log(sList)
      sList.each((i, s) => $(`#dm-list`).append(s.outerHTML))
      $(`#dm-sort`)[0].innerText = `发送时序`
    }
  }else {
    $(`#dm-list>li`).remove()
    if (undefined !== oList) {
      oList.each((i, s) => $(`#dm-list`).append(s.outerHTML))
      $(`#dm-sort`)[0].innerText = `视频时序`
    }
  }
}

if (window.danmaku === undefined) {
  dmLoad().then(() => {
    if ($(`#dm-query`).length === 0) {
      let d = document.createElement('div')
      d.innerHTML = `<div style="margin:1rem" id="dm-query" onclick="searchDm()" class="bi-btn button" role="button"><span class="bpui-button-text"> 搜 索 </span></div><input id="dm-key" type="text" onkeydown='if(event.keyCode==13) searchDm()' placeholder="关键字" style="height:1.5rem;width:12rem;margin:1rem"><span id="dm-count">Data ready!</span><div style="margin:1rem" id="dm-sort" onclick="dmSort()" class="bi-btn button" role="button"><span class="bpui-button-text">视频时序</span></div><div style="margin:1rem" onclick="dmLoad().then(() => {$('#dm-list>li').remove();$('#dm-sort')[0].innerText='视频时序';$('#dm-count')[0].innerText='';oList=undefined})" class="bi-btn button" role="button"><span class="bpui-button-text">重载弹幕</span></div><div style="display:inline-block;width:100%;overflow:hidden;" id="dm-list"></div>`
      document.getElementsByTagName('body')[0].insertBefore(d, document.getElementsByTagName('body')[0].firstChild)
    }
  })
}
