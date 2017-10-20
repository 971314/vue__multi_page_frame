/**
 * Created by pobo on 2017/7/20.
 */

/*投资者分析基本信息*/
export const InvestorAnaLysisInfo = [
  {
    name: "资金信息",
    pathName: "zjxx",
    list: [
      [
        {
          name: "期初权益",
          code: "02000204",
          value: '0'
        },
        {
          name: "出金",
          code: "02000404",
          value: '0'
        },
        {
          name: "入金",
          code: "02000604",
          value: '0'
        },
        {
          name: "盈亏",
          code: "02000205",
          value: '0'
        },
        {
          name: "手续费",
          code: "02000405",
          value: '0'
        },
        {
          name: "期末权益",
          code: "02000605",
          value: '0'
        },
        {
          name: "质押变动金额",
          code: "02000206",
          value: '0'
        },
        {
          name: "净盈亏",
          code: "02000406",
          value: '0'
        },
        {
          name: "日均权益",
          code: "02000606",
          value: '0'
        }
      ]
    ]
  },
  {
    name: "交易信息",
    pathName: "jyxx",
    list: [
      [
        {
          name: "有持仓天数",
          code: "02000207",
          value: '0'
        },
        {
          name: "有交易天数",
          code: "02000407",
          value: '0'
        }
      ],
      [
        {
          name: "追保次数",
          code: "02000208",
          value: '0'
        },
        {
          name: "强平次数",
          code: "02000408",
          value: '0'
        },
        {
          name: "强平手数",
          code: "02000608",
          value: '0'
        }
      ],
      [
        {
          name: "成交金额",
          code: "02000211",
          value: '0'
        },
        {
          name: "成交手数",
          code: "02000411",
          value: '0'
        },
        {
          name: "月均成交金额",
          code: "02000212",
          value: '0'
        },
        {
          name: "月均成交手数",
          code: "02000412",
          value: '0'
        },
        {
          name: "交割金额",
          code: "02000213",
          value: '0'
        },
        {
          name: "交割手续费",
          code: "02000413",
          value: '0'
        }
      ],
      [
        {
          name: "期末风险度",
          code: "02000214",
          value: '0'
        },
        {
          name: "日均风险度",
          code: "02000414",
          value: '0'
        },
        {
          name: "有交易日均风险度",
          code: "02000614",
          value: '0'
        }
      ],
      [
        {
          name: "开仓手数",
          code: "02000215",
          value: '0'
        },
        {
          name: "平今仓手数",
          code: "02000415",
          value: '0'
        },
        {
          name: "平今仓比例",
          code: "02000615",
          value: '0'
        }
      ],
      [
        {
          name: "日均收益率",
          code: "S2000216",
          value: '0'
        },
        {
          name: "累计收益率",
          code: "S2000416",
          value: '0'
        },
        {
          name: "盈亏稳定性",
          code: "S2000616",
          value: '0'
        },
        {
          name: "单元盈利能力",
          code: "S2000217",
          value: '0'
        }
      ]
    ]
  },
  {
    name: "适应性分析",
    pathName: "syxfx",
    list: [
      [
        {
          name: "交易适应性描述",
          code: "",
          value: ''
        }
      ],
      [
        {
          name: "平今盈",
          code: "02000218",
          value: '0'
        },
        {
          name: "平今亏",
          code: "02000418",
          value: '0'
        },
        {
          name: "平今盈次数",
          code: "02000220",
          value: '0'
        },
        {
          name: "平今亏次数",
          code: "02000420",
          value: '0'
        },
        {
          name: "平今盈亏比",
          code: "02000618",
          value: '0'
        }
      ],
      [
        {
          name: "平昨盈",
          code: "02000219",
          value: '0'
        },
        {
          name: "平昨亏",
          code: "02000419",
          value: '0'
        },
        {
          name: "平昨盈次数",
          code: "02000221",
          value: '0'
        },
        {
          name: "平昨亏次数",
          code: "02000421",
          value: '0'
        },
        {
          name: "平昨盈亏比",
          code: "02000619",
          value: '0'
        }
      ],
      [
        {
          name: "总盈亏比",
          code: "02000620",
          value: '0'
        }
      ]
    ]
  }
];

//品种列表
export const ProductType = [
  {code: "", name: "全部"},
  {code: "a", name: "黄大豆1号"},
  {code: "ag", name: "白银"},
  {code: "al", name: "铝"},
  {code: "au", name: "黄金"},
  {code: "b", name: "黄大豆2号"},
  {code: "bb", name: "细木工板"},
  {code: "bu", name: "石油沥青"},
  {code: "c", name: "黄玉米"},
  {code: "CF", name: "一号棉花"},
  {code: "cs", name: "玉米淀粉"},
  {code: "cu", name: "铜"},
  {code: "ER", name: "早籼稻"},
  {code: "fb", name: "中密度纤维板"},
  {code: "FG", name: "玻璃"},
  {code: "fu", name: "燃料油"},
  {code: "hc", name: "热轧卷板"},
  {code: "i", name: "铁矿石"},
  {code: "IC", name: "中证500指数"},
  {code: "IF", name: "沪深300指数"},
  {code: "IH", name: "上证50指数"},
  {code: "j", name: "冶金焦炭"},
  {code: "jd", name: "鲜鸡蛋"},
  {code: "jm", name: "焦煤"},
  {code: "JR", name: "粳稻谷"},
  {code: "l", name: "线型低密度聚乙烯"},
  {code: "LR", name: "晚籼稻"},
  {code: "m", name: "豆粕"},
  {code: "MA", name: "甲醇MA"},
  {code: "ME", name: "甲醇"},
  {code: "ni", name: "镍"},
  {code: "OI", name: "菜籽油"},
  {code: "p", name: "棕榈油"},
  {code: "pb", name: "铅"},
  {code: "PM", name: "普通小麦"},
  {code: "pp", name: "聚丙烯"},
  {code: "QM", name: "优质强筋小麦"},
  {code: "rb", name: "螺纹钢"},
  {code: "RI", name: "早籼稻"},
  {code: "RM", name: "菜籽粕"},
  {code: "RO", name: "菜籽油"},
  {code: "RS", name: "油菜籽"},
  {code: "ru", name: "天然橡胶"},
  {code: "SF", name: "硅铁"},
  {code: "SM", name: "锰硅"},
  {code: "sn", name: "锡"},
  {code: "SR", name: "白砂糖"},
  {code: "T", name: "10年期国债"},
  {code: "TA", name: "精对苯二甲酸"},
  {code: "TC", name: "动力煤"},
  {code: "TF", name: "5年期国债"},
  {code: "v", name: "聚氯乙烯"},
  {code: "WH", name: "优质强筋小麦"},
  {code: "wr", name: "线材"},
  {code: "WS", name: "优质强筋小麦"},
  {code: "WT", name: "硬冬白小麦"},
  {code: "y", name: "豆油"},
  {code: "ZC", name: "动力煤ZC"},
  {code: "zn", name: "锌"}
]

