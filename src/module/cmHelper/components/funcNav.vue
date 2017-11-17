<template>

  <div class="flex-item text-center item">
    <div class="cusMag">
      <div class="group" :class="className">
        <a class="cell" @click="goToWhere">
                    <span class="cell-body">
                        <div class="media flex-align-top">
                            <div class="media-body">
                                <h3 v-text="title"></h3>
                                <p v-text="subTitle"></p>
                            </div>
                            <div class="media-object">
                                <img :src="icon">
                            </div>
                        </div>
                    </span>
        </a>
      </div>
    </div>
  </div>

</template>

<script>

  /*
   * 功能菜单
   */

   import {mapState} from 'vuex'

  export default {

    name: 'funcNav',

    props: {
      jumpType: {
        type: Number,
        default: null
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      className: {
        type: Array,
        default: function () {
          return [];
        }
      },
      toWhere: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState({
        addFollow: ({followUpRecord}) => followUpRecord.addFollow
      })
    },
    methods: {
      goToWhere() {
        if(this.toWhere=="customerInfoList" || this.toWhere=="applyFast"){
          var p = this.addFollow;
          p.businessType = '';
          this.$store.dispatch('updateAddFollow', p);
        }
        if (this.jumpType) {
          this.$store.dispatch('updatepJumpFlag', this.jumpType)
        }
        this.$router.push({
          name: this.toWhere
        })
      }
    }
  }
</script>
