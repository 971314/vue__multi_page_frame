<template>
  <div class="account">
    <common-nav :search="false" :message="false" :service="false" :goback="false">
      <div slot="body">
        {{gettitle}}
      </div>
    </common-nav>
    <router-view @get-titlt="getTitlt"></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        gettitle:''
      }
    },
    methods:{
      getTitlt(title){
        this.gettitle = title;
      }
    }
  }
</script>
