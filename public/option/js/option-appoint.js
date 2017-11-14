if (typeof pbE == 'undefined') {
  window.pbE = {
    WT: function () {
      var obj = {
        wtGetCurrentConnectionCID: function () {

        },
        wtEncrypt: function () {

        },
        wtGeneralRequest: function (a, b) {
          if (b == 6200) {
            var data = {
              functionNO: 6200,
              jData: {
                '1': 0,
                data: [
                  {
                    '214': '1234561111111',
                    '215': 11111111,
                    '216': '招商银行',
                    '56': 0,
                    '51': 2222222222,
                    '217': 5,
                    '353': 111,
                    '219': 4
                  },
                  {
                    '214': '1234560222',
                    '215': 11111111,
                    '216': '农业银行',
                    '56': 0,
                    '51': 2222222222,
                    '217': 6,
                    '353': 111,
                    '219': 5
                  },
                  {
                    '214': '12345600789',
                    '215': 11111111,
                    '216': '工商银行',
                    '56': 0,
                    '51': 2222222222,
                    '217': 4,
                    '353': 111,
                    '219': 6
                  }
                ]
              }
            }
          } else if (b == 6203) {
            var data = {
              functionNO: 6203,
              jData: {
                '1': 0,
                data: [
                  {
                    '200': 0,
                    '224': 123
                  }
                ]
              }
            }
          } else if (b == 6202 || b == 6201) {
            var data = {
              functionNO: b,
              jData: {
                '1': 0,
                data: [
                  {}
                ]
              }
            }
          }
          callback(JSON.stringify(data))
        },
      }
      return obj;
    }
  }
  $('#goBack').click(function () {
    location.href = document.referrer;
  })
} else {
  $('#goBack').click(function () {
    location.href = 'goBack';
  })
}

//设置币种的下拉列表
function setLiCurrency(data) {
  var domStr = '';
  for (var i = 0, l = data.length; i < l; i++) {
    if (parseInt(data[i] + 1)) {
      var currency = pbUtils.getCurrency(data[i]);
      var unit = pbUtils.getUnit(data[i]);
      if (i == 0) {
        domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '" class="hover">' + currency + '</li>';
        oCurrency.innerHTML = currency;
        $('#currency-unit').val(unit);
        currencyCode = data[i];
      } else {
        domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '">' + currency + '</li>';
      }
    }
  }
  return domStr;
}



function queryRecord() {

  var data = {
    '171': '2016-01-01',
    '172': fundAccount,
    '56': currencyCode,
    '398': "",
    '382': "",
  };
  pbE.WT().wtGeneralRequest(CID, 9021, JSON.stringify(data));
}

function cancelRecord() {

  var data = {
    '171': '2016-01-01',
    '172': fundAccount,
    '56': currencyCode,
    '398': "",
    '382': "",
  };
  pbE.WT().wtGeneralRequest(CID, 9021, JSON.stringify(data));
}


function submitAppoint() {

  if (!$('#timeDate').val()) {
    $('#error').removeClass('hide');
    $('#error').html('请输入转出时间');
    return;
  }
  if (!$('#mumber').val()) {
    $('#error').removeClass('hide');
    $('#error').html('请输入转出金额');
    return;
  }

  $('#error').addClass('hide');
  var data = {
    '215': bankCode,
    '51': fundAccount,
    '56': currencyCode,
    '398': $("#timeDate").val(),
    '382': $("#mumber").val(),
  };
  console.log(data);
  pbE.WT().wtGeneralRequest(CID, 9021, JSON.stringify(data));
}

