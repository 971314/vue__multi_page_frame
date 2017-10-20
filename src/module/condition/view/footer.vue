<template>
  <div class="navbar-fixed-bottom">
    <div class="footer-content">
      <p class="tip-item">只有在暂停状态才能修改{{text}}</p>
      <p class="tip-item">云端服务器只保证触发不保证成交</p>
      <p class="tip-item">记录最多保存3个月</p>
      <img class="left-icon" src="../images/contip@2x.png">
      <img @click="cloaseClick" class="close-icon" src="../images/conclose@2x.png">
    </div>
  </div>
</template>
<script>
  export default {
    props:['text'],
    methods:{
      cloaseClick(){
        $('.navbar-fixed-bottom').css('display','none');
        $('.noneConList-content #noneList').css('padding-bottom','0');
        $('.warCon').css('margin-bottom','0')
      }
    }
  }
</script>
