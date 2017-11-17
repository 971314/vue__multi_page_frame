<template>
  <div class="information" @click="focusClick">
    <common-nav :gobackcom="false">
      <span slot="head" @click="$router.back()">取消</span>
      <span slot="body">发消息</span>
      <span slot="footer" @click="carryOut">完成</span>
    </common-nav>
    <textarea id="textarea" v-model="information" maxlength="64"></textarea>
    <span class="textNum">{{information.length}}/64</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        information: ''
      }
    },
    computed: {},
    created () {
    },
    activated () {
    },
    mounted () {
    },
    methods: {
      //完成
      carryOut () {
        console.log('123')
      },
      //点击空白，输入框聚焦
      focusClick () {
        document.getElementById('textarea').focus()
      }
    }
  }
</script>
