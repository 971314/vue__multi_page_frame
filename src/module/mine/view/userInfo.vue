<template>
  <div class="user-main-content">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="user-info-title" slot="body">
        {{navTitle}}
      </div>
      <div v-if="isShowSave" class="save-info" slot="footer">
        保存
      </div>
    </common-nav>
    <keep-alive>
      <router-view name="a" @change-title="changeTitle" @change-goback-url="changeGobackUrl"></router-view>
    </keep-alive>
    <router-view name="b" @change-title="changeTitle" @change-goback-url="changeGobackUrl"></router-view>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        navTitle: `个人资料`,
        gobackUrl: `goBack`,
        isShowSave: false,
        testId: null,
        testToken: null,
        userInfoAlltemp: { //用户信息
          userId: '',
          image: '',
          petName: '',
          sex: '',
          prefessionName: '',
          prefession: '',
          email: '',
          age: '0'
        },
        prefessionList: [
          {
            proId: '0',
            proName: '无'
          }
        ] //职业列表
      }
    },
    computed: {
      ...mapState([
        'test',
        'userInfoAll',
        'isFisrt'
      ])
    },
    created() {
      this.testToken = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '11111111111kkkkkkskskslslslsls';//token
      this.testId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '8';//认证userId/id

      this.getPrefessionList();
    },
    watch: {
      $route(to, from) {
        console.log(to);
      }
    },
    methods: {
      changeGobackUrl(str) {
        this.gobackUrl = str;
      },
      changeTitle(str) {
        this.navTitle = str;
      },
      getUserInfoAll() {
        let parseParam = {
          "func": "109",
          "data": [{
            "userId": this.testId,
            "token": this.testToken
          }]
        }
        this.$axios.post(this.postUrl, parseParam)
          .then((response) => {
            if (response.data.retHead != '0') {
              this.$toast(response.data.desc)
              return
            }
            let dataObj = response.data.data[0];
            this.userInfoAlltemp.userId = dataObj.userId;
            this.userInfoAlltemp.avatar = dataObj.image;
            this.userInfoAlltemp.petName = dataObj.petName;
            this.userInfoAlltemp.sex = dataObj.sex;
            this.userInfoAlltemp.prefession = dataObj.prefession;
            this.userInfoAlltemp.email = dataObj.email;
            this.userInfoAlltemp.age = parseInt(dataObj.age);

            this.prefessionList.map((item) => {
              if (item.proId === this.userInfoAlltemp.prefession) {
                this.userInfoAlltemp.prefessionName = item.proName;
              }
            })
            console.log(this.userInfoAlltemp, 'this.userInfoAlltemp');
            this.$store.dispatch('updateUserInfoAll', this.userInfoAlltemp);
          })
          .catch((res) => {
            console.log(res);
          });
      },
      getPrefessionList() {
        this.$axios.post(this.postUrl, {
          "func": "113",
          "data": [{}]
        })
          .then((response) => {
            let dataObj = response.data.data;
            dataObj.map((item) => {
              this.prefessionList.push(item);
            });
            this.$store.dispatch('updatePrefessionList', this.prefessionList);
            this.getUserInfoAll();
          })
          .catch((res) => {
            console.log(res);
          });
      },
      sendInfo() {
        console.log(12132123)
        this.$loading.toggle('')
        this.$axios.post(this.postUrl, {
          "func": "111",
          "data": [
            {
              "userId": this.testId,
              "token": this.testToken,
              "petName": this.userInfoAll.petName,
              "sex": this.userInfoAll.sex + '',
              "prefessionId": this.userInfoAll.prefession + '',
              "email": this.userInfoAll.email ? this.userInfoAll.email : '',
              "age": this.userInfoAll.age + ''
            }
          ]
        })
          .then((response) => {
            console.log(response);
            console.log(456456456)
            this.$loading.hide();
            if (response.data.retHead == '0') {
              this.$toast('修改成功！')
            } else {
              this.$toast(response.data.desc)
            }
          })
          .catch((res) => {
            console.log(789789878)
            console.log(res);
            this.$loading.hide();
          });
      }
    }
  }

</script>

