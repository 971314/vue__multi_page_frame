<template>
    <div class="potential-customer-info">
      <common-nav :search="false" :message="false" :service="false" :goback="false"
                  :gobackUrl="gobackUrl">
        <span slot="body">客户资料</span>
      </common-nav>
      <div class="potential-info-center">
        <div class="customer-info-center">
          <div class="customer-input-group">
            <div class="customer-input-item">
              <div class="input-item-name">姓名</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="稽伟民" maxlength="12" type="text" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">性别</div>
              <div class="input-item-input">
                女
                <!--<input class="item-input-content" placeholder="女" maxlength="12" type="text" />-->
              </div>
              <img class="customer-showdetail-arrow" src="../images/showdetail@2x.png"/>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">身份证号码</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="请添加身份证号码" type="text" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">出生日期</div>
              <div class="input-item-input">
                1993-03-31
                <!--<input class="item-input-content" placeholder="1993-03-31" maxlength="12" type="text" />-->
              </div>
              <img class="customer-showdetail-arrow" src="../images/showdetail@2x.png"/>
            </div>
          </div>
          <div class="customer-input-group">
            <div class="customer-input-item">
              <div class="input-item-name">通讯地址</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="陆家嘴软件园5号楼501" type="text" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">公司名称</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="澎博财经咨询有限公司" type="text" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">手机号码</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="15000589723" type="tel" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">固定电话</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="021-233545" type="tel" />
              </div>
            </div>
          </div>
          <div class="customer-input-group">
            <div class="customer-input-item">
              <div class="input-item-name">客户来源</div>
              <div class="input-item-input">
                <input class="item-input-content" placeholder="客户介绍" type="text" />
              </div>
            </div>
            <div class="customer-input-item">
              <div class="input-item-name">客户类型</div>
              <div class="input-item-input">
                法人
              </div>
              <img class="customer-showdetail-arrow" src="../images/showdetail@2x.png"/>
            </div>
          </div>
          <div class="customer-remarks">
            <textarea class="remarks-text-area">这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍这是一句关于备注的介绍</textarea>
          </div>
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
