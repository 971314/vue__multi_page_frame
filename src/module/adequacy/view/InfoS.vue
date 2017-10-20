<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        <span>基本资料</span>
      </div>
    </common-nav>
    <div class="header-bung54"></div>
    <div class="info infoS">
      <div class="inputInfo pl15 bd-top ">
        <div class="flex inputText">
          <div class="flex-1">邮政编码</div>
          <input class="flex-2 text" type="tel" v-model="basicInfo.POSTCODE" maxlength="6" :placeholder="basicInfo.POSTCODE_MUST ? '': '选填'"/>
        </div>
        <div class="flex inputText">
          <div class="flex-1">传真号码</div>
          <input class="flex-2 text" type="tel" v-model="basicInfo.FAX_NO" maxlength="11" :placeholder="basicInfo.FAX_NO_MUST ? '格式：02112345678': '格式：02112345678 选填'"/>
        </div>
        <div class="flex inputText">
          <div class="flex-1">邮箱地址</div>
          <input class="flex-2 text" type="email" v-model="basicInfo.EMAIL" :placeholder="basicInfo.EMAIL_MUST ? '': '选填'"/>
        </div>
      </div>

      <div class="itemTitle">
        是否有来源于以下机构的不良诚信记录 <span v-text="basicInfo.NO_CREDIT_TYP_MUST ? '': '（选填）'"></span>
      </div>
      <div class="inputInfo pl15 bd-top">
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'NO_CREDIT_TYP', '0')">
          <div class="flex-1">无</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.NO_CREDIT_TYP === '0'}">
          </div>
        </div>
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'NO_CREDIT_TYP', null)">
          <div class="flex-1">有</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.NO_CREDIT_TYP !== '0' && basicInfo.NO_CREDIT_TYP !== ''}">
          </div>
        </div>
      </div>
      <div class="inputInfo pl15 bd-top" v-show="basicInfo.NO_CREDIT_TYP !== '0' && basicInfo.NO_CREDIT_TYP !== ''">
        <div class="pl15">
          <div class="flex inputText" v-for="(item, index) in noCreditList" :key="index" @click="selectMultiAnswer(basicInfo, 'NO_CREDIT_TYP', item.item_no)">
            <div class="flex-1" :class="{selected: basicInfo.NO_CREDIT_TYP && basicInfo.NO_CREDIT_TYP.indexOf(item.item_no) > -1}" v-text="item.item_content"></div>
          </div>
        </div>
      </div>

      <div class="itemTitle">
        交易的实际受益人<span v-text="basicInfo.BENEFICIARY_MUST ? '': '（选填）'"></span>
      </div>

      <div class="inputInfo pl15 bd-top">
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'BENEFICIARY', '0')">
          <div class="flex-1">本人</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.BENEFICIARY === '0'}">
          </div>
        </div>
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'BENEFICIARY', '1')">
          <div class="flex-1">其他</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.BENEFICIARY === '1'}">
          </div>
        </div>
        <div class="inputText" v-show="basicInfo.BENEFICIARY === '1'">
          <input class="text block w100p text-left" v-model="basicInfo.BENEFICIARY_ITEM" placeholder="请输入实际受益人姓名"/>
        </div>
      </div>

      <div class="itemTitle">
        是否仅为中国税收居民
      </div>
      <div class="inputInfo pl15 bd-top bd-bottom">
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'ONLY_FOR_CHINESE_TAX_RESIDENTS', 'Y')">
          <div class="flex-1">是</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.ONLY_FOR_CHINESE_TAX_RESIDENTS === 'Y'}">
          </div>
        </div>
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'ONLY_FOR_CHINESE_TAX_RESIDENTS', 'N')">
          <div class="flex-1">否</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.ONLY_FOR_CHINESE_TAX_RESIDENTS === 'N'}">
          </div>
        </div>
      </div>
      <div class="submitBtn">
        <a class="next" @click="next">下一步</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        gobackUrl: 'goBack',
        showClose: false,
        noCreditList: [
          {
            item_no: '1',
            item_content: '中国人民银行征信中心'
          },
          {
            item_no: '2',
            item_content: '最高人民法院失信被执行人名单'
          },
          {
            item_no: '3',
            item_content: '工商行政管理机构'
          },
          {
            item_no: '4',
            item_content: '税务管理机构'
          },
          {
            item_no: '5',
            item_content: '监管机构、自律组织'
          },
          {
            item_no: '6',
            item_content: '投资者在期货经营机构从事投资活动时产生的违约失信行为记录'
          },
          {
            item_no: '7',
            item_content: '过度维权等不当行为信息'
          },
          {
            item_no: '8',
            item_content: '其它组织'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'basicInfo'
      ])
    },
    methods: {
      selectMultiAnswer(obj, field, value) {
        let valArr = obj[field] ? obj[field].split(',') : []

        if (valArr.indexOf(value) > -1) {
          valArr.splice(valArr.indexOf(value), 1)
        } else {
          valArr.push(value)
        }

        obj[field] = valArr.join(',')
      },
      selectAnswer(obj = this, field, value) {
        obj[field] = value
      },
      next() {
        if (this.checkMessage(this.basicInfo)) {
          this.$router2.push('/infoSub')
        }
      },
      checkMessage(basicInfo) {
        if (basicInfo.POSTCODE_MUST && !basicInfo.POSTCODE) {
          this.showAlert('邮政编码不能为空')
        } else if (basicInfo.POSTCODE && !this.$isPostCode(basicInfo.POSTCODE.trim())) {
          this.showAlert('邮编格式不对')
        } else if (basicInfo.FAX_NO_MUST && !basicInfo.FAX_NO) {
          this.showAlert('传真号码不能为空')
        } else if (basicInfo.FAX_NO && !this.$isFax(basicInfo.FAX_NO.trim())) {
          this.showAlert('传真格式不对')
        } else if (basicInfo.EMAIL_MUST && !basicInfo.EMAIL) {
          this.showAlert('邮箱地址不能为空')
        } else if (basicInfo.EMAIL && !this.$isEmail(basicInfo.EMAIL.trim())) {
          this.showAlert('邮箱格式不对')
        } else if (basicInfo.NO_CREDIT_TYP_MUST && !basicInfo.NO_CREDIT_TYP) {
          this.showAlert('不良诚信记录未作答')
        } else if (basicInfo.BENEFICIARY_MUST && !basicInfo.BENEFICIARY) {
          this.showAlert('交易的实际收益人未作答')
        } else if (basicInfo.BENEFICIARY === '1' && !basicInfo.BENEFICIARY_ITEM) {
          this.showAlert('请输入实际受益人姓名')
        } else if (!basicInfo.ONLY_FOR_CHINESE_TAX_RESIDENTS) {
          this.showAlert('是否仅为中国税收居民未作答')
        } else {
          return true
        }

        return false
      },
      showAlert(msg) {
        this.$alert({
          maskClosable: true,
          btns: [{
            text: '确定',
            click: () => {
              return false
            }
          }],
          title: '<h4>提示</h4>',
          message: '<p>' + msg + '</p>'
        })
      }
    }
  }
</script>
