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
              <img v-if="pipelineItem.IsDelay" class="item-over-time" src="../../images/exhibitionPage/overTime@2x.png"/>
            </span>
            <span class="item-time" v-text="pipelineItem.Time"></span>
          </div>
          <div class="item-right"
               :class="{'pipeline-success': pipelineItem.Status == '通过', 'pipeline-failed': pipelineItem.Status == '未通过'}">
            {{pipelineItem.Status}}
          </div>
        </div>
        <div v-if="pipelineItem.Status == '未通过'" class="pipeline-refused-reason">
          <img class="message-tips" src="../../images/exhibitionPage/messageTips@2x.png"/>
          <span class="pipeline-refused-desc" v-text="pipelineItem.Note"></span>
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
        nowIndex: 1,
        type: 1,
        pipelineList: [
        ]
      }
    },
    computed: {
      ...mapState({
        investor: ({followUpRecord}) => followUpRecord.investor
      })
    },
    activated() {
      this.sort(this.nowIndex)
    },
    methods: {
      sort(index) {
        this.nowIndex = index
        this.getInvestorBusinessHall()
      },
      getInvestorBusinessHall() { //获取业务流水
        this.$$axios({restUrl: 'investorBusinessHall', join: [this.info.userId, [this.investor.INVESTOR_ID, ['type', this.nowIndex - 1]]]})
          .then((response) => {
            this.pipelineList.splice(0, this.pipelineList.length)
            response.map((item) => {
              let tempObj = {}
              tempObj['Operation'] = item['operation']
              tempObj['Status'] = item['status']
              tempObj['Time'] = this.$$getTimeFmt(item['time'],'-')
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
