<template>
  <a class="newsGroup" @click="clickItem" :style="{'background-color': colorInd}">
    <div>{{title | setTitle}}</div>
    <span>{{content | removeSpecialStr}}</span>
    <span class="GroupTime" v-html="time"></span>
  </a>
</template>
<script>
  export default {
    name: 'newsGroup',
    props: ['title', 'content', 'time', 'newsId'],
    data() {
        return {
          colorInd: '#ffffff'
        }
    },
    methods: {
      clickItem() {
        this.colorInd = '#e6e6ec';
        let isPreviewList = [];
        let isAdd = true;
        if (pbE.isPoboApp) {
          if (pbE.SYS().isHasLocalFile('indNews', 1)) {
            isPreviewList = JSON.parse(pbE.SYS().readLocalFile('indNews', 1));
            console.log('isPreviewList', isPreviewList);
          }
        }

        if (isPreviewList && isPreviewList.length > 0) {
          isPreviewList.map((previewItem) => {
            if (previewItem.type == 2 && previewItem.infoId == this.newsId) {
              isAdd = false;
            }
          });
        }
        if (isAdd) {
          if (isPreviewList.length >= 30) {
            isPreviewList.pop(); //删除最后一个元素
            isPreviewList.unshift({
              infoId: this.newsId,
              type: 2        //type=2表示是在资讯下面
            });
          } else {
            isPreviewList.push({
              infoId: this.newsId,
              type: 2        //type=2表示是在资讯下面
            });
          }
        }

        console.log('isPreviewList', isPreviewList);

        if (pbE.isPoboApp) {
          pbE.SYS().writeLocalFile('indNews', 1, JSON.stringify(isPreviewList));
        }
        setTimeout(() => {
          this.$router.push({path:'/details',query:{type:1,newsId:this.newsId}})
          this.colorInd = '#ffffff';
        }, 300);
      }
    }
  }
</script>
