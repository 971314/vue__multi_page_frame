<template>
  <!--运行、暂停、异常
              客户端flag1：1：新增 2：修改 3：暂停 4：开始 5：删除
              服务器flag3: 21：初始化  22：正在执行  23：已暂停  24：已触发  25：已完成  26: 已删除 27:28：执行异常 网络异常
              如果flag1和flag3不匹配  那就以客户端flag1的值翻译 为 正在.....-->

  <td v-if="flag3 == 27 || flag3 == 28 " class="redTd"> 异常</td>
  <td v-else-if="flag1 == 1 && !flag3"> 正在申报 </td>
  <td v-else-if="flag1 == 1 &&  flag3 == 21"> 正在申报 </td>
  <td v-else-if="flag1 == 1 &&  flag3 == 22" class="greenTd"> 运行 </td>
  <td v-else-if="flag1 == 3 &&　flag3 == 22 "> 暂停切换 </td>
  <td v-else-if="flag1 == 3 &&　flag3 == 23 " class="blueTd"> 暂停 </td>
  <td v-else-if="flag1 == 4  && flag3 == 23 "> 运行切换 </td>
  <td v-else-if="flag1 == 4 &&  flag3 == 22" class="greenTd"> 运行 </td>
  <td v-else-if="flag1 == 2 &&  flag3 == 22" class="greenTd"> 运行 </td>
  <td v-else-if="flag1 == 2 &&　flag3 == 23 " class="blueTd"> 正在申报 </td>
  <td v-else-if="flag1 == 3 &&　flag3 == 21 "> 正在申报 </td>
  <td v-else-if="flag1 == 2 &&　flag3 == 21 "> 正在申报 </td>
  <td v-else-if="flag1 == 5 &&　flag3 != 26">正在删除 </td>
  <td v-else-if="flag1 == 5 && flag3 == 26 ">已删除 </td>
  <td v-else> ---- </td>
</template>
<script>
  export default {
    props: ['flag1', 'flag3']
  }
</script>
