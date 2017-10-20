function setInfo(id, str) {
  document.getElementById(id).innerHTML = str;
}

var actIdPost = '';
var userIdPost = '';
var funcPost = '';
var postUrl = '';
var postParm = GetRequest();
for (var key in postParm) {
  if (key == 'actId') {
    actIdPost = postParm[key];
  }
  if (key == 'userId') {
    userIdPost = postParm[key];
  }

  if (key == 'func') {
    funcPost = postParm[key];
  }
}

if (funcPost) {
  postUrl = HTTP_INFO.activity_JAVA;
} else {
  postUrl = HTTP_INFO.activity;
}

funcPost = funcPost ? funcPost : '11102';

var params = {
  func: funcPost,
  data: [{
    actId: actIdPost,
    userId: userIdPost
  }]
}
// if (!actId || !userId) {
//   window.location.href = '404.html';
// }

$.ajax({
  type: "POST",
  url: postUrl,
  dataType: "JSON",
  contentType: "application/json",
  data: JSON.stringify(params),
  success: function (result) {
    console.log(result);
    console.dir(result);
    var data = result.data[0];
    setInfo('detail-biaoti', data.actName);
    setInfo('detail-time', $$timeFormate(data.beginTime, "M/D h:m") + " - " + $$timeFormate(data.endTime, "M/D h:m"));
    if (!data.region) {
      document.querySelector('.detail-online').style.display = 'block';
    }else {
      document.querySelector('.detail-location').style.display = 'block';
      setInfo('detail-location', data.region + " " + data.address);
    }

    if (data.imgPath) {
      document.querySelector('#detail-chatu').style.visibility = 'visible';
      document.getElementById('detail-chatu').src = HTTP_INFO.img + data.imgPath;
      document.querySelector('#detail-split-line').style.display = 'block';
    }

    if (data.content) {
      document.querySelector('#detail-main-content').style.display = 'block';
      setInfo('main-content-content', data.content);
    }
    setInfo('detail-people', data.scale);

    // var MainContent = document.getElementsByClassName('main-content-content')[0];
    // var ImgList = MainContent.getElementsByTagName('img');
    //
    // for (var i = 0; i < ImgList.length; i++) {
    //   ImgList[i].style.maxWidth = '100%';
    // }

  },
  error: function (err) {
    console.log(err);
    alert('服务器请求失败!');
  }
});


