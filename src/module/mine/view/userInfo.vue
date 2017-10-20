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
    <router-view @change-title="changeTitle" :user-info-all="userInfoAll"
                 :prefession-list="prefessionList"></router-view>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        navTitle: `个人资料`,
        gobackUrl: `goBack`,
        isShowSave: false,
        userInfoAll: { //用户信息
          userId: '',
          image: '',
          petName: '',
          sex: '',
          prefessionName: '',
          prefession: '',
          email: '',
          age: '20'
        },
        prefessionList: [
          {
            proId: '0',
            proName: '无'
          }
        ] //职业列表
      }
    },
    created() {
      this.getPrefessionList();
    },
    methods: {
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
            let dataObj = response.data.data[0];
            this.userInfoAll.userId = dataObj.userId;
            this.userInfoAll.avatar = dataObj.image;
            this.userInfoAll.petName = dataObj.petName;
            this.userInfoAll.sex = dataObj.sex;
            this.userInfoAll.prefession = dataObj.prefession;
            this.userInfoAll.email = dataObj.email;
            this.userInfoAll.age = parseInt(dataObj.age);
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
            this.getUserInfoAll();
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },
    beforeRouteLeave(to, from, next) {
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
          next();
        })
        .catch((res) => {
          console.log(res);
          next();
        });
    }
  }

</script>

