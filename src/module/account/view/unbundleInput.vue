<template>
  <div>
    <div class="transactionType">
      <span>期货账户</span>
      <h6>{{$route.query.account}}</h6>
    </div>
    <div class="unbundle">
     <input type="password" placeholder="请输入交易密码" v-model="password"/>
    </div>
    <btn class="btn" :class="buttonColor?'click':'unClick'" @click="nextStep">下一步</btn>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        buttonColor:false,
        password:'',
        userId:pbE.isPoboApp ? pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID()) : '',//云交易userId
        accountType:null,//账号类型
        account:null, //交易账号
        loginType:null//登录类型
      }
    },
    watch:{
      password(val){
        if(val && val != ''){
          this.buttonColor = true;
        }else{
          this.buttonColor = false;
        }
      }
    },
    created(){
      this.$emit('get-titlt',this.$route.query.title);
    },
    methods:{
      nextStep(){
        let _this = this;
        if(_this.buttonColor){
          _this.$axios.post(_this.url,{
            "func":"1016",
            "token":_this.testToken,
            "id": _this.testId,
            "userID": _this.$route.query.userID,
            "account": _this.$route.query.account,
            "orgCode": _this.orgCode,
            "accountType": _this.$route.query.type,
            "loginType": _this.$route.query.loginType,
            "os":_this.os,
            "type":'1'
          }).then(function (data) {
            console.log(data);
          }).catch(function () {

          })
        }
        /*else{
          _this.$alert({
            maskClosable: true,
            message: '请输入正确密码',
            btns: [{
              text: '确认'
            }],
          });
        }*/
      }
    }
  }
</script>
