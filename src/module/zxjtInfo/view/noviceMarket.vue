<template>
  <div class="novice">
    <common-nav style="background-color:hsla(0,0%,60%,0);top:20px"></common-nav>
    <a :href="noviceHead.url" class="noviceHeadUrl">
      <img :src="noviceHead.imgUrl"/>
    </a>
    <div id="functional">
      <div class="novicebody">
        <novice-functional v-for="noviceFunctional in noviceFunctional" :functionalIcon.sync="noviceFunctional.iconUrl" :name.sycn="noviceFunctional.name" :functionalUrl.sync="noviceFunctional.url"></novice-functional>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">专门热线</div>
        <span v-for="(hotAre,i) in hotArea" class="mr036">
        <novice-jump :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="style.width2" class="aWidth"></novice-jump>
        </span>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">模拟游戏</div>
        <novice-jump :areaUrl.sync="simulation.url" :areaImg.sync="simulation.imgUrl" :areaWidth.sync="style.width2" style="width:100%;"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">进阶必备</div>
        <novice-jump v-for="hotAre in advanced" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="style.width2" class="mr036 aWidth"></novice-jump>
      </div>
    </div>
  </div>
</template>
<script type="es6">
  import noviceJump from '../components/noviceJump.vue';
  import noviceFunctional from '../components/noviceFunctional.vue';
  import Axios from 'axios';
  export default {
    data(){
      return {
        noviceHead:{},
        noviceFunctional:[],
        hotArea:[],
        simulation:{},
        advanced:[],
        style:{
          width2:'100%'
        }
      }
    },
    created(){
      var _this = this;
      if(pbE.isPoboApp){
        this.readConfig(pbE.SYS().readConfig('conf/h5/cfZxjtInfo.json'));
      }else{
        Axios.get('../conf/h5/cfZxjtInfo.json').then(function (data) {
        console.log(data.data.noviceMarket);
        var advertising = data.data.noviceMarket.advertising,
          functional = data.data.noviceMarket.functional,
          hotArea = data.data.noviceMarket.hotArea,
          game = data.data.noviceMarket.game,
          essential = data.data.noviceMarket.essential;
        _this.noviceHead.imgUrl = advertising.img;
        _this.noviceHead.url = advertising.url;
        for(var i = 0; i < functional.length; i++){//功能区
          _this.noviceFunctional.push({
            iconUrl:functional[i].img,
            name:functional[i].name,
            url:functional[i].url
          })
        }
        for(var i = 0; i < hotArea.length; i++){//热门专区
          _this.hotArea.push({
            imgUrl:hotArea[i].img,
            url:hotArea[i].url
          })
        }
        _this.simulation.url = game.url;
        _this.simulation.imgUrl = game.img;
        for(var i = 0; i < essential.length; i++){//进阶必备
          _this.advanced.push({
            imgUrl:essential[i].img,
            url:essential[i].url
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
      }
    },
    components:{
      noviceJump:noviceJump,
      noviceFunctional:noviceFunctional
    },
    methods:{
      Tip(){
        this.$alert({
            maskClosable: true,
            btns: [{
              text: '关闭'
            }],
            title: '<h5>提示</h5>',
            message: '功能开发中！',
          })
      },
      readConfig(conf){
        var advertising = JSON.parse(conf).noviceMarket.advertising,
          functional = JSON.parse(conf).noviceMarket.functional,
          hotArea = JSON.parse(conf).noviceMarket.hotArea,
          game = JSON.parse(conf).noviceMarket.game,
          essential = JSON.parse(conf).noviceMarket.essential;
          this.noviceHead.imgUrl = advertising.img;
          this.noviceHead.url = advertising.url;
        for(var i = 0; i < functional.length; i++){//功能区
          this.noviceFunctional.push({
            iconUrl:functional[i].img,
            name:functional[i].name,
            url:functional[i].url
          })
        }
        for(var i = 0; i < hotArea.length; i++){//热门专区
          this.hotArea.push({
            imgUrl:hotArea[i].img,
            url:hotArea[i].url
          })
        }
        this.simulation.url = game.url;
        this.simulation.imgUrl = game.img;
        for(var i = 0; i < essential.length; i++){//进阶必备
          this.advanced.push({
            imgUrl:essential[i].img,
            url:essential[i].url
          })
        }

      }
    }
  }
</script>
