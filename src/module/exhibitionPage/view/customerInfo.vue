<template>
  <div class="pobo-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body">客户资料</span>
    </common-nav>
    <div class="customer-info-center">
      <div class="customer-input-group">
        <div class="customer-input-item">
          <div class="input-item-name">姓名</div>
          <div class="input-item-input" v-text="customerMessage.INVESTOR_NAM">
            <!--<input class="item-input-content" placeholder="陈嫣" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">营业部</div>
          <div class="input-item-input" v-text="customerMessage.DEPARTMENT_NAM">
            <!--<input class="item-input-content" placeholder="总营业部" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">资金账号</div>
          <div class="input-item-input" v-text="customerMessage.INVESTOR_ID">
            <!--<input class="item-input-content" placeholder="20192312" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">性别</div>
          <div class="input-item-input" v-text="customerMessage.SEX">
            <!--<input class="item-input-content" placeholder="女" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">身份证号码</div>
          <div class="input-item-input" v-text="customerMessage.ID_NO">
            <!--<input class="item-input-content" placeholder="330105199303310872" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">出生日期</div>
          <div class="input-item-input" v-text="customerMessage.BIRTH_DT	">
            <!--<input class="item-input-content" placeholder="1993-03-31" maxlength="12" type="text" />-->
          </div>
        </div>
      </div>
      <div class="customer-input-group">
        <div class="customer-input-item customer-breakword-item">
          <div class="input-item-name input-item-breakwrod">通讯地址</div>
          <div class="input-item-input" v-text="customerMessage.LINKADDR">
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">手机号码</div>
          <div class="input-item-input" v-text="customerMessage.MOBILE_NO">
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">固定电话</div>
          <div class="input-item-input" v-text="customerMessage.LINKTELEPHONE">
          </div>
        </div>
      </div>
      <div class="customer-input-group">
        <div class="customer-input-item">
          <div class="input-item-name">客户类型</div>
          <div class="input-item-input" v-text="customerMessage.INVESTOR_TYP">
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">计费软件名称</div>
          <div class="input-item-input" v-text="customerMessage.VENDOR_NAM">
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">居间人名称</div>
          <div class="input-item-input" v-text="customerMessage.BROKER_NAM">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        customerMessage: {
          INVESTOR_ID: '',
          INVESTOR_NAM: '',
          DEPARTMENT_NAM: '',
          LINKTELEPHONE: '',
          MOBILE_NO: '',
          SEX: '',
          LINKADDR: '',
          BIRTH_DT: '',
          INVESTOR_TYP: '',
          BROKER_NAM: '',
          VENDOR_NAM: '',
          ID_NO: ''
        }
      }
    },
    mounted() {
        this.investorInfo()
    },
    methods: {
      investorInfo() { //单一投资者基本信息
        this.$$axios({restUrl: 'investorInfo', join: ['test11', 101469]})
          .then((response) => {
            console.log('response', response[0]);
            this.customerMessage = response[0]
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
