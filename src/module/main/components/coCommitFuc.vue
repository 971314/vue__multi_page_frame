<template>
  <div class="common-func">
    <div class="swiper-container parent-wrap swiper-container2">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(items, index) in showContent">
          <div class="item-warp">
            <div class="warp-item" :style="{width: swipeItemWidth}" v-for="item in items">
              <div class="item-content">
                <toast-btn :addr="item.url" @clicks="aClick && aClick(item)">
                  <img :src="'images/'+item.image1">
                  <p>{{item.title}}</p>
                </toast-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="showDot" class="pagination pagination2"></div>
      <!--	<swipe :dots="hasDots" :autoplay="false" v-if="swipeRefresh">
                  <swipe-item v-for="(items, index) in showContent">
                      <div class="item-warp">
                          <div class="warp-item" :style="{width: swipeItemWidth}" v-for="item in items">
                              <toast-btn :addr="item.url" @clicks="aClick && aClick(item)">
                                  <img :src="'images/'+item.image1">
                                  <p>{{item.title}}</p>
                              </toast-btn>
                          </div>
                      </div>
                  </swipe-item>
              </swipe>-->
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import {Pagination} from 'swiper'
  export default {
    name: 'commitfuc',
    props: {
      coInstance: {
        type: String,
        default: ''
      },
      isUserDefined: {
        type: Boolean,
        default: true
      },
      isShowDots: {
        type: Boolean,
        default: null
      },
      maxPage: {
        type: Number,
        default: 2
      },
      swipeRow: {
        type: Number,
        default: 2
      },
      singleRowNum: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        addURL: "pobo:uncheck=1&pageId=900005&url=main/view/index-add.html",
        addImage: "main-func-tianjia.png",
        addTitle: "添加",
        addID: "add",
        itemLists: {},
        showDot: false,
        showContent: [],
        swipeRefresh: true,
        swiperInstance: null
      }
    },
    computed: {
      hasDots() {
        if (this.isShowDots != null) {
          return this.isShowDots
        } else {
          if (this.showContent.length < 2) {
            return false;
          }
          else if (this.showContent.length >= 2) {
            return true;
          }
          else {
            return false;
          }
        }
      },
      itemList() {
        if (this.itemLists) {
          return this.itemLists;
        }
      },
      itemNum() {
        return this.swipeRow * this.singleRowNum
      },
      swipeItemWidth() {
        return ((100 / this.singleRowNum) - 0.1) + '%'
      },
      MaxNum() {
        if (this.isUserDefined) {
          return this.maxPage * this.itemNum - 1
        } else {
          return this.maxPage * this.itemNum
        }
      },
      getCustoms() {
        if (this.itemList.customs) {
          return this.itemList[this.coInstance]
        } else {
          return ''
        }
      }
    },
    methods: {
      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addReloadFunByKey('commitFun', this.pageReload);
        } else {
          pbPage.initPage({
            reload: this.pageReload
          });
          //  	this.pageReload();
        }
      },
      pageReload() {//返回页面时原生加载的方法
        console.log('reload')
        if (pbE.SYS().getPrivateData('reload') == 1 || pbE.SYS().getPrivateData('reload') == '1') {
          this.swipeRefresh = false;
          this.showContent = this.showContents();
          pbE.SYS().storePrivateData('reload', 0)
        }
        setTimeout(() => {
          this.swipeRefresh = true;
          this.showContent = this.showContents();
        }, 10);
      },
      getCustomData() {//获取数据
        if (pbE.isPoboApp) {
          this.itemLists = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json"));
          this.showContent = this.showContents();
          console.log(this.showContent)
        } else {
          this.$axios.get(this.confUrl + 'main.json').then((data) => {
            this.itemLists = data.data;
            this.showContent = this.showContents();
          }).catch((err) => {
            this.$axios.get("../"+ this.pbconfUrl + 'main.json').then((data) => {
              this.itemLists = data.data;
              this.showContent = this.showContents();
            });
            console.log('服务器异常', err)
          });
        }
      },
      showContents() {  //处理功能区逻辑
        var localMain = this.getCustoms;
        if (pbE.isPoboApp) {
          if (pbE.SYS().isHasLocalFile('main', 1)) {
            localMain = pbE.SYS().readLocalFile('main', 1);
            localMain = JSON.parse(localMain);
            if (localMain && this.getCustoms) {
              if (!localMain.replaceVersion || localMain.replaceVersion != this.getCustoms.replaceVersion)
              {
                   localMain = this.getCustoms;
                   pbE.SYS().writeLocalFile('main', 1, JSON.stringify(this.getCustoms));
              }
              else if (localMain.version != this.getCustoms.version) {
                localMain.version = this.getCustoms.version
                var temp = {}, temp2 = {}
                for (var i = 0; i < localMain.contents.length; i++) {
                  temp[localMain.contents[i].title] = localMain.contents[i]
                }

                for (var j = 0; j < this.getCustoms.contents.length; j++) {
                  temp2[this.getCustoms.contents[j].title] = this.getCustoms.contents[j]
                  if (!temp[this.getCustoms.contents[j].title]) {
                    var obj = {}
                    obj = this.getCustoms.contents[j]
                    obj.flag = true
                    localMain.contents.unshift(obj)
                  }
                }
                var newsList = []
                for (var j = 0; j < localMain.contents.length; j++) {
                  var d = localMain.contents[j], d2 = temp2[d.title]
                  if (d2) {
                    d.checked = d2.checked;
                    d.image1 = d2.image1;
                    d.image2 = d2.image2;
                    d.url = d2.url;
                    newsList.push(d)
                  }
                }
                localMain.contents = newsList
                pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain))
              }
            } else {
              pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain = this.getCustoms))
            }
          } else {
            pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain = this.getCustoms))
          }
        }

        var arr = []
        var contentArr = []
        var addObj = {
          "title": this.addTitle,
          "checked": "1",
          "image1": this.addImage,
          "image2": this.addImage,
          "url": this.addURL,
          "id": this.addID
        }
        var sizeFlag = 0
        var length = localMain.contents.length
        if (length > 0) {
          for (var i = 0; i < length; i++) {
            if (localMain.contents[i].checked === '1' && sizeFlag < this.MaxNum) {
              sizeFlag++
              arr.push(localMain.contents[i])
              if (arr.length % this.itemNum === 0) {
                contentArr.push(arr)
                arr = []
              }
            }
          }
        }
        if (this.isUserDefined) {
          arr.push(addObj)
        }
        if (contentArr.length < this.maxPage) {
          if (arr.length == 0) {
            return contentArr;
          }
          contentArr.push(arr);
          // //添加空白滚动页
          // if (contentArr.length == this.maxPage) {
          // 	return contentArr;
          // }
          // var conLength = contentArr.length;
          // for(var i = 0; i < this.maxPage-conLength; i++) {
          // 	arr = []
          // 	contentArr.push(arr)
          // }
          return contentArr;
        } else if (contentArr.length == this.maxPage) {
          return contentArr
        }
      }
    },
    watch: {
      'showContent'(val, oldVal) {
        this.showDot = false;
        if (this.swiperInstance) {
          setTimeout(() => {
            this.swiperInstance.destroy(true, false);
          }, 10);

        }
        if (val.length > 1) {
          this.showDot = true;
          this.swiperInstance = new Swiper('.swiper-container2', {
            pagination: '.pagination2',
            slidesPerView: 1,
            paginationClickable: true,
            observer: true,
            observeParents: true,
            resistance: true,
            onSlideChangeEnd: function (swiper) {
              swiper.update();
            }
          });
        }
      }
    },
    created() {
      this.getCustomData && this.getCustomData();
      this.initPage();
    }
  }
</script>
