/**
 * Created by pobo on 2017/8/16.
 */
export default  {
  components: {
    StateChange: {
      props: {
        flag1: {
          required: true
        },
        flag3: {
          required: true
        }
      },
      render(h) {
        const flag1 = this.flag1;
        const flag3 = this.flag3;
        let classTag = '';
        let text = ``;
        /*运行、暂停、异常
              客户端flag1：1：新增 2：修改 3：暂停 4：开始 5：删除
              服务器flag3: 21：初始化  22：正在执行  23：已暂停  24：已触发  25：已完成  26: 已删除 27:28：执行异常 网络异常 29:已失效
              如果flag1和flag3不匹配  那就以客户端flag1的值翻译 为 正在.....*/
        if (flag3 == 27){
          text = `触发异常`;
          classTag = 'redTd';
        }else if(flag3 == 28){
          text = `网络异常`;
          classTag = 'redTd';
        }else if(flag3 == 24){
          text = `已触发`;
          classTag = 'none';
        }else if(flag3 == 25){
          text = `已完成`;
          classTag = 'none';
        }else if(flag3 == 29){
          text = `已失效`;
          classTag = 'none';
        }else if (flag1 == 1 && !flag3 || flag1 == 1 && flag3 == 21 ||flag1 == 2 && flag3 == 21) {
          text = `正在申报`;
        } else if (flag1 == 1 && flag3 == 22 ||flag1 == 2 && flag3 == 22|| flag1 == 4 && flag3 == 22) {
          text = `运行`;
          classTag = 'greenTd';
        } else if (flag1 == 3 && flag3 == 23 || flag1 == 1 && flag3 == 23 || flag1 == 2 && flag3 == 23) {
          text = `暂停`;
          classTag = 'blueTd';
        }else if (flag1 == 3 && flag3 == 22 || flag1 == 3 && flag3 == 21) {
          text = `暂停切换`;
        } else if (flag1 == 4 && flag3 == 23 || flag1 == 4 && flag3 == 21) {
          text = `运行切换`;
        }else if (flag1 == 5 && flag3 == 21 || flag1 == 5 && flag3 == 22 ||flag1 == 5 && flag3 == 23) {
          text = `删除中`;
        } else if (flag1 == 5 && flag3 != 26) {
          text = `正在删除`;
        } else if (flag1 == 5 && flag3 == 26) {
          text = `已删除`;
        } else {
          text = `----`;
        }
        return h('td', {
          attrs: {
            class: classTag
          }
        }, text);
      }
    }
  }
}
