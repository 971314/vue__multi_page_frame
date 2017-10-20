/**
 * Created by kuo zi on 2016/10/14.
 */
const restUrl = {
  auth: {
    name: "session认证",
    url: "tokenCtrl/auth"
  },
  token: {
    name: "token认证",
    url: "tokenCtrl/token"
  },
  newsBase: {
    name: "新闻列表",
    url: "newsBase/searchPage"
  },
  newsDetail: {
    name: "新闻详情",
    url: "newsBase/get"
  },
  queryAllFuturesExchange4Product: {
    name: "所有交易所(交易所下产品)-产品",
    url: "futures/queryAllFuturesExchange4Product"
  },
  queryAllFuturesExchange4Inventory: {
    name: "所有交易所(交易所下产品)-库存仓单",
    url: "futures/queryAllFuturesExchange4Inventory"
  },
  futuresVarityList: {
    name: "所有交易所(交易所下产品)-库存仓单",
    url: "newsBase/futuresVarityList"
  },
  queryAllFuturesExchange: {
    name: "所有期货交易所",
    url: "futures/queryAllFuturesExchange"
  },
  queryFuturesVarityByExchId: {
    name: "查询交易所下品种",
    url: "futures/queryFuturesVarityByExchId"
  },
  queryProductRankingByTypeId: {
    name: "品种查询对应持仓",
    url: "futures/queryProductRankingByTypeId"
  },
  queryContractRankingByFuturesCode: {
    name: "合约代码查询相应持仓",
    url: "futures/queryContractRankingByTypeId"
  },
  queryFuturesMember: {
    name: "合约代码查询相应持仓",
    url: "futures/queryFuturesMember"
  },
  queryProductRankingByCompanyId: {
    name: "期货公司id查询持仓排序",
    url: "futures/queryProductRankingByCompanyId"
  },
  queryContractRankingCompanyId: {
    name: "期货公司id查询合约排序",
    url: "futures/queryContractRankingCompanyId"
  },
  queryInventoryWeekShTop: {
    name: "期货查询最近库存仓单",
    url: "futures/queryInventoryWeekShTop"
  },
  lineChart: {
    name: "机构动向折线图",
    url: "futures/lineChart"
  },
  location: {
    name: "网点查询",
    url: "department/location"
  },
  priceToRate: {
    name: "国债收益价格-->收益率",
    url: "priceToRate"
  },
  rateToPrice: {
    name: "国债收益收益率-->价格",
    url: "rateToPrice"
  },
  signUp: {
    name: "报名",
    url: "signUp/add"
  },
  f10Info: {
    name: "标准合约",
    url: "f10/info"
  },
  meetingList: {
    name: "会议/市场活动",
    url: "infoList/activityList"
  },
  getCompany: {
    name: "公司简介",
    url: "newsBase/getCompany"
  },
  lineChartProductRanking: {
    name: "通过时间获取品种持仓折线图",
    url: "futures/lineChartProductRanking"
  },
  lineChartContractRanking: {
    name: "通过时间获取合约持仓折线图",
    url: "futures/lineChartContractRanking"
  },
  queryContractRankingByProductId: {
    name: "通过品种获取有持仓的合约",
    url: "futures/queryContractRankingByProductId"
  },
  queryLastProductTime: {
    name: "查询品种最后更新时间",
    url: "futures/queryLastProductTime"
  },
  queryLastInventoryTime: {
    name: "查询库存仓单最后更新时间",
    url: "futures/queryLastInventoryTime"
  },
  queryLastContractTime: {
    name: "查询合约最后更新时间",
    url: "futures/queryLastContractTime"
  }
};

export default restUrl;
