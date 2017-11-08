<template>

    <div class="cmTrends addAndEdit">

        <div>
            <common-nav>
                <div slot="body">
                    <span>新建跟进</span>
                </div>
                <div slot="footer" class="addFollow" @click="submit()">
                    完成
                </div>
            </common-nav>
        </div>

        <div class="container">

           <div class="group">
               <a class="cell" @click="goToCusInfoList()">
                    <span v-if="params.businessType==1" class="cell-body">{{params.name || '客户'}}</span>
                    <span v-if="params.businessType==2" class="cell-body">潜在客户：{{params.name}}</span>
                    <div class="cell-footer">
                        <img src="../../images/followUpRecord/img03.png"/>
                    </div>
                </a>
                <div v-if="params.businessType!=1" class="historyFollow">
                  <div><span>2017-10-22</span> 跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进</div>
                  <div><span>2017-10-22</span> 跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进跟进</div>
                </div>
                <div v-if="params.businessType!=1" class="enclosure">
                    <div class="group">
                        <a class="cell">
                            <img class="toDetail" src="../../images/followUpRecord/img08.png"/>
                            <span class="cell-body">
                                <img src="../../images/followUpRecord/img06.png"/>
                                图片 2012131351212211.jpg
                            </span>
                            <span class="cell-footer">235K</span>
                        </a>
                    </div>
                </div>
                <a class="cell" v-if="params.businessType==1">
                    <span class="cell-body">{{qTypeName || '问题类型'}}</span>
                    <div class="cell-footer">
                        <img src="../../images/followUpRecord/img03.png"/>
                    </div>
                    <select class="qType" v-model="qType" @change="setQType()">
                        <option value="">请选择</option>
                        <option value="01">日常事务</option>
                        <option value="02">行情推送</option>
                        <option value="03">答疑解惑</option>
                        <option value="04">经验指导</option>
                        <option value="05">持仓异常查询</option>
                        <option value="06">下单错误投诉</option>
                    </select>
                </a>
                
           </div>

           <div class="group">
                <a class="cell no-padding">
                    <span class="cell-body">
                        <div class="textarea">
                            <textarea placeholder="新增跟进情况" rows="5" class="textarea-input" v-model="params.followDesc"></textarea>
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

            <div v-if="params.businessType==1"><textarea placeholder="处理结果" rows="5" class="result" v-model="params.followNote"></textarea></div>

            <div v-if="params.businessType==1" class="lastEditDate text-center">
                创建时间<span>2017-09-09</span> 最后更新时间<span>2017-10-09</span>
            </div>

        </div>

    </div>

  
</template>

<script>
    import {mapState} from 'vuex'
    import moment from "moment";
    import axios from 'axios';
    import browser from '../../utils/browser';
    import util from '../../utils/util';

    export default {

        data() {
            return {
                cardFront: 'no-file',
                imgSrcArr : [],
                params : {},
                qType : '',
                qTypeName : '',
                userId : 'sysadmin',
            }
        },
        computed: {
          ...mapState({
            addFollow: ({followUpRecord}) => followUpRecord.addFollow,
            jumpFlag: ({followUpRecord}) => followUpRecord.jumpFlag
          })
        },
        mounted() {
            this.params = this.addFollow;
            if(this.params.businessType==2){
              //查询某个潜在客户跟进
              this.pInvestorFollow();
            }
            //this.$store.dispatch('updateAddFollow', this.ccSetTime1)
        },

        methods: {

            readImageFront (event) {
                this.$loading.toggle('')
                let _this = this;
                _this.readImage(event, 'fileFront', () => {
                    _this.cardFront = 'has-file'
                    setTimeout(() => {
                        _this.$loading.hide()
                    }, 0)
                })
            },

            readImage (event, id, callback) {
                var _this = this;
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
                    _this.imgSrcArr.push(base64);
                    callback();
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

            submit(){
                var _this = this;
                _this.params.userId = this.userId;
                _this.params.attach = _this.imgSrcArr;
                var url = PBHttpServer.apply.serverUrl;
                var temp = util.deepClone(_this.params);
                var params = {};
                if(this.params.businessType==1){
                  if(!this.addFollow.followId){
                    //新增留存客户跟进
                    url += "investorFollow/detail/" + _this.params.userId + "/" + _this.params.InvestorId;
                    params = temp;
                  }else{
                    //编辑留存客户跟进
                    url += "investorFollow/detail/" + _this.params.userId + "/" + _this.params.InvestorId + "/" + this.addFollow.followId;
                    params = temp;
                  }
                }else{
                  //新增潜在客户跟进
                  url += "pInvestorFollow/detail/" + _this.params.userId + "/" + _this.params.InvestorId;
                  params.userId = temp.userId;
                  params.pInvestorId = temp.InvestorId;
                  params.followDesc = temp.followDesc;
                  params.Attach = temp.attach;
                }
                
                _this.$axios.post(url, params).then(function(result) {
                    console.log(result);
                    if(result.data.retHead=="0"){
                      _this.$alert({
                          maskClosable: true,
                          message: '成功！！！',
                          btns: [{
                            text: '确认'
                          }],
                      });
                    }
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            },

            removePreImg(index){
                this.imgSrcArr.splice(index, 1);
            },

            //选择【问题类型】
            setQType(){
                var _this = this;
                var follow = this.addFollow;
                follow.followType = this.qType;
                switch(this.qType){
                    case '01': _this.qTypeName = '日常事务';break;
                    case '02': _this.qTypeName = '行情推送';break;
                    case '03': _this.qTypeName = '答疑解惑';break;
                    case '04': _this.qTypeName = '经验指导';break;
                    case '05': _this.qTypeName = '持仓异常查询';break;
                    case '06': _this.qTypeName = '下单错误投诉';break;
                    default: _this.qTypeName = '';break;
                }
                follow.followTypeName = this.qTypeName;
                this.$store.dispatch('updateAddFollow', follow);
            },
            //跳转用户信息列表页面
            goToCusInfoList(){
              this.$store.dispatch('updatepJumpFlag', 2);
              this.$router.push('/customerInfoList');
            },
            //查询某个潜在客户跟进列表
            pInvestorFollow(){
                var _this = this;
                var url = PBHttpServer.apply.serverUrl + "pInvestorFollow/list/" + _this.userId + "/" + _this.params.InvestorId;
                _this.$axios.get(url,null).then(function(result) {
                    console.log(result);
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            }

        }
    }
</script>
