<template>
  <div class="pobo-business-pipeline">
    <div class="pipeline-tab-wrapper">
      <div class="pipeline-tab-group">
        <div class="pipeline-tab-item" :class="{'pipeline-tab-active': nowIndex == 1}" @click="sort(1)">
          全部
        </div>
        <div class="pipeline-tab-item" :class="{'pipeline-tab-active': nowIndex == 2}" @click="sort(2)">
          待办理
        </div>
        <div class="pipeline-tab-item" :class="{'pipeline-tab-active': nowIndex == 3}" @click="sort(3)">
          已通过
        </div>
        <div class="pipeline-tab-item" :class="{'pipeline-tab-active': nowIndex == 4}" @click="sort(4)">
          未通过
        </div>
      </div>
    </div>
    <div class="pipeline-content">

      <div v-for="(pipelineItem, index) in pipelineList"
           :class="{'pipeline-content-failed': pipelineItem.Status == '未通过'}" class="content-item-wrapper">
        <div class="pipeline-content-item" :class="{'pipeline-failed-tips': pipelineItem.Status == '未通过'}">
          <div class="item-left">
            <span class="item-name">
              {{pipelineItem.Operation}}
              <img v-if="pipelineItem.IsDelay" class="item-over-time" src="../images/overTime@2x.png"/>
            </span>
            <span class="item-time" v-text="pipelineItem.Time"></span>
          </div>
          <div class="item-right"
               :class="{'pipeline-success': pipelineItem.Status == '通过', 'pipeline-failed': pipelineItem.Status == '未通过'}">
            {{pipelineItem.Status}}
          </div>
        </div>
        <div v-if="pipelineItem.Status == '未通过'" class="pipeline-refused-reason">
          <img class="message-tips" src="../images/messageTips@2x.png"/>
          <span class="pipeline-refused-desc" v-text="pipelineItem.Note"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        nowIndex: 1,
        type: 1,
        pipelineList: [
          {
            Operation: "手机号码变更申请",
            Time: "2017-09-01 10:09",
            Status: "已通过",
            Note: "",
            IsDelay: false
          },
          {
            Operation: "身份证号码变更申请",
            Time: "2017-09-01 10:09",
            Status: "未通过",
            Note: "身份证照片不清晰，无法识别",
            IsDelay: false
          },
          {
            Operation: "邮箱变更申请",
            Time: "2017-09-01 10:09",
            Status: "待办理",
            Note: "",
            IsDelay: true
          },
          {
            Operation: "结算单申请",
            Time: "2017-09-01 10:09",
            Status: "待办理",
            Note: "",
            IsDelay: false
          }
        ]
      }
    },
    mounted() {
      this.sort(this.nowIndex)
    },
    methods: {
      sort(index) {
        this.nowIndex = index
        this.getInvestorBusinessHall()
      },
      getInvestorBusinessHall() { //获取业务流水
        this.$$axios({restUrl: 'investorBusinessHall', join: [this.userId, [this.investorId, ['type', this.nowIndex - 1]]]})
          .then((response) => {
            this.pipelineList.splice(0, this.pipelineList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['Operation'] = item['operation']
              tempObj['Status'] = item['status']
              tempObj['Time'] = this.$$getTimeFmt(item['time'])
              tempObj['Note'] = item['note']
              tempObj['IsDelay'] = item['IsDelay']

              this.pipelineList.push(tempObj)
            })
            console.log('response', response);
          })
          .catch((res) => {
            console.log('res', res);
          })
      }
    }
  }
</script>
