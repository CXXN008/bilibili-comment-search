if (window.danmaku === undefined) {
  fetch('https://comment.bilibili.com/' + cid + '.xml').then(d => d.text()).then(s => new window.DOMParser().parseFromString(s, 'text/xml')).then(x => {
    window.danmaku = x
    if ($('#dm-query').length === 0) {
      $('#bangumi_detail')[0].innerHTML += '<br/><div style="margin:1rem" id="dm-query" onclick="search_dm()" class="bpui-component bpui-button button" role="button"><span class="bpui-button-text">查询</span></div><input id="dm-key" type="text" placeholder="关键字" style="height:auto;width:12rem;margin:1rem"><span id="dm-count">Data ready!</span><ul id="dm-list"></ul>'
    }
  })
}

str_pad_left = (s, p, l) => {
  return (new Array(l + 1).join(p) + s).slice(-l)
}

search_dm = () => {
  let nodes = window.danmaku.evaluate("//d[contains(text(),'" + $('#dm-key')[0].value + "')]", window.danmaku, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
  let result = nodes.iterateNext()
  let count = 0
  $('#dm-list').children().remove()
  while(result){
    // console.log(result,count++)
    let time = result.attributes[0].nodeValue.split(',')[0]
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    $('#dm-list').append('<li style="margin:1rem;height:3rem" onclick="player.seek(' + (time - 1) + ')" class="episode-item"><h5>' + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2) + '</h5><p class="ep-title" style="">' + result.childNodes[0].nodeValue + '</p></li>')
    console.log(result.childNodes[0].nodeValue, count++)
    result = nodes.iterateNext()
  }
  $('#dm-count')[0].innerText = count + '条结果'
}

/* <li style="margin:1rem;height:auto" class="episode-item"><p class="ep-title" style="">超能力的较量得这么来</p></li> */