//214银行账号，215银行编码，216银行名称，56开通币种，51资金账号
function fundInOutView() {
  window.ready = function () {
    $('body').click(function () {
      $('#bank-ul').addClass('hide');
      $('#currency-ul').addClass('hide');
    });
    $('.bank-div').click(function (e) {
      $('#currency-ul').addClass('hide');
      $('#bank-ul').toggleClass('hide');
      $('#bank').focus();
      e.stopPropagation();
    });
    $('#bank-ul').on('click', 'li', function () {
      bankCode = $(this).attr('data-code');
      bankAccount = $(this).attr('bank-account');
      fundAccount = $(this).attr('data-account');
      bankCenter = $(this).attr('center-code');
      $('#bank').val($(this).html());
      $('#bank-name').val($(this).attr('data-name'));
      $('#bank-val').val($(this).attr('value'));
      $('#bank-code').val($(this).attr('data-code'));
      $('#bank-currency').val($(this).attr('data-currency'));
      $('#fund-account').val($(this).attr('data-account'));
      $('#bank-center').val($(this).attr('center-code'));
      $('#bank-ul .hover').removeClass('hover');
      $(this).addClass('hover');

      oBank.innerHTML = $('#bank').val();
      var currencyContents = setLiCurrency($('#bank-currency').val());
      $('#currency-ul').empty();
      $('#currency-ul').append(currencyContents);
      $('#result-account').html($('#bank-val').val());
      $('#result-bank').html($('#bank-name').val());

      $('#currency-ul li').click(function () {
        currencyCode = $(this).attr('currencyCode');
        $('#currency').html($(this).val());
        $('#currency-unit').val($(this).attr('currency-unit'));
        $('#currency-ul .hover').removeClass('hover');
        $(this).addClass('hover');
        oCurrency.innerHTML = $(this).html();
      });
      /*$('#result-amount').html($('#inAmount').val());*/
    });
    $('.currency-div').click(function (e) {
      $('#bank-ul').addClass('hide');
      $('#currency-ul').toggleClass('hide');
      $('#currency').focus();
      e.stopPropagation();
    });
    $('#currency-ul li').click(function () {
      $('#currency').html($(this).val());
      $('#currency-unit').val($(this).attr('currency-unit'));
      $('#currency-ul .hover').removeClass('hover');
      $(this).addClass('hover');
      oCurrency.innerHTML = $(this).html();
    });
  }
  pbE.WT().wtGeneralRequest(CID, 6200, JSON.stringify({}));
}

function setLiBank(data) {
  var domStr = '', arr = [], indexArr = [];
  //每个币种一条记录，如果一个银行有多个币种则有多条记录，合并相同银行账号的币种
  var account = {};
  for (var i = 0, l = data.length; i < l; i++) {
    var key = data[i]['214'];
    var accountAttr = {
      '56': []
    };
    if (!account.hasOwnProperty(key)) {
      accountAttr['56'].push(data[i]['56']);
      accountAttr['215'] = data[i]['215'];
      accountAttr['216'] = data[i]['216'];
      accountAttr['51'] = data[i]['51'];
      accountAttr['353'] = data[i]['353'];
      accountAttr['218'] = data[i]['218'];
      accountAttr['214'] = data[i]['214'];
      account[key] = accountAttr;
    } else {
      if (account[key]['56'].indexOf(data[i]['56']) < 0) {
        account[key]['56'].push(data[i]['56']);
      }
    }
  } //合并结束
  var k = 0;
  for (var acc in account) {
    if (k == 0) {
      var tail = acc.slice(-4);
      domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51'] + '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '" class="hover">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>';
      +'</li>';
      if (account[acc]['218'] == 4) {
        $('#moneyPwd').removeClass('hide');
        $('#bankPwd').addClass('hide');
      } else if (account[acc]['218'] == 5) {
        $('#bankPwd').removeClass('hide');
        $('#moneyPwd').addClass('hide');
      } else if (account[acc]['218'] == 6) {
        $('#bankPwd').removeClass('hide');
        $('#moneyPwd').removeClass('hide');
      } else if (account[acc]['218'] == 7) {
        $('#bankPwd').addClass('hide');
        $('#moneyPwd').addClass('hide');
      }
      oBank.innerHTML = '<span class="b1">' + account[acc]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>';
      var currencyContents = setLiCurrency(account[acc]['56']);
      $('#currency-ul').empty();
      $('#currency-ul').append(currencyContents);
      $('#result-account').html(acc);
      $('#result-bank').html(account[acc]['216']);
      bankCode = account[acc]['215'];
      bankAccount = account[acc]['214'];
      fundAccount = account[acc]['51'];
      bankCenter = account[acc]['353'];
      k++;
    } else {
      var tail = acc.slice(-4);
      domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51'] + '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>';
      +'</li>';
      k++;
    }
  }
  return domStr;
}


var CID = pbE.WT().wtGetCurrentConnectionCID();
var bankAccount, bankCode, fundAccount, currencyCode, bankCenter;
var oBank = document.getElementById('bank');
var oCurrency = document.getElementById('currency');
var fundPwd = '', bankPwd = '';

var accountInfo=[];


