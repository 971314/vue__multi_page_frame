<template>
  <div class="zdytime">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackUrl="gobackUrl">
      <div class="zdytime-title" slot="body">
        自定义时间
      </div>
    </common-nav>
    <div class="time-selected-items">
      <div class="time-selected-options">
        <div class="time-start-title">起始时间</div>
        <div class="time-start-content">
          <input id="date-from" name="date-from"/>
        </div>
      </div>
      <div class="time-selected-options">
        <div class="time-start-title">截止时间</div>
        <div class="time-start-content">
          <input id="date-to" name="date-to"/>
        </div>
      </div>
    </div>

    <a class="zdytime-submit-button" @click="parseParams">
      确认
    </a>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  let fromPath = ''; //来的路径
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        dataFrom: '2017-01-01',
        dataTo: '2017-07-17',
        strYesterday: '',
        toFromPath: fromPath,
        dataFromObj: {},
        dataToObj: {}
      }
    },
    computed: {
      ...mapState([
        'MoneyPaidTimeFrom',
        'MoneyPaidTimeTo',
        'YeildTimeFrom',
        'YeildTimeTo',
        'ProfitTimeFrom',
        'ProfitTimeTo',
        'ykfxTimeFrom',
        'ykfxTimeTo',
        'isUserYield',
        'isUserMoneyPaid',
        'isUserProfit',
        'isUserykfx',
        'fqzjTimeFrom',
        'fqzjTimeTo',
        'isUserfqzj'
      ])
    },
    created() {

    },
    activated() {
      this.toFromPath = fromPath;
      document.body.style.backgroundColor = '#f7f7fa';
      var date = new Date();
      var yesterday = new Date(date.getTime()),
        strYesterday = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd'),
        strYesterday1 = strYesterday,
        strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd'),
        three = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 3), strThree = pbUtils.dateFormat(three, 'yyyy-MM-dd'),
        week = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7), strWeek = pbUtils.dateFormat(week, 'yyyy-MM-dd'),
        month = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30), strMonth = pbUtils.dateFormat(month, 'yyyy-MM-dd');
      if (this.toFromPath === 'MoneyPaid') {
        if (this.MoneyPaidTimeFrom) {
          strYesterday = this.MoneyPaidTimeFrom;
        } else {
          strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd');
        }
        if (this.MoneyPaidTimeTo) {
          strYesterday1 = this.MoneyPaidTimeTo;
        } else {
          strYesterday1 = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd');
        }
      } else if (this.toFromPath === 'Profit') {
        if (this.ProfitTimeFrom) {
          strYesterday = this.ProfitTimeFrom;
        } else {
          strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd');
        }
        if (this.ProfitTimeTo) {
          strYesterday1 = this.ProfitTimeTo;
        } else {
          strYesterday1 = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd');
        }
      } else if (this.toFromPath === 'ykfx') {
        if (this.ykfxTimeFrom) {
          strYesterday = this.ykfxTimeFrom;
        } else {
          strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd');
        }
        if (this.ykfxTimeTo) {
          strYesterday1 = this.ykfxTimeTo;
        } else {
          strYesterday1 = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd');
        }
      } else if (this.toFromPath === 'fqzj') {
        if (this.fqzjTimeFrom) {
          strYesterday = this.fqzjTimeFrom;
        } else {
          strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd');
        }
        if (this.fqzjTimeTo) {
          strYesterday1 = this.fqzjTimeTo;
        } else {
          strYesterday1 = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd');
        }
      } else {
        if (this.YeildTimeFrom) {
          strYesterday = this.YeildTimeFrom;
        } else {
          strYesterday = pbUtils.dateFormat(this.getTimeByParam(6), 'yyyy-MM-dd');
        }
        if (this.YeildTimeTo) {
          strYesterday1 = this.YeildTimeTo;
        } else {
          strYesterday1 = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd');
        }
      }
      this.dataFrom = strYesterday;
      this.dataTo = strYesterday1;
      this.dataFromObj.setDate(moment(this.dataFrom, 'YYYY-MM-DD'), 'YYYY-MM-DD');
      this.dataToObj.setDate(moment(this.dataTo, 'YYYY-MM-DD'), 'YYYY-MM-DD');
    },
    mounted() {
      document.body.style.backgroundColor = '#f7f7fa';
      var date = new Date();
      var yesterday = new Date(date.getTime()),
        strYesterday = pbUtils.dateFormat(yesterday, 'yyyy-MM-dd'),
        three = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 3), strThree = pbUtils.dateFormat(three, 'yyyy-MM-dd'),
        week = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7), strWeek = pbUtils.dateFormat(week, 'yyyy-MM-dd'),
        month = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30), strMonth = pbUtils.dateFormat(month, 'yyyy-MM-dd');
      this.strYesterday = strYesterday;
      var dataThree = null,
        dataWeek = null,
        dataMonth = null,
        dataRandom = null;
      let dateFrom = pikadayResponsive(document.getElementById('date-from'), {
        format: 'YYYY-MM-DD',
        outputFormat: 'YYYY-MM-DD',
        placeholder: '起始日期'
      });
      let dateTo = pikadayResponsive(document.getElementById('date-to'), {
        format: 'YYYY-MM-DD',
        outputFormat: 'YYYY-MM-DD',
        placeholder: '终止日期'
      });

      this.dataFromObj = dateFrom;
      this.dataToObj = dateTo;

      this.dataFromObj.setDate(moment(strYesterday, 'YYYY-MM-DD'), 'YYYY-MM-DD');
      this.dataToObj.setDate(moment(strYesterday, 'YYYY-MM-DD'), 'YYYY-MM-DD');
      var _this = this;
      $('#date-from').change(function (e) {
        var timer = 0;
        clearTimeout(timer);
        let fromVal = $('#date-from').val();
        let toVal = $('#date-to').val();
        _this.dataFrom = fromVal;
      });
      $('#date-to').change(function (e) {
        var timer = 0;
        clearTimeout(timer);
        let fromVal = $('#date-from').val();
        let toVal = $('#date-to').val();
        _this.dataTo = toVal;
      });
    },
    beforeRouteEnter (to, from, next) {
      fromPath = from.name;
      next();
    },
    methods: {
      parseParams() {
        this.$$timeFormate({date: this.dataTo, format: 'YMD'});
        if (this.$$timeFormate({
            date: this.dataTo,
            format: 'YMD'
          }) > this.$$timeFormate({
            date: this.strYesterday,
            format: 'YMD'
          })) {
          this.$toast({
            message: '终止日期不得晚于今天!',
            position: 'center',
          });
          return;
        } else if (this.$$timeFormate({
            date: this.dataTo,
            format: 'YMD'
          }) < this.$$timeFormate({
            date: this.dataFrom,
            format: 'YMD'
          })) {
          this.$toast({
            message: '终止日期不得早于起始日期!',
            position: 'center',
          });
          return;
        }
        if (this.toFromPath === 'MoneyPaid') {
          this.$store.dispatch('updateMoneyPaidTimeFrom', this.dataFrom);
          this.$store.dispatch('updateMoneyPaidTimeTo', this.dataTo);
          this.$store.dispatch('updateisUserMoneyPaid', true);
        } else if (this.toFromPath === 'Profit') {
          this.$store.dispatch('updateProfitTimeFrom', this.dataFrom);
          this.$store.dispatch('updateProfitTimeTo', this.dataTo);
          this.$store.dispatch('updateisUserProfit', true);
        } else if (this.toFromPath === 'ykfx') {
          this.$store.dispatch('updateykfxTimeFrom', this.dataFrom);
          this.$store.dispatch('updateykfxTimeTo', this.dataTo);
          this.$store.dispatch('updateisUserykfx', true);
        } else if (this.toFromPath === 'fqzj') {
          this.$store.dispatch('updatefqzjTimeFrom', this.dataFrom);
          this.$store.dispatch('updatefqzjTimeTo', this.dataTo);
          this.$store.dispatch('updateisUserfqzj', true);
        } else {
          this.$store.dispatch('updateYeildTimeFrom', this.dataFrom);
          this.$store.dispatch('updateYeildTimeTo', this.dataTo);
          this.$store.dispatch('updateisUserYield', true);
        }
        this.$router.back();
//        this.$router.replace({
//          name: this.toFromPath, query: {
//            datafrom: this.dataFrom,
//            datato: this.dataTo
//          }
//        })
      }
    }
  }
</script>
