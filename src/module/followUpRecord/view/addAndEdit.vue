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
               <a class="cell" href="#/customerInfo">
                    <span class="cell-body">{{params.name || '客户'}}</span>
                    <div class="cell-footer">
                        <img src="../images/img03.png"/>
                    </div>
                </a>
                <a class="cell">
                    <span class="cell-body">{{qTypeName || '问题类型'}}</span>
                    <div class="cell-footer">
                        <img src="../images/img03.png"/>
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
                            <textarea placeholder="问题内容" rows="5" class="textarea-input" v-model="params.followDesc"></textarea>
                            <div class="upload-img">
                                <div v-if="imgSrcArr.length > 0" class="showImgArea" v-for="(i, index) in imgSrcArr">
                                    <i class="removeImg" @click="removePreImg(index)">&nbsp;</i>
                                    <img :src="i"/>
                                </div>
                                <div v-if="imgSrcArr.length == 0" class="showImgArea">
                                    <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageFront">
                                    <img src="../images/img01.png" id="fileFront"/>
                                </div>
                                <div v-if="imgSrcArr.length > 0 && imgSrcArr.length <3" class="showImgArea">
                                    <input type="file" accept="image/png,image/jpeg,image/jpg" @change="readImageFront">
                                    <img src="../images/img02.png"/>
                                </div>
                            </div>
                        </div>
                    </span>
                </a>
            </div>

            <div><textarea placeholder="处理结果" rows="5" class="result" v-model="params.followNote"></textarea></div>

            <div class="lastEditDate text-center">
                创建时间<span>2017-09-09</span> 最后更新时间<span>2017-10-09</span>
            </div>

        </div>

        <!-- <picker v-model="defaultCity" size="sm">
            <picker-option value="北京">北京</picker-option>
            <picker-option value="上海">上海</picker-option>
            <picker-option value="广州">广州</picker-option>
            <picker-option value="南京">南京</picker-option>
            <picker-option value="杭州">杭州</picker-option>
            <picker-option value="天津">天津</picker-option>
            <picker-option value="深圳">深圳</picker-option>
            <picker-option value="成都">成都</picker-option>
            <picker-option value="武汉">武汉</picker-option>
            <picker-option value="厦门">厦门</picker-option>
        </picker> -->

    </div>

  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../common/browser';

    export default {

        data() {
            return {
                cardFront: 'no-file',
                imgSrcArr : [],
                params : this.$store.state.addFollow,
                qType : '',
                qTypeName : '',
                userId : 'sysadmin'
            }
        },

        mounted() {
            console.log(this.params);
            //this.$store.dispatch('updateAddFollow', this.ccSetTime1)
        },

        methods: {

            readImageFront (event) {
                this.$loading.toggle('')
                let this$ = this;
                this$.readImage(event, 'fileFront', () => {
                    this$.cardFront = 'has-file'
                    setTimeout(() => {
                        this$.$loading.hide()
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
                console.log(_this.params);
                if(!_this.params.InvestorId) {
                  _this.$alert({
                        maskClosable: true,
                        message: '请选择客户',
                        btns: [{
                          text: '确认'
                        }],
                  });
                  return; 
                }else if(!_this.qType) {
                  _this.$alert({
                        maskClosable: true,
                        message: '请选择问题类型',
                        btns: [{
                          text: '确认'
                        }],
                  });
                  return; 
                }
                
                _this.params.userId = this.userId;
                _this.params.attach = _this.imgSrcArr;

                var url = PBHttpServer.apply.serverUrl + "investorFollow/detail/" + _this.params.userId + "/" + _this.params.InvestorId;
                
                _this.$axios.post(url, _this.params).then(function(result) {
                    console.log(result);
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
                var follow = this.$store.state.addFollow;
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
                console.log(this);
            },
            //查询某个潜在客户跟进列表
            pInvestorFollow(){
                var _this = this;
                var url = PBHttpServer.apply.serverUrl + "pInvestorFollow/list/" + _this.userId + "/" + _this.params.InvestorId;
                _this.$axios.post(url,null).then(function(result) {
                    console.log(result);
                }).
                catch(function(err) {
                    console.log('服务器异常', err)
                });
            }

        }
    }
</script>
