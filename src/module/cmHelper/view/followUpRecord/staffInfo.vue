<template>
  <div class="pbframe staffInfo pobo-customer-info">
        <common-nav>
            <div slot="body">
                <span>员工资料</span>
            </div>
        </common-nav>

        <div class="av-dropdown-group">
                <div class="av-dropdown-selected">

                    <div class="av-selected-items" :class="{'active':activeOption==1}" @click="activeOption=1">
                        <span class="selected-items-text">总部</span>
                        <span class="down-dria"></span>
                        <div class="split-line"></div>
                    </div>

                    <div class="av-selected-items" :class="{'active':activeOption==2}" @click="activeOption=2">
                        <span class="selected-items-text">员工类型</span>
                        <span class="down-dria"></span>
                        <!-- <div class="split-line"></div> -->
                    </div>

                    <div class="filterArea" v-show="activeOption==2">
                        <div class="department">
                            <ul class="area">
                                <li>全中国</li>
                                <li>北京</li>
                                <li>天津</li>
                                <li class="active">上海</li>
                                <li>山西</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                                <li>内蒙古</li>
                            </ul>
                            <ul class="yingye">
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                                <li>商城路营业一部</li>
                                <li>商城路营业二部</li>
                            </ul>
                        </div>
                        <div class="filterAreaMask" @click="activeOption=0"></div>
                    </div>

                </div>
            </div>

        <div class="container customer-info-center">

            

            <div class="content">
                <div class="group">
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                    <a class="cell">
                        <span class="cell-body">
                            <p>李XX(CC01011)</p>
                            <p>成都营业部</p>
                        </span>
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

  export default {
    data(){
      return {
        activeOption : 0,
        showOptions : false
      }
    },
    mounted() {
        
    },
    methods: {
        
    }
  }
</script>