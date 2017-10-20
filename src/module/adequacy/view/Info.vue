<template>
  <div>
    <common-nav :search="false" :message="false" :service="false" :goback="false" :goClose="showClose" :gobackcom="true">
      <div slot="body">
        <span>基本资料</span>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <div class="info">
      <div class="basic-info">
        <div class="flex flex-jcsb">
          <div class="text-left">姓名</div>
          <div class="text-right" v-text="personalInfo.INVESTOR_NAM"></div>
        </div>
        <div class="flex flex-jcsb">
          <div class="text-left">身份证号</div>
          <div class="text-right" v-text="personalInfo.ID_NO"></div>
        </div>
        <div class="flex flex-jcsb">
          <div class="text-left">手机号</div>
          <div class="text-right" v-text="personalInfo.PHONENUM"></div>
        </div>
      </div>
      <div class="inputInfo pl15 bd-top">
        <div class="flex inputText">
          <div class="flex-1">所属营业部</div>
          <div class="flex-1 text-right arrow" @click="goSelectDept">
            {{basicInfo.DEPARTMENT_NAME}}
          </div>
        </div>
        <div class="flex inputText">
          <div class="flex-1">性别</div>
          <div class="flex-1 text-right genderSet">
            <a :class="{icon: 1, selected: basicInfo.SEX === '1' }" @click="selectAnswer(basicInfo, 'SEX', '1')"><span>男</span></a>
            <a :class="{icon: 1, selected: basicInfo.SEX === '2' }" @click="selectAnswer(basicInfo, 'SEX', '2')"><span>女</span></a>
          </div>
        </div>
        <div class="flex inputText">
          <div class="flex-1">职业</div>
          <div class="flex-1 text-right arrow" @click="goSelectProfession">
            {{basicInfo.OCCUPATION_CD}}
          </div>
        </div>
        <div class="flex inputText">
          <div class="flex-1">详细地址</div>
          <input class="flex-2 text" v-model="basicInfo.LINKADDR" placeholder="请具体到门牌号码"/>
        </div>
        <div class="flex inputText">
          <div class="flex-1">联系电话</div>
          <input class="flex-2 text" type="tel" maxlength="11" v-model="basicInfo.LINKTELEPHONE"/>
        </div>
      </div>

      <div class="flex itemTitle">
        <div class="flex-1 itemLeft">证件有效期</div>
        <div class="flex-1 text-right itemLeft">
          <span class="icon" :class="{selected: basicInfo.isLongValid }" @click="selectDate">长期有效</span>
        </div>
      </div>
      <div class="inputInfo pl15 bd-top">
        <div class="inputText flex">
          <div class="flex-1 text-left">开始日期</div>
          <div class="flex-1 relative text-right arrow">
            <input class="dateBack" v-model="basicInfo.IDVALID_ST_DT" id="date-from" type="date"/>
            <label class="dateFace">
              {{basicInfo.IDVALID_ST_DT | dataFormat('YYYY-MM-DD')}}
            </label>
          </div>
        </div>

        <div class="inputText flex" v-show="!basicInfo.isLongValid">
          <div class="flex-1 text-left">结束日期</div>
          <div class="flex-1 relative text-right arrow">
            <input class="dateBack" v-model="basicInfo.IDVALID_END_DT" id="date-to" type="date"/>
            <label class="dateFace">
              {{basicInfo.IDVALID_END_DT | dataFormat('YYYY-MM-DD')}}
            </label>
          </div>
        </div>
      </div>

      <div class="itemTitle">
        您是否与其他机构或个人存在实际控制关系
      </div>

      <div class="inputInfo pl15 bd-top bd-bottom">
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'CONTROLLINK', '1')">
          <div class="flex-1">否</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.CONTROLLINK === '1'}">
          </div>
        </div>
        <div class="flex inputText" @click="selectAnswer(basicInfo, 'CONTROLLINK', '0')">
          <div class="flex-1">是</div>
          <div class="flex-1 icon" :class="{selected: basicInfo.CONTROLLINK === '0'}">
          </div>
        </div>
        <div class="inputText" v-show="basicInfo.CONTROLLINK === '0'">
          <input class="text block w100p text-left" v-model="basicInfo.CONTROLLINK_ITEM" placeholder="请输入控制人姓名"/>
        </div>
      </div>
      <div class="submitBtn">
        <a class="next" @click="next">下一步</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        isLongValid: false,
        gobackUrl: 'goBack',
        showClose: false
      }
    },
    computed: {
      ...mapState([
        'basicInfo',
        'personalInfo'
      ])
    },
    methods: {
      focusDate (id) {
        document.getElementById(id).focus()
      },
      goSelectDept () {
        // 如果没有指定默认部门
        if (!this.basicInfo.hasDefaultDepartment || !this.basicInfo.DEPARTMENT_ID) {
          this.$router2.push('/selectDept')
        }
      },
      goSelectProfession () {
        this.$router2.push('/selectProfession')
      },
      selectDate () {
        this.basicInfo.isLongValid = !this.basicInfo.isLongValid

        if (this.basicInfo.isLongValid) {
          this.basicInfo.IDVALID_END_DT = '2999-12-31'
        } else {
          this.basicInfo.IDVALID_END_DT = ''
        }
      },
      selectAnswer (obj = this, field, value) {
        obj[field] = value
      },
      next () {
        // 跳转前先保存填写的信息
        if (this.checkMessage(this.basicInfo)) {
          this.$store.dispatch('updateBasicInfo', this.basicInfo)
          this.$router2.push('/infoS')
        }
      },
      checkMessage (basicInfo) {
        if (!basicInfo.DEPARTMENT_NAME) {
          this.showAlert('所属营业部不能为空')
        } else if (!basicInfo.OCCUPATION_CD) {
          this.showAlert('职业不能为空')
        } else if (!basicInfo.IDVALID_ST_DT) {
          this.showAlert('开始日期不能为空')
        } else if (!basicInfo.isLongValid && (!basicInfo.IDVALID_END_DT || basicInfo.IDVALID_ST_DT > basicInfo.IDVALID_END_DT)) {
          this.showAlert('结束日期不能为空或早于开始日期')
        } else if (basicInfo.LINKADDR === undefined || basicInfo.LINKADDR.trim().length === 0) {
          this.showAlert('详细地址不能为空')
        } else if (basicInfo.LINKTELEPHONE === undefined || basicInfo.LINKTELEPHONE.trim().length === 0) {
          this.showAlert('联系电话不能为空')
        } else if (basicInfo.CONTROLLINK.length === 0) {
          this.showAlert('是否存在实际控制关系未作答')
        } else if (basicInfo.CONTROLLINK === '0' && basicInfo.CONTROLLINK_ITEM.trim().length === 0) {
          this.showAlert('实际控制人未填写')
        } else {
          return true
        }
        return false
      },
      showAlert (msg) {
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
