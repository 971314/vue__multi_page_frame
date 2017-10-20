<template>
  <div class="pb-activity">
    <div class="av-dropdown-group">
      <div class="av-dropdown-selected">
        <div class="av-selected-items" @click="showSelectDiv2">
          <span v-if="!isFirstClick2" class="selected-items-text" :class="{'choose-active': isShow2}"
                v-text="selectedList2[isSelected2-1].actType">分类</span>
          <span v-if="isFirstClick2" class="selected-items-text" :class="{'choose-active': isShow2}">分类</span>
          <span class="down-dria" :class="{'up-choose': isShow2}"></span>
          <div class="split-line"></div>
        </div>
        <div class="av-selected-items" @click="showSelectDiv">
          <span v-if="!isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}"
                v-text="selectedList[isSelected-1].region.length > 5 ? `${selectedList[isSelected-1].region.slice(0,5)}..` : selectedList[isSelected-1].region">区域</span>
          <span v-if="isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}">区域</span>
          <span class="down-dria" :class="{'up-choose': isShow}"></span>
          <div class="split-line"></div>
        </div>
        <div class="av-selected-items" @click="showSelectDiv1">
          <span v-if="!isFirstClick1" class="selected-items-text" :class="{'choose-active': isShow1}"
                v-text="selectedList1[isSelected1-1].name">排序</span>
          <span v-if="isFirstClick1" class="selected-items-text" :class="{'choose-active': isShow1}">排序</span>
          <span class="down-dria" :class="{'up-choose': isShow1}"></span>
        </div>
        <div class="dropdown-selected" v-show="isShow">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected === (index+1)}"
               @click="getSelectItem(index, item)" v-for="(item, index) in selectedList" :key="index">
            {{item.region}}
            <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>

        <div class="dropdown-selected" v-show="isShow1">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected1 === (index+1)}"
               @click="getSelectItem1(index,item)" v-for="(item, index) in selectedList1" :key="index">
            {{item.name}}
            <div class="dropdown-selected-active" v-show="isSelected1 === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow1" @click="closeSelectedDiv1()"></div>

        <div class="dropdown-selected" v-show="isShow2">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected2 === (index+1)}"
               @click="getSelectItem2(index,item)" v-for="(item, index) in selectedList2" :key="index">
            {{item.actType}}
            <div class="dropdown-selected-active" v-show="isSelected2 === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow2" @click="closeSelectedDiv2()"></div>
      </div>
    </div>
    <div v-show="avtivityList.length > 0" class="active-list-container">
      <div class="pb-activity-content">
        <div v-for="activity in avtivityList" class="active-items" @click="goToSignUp(activity)" v-cloak>
          <!--<div class="activity-bg1" :style="{'background-image': `url(${activity.imgPath})`}"></div>-->
          <div class="activity-bg bg-blur" :style="{'background-image': `url(${activity.imgPath})`}"></div>
          <div class="cover-layer"></div>
          <div v-if="(activity.remainDay / 1) <= 10 && (activity.remainDay / 1) >= 0" class="left-top-tips">
            <div class="left-top-content">{{activity.remainDay | numberCheck}}</div>
          </div>
          <div v-else-if="(activity.remainDay / 1) <= 0" class="left-top-tips baoming-jieshu"></div>
          <div v-if="false" class="right-top-tips">调研</div>
          <div v-if="activity.isEnroll" class="right-center-tips"></div>
          <div class="bg-blur-bottom"></div>
          <div class="bottom-content-tips">
            <div class="content-tips">
              <div class="left-tips-content">
                <img class="time-icon" src="../images/activitytime@2x.png"></img>
                <span class="time-content" v-text="activity.beginTime"></span>
              </div>
              <div v-if="activity.region" class="right-tips-content">
                <img class="location-icon" src="../images/activitylocation@2x.png"></img>
                <span class="location-content" v-text="activity.region"></span>
              </div>
              <div v-else class="right-tips-content">
                <img class="location-icon" src="../images/activityonline@2x.png"></img>
                <span class="location-content">线上</span>
              </div>
            </div>
          </div>
          <div class="center-tips">
            <div class="fitst-title-tips" v-text="activity.actName"></div>
          </div>
        </div>
        <div v-if="isMore" @click="query" class="active-more">点击加载更多</div>
      </div>
    </div>
    <div v-if="isNullData" class="pb-null-activity">
      <div class="null-active-content">
        <img class="null-active-img" src="../images/nullactive@2x.png"/>
        <p class="null-active-text">暂无数据</p>
      </div>
    </div>
    <div v-show="refreshView" class="temp_tp"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        refreshView: false,
        OriginScroll: 0,
        ScrollInterVal: null,
        isNullData: false,
        isMore: true,
        pageNumber: 1,
        pageSize: 3,
        region: '', // 地区名称
        regionId: '', //地区code
        zdySortCode: '', //自定义排序
        sortCode: '1', //排序方式
        isFirstClick2: true,
        isFirstClick: true,
        isFirstClick1: true,
        isShow: false,  //是否显示弹层---左边弹出层
        isShow1: false, //右边弹出层
        isShow2: false, //左边弹出层
        isSelected: 1, //是否选中  --左边弹出层
        isSelected1: 1, //是否选中  --右边弹出层
        isSelected2: 1,  //左边弹出层
        scrollTopDistance: 0, //滚动条距离上面的距离
        selectedList: [ //地区
          {
            region: `全部`,
            regionId: ``
          }
        ],
        selectedList1: [//选择条件数组
          {
            name: `最新发布`,
            code: `1`
          },
          {
            name: `最近开场`,
            code: `2`
          },
          {
            name: `热门参与`,
            code: `0`
          }
        ],
        selectedList2: [//选择条件数组
          {
            actType: `默认`,
            typeId: ``
          }
        ],
        avtivityList: [ //活动列表
        ]
      }
    },
    computed: {
      ...mapState([
        'currentId',
        'currentAct',
        'remainDay',
        'enrollAcID'
      ])
    },
    mounted() {
      this.getAreaList();
      this.getZdySortList();
      this.getActiveList();
//      document.querySelector('.active-list-container').addEventListener('scroll', () => {
//        if (this.ScrollInterVal == null) {
//          this.ScrollInterVal = setInterval(this.checkScrollStop, 1000);
//        }
//        this.OriginScroll = document.querySelector('.active-list-container').scrollTop;
//      })
    },
    activated(){
      document.getElementById('navbarContent').style.display = 'block';
      document.querySelector('body').style.background = '#f7f7fa';
      document.querySelector('html').style.background = '#f7f7fa';
      document.querySelector('.active-list-container').scrollTop = this.scrollTopDistance;
      this.refreshView = true;
      setTimeout(() => {
        this.refreshView = false;
      }, 300);
      if (this.enrollAcID) {
        this.changeIsEnroll();
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('updateenrollAcID', '');
      next();
    },
    methods: {
      checkScrollStop() {//判断滚动条是否静止
        if (document.querySelector('.active-list-container').scrollTop == this.OriginScroll) {
          clearInterval(this.ScrollInterVal);
          this.ScrollInterVal = null;
          this.refreshView = true;
          setTimeout(() => {
            this.refreshView = false;
          }, 300);
        }
      },
      changeIsEnroll() {
        this.avtivityList.map((item) => {
          if (item.actId == this.enrollAcID) {
            item.isEnroll = true;
          }
        });
      },
      getZdySortList() { //获取用户自定义分类列表
        let params = {
          "func": "11105",
          "data": [{}]
        }
        this.$axios.post(`${this.serverUrl}${this.UrlInfo['queryZdySortList'].url}`, params, Object.assign({}, {timeout: 10000}))
          .then((response) => {
            let result = response.data.data;
            this.selectedList2.splice(1, this.selectedList2.length);
            result.map((item) => {
              this.selectedList2.push(item);
            });
            console.log(response);
          })
          .catch((res) => {
            console.log(res);
          });
//        this.$post({restUrl: 'queryZdySortList', params: params, loading: true})
//          .then((response) => {
//            let result = response.data.data;
//            this.selectedList2.splice(1, this.selectedList2.length);
//            result.map((item) => {
//              this.selectedList2.push(item);
//            });
//            console.log(response);
//          })
//          .catch((res) => {
//            console.log(res);
//          })
      },
      query() {//获取所有的活动
        this.pageNumber++;
        let params = {
          "func": "11101",
          "data": [{
            "tab": "1",
            "regionId": this.regionId,
            "sort": this.sortCode,
            "typeId": this.zdySortCode,
            "beginTime": "",
            "endTime": "",
            "userId": this.userId,
            "pageNumber": this.pageNumber,
            "pageSize": this.pageSize
          }]
        };
        this.$$loading();
        this.$axios.post(`${this.serverUrl}${this.UrlInfo['queryActiveList'].url}`, params, Object.assign({}, {timeout: 10000}))
          .then((response) => {
            this.$$loaded();
            let avtiveList = response.data.data;
//            this.avtivityList.splice(0, this.avtivityList.length);
            avtiveList.map((item) => {
//              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});  //ios上没有作用
              item.beginTime = item.beginTime.split(' ')[0];
              item.isEnroll = item.isEnroll == '0' ? false : true;
              item.imgPath = `${PBHttpServer.activity.serverUrl}${item.imgPath}`;
//              item.imgPath = `http://192.168.6.52:8890/${item.imgPath}`;
              this.avtivityList.push(item);
            });
            if (avtiveList.length < this.pageSize) {
              this.isMore = false;
            } else {
              this.isMore = true;
            }
          })
          .catch((res) => {
            this.$$loaded();
            console.log(res);
          })

//        this.$post({restUrl: 'queryActiveList', params: params, loading: true})
//          .then((response) => {
//            let avtiveList = response.data.data;
////            this.avtivityList.splice(0, this.avtivityList.length);
//            avtiveList.map((item) => {
////              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});  //ios上没有作用
//              item.beginTime = item.beginTime.split(' ')[0];
//              item.isEnroll = item.isEnroll == '0' ? false : true;
//              item.imgPath = `${PBHttpServer.activity.serverUrl}${item.imgPath}`;
////              item.imgPath = `http://192.168.6.52:8890/${item.imgPath}`;
//              this.avtivityList.push(item);
//            });
//            if (avtiveList.length < this.pageSize) {
//              this.isMore = false;
//            } else {
//              this.isMore = true;
//            }
//          })
//          .catch((res) => {
//            console.log(res);
//          });
      },
      getActiveList() {//获取所有的活动
        this.pageNumber = 1;
        let params = {
          "func": "11101",
          "data": [{
            "tab": "1",
            "regionId": this.regionId,
            "sort": this.sortCode,
            "typeId": this.zdySortCode,
            "beginTime": "",
            "endTime": "",
            "userId": this.userId,
            "pageNumber": this.pageNumber,
            "pageSize": this.pageSize
          }]
        };
        this.$$loading();
        this.$axios.post(`${this.serverUrl}${this.UrlInfo['queryActiveList'].url}`, params, Object.assign({}, {timeout: 10000}))
          .then((response) => {
            this.$$loaded();
            let avtiveList = response.data.data;
            this.avtivityList.splice(0, this.avtivityList.length);
            avtiveList.map((item) => {
//              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});  //ios上没有作用
              item.beginTime = item.beginTime.split(' ')[0];
              item.isEnroll = item.isEnroll == '0' ? false : true;
              item.imgPath = `${PBHttpServer.activity.serverUrl}${item.imgPath}`;
//              item.imgPath = `http://192.168.6.52:8890/${item.imgPath}`;
              this.avtivityList.push(item);
            });
            if (this.avtivityList.length <= 0) {
              this.isNullData = true;
            }
            if (avtiveList.length < this.pageSize) {
              this.isMore = false;
            } else {
              this.isMore = true;
            }
          })
          .catch((res) => {
            this.$$loaded();
            if (res.message.split(' ')[0] == 'timeout') { //延时操作
              this.$toast("请求超时，请稍后再试");
            } else {
              this.$toast("请求服务器失败，请稍后再试");
            }
            console.log(res);
          })
//        this.$post({restUrl: 'queryActiveList', params: params, loading: true})
//          .then((response) => {
//            let avtiveList = response.data.data;
//            this.avtivityList.splice(0, this.avtivityList.length);
//            avtiveList.map((item) => {
////              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});  //ios上没有作用
//              item.beginTime = item.beginTime.split(' ')[0];
//              item.isEnroll = item.isEnroll == '0' ? false : true;
//              item.imgPath = `${PBHttpServer.activity.serverUrl}${item.imgPath}`;
////              item.imgPath = `http://192.168.6.52:8890/${item.imgPath}`;
//              this.avtivityList.push(item);
//            });
//            if (avtiveList.length < this.pageSize) {
//              this.isMore = false;
//            } else {
//              this.isMore = true;
//            }
//          })
//          .catch((res) => {
//            console.log(res);
//          });
      },
      getAreaList() { //获取地区
        let params = {
          "func": "11104",
          "data": [{}]
        };
        this.$axios.post(`${this.serverUrl}${this.UrlInfo['queryActiveAreaList'].url}`, params, Object.assign({}, {timeout: 10000}))
          .then((response) => {
            this.firstEnter = false;
            let areaList = response.data.data;
            this.selectedList.splice(1, this.selectedList.length);
            areaList.map((item) => {
              this.selectedList.push(item);
            });
            console.log(response);
          })
          .catch((res) => {
            console.log(res);
          });
//        this.$post({restUrl: 'queryActiveAreaList', params: params})
//          .then((response) => {
//            this.firstEnter = false;
//            let areaList = response.data.data;
//            this.selectedList.splice(1, this.selectedList.length);
//            areaList.map((item) => {
//              this.selectedList.push(item);
//            });
//            console.log(response);
//          })
//          .catch((res) => {
//            console.log(res);
//          });
      },
      goToSignUp(item) { //跳到活动详情页面
        this.$store.dispatch('updateCurrentId', item.actId);
        this.$store.dispatch('updateremainDay', item.remainDay);
        this.$store.dispatch('updateCurrentAct', true);
        this.scrollTopDistance = document.querySelector('.active-list-container').scrollTop;
        this.$router.push({
          name: 'activityDetail'
        });
      },
      showSelectDiv() {
        if (this.isShow1 || this.isShow2) {
          this.isShow1 = false;
          this.isShow2 = false;
        }
        this.isShow = !this.isShow;
      },
      showSelectDiv1() {
        if (this.isShow || this.isShow2) {
          this.isShow = false;
          this.isShow2 = false;
        }
        this.isShow1 = !this.isShow1;
      },
      showSelectDiv2() {
        if (this.isShow || this.isShow1) {
          this.isShow = false;
          this.isShow1 = false;
        }
        this.isShow2 = !this.isShow2;
      },
      getSelectItem(index, item) {
        if (this.isFirstClick) {
          this.isFirstClick = false;
        }
        this.isShow = false;
        this.isSelected = index + 1;
        this.regionId = item.regionId;
        this.getActiveList();
      },
      getSelectItem1(index, item) {
        if (this.isFirstClick1) {
          this.isFirstClick1 = false;
        }
        this.isShow1 = false;
        this.isSelected1 = index + 1;
        this.sortCode = item.code;
        this.getActiveList();
      },
      getSelectItem2(index, item) {
        if (this.isFirstClick2) {
          this.isFirstClick2 = false;
        }
        this.isShow2 = false;
        this.isSelected2 = index + 1;
        this.zdySortCode = item.typeId;
        this.getActiveList();
      },
      closeSelectedDiv() {
        this.isShow = false;
      },
      closeSelectedDiv1() {
        this.isShow1 = false;
      },
      closeSelectedDiv2() {
        this.isShow2 = false;
      }
    }
  }
</script>
