<template>
    <div class="flexFrameset settSheet">

        <common-nav>
            <div slot="body">
                <span>结算单</span>
            </div>
        </common-nav>

        <div class="container">
            <div class="group mb10">
                <a class="cell">
                    <span class="cell-body">数据类型</span>
                    <span class="cell-footer">逐日</span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
                <a class="cell">
                    <span class="cell-body">导出类型</span>
                    <span class="cell-footer">全部</span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
            </div>

            <div class="group mb10">
                <a class="cell">
                    <span class="cell-body">开始时间</span>
                    <span class="cell-footer"><span>2017-11-01</span><input type="date" name="date1"/></span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
                <a class="cell">
                    <span class="cell-body">结束时间</span>
                    <span class="cell-footer"><span>2017-11-11</span><input type="date" name="date2"/></span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
                <a class="cell">
                    <span class="cell-body">导出区间</span>
                    <span class="cell-footer">默认</span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
            </div>

            <div class="group">
                <a class="cell" @click="showExport=true">
                    <span class="cell-body">导出组成</span>
                    <span class="cell-footer">全部</span>
                    <img class="toDetail" src="../../images/basicAss/img08.png"/>
                </a>
            </div>

            <div class="tips">结算单结果会发送至邮箱</div>

            <div class="group">
                <a class="cell">
                    <span class="cell-body"><input type="text" name="text" placeholder="请填写邮箱" /></span>
                </a>
            </div>

            <div class="submitBtn">
                <button type="button" class="btn btn-block" :disabled="false" >提交</button>
            </div>

            <div class="export" v-if="showExport">
                <div class="exConta">
                    <img class="closeExport" src="../../images/basicAss/img09.png" @click="showExport=false"/>
                    <p class="title text-center">导出组成</p>
                    <div class="dataGrid">
                        <div class="grid">
                            <p class="title">基本组成</p>
                            <div class="options">
                                <div class="op-item text-center active">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0 active">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                            </div>
                        </div>
                        <div class="grid">
                            <p class="title">基本组成</p>
                            <div class="options">
                                <div class="op-item text-center active">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0 active">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center">资金状态</div>
                                <div class="op-item text-center mg0">资金状态</div>
                            </div>
                        </div>
                        <div class="grid">
                            <p class="title">基本组成</p>
                            <div class="options">
                                <div class="op-item text-center active"><div>资金状态</div></div>
                            </div>
                        </div>    
                    </div>
                    <div class="confirmBtnGroup">
                        <div class="flex row">
                            <button class="flex-item text-center">重置</button> 
                            <button class="flex-item text-center" @click="show=false">确定</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <mask-layer :clickable="true" v-show="showExport"/>

        <!-- <multi-slide v-model="show">
          <div class="no-potential-group">
            <div class="no-potential-tel">11111</div>
            <div class="no-potential-tel">11111</div>
            <div class="no-potential-cancel" @click="show=false">取消</div>
          </div>
        </multi-slide> -->

    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import axios from 'axios';
    import util from '../../utils/util';

    export default{
        data() {
            return {
                show : false,
                showExport : false
            }
        },
        activated(){

        },
        mounted() {

        }
    }
</script>
