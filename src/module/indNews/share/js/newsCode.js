var tmp = '',
  infoId = '',
  postParm = GetRequest();
for (var key in postParm) {
  if (key == 'tmp') {
    tmp = postParm[key];
  }
  if (key == 'infoId') {
    infoId = postParm[key];
  }
}
function removeSpecialStr(value) {
  value = value.replace(/\\u000a/g, '<br/>');
  value = value.replace(/\n/g, '<br/>');
  value = value.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  return value;
}

if(tmp >= 0 && infoId){
  $.ajax({
    type: "POST",
    url: HTTP_INFO.serverUrl,
    dataType: "JSON",
    contentType: "application/json",
    data: JSON.stringify({
      func: "10222",
      data: [{
        infoId:infoId,
        tmp:tmp
      }]
    }),
    success: function(data) {
      console.log(data);
      if (data.retHead == 0) {
        var html = '';
        $('.title').text(data.data[0].infoTitle);
        $('.time').text($$timeFormate(data.data[0].createTime, 'Y-M-D h:m'));
        $('.source').text(data.data[0].source);
        $('.content').html(data.data[0].content);
        if($('.content').html().length != 0){
          $('img').parent().css({width:'100%','fontSize':'0'});
          $('img').css('width','100%');
        }
        if (data.data[0].attachs && data.data[0].attachs.length != 0) {
          var attachs = data.data[0].attachs;
          for (var i = 0; i < attachs.length; i++) {
            html += `<a class="attachs" href="` + attachs[i].attachUrl1 + `">
                    <span>` + attachs[i].attachName + `</span>
                    <span>(` + attachs[i].attachSize + `)</span></a>`
          }
          $('.attachsBody').append(html);
        }
      } else {
        alert(data.desc);
      }
    },
    error: function(error)  {
      alert('请求失败！')
    }
  });
}
