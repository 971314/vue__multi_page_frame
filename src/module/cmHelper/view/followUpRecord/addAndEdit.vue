<template>

  <div class="cmTrends addAndEdit pobo-customer-info">

    <div>
      <common-nav>
        <div slot="body">
          <!-- <span v-if="isEdit">{{showEditBtn?"跟进记录":"编辑跟进"}}</span>
          <span v-if="!isEdit">新建跟进</span> -->
          <span v-if="isEdit && showEditBtn">跟进记录</span>
          <span v-else-if="isEdit && !showEditBtn">{{params.businessType == 1 ? '编辑跟进' : '新建跟进'}}</span>
          <span v-if="!isEdit">新建跟进</span>
        </div>
        <div v-if="showEditBtn" slot="footer" class="addFollow" @click="showEditBtn=false">
          <span v-if="params.businessType==1">编辑</span>
          <span v-if="params.businessType==2">新增</span>
        </div>
        <div v-if="!showEditBtn" slot="footer" class="addFollow" @click="submit()">
          完成
        </div>
      </common-nav>
    </div>

    <div class="container customer-info-center">

      <div class="group">
        <a class="cell" @click="goToCusInfoList()">
          <span v-if="params.businessType==1" class="cell-body">客户姓名：{{params.name}}</span>
          <span v-if="params.businessType==2" class="cell-body">客户：{{params.name}}</span>
          <div class="cell-footer" v-if="!isEdit">
            <img src="../../images/followUpRecord/img03.png"/>
          </div>
        </a>
        <a class="cell" v-if="params.businessType==1">
          <span class="cell-body">问题类型：{{params.followTypeName}}</span>
          <div class="cell-footer" v-if="!showEditBtn && !isEdit">
            <img src="../../images/followUpRecord/img03.png"/>
          </div>
          <select v-if="!showEditBtn" :disabled="isEdit" class="qType" v-model="params.followType" @change="setQType()">
            <option value="">请选择</option>
            <option value="01">日常事务</option>
            <option value="02">行情推送</option>
            <option value="03">答疑解惑</option>
            <option value="04">经验指导</option>
            <option value="05">持仓异常查询</option>
            <option value="06">下单错误投诉</option>
          </select>
        </a>
        <div v-if="detail && showEditBtn">

          <div class="historyFollow" v-if="params.businessType==1 && detail.detail.length>0">
            <div class="hisItem">
              <div>{{getDate(detail.detail[0].PROBLEM_PROCESS_DT) + ' ' + detail.detail[0].PROBLEM_DESC}}</div>
              <div>
                {{getDate(detail.detail[0].PROBLEM_PROCESS_DT) + ' ' + (detail.detail[0].PROBLEM_PROCESS_RESULT || '')}}
              </div>
            </div>
          </div>

          <div v-if="params.businessType==2 && detail.detail.length>0">
            <div v-if="detail.detail[0].FOLLOWDESC" class="historyFollow">
              <div class="hisItem" v-if="params.businessType!=1">
                <div v-for="i in detail.detail[0].FOLLOWDESC">{{i}}</div>
              </div>
            </div>
          </div>

        </div>
        <div v-if="detail && showEditBtn" class="enclosure">
          <div class="group" v-if="detail.attach.length>0">
            <a class="cell" v-for="(i, index) in detail.attach" @click="preview(i.FILEDATA)">
              <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
              <span class="cell-body">
                                <img src="../../images/followUpRecord/img06.png"/>
                                图片 {{ i.ATTACH_URL.slice(i.ATTACH_URL.lastIndexOf("/") + 1) }}
                            </span>
              <!-- <span class="cell-footer">235K</span> -->
            </a>
          </div>
        </div>

      </div>

      <div class="group" v-if="!showEditBtn">
        <a class="cell no-padding">
                    <span class="cell-body">
                        <div class="textarea">
                            <textarea :disabled="isEdit && params.businessType==1" placeholder="内容" rows="5"
                                      class="textarea-input" v-model="params.followDesc"></textarea>
                            <div class="upload-img">
                                <div v-if="imgSrcArr.length > 0" class="showImgArea" v-for="(i, index) in imgSrcArr">
                                    <i class="removeImg" @click="removePreImg(index)">&nbsp;</i>
                                    <img :src="i"/>
                                </div>
                                <div v-if="imgSrcArr.length == 0" class="showImgArea">
                                    <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageFront">
                                    <img src="../../images/followUpRecord/img01.png" id="fileFront"/>
                                </div>
                                <div v-if="imgSrcArr.length > 0 && imgSrcArr.length <3" class="showImgArea">
                                    <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageFront">
                                    <img src="../../images/followUpRecord/img02.png"/>
                                </div>
                            </div>
                        </div>
                    </span>
        </a>
      </div>

      <div v-if="params.businessType==1 && !showEditBtn"><textarea placeholder="处理结果" rows="5" class="result"
                                                                   v-model="params.followNote"></textarea></div>

      <div v-if="params.businessType==1 && showEditBtn" class="lastEditDate">
        <div v-if="detail">创建时间<span> {{$$timeFormate({date: detail.detail[0].INPUT_TIME, format: 'Y-M-D h:m'})}}</span>
        </div>
        <div v-if="detail">最后更新时间<span> {{$$timeFormate({
          date: detail.detail[0].PROBLEM_PROCESS_DT,
          format: 'Y-M-D h:m'
        })}}</span></div>
      </div>

    </div>

  </div>


