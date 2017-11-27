<template>
  <div class="cover_box" id="cover_box">
    <ul class="left_move" id="left_move">
      <li v-for="(item,index) in move_data" @click="select(item)" :class="{active:item===select_obj||(index===0&&select_obj===null)}">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>
<style scoped>

</style>
<script type="text/babel">
  export default{
    name: 'tab',
    data(){
      return{
        left_move:null,
        select_obj:null,
        left_move_child_set:null,
        move_data:[{title:'1项填充'},{title:'2项填充'},{title:'3项填充'},{title:'4项填充'},{title:'5项填充'},{title:'6项填充'},{title:'7项填充'},{title:'8项填充'},{title:'9项填充'},{title:'10项填充'},{title:'11项填充'}]
      }
    },
    mounted:function(){
      this.left_move = $('.left_move')
      this.left_move_child_set = this.left_move.children('li')
      for(var a = 0;a<this.left_move_child_set.length;a++){
        this.left_move_child_set.eq(a).click(function(){
          if(this.offsetLeft>document.body.clientWidth/2){
            //$('.cover_box').animate({scrollLeft:(this.offsetLeft-document.body.clientWidth/2)+this.offsetWidth/2+'px'}, 500);
          }else{
            //$('.cover_box').animate({scrollLeft:'0px'}, 500);
          }
        })
      }
    },
    methods:{
      select:function(item){
        this.select_obj = item
      }
    }
  }
</script>
