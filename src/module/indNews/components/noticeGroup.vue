<template>
  <a class="noticeGroup" @click="clickItem" :style="{'background-color': colorInd}">
    <div class="noticeGroupTitle">
      <span class="header">{{infoTitle}}</span>
      <span class="time">{{upVote == 0 ? '' : upVote + '赞&nbsp;&nbsp;&nbsp;'}}<span v-html="time"></span><i class="i"
                                                                                                            v-show="isTop"></i></span>
    </div>
    <img v-lazy="thumb" onerror="this.src='../../../assets/images/activitydefault@2x.png'"/>
  </a>
</template>
<script>
  export default {
    name: 'noticeGroup',
    props: ['infoTitle', 'upVote', 'infoId', 'thumb', 'time', 'isTop'],
    data() {
      return {
        label: false,
        colorInd: '#ffffff'
      }
    },
    /* computed: {
     currentLabels() {
     console.log(this.labels);
     return this.labels;
     }
     },*/
    /*mounted() {
     this.labelShow();
     },*/
    /* updated() {
     this.labelShow();
     },*/
    wacth: {
      'labels'(val, oldVal) {
        console.log('val', val);
      }
    },
    methods: {
      labelShow() {
        if (this.labels && this.labels.length != 0) {
          for (let i = 0; i < this.labels.length; i++) {
            if (this.labels[i].labelId == -1) {
              this.label = true;
            } else {
              this.label = false;
            }
          }
        }
      },
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
            if (previewItem.type == 2 && previewItem.infoId == this.infoId) {
              isAdd = false;
            }
          });
        }
        if (isAdd) {
          if (isPreviewList.length >= 30) {
            isPreviewList.pop(); //删除最后一个元素
            isPreviewList.unshift({
              infoId: this.infoId,
              type: 2        //type=2表示是在资讯下面
            });
          } else {
            isPreviewList.push({
              infoId: this.infoId,
              type: 2        //type=2表示是在资讯下面
            });
          }
        }

        console.log('isPreviewList', isPreviewList);

        if (pbE.isPoboApp) {
          pbE.SYS().writeLocalFile('indNews', 1, JSON.stringify(isPreviewList));
        }
        setTimeout(() => {
          this.$router.push({path: '/details', query: {type: 2, info: this.infoId}});
          this.colorInd = '#ffffff';
        }, 300);
      }
    }
  }
</script>
