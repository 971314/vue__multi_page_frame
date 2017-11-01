<template>

    <div class="rejectTask">

            <common-nav>
                <div slot="body">
                    <span>驳回</span>
                </div>
            </common-nav>

            <div class="container">
                <div class="content">
                    <textarea placeholder="请填写驳回意见">哈克龙手动阀上来看的风景埃里克森的减肥哈克龙手动阀上来看的风景埃</textarea>
                </div>
            </div>

            <div class="approSubmit">
                <button type="button" class="btn reject">提交</button>
            </div>

    </div>
  
</template>


<style lang="scss"> 

    @mixin font($font-size) {

        font-size: $font-size;

        [data-dpr = '2'] & {
            font-size: $font-size * 2;
        }

        [data-dpr = '3'] & {
            font-size: $font-size * 3;
        }
    }

    @function toRem($px) {
        @return $px / 75px * 1rem;
    }

    body{
        -webkit-overflow-scrolling: touch;    
    }

    .rejectTask{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        .pb-common-nav{
            position: static;
        }
        .container{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            overflow: hidden;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            .content{
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                textarea{
                    padding: toRem(20px) toRem(30px);
                    width: 100%;
                    height: toRem(460px);
                    line-height: toRem(46px);
                    border: 0;
                    font-size: toRem(32px);
                    outline: none;
                }
                textarea::-webkit-input-placeholder{
                　　color:#c0c6cd; 
                }
            }
            
        }

        .approSubmit{
                // position: fixed;
                // bottom: 0;
                // left: 0;
                // z-index: 11;
                width: 100%;
                button{
                    padding: 0;
                    width: 100%;
                    height: toRem(98px);
                    line-height: toRem(98px);    
                    font-size: toRem(36px);
                    color: #fff;
                    background-color: #36c;
                    border-radius: 0;
                }
                
            }

        
    }

</style>

<script>

    import moment from "moment";
    import axios from 'axios';
    import browser from '../common/browser';

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
