<template>
    <div class="flexFrameset home">

        <common-nav>
            <div slot="body">
                <span>21341221</span>
            </div>
        </common-nav>

        <div class="container">

            <div class="navTitle"><span><i>&nbsp;</i>信息查询</span></div>
            <div class="menuArea">
                <div><div><img src="../../images/basicAss/img11.png"/></div><span>资金状态</span></div>
                <div><div><img src="../../images/basicAss/img12.png"/></div><span>出入金</span></div>
                <div><div><img src="../../images/basicAss/img13.png"/></div><span>委托成交</span></div>
                <div><div><img src="../../images/basicAss/img14.png"/></div><span>持仓汇总</span></div>
                <div><div><img src="../../images/basicAss/img15.png"/></div><span>平仓明细</span></div>
                <div><div><img src="../../images/basicAss/img16.png"/></div><span>交割明细</span></div>
                <div><div><img src="../../images/basicAss/img17.png"/></div><span>行权明细</span></div>
                <div><div><img src="../../images/basicAss/img18.png"/></div><span>质押明细</span></div>
                <div><div><img src="../../images/basicAss/img19.png"/></div><span>资金流水</span></div>
                <div @click="forward('settSheet')"><div><img src="../../images/basicAss/img20.png"/></div><span>结算单</span></div>
            </div>

            <div class="navTitle"><span><i>&nbsp;</i>基本评估</span></div>
            <div class="menuArea">
                <div><div><img src="../../images/basicAss/img21.png"/></div><span>账户总览</span></div>
                <div><div><img src="../../images/basicAss/img22.png"/></div><span>持仓统计</span></div>
                <div><div><img src="../../images/basicAss/img23.png"/></div><span>基本分析</span></div>
            </div>

            <div class="navTitle"><span><i>&nbsp;</i>交易分析</span></div>
            <div class="menuArea">
                <div><div><img src="../../images/basicAss/img24.png"/></div><span>收益率曲线</span></div>
                <div><div><img src="../../images/basicAss/img25.png"/></div><span>盈亏分析</span></div>
                <div><div><img src="../../images/basicAss/img26.png"/></div><span>品种盈亏</span></div>
                <div><div><img src="../../images/basicAss/img27.png"/></div><span>盈亏比分析</span></div>
                <div><div><img src="../../images/basicAss/img28.png"/></div><span>风险度分析</span></div>
            </div>

            <div class="navTitle"><span><i>&nbsp;</i>趋势分析</span></div>
            <div class="menuArea">
                <div><div><img src="../../images/basicAss/img29.png"/></div><span>复权资金</span></div>
                <div><div><img src="../../images/basicAss/img30.png"/></div><span>资金回报率</span></div>
                <div><div><img src="../../images/basicAss/img31.png"/></div><span>保证金回报率</span></div>
                <div><div><img src="../../images/basicAss/img32.png"/></div><span>跨度盈亏</span></div>
            </div>

        </div>

    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import axios from 'axios';
    import util from '../../utils/util';

    export default{
        data() {
            return {
                
            }
        },
        activated(){

        },
        mounted() {

        },
        methods:{
            forward(to){
                this.$router.push({ name: to })
            }
        }
    }
</script>
