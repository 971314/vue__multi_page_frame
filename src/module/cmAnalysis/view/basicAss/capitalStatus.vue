<template>
    <div class="flexFrameset capitalStatus">

        <common-nav>
            <div slot="body">
                <span>资金状况</span>
            </div>
        </common-nav>

        <div class="dateFilter flex">
            <div class="flex-item">
                <span>{{date1}}</span>
                <div class="calendar">
                    <img src="../../images/basicAss/img33.png"/>    
                    <input type="date" name="date1" v-model="date1"/>
                </div>
            </div>
            <span>至</span>
            <div class="flex-item">
                <span>{{date2}}</span>
                <div class="calendar">
                    <img src="../../images/basicAss/img33.png"/>    
                    <input type="date" name="date2" v-model="date2"/>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="group">
                <a class="cell">
                    <span class="cell-body"><span>期初权益</span></span>
                    <span class="cell-footer"><span>93001.78</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>出入金</span></span>
                    <span class="cell-footer"><span class="red1">0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>手续费</span></span>
                    <span class="cell-footer"><span class="green1">0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>总盈亏</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>平仓盈亏</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>持仓盯市盈亏</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>质押变化金额</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>期末结存</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>质押金额</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>保证金占用</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>交割保证金</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>应追加资金</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>可用资金</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>风险度</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>交割手续费</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>期权执行盈亏</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>权利金收入</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>权利金支出</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>市值</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>行权手续费</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>履约手续费</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
                <a class="cell">
                    <span class="cell-body"><span>市值权益</span></span>
                    <span class="cell-footer"><span>0.00</span></span>
                </a>
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
                date1 : util.getDate(),
                date2 : util.getDate()
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
