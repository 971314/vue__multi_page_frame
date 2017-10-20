<template>
<div class="tool">
  <common-nav :goback="false" >
    <div slot="body">
      <span>工具</span>
    </div>
  </common-nav>
  <div class="toolO" v-for="(coulmn,index) in toolList" :class="{'first-toolO': index == 0}">
    <div class="toolH" v-text="coulmn.title">查询</div>
    <div class="toolB">
      <toast-btn  v-for="item in coulmn.data" :addr="item.url">
        <img :src="item.img"/>
        <span>{{item.name}}</span>
      </toast-btn>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      toolList: [],
      styleObject: {
          'padding-top': '44px'
      }
    }
  },
  mounted(){
    var _this = this;
    if(pbE.isPoboApp){
      _this.readConfig(pbE.SYS().readConfig('conf/h5/cfTool.json'));
    }else{
      _this.$axios.get('../conf/h5/cfTool.json').then(function(conf){
          console.log(conf.data);
            _this.toolList = conf.data.list;
      }).catch(function(err){
        console.log('服务器异常',err)
      })
    }
  },
  methods:{
    readConfig(conf){
      var _this = this;
          _this.toolList = JSON.parse(conf).list;
    }
  }
}
</script>
