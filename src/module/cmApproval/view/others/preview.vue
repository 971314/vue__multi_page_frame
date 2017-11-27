<template>
  <div class="preview">
    <common-nav>
      <span slot="body">预览</span>
    </common-nav>
    <div class="center">
      <img :src="$route.query.imgurl" class="img"/>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    computed: {},
    created () {
    },
    activated () {
    },
    mounted () {
    },
    methods: {}
  }
</script>
