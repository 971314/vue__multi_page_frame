<template>
  <div class="pb-lastaword">
    <div class="av-dropdown-group">
      <div class="av-dropdown-selected">
        <!--<div class="av-selected-items" @click="showSelectDiv">-->
        <!--<span v-if="!isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}"-->
        <!--v-text="selectedList[isSelected-1].name">时间</span>-->
        <!--<span v-if="isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}">时间</span>-->
        <!--<span class="down-dria" :class="{'up-choose': isShow}"></span>-->
        <!--<div class="split-line"></div>-->
        <!--</div>-->
        <div class="av-selected-items" @click="showSelectDiv">
          <span v-if="!isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}"
                v-text="selectedList[isSelected-1].actType">分类</span>
          <span v-if="isFirstClick" class="selected-items-text" :class="{'choose-active': isShow}">分类</span>
          <span class="down-dria" :class="{'up-choose': isShow}"></span>
          <div class="split-line"></div>
        </div>
        <div class="av-selected-items" @click="showSelectDiv1">
          <span v-if="!isFirstClick1" class="selected-items-text" :class="{'choose-active': isShow1}"
                v-text="selectedList1[isSelected1-1].region.length > 5 ? `${selectedList1[isSelected1-1].region.slice(0,5)}..` : selectedList1[isSelected1-1].region">区域</span>
          <span v-if="isFirstClick1" class="selected-items-text" :class="{'choose-active': isShow1}">区域</span>
          <span class="down-dria" :class="{'up-choose': isShow1}"></span>
          <div class="split-line"></div>
        </div>
        <div class="av-selected-items" @click="showSelectDiv2">
          <span v-if="!isFirstClick2" class="selected-items-text" :class="{'choose-active': isShow2}"
                v-text="selectedList2[isSelected2-1].name">排序</span>
          <span v-if="isFirstClick2" class="selected-items-text" :class="{'choose-active': isShow2}">排序</span>
          <span class="down-dria" :class="{'up-choose': isShow2}"></span>
        </div>
        <div class="dropdown-selected" v-show="isShow">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected === (index+1)}"
               @click="getSelectItem(index, item)" v-for="(item, index) in selectedList" :key="index">
            {{item.actType}}
            <div class="dropdown-selected-active" v-show="isSelected === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow" @click="closeSelectedDiv()"></div>

        <div class="dropdown-selected" v-show="isShow1">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected1 === (index+1)}"
               @click="getSelectItem1(index,item)" v-for="(item, index) in selectedList1" :key="index">
            {{item.region}}
            <div class="dropdown-selected-active" v-show="isSelected1 === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow1" @click="closeSelectedDiv1()"></div>

        <div class="dropdown-selected" v-show="isShow2">
          <div class="dropdown-selected-option" :class="{'activity-option-active': isSelected2 === (index+1)}"
               @click="getSelectItem2(index,item)" v-for="(item, index) in selectedList2" :key="index">
            {{item.name}}
            <div class="dropdown-selected-active" v-show="isSelected2 === (index+1)"></div>
          </div>
        </div>
        <div class="dropdown-selected-mask" v-show="isShow2" @click="closeSelectedDiv2()"></div>
      </div>
    </div>
    <div v-show="avtivityList.length > 0" class="active-list-container">
      <div class="pb-activity-content">
        <div class="active-items" v-for="avtivity in avtivityList" @click="goToSignUp(avtivity)" v-cloak>
          <div class="activity-bg bg-grey" :style="{'background-image': `url(${avtivity.imgPath})`}"></div>
          <div class="cover-layer"></div>
          <div v-if="false" class="left-top-tips"></div>
          <div v-if="false" class="right-top-tips">调研</div>
          <div class="bg-blur-bottom"></div>
          <div class="bottom-content-tips">
            <div class="content-tips">
              <div class="left-tips-content">
                <img class="time-icon" src="../images/activitytime@2x.png"></img>
                <span class="time-content" v-text="avtivity.beginTime"></span>
              </div>
              <div v-if="avtivity.region" class="right-tips-content">
                <img class="location-icon" src="../images/activitylocation@2x.png"></img>
                <span class="location-content" v-text="avtivity.region"></span>
              </div>
              <div v-else class="right-tips-content">
                <img class="location-icon" src="../images/activityonline@2x.png"></img>
                <span class="location-content">线上</span>
              </div>
            </div>
          </div>
          <div class="activity-over"></div>
          <div class="center-tips">
            <div class="fitst-title-tips" v-text="avtivity.actName"></div>
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
  export default{
    data() {
      return {
        refreshView: false,
        OriginScroll: 0,
        ScrollInterVal: null,
        isNullData: false,
        scrollTopDistance: 0, //滚动条距离上面的距离
        isMore: true,
        pageNumber: 1,
        pageSize: 3,
        zdySortCode: '',
        beginTime: '',
        endTime: '',
        region: '', // 地区名称
        regionId: '', //地区code
        sortCode: '1', //排序方式
        isFirstClick: true,
        isFirstClick1: true,
        isFirstClick2: true,
        isShow: false,  //是否显示弹层---中边弹出层
        isShow1: false, //右边弹出层
        isShow2: false, //左边弹出层
        isSelected: 1, //是否选中  --中边弹出层
        isSelected1: 1, //是否选中  --右边弹出层
        isSelected2: 1, //是否选中  --右边弹出层
        selectedList: [//选择条件数组
          {
            actType: `默认`,
            typeId: ``
          }
        ],
//        selectedList: [//选择条件数组
//          {
//            name: '不限时间',
//            code: ''
//          },
//          {
//            name: '近一周',
//            code: '0'
//          },
//          {
//            name: '近一月',
//            code: 1
//          },
//          {
//            name: '近三月',
//            code: 3
//          }
//        ],
        selectedList1: [
          {
            region: '全部',
            regionId: ''
          }
        ],
        selectedList2: [//选择条件数组
          {
            name: '发布时间',
            code: '1'
          },
          {
            name: '热门参与',
            code: '0'
          }
        ],
        avtivityList: [ //活动列表
        ]
      }
    },
    computed: {
      ...mapState([
        'currentId',
        'currentAct'
      ])
    },
//    created() {
//      this.$parent.activeIndex = 1;
//    },
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
      this.$parent.activeIndex = 1;
      document.querySelector('body').style.background = '#f7f7fa';
      document.querySelector('html').style.background = '#f7f7fa';
      document.getElementById('navbarContent').style.display = 'block';
      document.querySelector('.active-list-container').scrollTop = this.scrollTopDistance;
      this.refreshView = true;
      setTimeout(() => {
        this.refreshView = false;
      }, 300);
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
      query() {
        this.pageNumber++;
        let params = {
          "func": "11101",
          "data": [{
            "tab": "0",
            "regionId": this.regionId,
            "sort": this.sortCode,
            "typeId": this.zdySortCode,
            "beginTime": '',
            "endTime": '',
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
//              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});
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
            if (avtiveList.length <= 0) {
              this.$toast('没有更多了');
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
////              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});
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
//            if (avtiveList.length <= 0) {
//                this.$toast('没有更多了');
//            }
//          })
//          .catch((res) => {
//            console.log(res);
//          });
      },
      getZdySortList() { //获取用户自定义分类列表
        let params = {
          "func": "11105",
          "data": [{}]
        }

        this.$axios.post(`${this.serverUrl}${this.UrlInfo['queryZdySortList'].url}`, params, Object.assign({}, {timeout: 10000}))
          .then((response) => {
            let result = response.data.data;
            this.selectedList.splice(1, this.selectedList.length);
            result.map((item) => {
              this.selectedList.push(item);
            });
            console.log(response);
          })
          .catch((res) => {
            console.log(res);
          })

//        this.$post({restUrl: 'queryZdySortList', params: params, loading: true})
//          .then((response) => {
//            let result = response.data.data;
//            this.selectedList.splice(1, this.selectedList.length);
//            result.map((item) => {
//              this.selectedList.push(item);
//            });
//            console.log(response);
//          })
//          .catch((res) => {
//            console.log(res);
//          })
      },
      goToSignUp(item) { //跳到活动详情页面
        this.$store.dispatch('updateCurrentId', item.actId);
        this.$store.dispatch('updateCurrentAct', false);
        this.scrollTopDistance = document.querySelector('.active-list-container').scrollTop;
        this.$router.push({
          name: 'activityDetail'
        });
      },
      getCurrentTime() {
        let dateTime = new Date();
        return new Date(dateTime.setMonth(dateTime.getMonth()));
      },
      getTimeByParam(par) {
        let dateTime = new Date();
        return new Date(dateTime.setMonth(dateTime.getMonth() - par));
      },
      getTimeByParam1(par) {
        let dateTime = new Date();
        return new Date(dateTime.setDate(dateTime.getDate() - par));
      },
      getActiveList() {//获取所有的活动
        this.pageNumber = 1;
        let params = {
          "func": "11101",
          "data": [{
            "tab": "0",
            "regionId": this.regionId,
            "sort": this.sortCode,
            "typeId": this.zdySortCode,
            "beginTime": '',
            "endTime": '',
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
//              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});
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
////              item.beginTime = this.$$timeFormate({date: item.beginTime, format: 'Y-M-D'});
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
//
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
            let areaList = response.data.data;
            this.selectedList1.splice(1, this.selectedList1.length);
            areaList.map((item) => {
              this.selectedList1.push(item);
            });
          })
          .catch((res) => {
            console.log(res);
          })
//        this.$post({restUrl: 'queryActiveAreaList', params: params})
//          .then((response) => {
//            let areaList = response.data.data;
//            this.selectedList1.splice(1, this.selectedList1.length);
//            areaList.map((item) => {
//              this.selectedList1.push(item);
//            });
//          })
//          .catch((res) => {
//            console.log(res);
//          });
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
          this.isShow2 = false
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
        this.zdySortCode = item.typeId;
//        if (item.code == '') {
//        if (item.code == '') {
//          this.beginTime = '';
//          this.endTime = '';
//        } else if (item.code == '0') {
//
////          this.endTime = this.$$timeFormate({date: this.getCurrentTime(), format: 'YMD'});
//          let tempMonth = new Date().getMonth() + 1;
//          tempMonth = tempMonth > 9 ? tempMonth : '0' + tempMonth;
//          let tempDate = new Date().getDate();
//          tempDate = tempDate > 9 ? tempDate : '0' + tempDate;
//          this.endTime = '' + new Date().getFullYear() + tempMonth + tempDate;
////          this.beginTime = this.$$timeFormate({date: this.getTimeByParam1(7), format: 'YMD'});
//          let temp7Date = this.getTimeByParam1(7);
//          let temp7Month = temp7Date.getMonth() + 1;
//          temp7Month = temp7Month > 9 ? temp7Month : '0' + temp7Month;
//          let temp7Day = temp7Date.getDate();
//          temp7Day = temp7Day > 9 ? temp7Day : '0' + temp7Day;
//          this.beginTime = '' + temp7Date.getFullYear() + temp7Month + temp7Day;
//          ;
//        } else {
//          let tempMonth = new Date().getMonth() + 1;
//          tempMonth = tempMonth > 9 ? tempMonth : '0' + tempMonth;
//          let tempDate = new Date().getDate();
//          tempDate = tempDate > 9 ? tempDate : '0' + tempDate;
//          this.endTime = '' + new Date().getFullYear() + tempMonth + tempDate;
//          let temp7Date = this.getTimeByParam(3 / 1);
//          let temp7Month = temp7Date.getMonth() + 1;
//          temp7Month = temp7Month > 9 ? temp7Month : '0' + temp7Month;
//          let temp7Day = temp7Date.getDate();
//          temp7Day = temp7Day > 9 ? temp7Day : '0' + temp7Day;
//          this.beginTime = '' + temp7Date.getFullYear() + temp7Month + temp7Day;
////          this.endTime = this.$$timeFormate({date: this.getCurrentTime(), format: 'YMD'});
////          this.beginTime = this.$$timeFormate({date: this.getTimeByParam(item.code / 1), format: 'YMD'});
//        }
        this.getActiveList();
      },
      getSelectItem1(index, item) {
        if (this.isFirstClick1) {
          this.isFirstClick1 = false;
        }
        this.isShow1 = false;
        this.isSelected1 = index + 1;
        this.regionId = item.regionId;
        this.getActiveList();
      },
      getSelectItem2(index, item) {
        if (this.isFirstClick2) {
          this.isFirstClick2 = false;
        }
        this.isShow2 = false;
        this.isSelected2 = index + 1;
        this.sortCode = item.code;
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
