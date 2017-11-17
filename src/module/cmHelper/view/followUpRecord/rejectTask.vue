<template>

    <div class="rejectTask pobo-customer-info">

            <common-nav>
                <div slot="body">
                    <span>驳回</span>
                </div>
            </common-nav>

            <div class="container customer-info-center">
                <div class="content">
                    <textarea placeholder="请填写驳回意见"></textarea>
                </div>
            </div>

            <div class="approSubmit">
                <button type="button" class="btn reject">提交</button>
            </div>

    </div>
  
</template>

<script>

    import moment from "moment";
    import axios from 'axios';

    export default {

        data() {
            return {
                
            }
        },

        mounted() {
            
        },

        methods: {

            //切换tab
            changeHandle(val) {

            }

        }
    }
</script>