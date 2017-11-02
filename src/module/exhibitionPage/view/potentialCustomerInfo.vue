<template>
  <div class="potential-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body" v-text="customerTitle"></span>
      <span v-if="this.czType > 0" slot="footer" style="margin-right: 15px;">完成</span>
    </common-nav>
    <div class="potential-info-center">
      <div class="customer-info-center">
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">姓名</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.CUST_NAM" maxlength="12"
                     type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">性别</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.SEX" maxlength="12" type="text"/>
            </div>
            <img class="customer-showdetail-arrow" src="../images/showdetail@2x.png"/>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">身份证号码</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.ID_NO" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">出生日期</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.BIRTH_DT" maxlength="12" type="text"/>
            </div>
            <img class="customer-showdetail-arrow" src="../images/showdetail@2x.png"/>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">通讯地址</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.LINKADDR" type="text"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">手机号码<img class="user-must-icon" src="../images/musticon@2x.png"/></div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.MOBILE_NO" type="tel"/>
            </div>
          </div>
          <div class="customer-input-item">
            <div class="input-item-name">固定电话</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.LINKTELEPHONE" type="tel"/>
            </div>
          </div>
        </div>
        <div class="customer-input-group">
          <div class="customer-input-item">
            <div class="input-item-name">客户来源</div>
            <div class="input-item-input">
              <input class="item-input-content" :placeholder="customerMessage.CUST_SRC" type="text"/>
            </div>
          </div>
        </div>
        <div class="customer-remarks">
          <textarea class="remarks-text-area" v-text="customerMessage.CUST_DESC"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data() {
      return {
        customerTitle: '客户资料',
        gobackUrl: 'goBack',
        customerMessage: {
          CUST_NAM: '',
          SEX: '',
          ID_NO: '',
          BIRTH_DT: '',
          LINKADDR: '',
          LINKTELEPHONE: '',
          MOBILE_NO: '',
          CUST_SRC: '',
          CUST_DESC: ''
        }
      }
    },
    computed: {
      ...mapState([
        'czType'
      ])
    },
    mounted() {
      if (this.czType == 0) {
        this.customerTitle = '客户资料'
      } else if (this.czType == 1) {
        this.customerTitle = '编辑资料'
      } else if (this.czType == 2) {
        this.customerTitle = '新增客户'
      }
      if (this.czType !== 2) {
        this.getPInvestorInfo()
      }
    },
    methods: {
      completeClick() { //完成点击的操作
        if (this.czType == 1) {
          this.pInvestorEdit()
        } else if (this.czType == 2) {
          this.pInvestorAdd()
        }
      },
      getPInvestorInfo() { //获取单一潜在客户信息
        this.$$axios({restUrl: 'pInvestorInfo', join: ['test11', 101469]})
          .then((response) => {
            this.customerMessage = response
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      pInvestorAdd() { //新增潜在客户
        this.$$axios({restUrl: 'pInvestorAdd', join: [1, 2], options: this.customerMessage})
          .then((response) => {
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      },
      pInvestorEdit() { //编辑潜在客户
        this.$$axios({restUrl: 'pInvestorEdit', join: [1, 2], options: this.customerMessage})
          .then((response) => {
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
