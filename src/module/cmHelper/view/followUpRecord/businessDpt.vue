<template>
    <div class="customerInfo businessDpt pobo-customer-info">
        <common-nav>
            <div slot="body">营业部</div>
        </common-nav>
        <!-- <div class="flex filterOption">
            <div class="flex-item" :class="{'active':activeOption==1}" @click="activeOption=1"><span>A-F</span></div>
            <div class="flex-item" :class="{'active':activeOption==2}" @click="activeOption=2"><span>G-L</span></div>
            <div class="flex-item" :class="{'active':activeOption==3}" @click="activeOption=3"><span>M-R</span></div>
            <div class="flex-item" :class="{'active':activeOption==4}" @click="activeOption=4"><span>S-X</span></div>
            <div class="flex-item" :class="{'active':activeOption==5}" @click="activeOption=5"><span>Y-Z/#</span></div>
        </div> -->
        <searchbar v-model="keyword">
            <searchbar-placeholder>
                <icon name="search" left size="lg"></icon><span>搜索</span>
            </searchbar-placeholder>
        </searchbar>
        <div class="container customer-info-center">
            <div class="oneLevel">
                <div class="capitalPinyin">A</div>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">app移动端测试</span>
                        <div class="cell-footer">
                            <img src="../../images/followUpRecord/img03.png"/>
                        </div>
                    </a>
                    <a class="cell">
                        <span class="cell-body">app移动端测试</span>
                        <div class="cell-footer">
                            <img src="../../images/followUpRecord/img03.png"/>
                        </div>
                    </a>
                </div>
            </div>
            <div class="oneLevel">
                <div class="capitalPinyin">B</div>
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">app移动端测试</span>
                        <div class="cell-footer">
                            <img src="../../images/followUpRecord/img03.png"/>
                        </div>
                    </a>
                    <a class="cell">
                        <span class="cell-body">app移动端测试</span>
                        <div class="cell-footer">
                            <img src="../../images/followUpRecord/img03.png"/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import util from '../../utils/util';

    export default {
        data() {
            return {
                activeOption : 1,
                keyword : ''
            }
        },
        activated() {

        },
        mounted() {

        },
        methods: {

        }
    }
</script>
