if (window.danmaku === undefined) {
  fetch('https://comment.bilibili.com/' + cid + '.xml').then(d => d.text()).then(s => new window.DOMParser().parseFromString(s, 'text/xml')).then(x => {
    window.danmaku = x
    if ($('#dm-query').length === 0) {
      $('#bangumi_detail')[0].innerHTML += '<br/><div style="margin:1rem" id="dm-query" onclick="searchDm()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">查询</span></div><input id="dm-key" type="text" placeholder="关键字" style="height:auto;width:12rem;margin:1rem"><span id="dm-count">Data ready!</span><div style="margin:1rem" id="dm-sort" onclick="dmSort()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">视频时序</span></div><ul id="dm-list"></ul>'
    }
  })
}
str_pad_left = (s, p, l) => {
  return (new Array(l + 1).join(p) + s).slice(-l)
}

searchDm = () => {
  let nodes = window.danmaku.evaluate("//d[contains(text(),'" + $('#dm-key')[0].value + "')]", window.danmaku, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
  let result = nodes.iterateNext()
  let count = 0
  $('#dm-list').children().remove()
  while(result){
    // console.log(result,count++)
    let time = result.attributes[0].nodeValue.split(',')[0]

    $('#dm-list').append('<li style="margin:1rem;height:3rem" value="' + time + '" onclick="player.seek(' + (time - 1) + ')" class="episode-item"><h5>' + secondsToHms(time) + '</h5><p class="ep-title" title="' + result.childNodes[0].nodeValue + '" style="">' + result.childNodes[0].nodeValue + '</p></li>')
    console.log(result.childNodes[0].nodeValue, count++)
    result = nodes.iterateNext()
  }
  $('#dm-count')[0].innerText = count + '条结果'
}

function secondsToHms (d) {
  d = Number(d)
  var h = Math.floor(d / 3600)
  var m = Math.floor(d % 3600 / 60)
  var s = Math.floor(d % 3600 % 60)

  var hDisplay = h
  var mDisplay = m
  var sDisplay = s
  return str_pad_left(hDisplay, '0', 2) + ':' + str_pad_left(mDisplay, '0', 2) + ':' + str_pad_left(sDisplay, '0', 2)
}

function dmSort () {
  let sList = $('#dm-list>li').sort(function (a, b) {
    if (a.value == b.value) { return 0; }
    if (a.value > b.value) {
      return 1
    }else {
      return -1
    }
  })
  $('#dm-list>li').remove()
  sList.each((i, s) => {
    console.log(i,s.outerHTML)
    $('#dm-list').append(s.outerHTML)
  })
}
