<template>

    <div class="cmTrends">

        <div>
            <common-nav>
                <div slot="body">
                    <span>客户动态</span>
                </div>
                <div slot="footer">
                    <div class="picker-area">
                        <input class="date-picker" v-if="isIos" v-model="pickerValue" type="date" @blur = "changeDate()"/>
                        <input class="date-picker" v-if="!isIos" v-model="pickerValue" type="date" @change = "changeDate()"/>
                        <img class="calendar-icon" src="../images/img15.png"/>
                    </div>
                </div>
            </common-nav>
        </div>

        <div class="container">
            
            <div class="group-title">
                <i>&nbsp;</i><strong>今天</strong>
            </div>
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
            </div>

            <div class="group-title">
                <i>&nbsp;</i><strong>今天</strong>
            </div>
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>13:23</span></h3>
                        出入金变动
                    </span>
                </a>
            </div>

        </div>

    </div>

  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../common/browser';

    export default {

        data() {
            return {
                pickerValue : '',
                //客户端类型（ios || android）
                isIos : browser.versions.ios || browser.versions.iPhone || browser.versions.iPad
            }
        },

        mounted() {
            
        },

        methods: {
            changeDate(){

            }
        }
    }
</script>
