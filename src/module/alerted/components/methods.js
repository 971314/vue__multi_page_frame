export default {
  methods: {
    dataSort: function () {
      let trigger = [], notTrigger = [], newData = [];
      for (let n = 0; n < arguments[0].length; n++) {
        if (arguments[0][n].flag3 == 29 || arguments[0][n].flag3 == 25) {
          trigger.push(arguments[0][n]);
        } else {
          notTrigger.push(arguments[0][n]);
        }
      }
      return newData.concat(notTrigger, trigger);
    },
    getTradeInfo() {
      if (pbE.isPoboApp) {
        let transaction = pbE.WT().wtGetConnectionAccountInfo();
        if (transaction) {
          transaction = JSON.parse(transaction)
          for (let n = 0; n < transaction.length; n++) {
            if (transaction[n].PbKey_Trade_Login_Type == '8') {
              this.CID = transaction[n].PbKey_Trade_Login_CID;
              this.loginAccount = transaction[n].PbKey_Trade_Login_Account;//登录账号
              this.accountClass = transaction[n].PbKey_Trade_Login_Account_Type;//账号类别
              this.loginClass = transaction[n].PbKey_Trade_Login_Type;//登陆类别
            }
          }
        }
      } else {
        this.CID = '1';
        this.loginAccount = '2';//登录账号
        this.accountClass = '3';//账号类别
        this.loginClass = '4';//登陆类别
      }
    },
    setName(name, deal, opan) {
      return name + '的' + (deal == 0 ? '买' : '卖') + (opan == 1 ? '开' : '平') + '条件单';
    },
    //验证整数
    verifyInt(val) {
      val = Number(val);
      let intReg = /^[0-9]*$/;
      if (val != '') {
        if (!intReg.test(val)) {
          this.showMessage('请输入整数字符', () => {
            val = '';
          });
        }
      }
    },
    //验证小数
    verifyDecimal(val) {
      console.log(val, 'verifyDecimal');
      val = Number(val);
      let intReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
      if (val != '') {
        if (!intReg.test(val)) {
          this.showMessage('请输入数字字符', () => {
            val = '';
          });
        }
      }
    },
    //移动弹框
    operateTip(flag1, flag3, text) {
      let _this = this;
      if (flag1 == 4 && flag3 == 22 || flag1 == 1 && flag3 == 22 || flag1 == 2 && flag3 == 22) {
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '暂停',
            click() {
              _this.conStopOrOnClick(1)
            }
          }, {
            text: '删除',
            click() {
              if (flag3 == 22) {
                _this.showMessage(text + '正在运行，是否继续删除', _this.conStopOrOnClick, 1, 4);
              } else {
                _this.showMessage('是否删除当前' + text, _this.conStopOrOnClick, 1, 4);
              }
            }
          }, {
            text: '全部删除',
            click() {
              let num = 0;
              for (let s = 0; s < _this.noneTouchLen.length; s++) {
                if (_this.noneTouchLen[s].flag3 == 22) {
                  num += 1;
                }
              }
              if (num > 0) {
                _this.showMessage('当前有' + num + '条' + text + '正在运行，是否继续删除', _this.conStopOrOnClick, 1, 5);
              } else {
                _this.showMessage('是否删除全部' + text, _this.conStopOrOnClick, 1, 5);
              }
            }
          }],
        });
      } else if (flag1 == 1 && flag3 == 23 || flag1 == 2 && flag3 == 23 || flag1 == 3 && flag3 == 23) {
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '修改',
            click() {
              _this.conStopOrOnClick(3)
            }
          }, {
            text: '运行',
            click() {
              _this.conStopOrOnClick(2)
            }
          }, {
            text: '删除',
            click() {
              _this.showMessage('是否删除当前' + text, _this.conStopOrOnClick, 1, 4);
            }
          }, {
            text: '全部删除',
            click() {
              let num = 0;
              for (let s = 0; s < _this.noneTouchLen.length; s++) {
                if (_this.noneTouchLen[s].flag3 == 22) {
                  num += 1;
                }
              }
              if (num > 0) {
                _this.showMessage('当前有' + num + '条' + text + '正在运行，是否继续删除', _this.conStopOrOnClick, 1, 5);
              } else {
                _this.showMessage('是否删除全部' + text, _this.conStopOrOnClick, 1, 5);
              }
            }
          }],
        });
      } else if (flag3 == 24 || flag3 == 29 || flag3 == 25 || flag3 == 27 || flag3 == 28 || flag1 == 1 && !flag3 || flag1 == 4 && flag3 == 23 || flag1 == 2 && flag3 == 21 || flag1 == 3 && flag3 == 22 || flag1 == 1 && flag3 == 21) {
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '删除',
            click() {
              if (flag3 == 22) {
                _this.showMessage(text + '正在运行，是否继续删除', _this.conStopOrOnClick, 1, 4);
              } else {
                _this.showMessage('是否删除当前' + text, _this.conStopOrOnClick, 1, 4);
              }
            }
          }, {
            text: '全部删除',
            click() {
              let num = 0;
              for (let s = 0; s < _this.noneTouchLen.length; s++) {
                if (_this.noneTouchLen[s].flag3 == 22) {
                  num += 1;
                }
              }
              if (num > 0) {
                _this.showMessage('当前有' + num + '条' + text + '正在运行，是否继续删除', _this.conStopOrOnClick, 1, 5);
              } else {
                _this.showMessage('是否删除全部' + text, _this.conStopOrOnClick, 1, 5);
              }
            }
          }],
        });
      }
    },
    //pc弹框
    operateTipPc(flag1, flag3) {
      let _this = this;
      if (flag1 == 1 && !flag3
        || flag1 == 4 && flag3 == 23
        || flag1 == 3 && flag3 == 22
        || flag1 == 2 && flag3 == 21
        || flag1 == 1 && flag3 == 21
        || flag1 == 4 && flag3 == 21) {
        _this.showMessage('正在申报中<br/>不能进行操作');
      } else if (flag1 == 5 && flag3 == 26 || flag1 == 5 && flag3 != 26) {
        _this.showMessage('删除状态，不能进行操作！');
      } else if (flag1 == 4 && flag3 == 22
        || flag1 == 1 && flag3 == 22
        || flag1 == 2 && flag3 == 22) {
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '暂停',
            click() {
              _this.conStopOrOnClick(1)
            }
          }],
        });
      } else if (flag1 == 1 && flag3 == 23 || flag1 == 2 && flag3 == 23 || flag1 == 3 && flag3 == 23) {
        _this.$alertBtn({
          maskClosable: true,
          btns: [{
            text: '运行',
            click() {
              _this.conStopOrOnClick(2)
            }
          }],
        });
      }
    },
    //alert
    showMessage(msg, fun, off, type) {
      if (off) {
        if (off == 1) {
          if (msg && fun && type) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: "取消"
              },
                {
                  text: '确认',
                  click() {
                    fun(type)
                  }
                }],
            });
          } else if (msg && fun) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: "取消"
              },
                {
                  text: '确认',
                  click() {
                    fun()
                  }
                }],
            });
          }
        } else if (off == 2) {
          if (msg && fun && type) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: '确认',
                click() {
                  fun(type)
                }
              }],
            });
          } else if (msg && fun) {
            this.$alert({
              maskClosable: true,
              message: msg,
              btns: [{
                text: '确认',
                click() {
                  fun()
                }
              }],
            });
          }
        }
      } else {
        this.$alert({
          maskClosable: true,
          message: msg,
          btns: [{
            text: '确认'
          }],
        });
      }
    },
    //最小变动价位
    minPrice(cid, code, make) {
      let check = pbE.WT().wtGeneralRequestRe(cid, 6018);
      if (check) {
        check = JSON.parse(check).data;
        for (let ii = 0; ii < check.length; ii++) {
          if (check[ii]['63'] == code && check[ii]['54'] == make) {
            return check[ii]['245']
          }
        }
      }
    },
    isConnected() {
      let CID = pbE.isPoboApp ? pbE.WT().wtGetIsConnected(this.CID) : '',
        date = pbE.isPoboApp && pbE.WT().wtLoginRe(this.CID) != '' ? JSON.parse(pbE.WT().wtLoginRe(this.CID)).data[0]['75'] : '';
      console.log(CID,date);
      if (!CID || !date) {
        console.log('CID date');
        this.showMessage('交易已退出！',() => {
          // location.href = 'close';
        },2);
      }
    }
  }
}
