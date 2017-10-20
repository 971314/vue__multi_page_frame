<template>

    <div class="cmTrends myAttention">

        <div>
            <common-nav>
                <div slot="body">
                    <span>我的关注</span>
                </div>
            </common-nav>
        </div>

        <div class="container">
            
            <div class="group">
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>手机号码变更申请完成</span></h3>
                        <h3><img src="../images/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>今天生日</span></h3>
                        <h3><img src="../images/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>手机号码变更申请完成</span></h3>
                        <h3><img src="../images/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
                    </span>
                </a>
                <a class="cell">
                    <span class="cell-body">
                        <h3>李XX<span>今天生日</span></h3>
                        <h3><img src="../images/img14.png" v-for="s in starLevel"/><span>13:23</span></h3>
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
                starLevel : ['','','','','']
            }
        },

        mounted() {
            
        },

        methods: {

        }
    }
</script>
