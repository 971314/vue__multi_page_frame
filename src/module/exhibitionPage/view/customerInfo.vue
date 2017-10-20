<template>
  <div class="pobo-customer-info">
    <common-nav :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl">
      <span slot="body">客户资料</span>
    </common-nav>
    <div class="customer-info-center">
      <div class="customer-input-group">
        <div class="customer-input-item">
          <div class="input-item-name">公司名称</div>
          <div class="input-item-input">
            陈嫣
            <!--<input class="item-input-content" placeholder="陈嫣" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">营业部</div>
          <div class="input-item-input">
            总营业部
            <!--<input class="item-input-content" placeholder="总营业部" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">资金账号</div>
          <div class="input-item-input">
            20192312
            <!--<input class="item-input-content" placeholder="20192312" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">性别</div>
          <div class="input-item-input">
            女
            <!--<input class="item-input-content" placeholder="女" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">身份证号码</div>
          <div class="input-item-input">
            330105199303310872
            <!--<input class="item-input-content" placeholder="330105199303310872" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">出生日期</div>
          <div class="input-item-input">
            1993-03-31
            <!--<input class="item-input-content" placeholder="1993-03-31" maxlength="12" type="text" />-->
          </div>
        </div>
      </div>
      <div class="customer-input-group">
        <div class="customer-input-item customer-breakword-item">
          <div class="input-item-name input-item-breakwrod">通讯地址</div>
          <div class="input-item-input">
            上海浦东新区陆家嘴软件园澎博财经咨询有限公司5号楼501
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">营业部</div>
          <div class="input-item-input">
            总营业部
            <!--<input class="item-input-content" placeholder="总营业部" maxlength="12" type="text" />-->
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">公司名称</div>
          <div class="input-item-input">
            澎博财经咨询有限公司
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">手机号码</div>
          <div class="input-item-input">
            15000589723
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">固定电话</div>
          <div class="input-item-input">
            021-233545
          </div>
        </div>
      </div>
      <div class="customer-input-group">
        <div class="customer-input-item">
          <div class="input-item-name">客户来源</div>
          <div class="input-item-input">
            客户介绍
          </div>
        </div>
        <div class="customer-input-item">
          <div class="input-item-name">客户类型</div>
          <div class="input-item-input">
            法人
          </div>
        </div>
      </div>
      <div class="customer-remarks">
        <textarea class="remarks-text-area">这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍monkey-hakihdsadsadsad</textarea>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        gobackUrl: 'goBack'
      }
    }
  }
</script>
