var type = '',
  infoId = '',
  newsId = '',
  tmp = '',
  postParm = GetRequest();
for (var key in postParm) {
  if (key == 'infoId') {
    infoId = postParm[key];
  }
  if (key == 'newsId') {
    newsId = postParm[key];
  }
  if (key == 'type') {
    type = postParm[key];
  }
  if (key == 'tmp') {
    tmp = postParm[key];
  }
}

function removeSpecialStr(value) {
  value = value.replace(/\\u000a/g, '<br/>');
  value = value.replace(/\n/g, '<br/>');
  value = value.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  return value;
}

if (type == 1 && newsId) {//app分享新闻请求
  $('.attachsBody').after('<div class="disclaimer">免责声明<br/>本文发布仅代表作者个人或公司观点，与本信息发布平台无关。文中陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完整性提供任何明示或暗示的保证。</div>');
  $.get(HTTP_INFO.newsUrl, {
    type: 'mu',
    doc: 'json',
    newsid: newsId
  }, function (data) {
    data = JSON.parse(data).News;
    $('.title').text(setTitle(data.Title));
    $('.time').text($$timeFormate(data.Pubtime, 'Y-M-D h:m'));
    $('.source').text(data.Source);
    data.Text = removeSpecialStr(data.Text);
    $('.content').html(data.Text);
  })
} else if (type == 2 && infoId) {//app分享请求
  $.ajax({
    type: "POST",
    url: HTTP_INFO.companyUrl + 'pobocertification_rest/1_0',
    dataType: "JSON",
    contentType: "application/json",
    data: JSON.stringify({
      func: "10102",
      data: [{
        infoId: infoId,
        userId: '',
        token: ''
      }]
    }),
    success: function (data) {
      console.log(data);
      if (data.retHead == 0) {
        var html = '';
        $('.title').text(data.data[0].infoTitle);
        $('.time').text($$timeFormate(data.data[0].createTime, 'Y-M-D h:m'));
        $('.source').text(data.data[0].source);
        $('.content').html(data.data[0].content);
        if (data.data[0].disclaimer) {
          $('.attachsBody').after('<div class="disclaimer">免责声明<br/>' + data.data[0].disclaimer + '</div>');
        }
        if ($('.content').html().length != 0) {
          $('img').parent().css({width: '100%'});
          $('img').css('width', '100%');
        }
        if (data.data[0].attachs && data.data[0].attachs.length != 0) {
          var attachs = data.data[0].attachs;
          for (var i = 0; i < attachs.length; i++) {
            html += '<a class="attachs" href="' + attachs[i].attachUrl + '">'
              + '<span>' + attachs[i].attachName + '</span>'
              + '<span>(' + reviseFileSize(attachs[i].attachSize) + ')</span></a>'
          }
          $('.attachsBody').append(html);
        }
      } else {
        alert(data.desc);
      }
    },
    error: function (error) {
      alert('请求失败！')
    }
  })
} else if (tmp >= 0 && infoId) {//二维码预览请求
  $.ajax({
    type: "POST",
    url: HTTP_INFO.companyUrl + 'pobocertification_rest/1_0',
    dataType: "JSON",
    contentType: "application/json",
    data: JSON.stringify({
      func: "10110",
      data: [{
        infoId: infoId,
        tmp: tmp
      }]
    }),
    success: function (data) {
      console.log(data);
      if (data.retHead == 0) {
        var html = '';
        $('.title').text(data.data[0].infoTitle);
        $('.time').text($$timeFormate(data.data[0].createTime, 'Y-M-D h:m'));
        $('.source').text(data.data[0].source);
        $('.content').html(data.data[0].content);
        if (data.data[0].disclaimer) {
          $('.attachsBody').after('<div class="disclaimer">免责声明<br/>' + data.data[0].disclaimer + '</div>');
        }
        if ($('.content').html().length != 0) {
          $('img').parent().css({width: '100%', 'fontSize': '0'});
          $('img').css('width', '100%');
        }
        if (data.data[0].attachs && data.data[0].attachs.length != 0) {
          var attachs = data.data[0].attachs;
          for (var i = 0; i < attachs.length; i++) {
            html += '<a class="attachs" href="' + attachs[i].attachUrl + '">'
              + ' <span>' + attachs[i].attachName + '</span>'
              + ' <span>(' + reviseFileSize(attachs[i].attachSize) + ')</span></a>';
          }
          $('.attachsBody').append(html);
        }
      } else {
        alert(data.desc);
      }
    },
    error: function (error) {
      alert('请求失败！')
    }
  });
}
