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

      $(`#dm-list`).append(`<li style="margin:1rem;height:3rem" value="` + time + `" onclick="player.seek(` + (time - 1) + `)" class="episode-item"><h5>` + secondsToHms(time) + `</h5><p class="ep-title" title="` + result.childNodes[0].nodeValue + `" style="">` + result.childNodes[0].nodeValue + `</p></li>`)
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
      d.innerHTML = `<div style="margin:1rem" id="dm-query" onclick="searchDm()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text"> 搜 索 </span></div><input id="dm-key" type="text" placeholder="关键字" style="height:auto;width:12rem;margin:1rem"><span id="dm-count">Data ready!</span><div style="margin:1rem" id="dm-sort" onclick="dmSort()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">视频时序</span></div><div style="margin:1rem" onclick="dmLoad().then(() => {$('#dm-list>li').remove();$('#dm-sort')[0].innerText='视频时序';$('#dm-count')[0].innerText='';oList=undefined})" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">Reload</span></div><div id="dm-list"></div>`
      $(`#bangumi_detail`).append(d)
    }
  })
}