var option = {
  callbacks: [{
    fun: 6200, module: 90002, callback: function (msg) {
      console.log(msg)
      if (msg.jData['1'] < 0) {
        alert(msg.jData['2']);
      } else {
        accountInfo = msg.jData.data;
        var bankContents = setLiBank(accountInfo);
        $('#bank-ul').empty();
        $('#bank-ul').append(bankContents);
      }
    }
  },
    {
      fun: 9021, module: 90002, callback: function (msg) {
      if (msg.jData['1'] < 0) {
        alert(msg.jData['2']);
      }
    }
    },
    {
      fun: 9022, module: 90002, callback: function (msg) {
      if (msg.jData['1'] < 0) {
        alert(msg.jData['2']);
      }
      else {
        showRecord();//todo
      }
    }
    },
    {
      fun: 9023, module: 90002, callback: function (msg) {
      if (msg.jData['1'] < 0) {
        alert(msg.jData['2']);
      }
      else {
        records = msg.jData.data;
        showRecord();//todo
      }
    }
    }
  ],

  reload: function () {
    pbE.SYS().startLoading();
    CID = pbE.WT().wtGetCurrentConnectionCID();

  },
  refresh: function () {

  },
  fresh: function () {
  },

  doShow: function (flag) {

  }
};
pbPage.initPage(option);

/*$(function () {
 // 判断浏览器
 var u = navigator.userAgent;
 var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
 if (isAndroid) {
 $('input').bind('click', function (e) {
 var $this = $(this);
 e.preventDefault();
 setTimeout(function () {
 $(window).scrollTop($this.offset().top - 10);
 }, 200)
 })
 }
 });*/

function setTab(type, obj) {
  $(".active").removeClass("active");
  console.log(obj);
  $(obj).addClass("active");
  if (type == 0) {

    $(".appointment").show();
    $(".record").hide();
  }
  else {
    $(".appointment").hide();
    $(".record").show();
    initRecord();
  }
}

function initRecord() {
  $("#start").val(pbUtils.dateFormat(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30), 'yyyy-MM-dd'))
  $("#end").val(pbUtils.dateFormat(new Date(), 'yyyy-MM-dd'))
  $("#start").prev().text($("#start").val())
  $("#end").prev().text($("#end").val())
  queryRecord();
}

function queryRecord() {
  var data = {
    '171': $("#timeDate").val(),
    '172': $("#mumber").val(),
    '56': currencyCode
  };
  console.log(data);
  pbE.WT().wtGeneralRequest(CID, 9023, JSON.stringify(data));

}


function setDate(obj) {
  $(obj).prev()[0]
  console.log(obj)
}

var state = {"0": "待审批", "1": "审批通过", "2": "审批拒绝", "3": "已取消"}
var records=[];

function showRecord() {
  var html = "";
  console.log(records);
  for (var i = 0; i < records.length; i++) {
    var item = records[i];
    console.log(item);
    var applyDate = item["398"] || "";
    var endDate = item["315"] || "";
    var number = item["739"] || "";
    var status = state[item["544"]];
    var opt = "";
    if (item["544"] == "0")
      opt = "撤回";
    else if (item["544"] == "1")
      opt = "预约确认";

    html += "<tr><td><div>" + applyDate + "</div><div>" + endDate + "</div></td><td><div>" + number + "</div></td> <td><div>" + status + "</div><div class='option' onclick='doOption("+i+")'>" + opt + "</div></td></tr></tr>";
  }
  $("#tList").html("");
  $("#tList").append(html);


}


function doOption(index) {
  //预约取消
  if(records[index]["544"] == "0")
  {
    var data = {
      '51': index["51"],
      '398': index["398"],
      '56': 0,
      '200': index["200"]
    };
    pbE.WT().wtGeneralRequest(CID, 9022, JSON.stringify(data));
  }
  if(records[index][544] == "1"){//预约确认
      var account;
        for(var i=0,len=accountInfo.length; i<len;i++){
              if(records[index]["215"] == accountInfo[i]["215"]) {
                account = accountInfo[i];
                break;
              }

        }
        records[index]["account"] = account["216"]+"(尾号"+account["214"].slice(-4)+")";
        var data= JSON.stringify(records[index]);
        //window.location.href="pobo:pageId=900005&unchekc=1&url=option/view/option-appoint.html?data="+data;

        window.location.href="./option-tr-confirm.html?data="+encodeURI(data);
  }

}

$(function () {
  fundInOutView();
  ready();

  $("#timeDate").change(function () {
    $("#time").text($("#timeDate").val())
    $("#time").css("color", "#000000")
    if ($("#timeDate").val() == "") {
      $("#time").text("请选择时间");
      $("#time").css("color", "#757575");
    }
  });

  $("#start").change(function () {
    $("#start").prev().text($("#start").val())
    if ($('#start').val() >= $('#end').val())
    {
      alert('起始日期不得大于截止日期');
    }
    queryRecord();
  })

  $("#end").change(function () {
    $("#end").prev().text($("#end").val())
    if ($('#start').val() >= $('#end').val())
    {
      alert('起始日期不得大于截止日期');
    }
    queryRecord();
  })

})


