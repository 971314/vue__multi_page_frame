/**
 * Created by pobo on 2017/8/1.
 */

//URL集中管理
const restUrl = {
  queryAllInfo: {
    name: "查询投资者整体业绩分析",
    url: "/Hall/webservice",   //Hallsdx
    service: 'investor_analysis.101'
  },
  queryProfit: {
    name: "资金回报率散点",
    url: "/Hall/webservice",
    service: 'investor_analysis.105'
  },
  queryMoneyEarn: {
    name: "盈亏分析",
    url: "/Hall/webservice",
    service: 'investor_analysis.103'
  },
  queryYkfx: {
    name: "收益率曲线",
    url: "/Hall/webservice",
    service: 'investor_analysis.102'
  },
  queryFQQX: {
    name: "复权曲线",
    url: "/Hall/webservice",
    service: 'investor_analysis.104'
  }
};

export default restUrl;

