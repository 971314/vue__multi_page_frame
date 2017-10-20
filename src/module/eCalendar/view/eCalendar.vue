<template>

  <div class="eCalendar">
    <common-nav>
      <div slot="body">
        <span>财经日历</span>
      </div>
      <div slot="footer">
        <div class="picker-area">
          <input class="date-picker" v-if="isIos" v-model="pickerValue" id="date-from" type="date" @blur = "changeDate(null,true)"/>
          <input class="date-picker" v-if="!isIos" v-model="pickerValue" id="date-from" type="date" @change = "changeDate(null,true)"/>
          <img class="calendar-icon" src="../images/calendar.png"/>
          <img class="filter-icon" @click="toggleFilter()" src="../images/filter.png"/>
        </div>
      </div>
    </common-nav>

    <div class="fixed-area needFixPositionFixed">
      <!-- 年月 -->
      <div class="date">{{showDate}}</div>
      <!-- 日期列表 -->
      <ul class="week">
        <li class="text-center" :class="{'active':d.active}" v-for="(d, index) in dateArr" @click="changeDate(index,false)">
          <div class="week-day">{{d.day}}</div><div class="week-date">{{d.date}}</div>
        </li>
      </ul>
    </div>

    <!--侧边栏-->
    <div>
     <div class="sidelip" :class="{'slide':showSlide}">
        <p class="title">国家</p>
        <div class="options">
          <div class="op-item text-center" v-for="(c,index) in countrys" :class="{'mg0':(index+1)%3==0, 'active':c.checked}" @click="chooseOption(index,'countrys')">{{c.name}}</div>
        </div>
        <p class="title importance">重要性</p>
        <div class="options">
          <div class="op-item text-center" v-for="(g,index) in grade" :class="{'mg0':(index+1)%3==0, 'active':g.checked}" @click="chooseOption(index,'grade')">{{g.name}}</div>
        </div>
        <div class="confirm-choose flex row">
           <div class="flex-item text-center item">
            <button type="button" class="e-btn reset" @click="resetFilterOption()">重置</button>
           </div>
           <div class="flex-item text-center item">
            <button type="button" class="e-btn confirm" @click="confirmFilterOption()">完成</button>
           </div>
        </div>
      </div>
      <div class="mask slide-mask" :class="{'mask-show':showSlide,'fadeOut':beforeCloseSlide}" @click="toggleFilter()"></div>
    </div>

    <div class="container">

        <!-- 财经日历列表 -->
        <div class="group">
          <a class="cell" v-for="(l,index) in lists" >
            <span class="cell-body">
              <div class="media flex-align-top" @click="toggleChart(index,l.id)">
                <div class="media-object time-info text-center">
                  <div class="pub-time">{{l.time.substring(0,5)}}</div>
                  <div class="pub-status">{{l.actual?'已公布':'未公布'}}</div>
                </div>
                <div class="media-body" :class="{'open-chart':l.show}">
                  <h3>{{l.country + l.event}}<img :src="'./images/'+ filterCountry(l.country) + '.png'"/></h3>
                  <div class="val-chunk flex">
                    <div class="flex-item font-type2">实际值<span class="color3"> {{l.actual || '--'}}</span></div>
                    <div class="flex-item font-type2">预期值<span> {{l.forecast || '--'}}</span></div>
                    <div class="flex-item font-type2">前值<span> {{l.previous || '--'}}</span></div>
                    <i class="drop-down" :class="{'drop-up':l.show}"></i>
                  </div>
                </div>
              </div>
              <div class="chart-area" v-show="l.show">
                <div class="charts" :id="'chart'+l.id" v-show = "l.haveChartData"></div>
                <div class="no-chart-data text-center" v-show = "!l.haveChartData">暂无历史数据</div>
              </div>
            </span>
          </a>
          <div class="no-data" v-if="lists && lists.length < 1">
            <img src="../images/no-data.png"/>
            <div class="no-data-tips">暂无数据</div>
          </div>
        </div>

    </div>
    
  </div>
</template>