</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import axios from 'axios'
  import browser from '../../utils/browser'
  import util from '../../utils/util'

  export default {

    data () {
      return {
        cardFront: 'no-file',
        imgSrcArr: [],
        params: {},
        showEditBtn: '', //是否否显示【编辑】按钮
        detail: null,
        isEdit: false,
        submitFlag: false
      }
    },
    computed: {
      ...mapState({
        addFollow: ({followUpRecord}) => followUpRecord.addFollow,
        jumpFlag: ({followUpRecord}) => followUpRecord.jumpFlag,
        showEditBtnFlag: ({followUpRecord}) => followUpRecord.showEditBtn,
        isEditFlag: ({followUpRecord}) => followUpRecord.isEdit
      })
    },
    activated () {
      this.params = util.deepClone(this.addFollow)
      this.showEditBtn = this.showEditBtnFlag
      this.isEdit = this.isEditFlag
      this.imgSrcArr = this.addFollow.attach
      this.submitFlag = false
      if (this.params.businessType == 2 && this.isEdit) {
        //查询某个潜在客户跟进
        this.pInvestorFollow()
      } else if (this.params.businessType == 1 && this.isEdit) {
        //查询某个客户跟进
        this.investorFollow()
      }
    },
    mounted () {

    },
    beforeRouteLeave (to, from, next) {
      if (to.name == 'list') {
        var follow = {
          businessType: '',
          followId: '',
          InvestorId: '',
          name: '',
          followType: '',
          followTypeName: '',
          followDesc: '',
          followNote: '',
          attach: []
        }
        this.$store.dispatch('updateAddFollow', follow)
      } else if (to.name == 'potentialCustomer' || to.name == 'accountOverView' || to.name == 'businessPipeline' || to.name == 'followUpRecord') {
        var follow = this.addFollow
        follow.businessType = ''
        follow.followId = ''
        this.$store.dispatch('updateAddFollow', follow)
      }
      next()
    },
    methods: {

      readImageFront (event) {
        this.$loading.toggle('')
        let _this = this
        _this.readImage(event, 'fileFront', () => {
          _this.cardFront = 'has-file'
          setTimeout(() => {
            _this.$loading.hide()
          }, 0)
        })
      },

      readImage (event, id, callback) {
        var _this = this
        let file = this.file = event.target.files[0]

        if (!file) {
          callback(null)
          return false
        }

        let reader = new window.FileReader()
        reader.onload = () => {
          let data = reader.result
          // 粗略的压缩图片。
          let quality = 0.7
          this.dealImage(data, {quality: quality}, (base64) => {
            //存储 将选中的图片
            _this.imgSrcArr.push(base64)
            callback()
          })

          reader = null
        }
        reader.readAsDataURL(file)
      },

      dealImage (path, obj, callback) {
        /**
         * 图片压缩，默认同比例压缩
         * @param {Object} path
         *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
         * @param {Object} obj
         *   obj 对象 有 width， height， quality(0-1)
         * @param {Object} callback
         *   回调函数有一个参数，base64的字符串数据
         */
        let img = new Image()
        img.src = path
        img.onload = function () {
          let that = this
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h
          w = obj.width || w
          h = obj.height || (w / scale)

          // 宽高不操过1500
          if (w > 1500) {
            w = 1500
            h = w / scale
          }

          if (h > 1500) {
            h = 1500
            w = h * scale
          }

          //生成canvas
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          // 创建属性节点
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(that, 0, 0, w, h)
          img = null

          // 图像质量
          let quality = 1  // 默认图片质量为1
          // canvas转换本身就会压缩图片
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality
          }

          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality)
          canvas = null

          // 回调函数返回base64的值
          callback(base64)
        }
      },

      submit () {
        var _this = this
        if (_this.submitFlag) {
          //防止重复提交
          return
        }
        if (!_this.params.InvestorId) {
          _this.$toast('请选择客户！')
          return
        } else if (!_this.params.followType && this.params.businessType == 1) {
          _this.$toast('请选择问题类型！')
          return
        } else if (!_this.params.followDesc) {
          _this.$toast('请输入跟进内容！')
          return
        }
        _this.submitFlag = true
        _this.$$loading()
        _this.params.userId = this.info.userId
        _this.params.attach = _this.imgSrcArr
        var url = PBHttpServer.cmHelper.serverUrl
        var temp = util.deepClone(_this.params)
        var params = {}
        if (this.params.businessType == 1) {
          if (!this.addFollow.followId) {
            //新增留存客户跟进
            url += 'investorFollow/detail/' + _this.params.userId + '/' + _this.params.InvestorId
            params = temp
          } else {
            //编辑留存客户跟进
            url += 'investorFollow/detail/' + _this.params.userId + '/' + _this.params.InvestorId + '/' + this.params.followId
            params = temp
          }
        } else {
          //新增潜在客户跟进
          url += 'pInvestorFollow/detail/' + _this.params.userId + '/' + _this.params.InvestorId
          params.userId = temp.userId
          params.pInvestorId = temp.InvestorId
          params.followDesc = util.getDate() + ' ' + temp.followDesc
          params.attach = temp.attach
        }
        var follow = {
          businessType: '',//1:留存客户跟进   2:潜在客户跟进
          followId: '',   //客户跟进Id
          InvestorId: '', //投资者ID
          name: '',       //投资者姓名
          followType: '', //跟进类型code
          followTypeName: '', //跟进类型
          followDesc: '', //内容
          followNote: '', //备注（处理结果）
          attach: []      //附件列表
        }

        if (this.params.followId) {
          _this.$axios.put(url, params, {headers: {id: this.info.token}}).then(function (result) {
            _this.$$loaded()
            var msg = ''
            if (result.data.retHead == '0') {
              msg = '保存成功！'
            } else {
              msg = '失败！'
            }
            _this.$store.dispatch('updateAddFollow', follow)
            _this.$toast(msg)
            // _this.$alert({
            //   maskClosable: true,
            //   btns: [{
            //       text: '关闭',
            //       click() {
            //           console.log('close!!!');
            //       },
            //   }],
            //   title: '<span class="text-default">提示</span>',
            //   message: msg,
            // });
            setTimeout(() => {
              _this.$router.back()
            }, 3000)
          }).catch(function (err) {
            console.log('服务器异常', err)
          })
        } else {
          _this.$axios.post(url, params, {headers: {id: this.info.token}}).then(function (result) {
            _this.$$loaded()
            var msg = ''
            if (result.data.retHead == '0') {
              msg = '保存成功！'
            } else {
              msg = '失败！'
            }
            _this.$store.dispatch('updateAddFollow', follow)
            _this.$toast(msg)
            // _this.$alert({
            //   maskClosable: true,
            //   btns: [{
            //       text: '关闭',
            //       click() {
            //           console.log('close!!!');
            //       },
            //   }],
            //   title: '<span class="text-default">提示</span>',
            //   message: msg,
            // });
            setTimeout(() => {
              _this.$router.back()
            }, 3000)
          }).catch(function (err) {
            console.log('服务器异常', err)
          })
        }

      },

      removePreImg (index) {
        this.imgSrcArr.splice(index, 1)
      },

      //选择【问题类型】
      setQType () {
        var _this = this
        var follow = this.addFollow
        follow.followType = this.params.followType
        _this.params.followTypeName = util.followCodeToType(this.params.followType)
        follow.followTypeName = _this.params.followTypeName
        this.$store.dispatch('updateAddFollow', follow)
      },
      //跳转用户信息列表页面
      goToCusInfoList () {
        var _this = this
        if (this.isEdit) { return }
        var p = _this.params
        p.attach = _this.imgSrcArr
        this.$store.dispatch('updatepJumpFlag', 2)
        this.$store.dispatch('updateAddFollow', p)
        //this.$router.push('/customerInfoList');
        setTimeout(function () {
          _this.$router.push({
            name: 'customerInfoList'
          })
        }, 300)

      },
      //查询某个潜在客户跟进
      pInvestorFollow () {
        var _this = this
        _this.$$loading()
        var url = PBHttpServer.cmHelper.serverUrl + 'pInvestorFollow/detail/' + _this.info.userId + '/' + _this.params.InvestorId

        _this.$axios.get(url, {headers: {id: this.info.token}}, null).then(function (result) {
          _this.$$loaded()
          var data = result.data.data

          _this.params.name = data.detail[0].INVESTOR_NAM
          if (data.detail[0].FOLLOWDESC) {
            data.detail[0].FOLLOWDESC = (data.detail[0].FOLLOWDESC.replace(/\\n/g, '|')).split('|')
            if ((data.detail[0].FOLLOWDESC)[0] == '') {
              data.detail[0].FOLLOWDESC.splice(0, 1)
            }
          }
          if (data.attach.length > 0) {
            _this.imgSrcArr = []
            for (var i in data.attach) {
              _this.imgSrcArr.push(data.attach[i].FILEDATA)
            }
          }
          _this.detail = data
        }).catch(function (err) {
          console.log('服务器异常', err)
        })
      },
      //查询某个客户跟进
      investorFollow () {
        var _this = this
        _this.$$loading()
        var url = PBHttpServer.cmHelper.serverUrl + 'investorFollow/detail/' + _this.info.userId + '/' + _this.params.InvestorId + '/' + _this.params.followId
        _this.$axios.get(url, {headers: {id: this.info.token}}, null).then(function (result) {
          _this.$$loaded()
          var data = result.data.data

          _this.params.name = data.detail[0].INVESTOR_NAM
          _this.params.followType = util.followTypeToCode(data.detail[0].PROBLEM_TYP)
          _this.params.followTypeName = data.detail[0].PROBLEM_TYP
          _this.params.followDesc = data.detail[0].PROBLEM_DESC
          _this.params.followNote = data.detail[0].PROBLEM_PROCESS_RESULT
          if (data.attach.length > 0) {
            _this.imgSrcArr = []
            for (var i in data.attach) {
              _this.imgSrcArr.push(data.attach[i].FILEDATA)
            }
          }
          _this.detail = data
        }).catch(function (err) {
          console.log('服务器异常', err)
        })
      },

      getDate (t) {
        return util.getDate(t)
      },

      //图片预览
      preview (FILEDATA) {
        this.$router.push({path: '/preview', query: {imgurl: FILEDATA}})
      }

    }
  }
</script>
