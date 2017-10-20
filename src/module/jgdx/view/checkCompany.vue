<template>
  <div class="full-height">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl"
                class="pb-jgdx">
      <span slot="body" v-text="rankingTitle"></span>
    </common-nav>
    <div class="container">
      <div class="k-search" :class="{'active':keyworld}">
        <input type="text" v-model="keyworld">
      </div>
      <mt-index-list>
        <mt-index-section :index="k" v-for="(vs,k) in companys">
          <!--<mt-cell :title="v.memberName" v-for="v in vs"-->
          <!--:href="'#/institution?companyid='+v.memberId+'&companyname='+v.memberName"-->
          <!-- ></mt-cell>-->
          <!--<mt-cell :title="v.memberName" v-for="(v,i) in vs" :key="i"-->
          <!--@click="pushCompany(v)"></mt-cell>-->
          <a class="mint-cell" :class="{selected: currentId === v.memberId}" v-for="(v, index) in vs" :key="index"
             @click="pushCompany(v)">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text" v-text="v.memberName"></span>
              </div>
              <div class="mint-cell-value"><span></span></div>
            </div>
          </a>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
  //import _ from "lodash";
  export default {
    data() {
      return {
        currentId: this.$route.params.currentId ? this.$route.params.currentId : '',
        gobackUrl: 'goBack',
        rankingTitle: '选择公司',
        keyworld: '',
        cs: {}
      }
    },
    created() {
      console.log('currentId', this.currentId);
      this.$get([1, "queryFuturesMember"], `-1/${this.orgCode}`, {}, false).then(res => {
        this.cs = res;
      });
    },
    computed: {
      companys() {
        let cs = {};
        for (let k in this.cs) {
          let v = _.filter(this.cs[k], (c) => {
            return c.memberName.match(this.keyworld);
          })
          if (v.length != 0) {
            cs[k] = v;
          }
        }
        return cs;
      }
    },
    methods: {
      pushCompany(item) {
        this.$store.dispatch('updateParseCurrentId', item.memberId);
        this.$store.dispatch('updateParseCurrentName', item.memberName);
        this.$router.back();
      }
    }
  }
</script>