<script>

  import echarts from 'echarts/lib/echarts';
  import moment from "moment";
  import axios from 'axios';
  require('echarts/lib/chart/line');              // 引入折线图
  require('echarts/lib/component/tooltip');       // 引入提示框和标题组件
  require('echarts/lib/component/title');         // 引入提示框和标题组件
  require('echarts/lib/component/legend');        // 引入提示框和标题组件
  require('echarts/lib/component/grid');          // 引入提示框和标题组件
  import util from "../common/util";              // 引入util.js
  import option from "../common/chartBaseOption"; // 引入图表配置项
  import browser from '../common/browser'

  export default {
    data() {
      return {
        //是否显示侧边栏
        showSlide : false,
        beforeCloseSlide : false,
        //日期 选项列表
        dateArr : null,
        //国家 选项列表（静态数据）
        staticCountrys : [],
        //重要性 选项列表（静态数据）
        staticGrade : [],
        //国家 选项列表
        countrys : [],
        //重要性 选项列表
        grade : [],
        //年月
        showDate : util.getYearMonth(),
        //日期选择器选中的值
        pickerValue : util.getDate(),
        myCharts: null,
        //图表配置项
        basicOption : option,
        //财经日历 数据列表
        lists : null,
        //选中的 国家
        chooseCountry : [],
        //选中的 重要性
        chooseGrade : [],
        //折线图是否有数据
        haveChartData : false,
        //客户端类型（ios || android）
        isIos : browser.versions.ios || browser.versions.iPhone || browser.versions.iPad
      }
    },
    created(){
      //日期 选项列表
      this.dateArr = util.countDate( util.getDate() );
      //读取配置
      this.readconfig();
    },
    mounted() {
      //document.querySelector('body').style.backgroundColor = '#ffffff';
      //选中的日期居中显示
      this.dateAlignCenter();
      //请求 财经日历数据列表
      this.getList();
    },
    methods: {
      //读取配置
      readconfig(){
        var _this = this;
        var url = '../conf/h5/eCalendar.json';
        _this.$axios.get(url).then(function (data) {
            _this.staticCountrys = util.deepClone(data.data.countrys);
            _this.staticGrade = util.deepClone(data.data.grade);
            _this.countrys = util.deepClone(data.data.countrys);
            _this.grade = util.deepClone(data.data.grade);
        })
      },

      //（选中|取消选中）国家、重要性 筛选项
      chooseOption(index,type){
        (this[type])[index].checked =  !(this[type])[index].checked;
        if(type=="countrys"){
          this.chooseCountry = [];
          for(var i=0;i<this.countrys.length;i++){
            if(this.countrys[i].checked){
              this.chooseCountry.push(this.countrys[i].name);
            }
          }
        }else{
          this.chooseGrade = [];
          for(var i=0;i<this.grade.length;i++){
            if(this.grade[i].checked){
              this.chooseGrade.push(this.grade[i].id);
            }
          }
        }
      },

      //（打开|关闭）折线图
      toggleChart(index,id){
        var _this = this;
        var _util = util;
        if( this.lists[index].show == undefined){
          this.lists[index].show = true;
        }else{
          this.lists[index].show = !this.lists[index].show;
        }

        var chartEl = document.querySelector('#chart'+id);
        //每个折线图只渲染一次
        if(!chartEl.innerHTML && _this.lists[index].haveChartData == undefined){
          var param = {
            "func": "12031",
            "uid": "",
            "token": "",
            "orgid": "",
            "data": [{
                "period": this.lists[index].period,
                "event": this.lists[index].event,
                "country": this.lists[index].country,
                "limit": "8"
            }]
          };

          //默认设置为【折线图 没有数据】
          _this.lists[index].haveChartData = false;

          //获取 折线图需要的数据
          this.$post(PBHttpServer.eCalendar.serverUrl,param)
            .then(function(res){
              var unit = '';
              var dateArr = [];
              var actualArr = [];
              var forecastArr = [];
              var list = res.data.data[0].list;
              //按照日期（从小到大）进行排序
              list = _util.dateSort(list);
              for(var i = 0;i<list.length;i++){
                if( (list[i].actual || list[i].forecast) && !_this.lists[index].haveChartData ){
                  //折线图有数据
                  _this.lists[index].haveChartData = true;
                }
                var actualData = _util.getNumAndUnit(list[i].actual);
                var forecastData = _util.getNumAndUnit(list[i].forecast);
                unit = actualData[1] || forecastData[1];
                dateArr.push(list[i].date);
                actualArr.push(actualData[0]);
                forecastArr.push(forecastData[0]);
              }
              //重新渲染
              _this.$forceUpdate();
              if(_this.lists[index].haveChartData){
                setTimeout(function(){
                  var option = _this.basicOption(unit, dateArr, actualArr, forecastArr);
                  var chart = echarts.init(document.querySelector('#chart'+id));
                  chart.setOption(option);
                }, 0);
              }

            })
            .catch(function(err){
              console.log(err);
            })
        }else{
          //重新渲染
          _this.$forceUpdate();
        }

      },

      //切换日期
      changeDate(index,isPicker){
        //通过 日期选择器 选择
        if(isPicker){
          if(!this.pickerValue){
            this.this.pickerValue = util.getDate();
          }
          this.showDate = util.getYearMonth(this.pickerValue);
          this.dateArr = util.countDate(this.pickerValue);
        }else{
          //通过 点击日期 选择
          this.showDate = util.getYearMonth(this.dateArr[index].localDateString);
          this.pickerValue = this.dateArr[index].localDateString;
          this.dateArr = util.countDate( this.dateArr[index].localDateString );
        }
        //选中的日期居中显示
        this.dateAlignCenter();
        //请求 财经日历数据列表
        this.getList();
      },

      //请求 财经日历数据列表
      getList(){
        var _this = this;
        var _util = util;
        _this.lists = null;

        var param = {
          "func": "12030",
          "uid": "",
          "token": "",
          "orgid": "",
          "data": [{
              "startdate": this.pickerValue,
              "enddate": this.pickerValue,
              "country": this.chooseCountry.length == this.countrys.length?[]:this.chooseCountry,
              "importance": this.chooseGrade.length == this.grade.length?[]:this.chooseGrade
          }]
        };

        this.$post(PBHttpServer.eCalendar.serverUrl,param)
          .then(function(res){
            var list = res.data.data[0].list;
            for(var i = 0;i<list.length;i++){
              var actualData = _util.getNumAndUnit(list[i].actual),
                  forecastData = _util.getNumAndUnit(list[i].forecast),
                  previousData = _util.getNumAndUnit(list[i].previous),
                  unit = actualData[1] || forecastData[1] || previousData[1];
              if(unit && unit!="%"){
                unit = unit.replace("人民币","元");
                list[i].actual = actualData[0];
                list[i].forecast = forecastData[0];
                list[i].previous = previousData[0];
                list[i].event += '('+unit+')';
              }
            }
            _this.lists = list;
          })
          .catch(function(err){
            console.log(err);
          })
      },

      //选中的日期居中显示
      dateAlignCenter(){
        setTimeout(function(){
          var weekUL = document.getElementsByClassName("week")[0];
          weekUL.scrollLeft = 10000;
          weekUL.scrollLeft = weekUL.scrollLeft/2;
        }, 0);
      },

      //重置 筛选项
      resetFilterOption(){
        this.chooseCountry = [];  //选中的 国家
        this.chooseGrade = [];    //选中的 重要性
        this.countrys = util.deepClone(this.staticCountrys);
        this.grade = util.deepClone(this.staticGrade);

      },

      //完成 筛选
      confirmFilterOption(){
        this.toggleFilter();
        //请求 财经日历数据列表
        this.getList();
      },

      //【国家】过滤器
      filterCountry : util.filterCountry,

      //打开 | 关闭 过滤选项 弹框
      toggleFilter(){
        var _this = this;
        _this.showSlide = !this.showSlide;
        if(_this.showSlide == false){
          _this.beforeCloseSlide = true;
          _this.$forceUpdate();
          setTimeout(function() {
            _this.beforeCloseSlide = false;
          }, 400);
        }
      }

    }
  }
</script>
