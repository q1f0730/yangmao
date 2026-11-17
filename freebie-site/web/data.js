/* 羊毛作战室 · 零成本活动数据（核查基准 2026-11-17 11:00）
   收录门槛：cost=free（零现金成本）且 value ≥ 10 元（面值/官方定价估算）。
   需消费/需绑卡新办/估值<10元的条目已移出（见 AVOID）。
   conf: 3=官方一手 / 2=多源交叉 / 1=线报单源（以App内页面为准）
   daily: 每日例行; today: 今日时点事件; req: 非现金前提
   类目: tea/food/ecom/bank/telco/douyin/content/ai/student/vip */
window.META = {
  verifiedDate: "2026-11-17",
  title: "羊毛作战室",
  subtitle: "零成本羊毛 · 可执行攻略仪表盘",
  note: "数据核查于 2026-11-17 11:00（三路增补调研：AI 权益与免费算力 / 大学生权益 / 会员权益，叠加原有六路：餐饮 / 电商支付 / 银行运营商 / 抖音 / 小红书 / B站）。本站只收录零现金成本、估值 ≥ 10 元的羊毛；需消费、需绑卡新办、估值低于 10 元的小额福利、以及靠每日/连续签到攒奖励的长期签到型活动均已移出。已参加与过期的活动自动隐藏并归档进「记录」。每日 08:00 定时任务自动核查更新。金额与名额以各 App 活动页实时显示为准；★ 线报类条目参与前先确认页面仍在。"
};

window.ACTIVITIES = [
  // ============ 今日时点 ============
  {
    id: "tastien-weibo", brand: "塔斯汀", cat: "food", cost: "free", conf: 3, today: true, value: 30,
    title: "微博转发抽汉堡套餐 · 今天 15:00 截止",
    reward: "香辣鸡腿中国汉堡套餐 ×3（中奖率低，顺手一转，零成本）",
    entry: "微博关注 @塔斯汀中国汉堡 → 转发「TBTI 心理测试」活动微博",
    steps: [ "关注 @塔斯汀中国汉堡 官方微博", "转发「TBTI 心理测试」那条活动微博", "11/17 15:01 开奖；中奖后 5 日内填信息，券发到同手机号会员账户" ],
    slots: [], todayDeadline: "15:00", schedule: "11/10–11/17 15:00", deadline: "2026-11-17",
    sources: [ { t: "塔斯汀官方微博", u: "https://m.weibo.cn/detail/5363673046714069" } ]
  },

  // ============ 每周时点 ============
  {
    id: "luckin-mon", brand: "瑞幸咖啡", cat: "tea", cost: "free", conf: 2, value: 16,
    title: "周一抽奖 · 1万张0元饮品券",
    reward: "1 万张 0 元饮品券（可可黑巧新品）+ 10 万张 11.9 元券 + 89 万张 8.3 折券；进页面即有 1 次免费机会，非 100% 中奖",
    entry: "瑞幸 App / 微信小程序首页活动页（不依赖口令）",
    steps: [ "打开瑞幸 App/小程序，找首页活动页/弹窗（找不到就检查是否关闭了个性化推荐）", "进活动页得 1 次免费抽奖机会（买饮品可加次数，但不买也能抽）", "并行通道：「瑞幸咖啡」公众号回复当期关键词抽 0 元券（每天限 1 次；当期口令需当天看公众号，网传旧口令已过期）", "同一用户活动期内免单券/实物最多中 1 次；账号需与微信绑定手机号一致" ],
    slots: [], schedule: "每周一（另有周三「幸运星期三」3 万份免单）", deadline: null,
    sources: [ { t: "抽奖规则全文转述", u: "https://feng.ifeng.com/c/8xxdswhiWG6" }, { t: "深圳本地宝周一攻略", u: "https://sz.bendibao.com/youhui/2026112/1015393.shtm" }, { t: "11/16 当日汇总", u: "https://m.sohu.com/a/1102103491_121123726/" } ]
  },
  {
    id: "mcd-mon", brand: "麦当劳", cat: "food", cost: "free", conf: 3, value: 20,
    title: "周一麦麦省 · App 免费领券包",
    reward: "每周不同的汉堡/小食/甜品优惠券（含买一送一、折扣单品）；领券零成本，用券消费才花钱",
    entry: "麦当劳官方 App → 「周一麦麦省」",
    steps: [ "打开麦当劳 App 并登录会员", "进「周一麦麦省」页面免费领券", "券一般 7 天有效，先领了再说，用不用随你" ],
    slots: [], schedule: "每周一常态化", deadline: null,
    sources: [ { t: "麦当劳官网最新优惠", u: "https://www.mcdonalds.com.cn/page/latest-benefits/" } ]
  },
  {
    id: "meituan-18", brand: "美团", cat: "ecom", cost: "free", conf: 2, value: 30,
    title: "18会员惊喜日 · 11/18 周三",
    reward: "免单资格、大额券包、品类秒杀（官方定位「1000万份真免单」级节点）",
    entry: "美团 App 首页搜索「18会员惊喜日」",
    steps: [ "11/18 当天打开美团 App", "首页搜索「18会员惊喜日」进会场", "蹲免单资格与大额券包（旧名「神券节」已升级为此活动）" ],
    schedule: "每月 18 日；下一场 11/18（周三）", deadline: "2026-11-18",
    note: "本月最大单点。2026-11 场次细则未见官方公告，11/17 可先搜一次确认入口。",
    sources: [ { t: "美团官宣报道", u: "https://www.donews.com/news/detail/4/6183101.html" } ]
  },
  {
    id: "meituan-sat", brand: "美团闪购", cat: "ecom", cost: "free", conf: 3, value: 25,
    title: "神价日 · 每周六限时免单",
    reward: "限时免单周周抢、1 元秒杀、爆品神价",
    entry: "美团 App 首页搜索「神价日」",
    steps: [ "周六（下一场 11/21）打开美团", "搜索「神价日」进会场", "抢限时免单与 1 元秒杀" ],
    schedule: "每周六", deadline: null,
    sources: [ { t: "美团官方号物料", u: "https://m.weibo.cn/status/detail/5365181288287088" } ]
  },
  {
    id: "unicom-19", brand: "中国联通", cat: "telco", cost: "free", conf: 2, value: 20,
    title: "联通客户日 · 11/19 周四",
    reward: "拼图/摇一摇抽奖：视频会员月卡、话费、流量",
    entry: "中国联通 App 搜「联通客户日」→ 顶部横幅",
    steps: [ "11/19 打开中国联通 App", "搜索「联通客户日」进顶部横幅活动页", "玩拼图/摇一摇抽奖" ],
    schedule: "每月 19 日", deadline: "2026-11-19",
    note: "11 月具体奖品清单未公开，当天进页面看。",
    sources: [ { t: "联通客户日百科", u: "https://baike.baidu.com/item/联通客户日/67309293" }, { t: "线报操作路径", u: "https://25xianbao.com/archives/28603" } ]
  },
  {
    id: "bocom-dcep", brand: "交通银行", cat: "bank", cost: "free", conf: 1, req: "数币钱包", value: 16,
    title: "数币月享节 · 16元红包（下一场 12/16）",
    reward: "16 元数币支付红包（4.01-4 / 20-4 / 80-8 三张）；每日 12 点另抽 0.16–2026 元数币红包",
    entry: "交通银行 App（需数币试点地区 + 交行/网商数币钱包）",
    steps: [ "确认已开通交行或网商银行数字人民币钱包", "每月 16 日 12:00 整进交行 App 数币活动页抢 16 元红包", "11/16 场已结束，下一场 12/16；每日 12 点数币抽奖仍可在 App 内确认" ],
    slots: [], schedule: "每月 16 日 12 点（下一场 12/16）", deadline: "2026-11-30",
    note: "线报来源，开抢前先在 App 内确认活动页存在。",
    sources: [ { t: "羊毛村 11.16 线报", u: "https://ym2.cc/ymxb/25768.html" } ]
  },
  {
    id: "chagee-bday", brand: "霸王茶姬", cat: "tea", cost: "free", conf: 1, req: "11月生日", value: 18,
    title: "11月生日礼",
    reward: "生日礼券（具体权益以小程序展示为准）",
    entry: "霸王茶姬小程序 → 会员生日礼入口",
    steps: [ "限 10/31 前注册、生日在 11 月的会员", "小程序会员生日礼入口领券", "11/30 前核销" ],
    schedule: "11/1–11/30", deadline: "2026-11-30",
    note: "单一来源，奖品内容未核实。",
    sources: [ { t: "洛阳本地宝汇总", u: "https://view.inews.qq.com/a/20261105A0BZZD00/" } ]
  },
  {
    id: "ms-rewards", brand: "微软 Rewards × B站", cat: "content", cost: "free", conf: 2, req: "已有微软积分", value: 25,
    title: "7500积分兑B站30天大会员 · 兑换码11/20失效",
    reward: "哔哩哔哩 30 天大会员礼品卡（每账户限兑 1 次，兑完即止）",
    entry: "Microsoft Rewards 国区兑换页（需已有微软积分）",
    steps: [ "有微软积分的进 Rewards 兑换页找「哔哩哔哩30天大会员礼品卡」", "7500 积分兑换", "兑换码 11/20 前激活（激活后权益 30 天；11/20 是码的期限，不是会员到期日）" ],
    schedule: "兑换码有效期至 11/20", deadline: "2026-11-20",
    note: "不支持退款/更换/延期。没有微软积分的不必为它做任务。",
    sources: [ { t: "官方兑换页转述", u: "https://m.weibo.cn/detail/5361562890018646" } ]
  },

  // ============ 每日零成本例行 ============
  {
    id: "tb-shangou", brand: "淘宝闪购", cat: "ecom", cost: "free", conf: 2, daily: true, value: 25,
    title: "闪购频道抽免单",
    reward: "免单卡、无门槛外卖红包",
    entry: "淘宝 App → 顶部「闪购」标签 → 页面下拉「抽免单」",
    steps: [ "打开淘宝，点顶部「闪购」标签", "页面下拉找到「抽免单」入口", "每日抽免单卡/红包；别用网传数字口令，直接找页面入口" ],
    schedule: "每日（UP 主多日实测）", deadline: null,
    sources: [ { t: "B站实测教程", u: "https://www.bilibili.com/video/BV1cLWt6gEc7" } ]
  },
  {
    id: "baidu-aistudio-gpu", brand: "百度飞桨 AI Studio", cat: "ai", cost: "free", conf: 3, value: 300,
    title: "新手任务100算力点 · 约200小时V100",
    reward: "新手任务一次性送 100 算力点 ≈ 200 小时 V100（90 天有效）；每日签到 8 点属长期签到，已按偏好不列入",
    entry: "aistudio.baidu.com → 登录实名 → 新手任务/成长中心",
    steps: [ "百度账号登录 aistudio.baidu.com 并完成实名", "进「新手任务/成长中心」完成任务领 100 算力点", "创建 Notebook 选 V100 16G 环境启动", "重要文件下载或存数据集（环境非持久化）；别误点 BML 付费套餐" ],
    schedule: "一次性发放，新手点数 90 天有效", deadline: null,
    note: "单次会话有时长上限；只做一次性新手任务，不做每日签到。",
    sources: [ { t: "飞桨 AI Studio 官网", u: "https://aistudio.baidu.com/" }, { t: "全网 AI 免费权益清单 2026.11.06", u: "https://post.smzdm.com/p/a6z42x4n/" } ]
  },
  {
    id: "huawei-codearts-daily-token", brand: "华为云 码道", cat: "ai", cost: "free", conf: 3, daily: true, value: 15,
    title: "码道每日 1000 万 Token · 登录即送",
    reward: "每日 1000 万 Token 免费额度（GLM-5.3-flash / DeepSeek V4 Pro / V4 Flash），当日 0 点清零；体验版另含每月 500 万 Token",
    entry: "activity.huaweicloud.com/codearts_agent.html → 一键免费开通体验版 → 码道 IDE 或 VS Code/JetBrains 插件",
    steps: [ "手机号或邮箱注册华为云并完成实名（无需绑卡）", "活动页点「一键免费开通」码道体验版（默认 1 个月可续）", "下载码道 IDE 或装 CodeArts Agent 插件，登录即到账", "当天把要跑的活跑完（0 点清零不累计）" ],
    schedule: "每日刷新，当日有效", deadline: null,
    note: "额度仅限码道内使用，不能导出到自己的 Agent；总池「价值 100 万元 Token 发完即止」，可能提前结束；模型会轮换，以 IDE 内列表为准。",
    sources: [ { t: "华为云码道官方活动页", u: "https://activity.huaweicloud.com/codearts_agent.html" }, { t: "每天送 1000 万 token 实测", u: "https://m.163.com/dy/article/LA7CC36F05566SCS.html" } ]
  },
  {
    id: "volcengine-ark-daily", brand: "火山引擎 方舟", cat: "ai", cost: "free", conf: 2, daily: true, value: 25,
    title: "方舟新户额度 + 实名后每日刷新",
    reward: "新用户每模型一次性 50 万 Tokens；个人实名后每模型每天再送 200 万 Tokens 自动刷新（活动页标注单日可用 2000 万以上）",
    entry: "console.volcengine.com/ark → 开通管理 → 左侧「活动/免费额度」卡片",
    steps: [ "注册火山引擎账号并完成个人实名", "进方舟控制台「开通管理」逐个开通要用的模型", "打开活动卡片按提示领取（刷新额度需当日进页面确认）", "创建 API Key，用兼容 OpenAI 的 endpoint 验证" ],
    schedule: "一次性额度 + 每日刷新（口径以活动页为准）", deadline: null,
    note: "官方文档本轮抓取失败，数字来自两个独立二手来源；参与前先确认页面仍在。每日刷新额度通常当日有效。",
    sources: [ { t: "全网 AI 免费权益清单 2026.11.11", u: "https://post.m.smzdm.com/p/ae65nxxm/" }, { t: "火山方舟产品页", u: "https://www.volcengine.com/product/ark" } ]
  },
  // ============ AI 权益 / 免费算力 ============
  {
    id: "xfyun-spark-x26", brand: "讯飞星火", cat: "ai", cost: "free", conf: 2, value: 150,
    title: "Spark-X2.6 新用户 10 亿 Token · 31天有效",
    reward: "Spark-X2.6 模型 10 亿 Token 免费额度，实名后一次性领取，31 天有效",
    entry: "console.xfyun.cn → 实名 → 左侧「星火大模型」→ 模型详情/活动中心领取",
    steps: [ "手机号注册 console.xfyun.cn 并完成个人实名", "创建应用拿到 APPID / APIKey / APISecret", "模型列表选 Spark-X2.6 点「领取免费额度」", "用 OpenAI 兼容地址接入客户端验证到账" ],
    schedule: "一次性发放，领取起 31 天倒计时", deadline: null,
    note: "31 天很短，先想好用途再领；额度按模型隔离；以控制台「我的额度」为准。",
    sources: [ { t: "全网 AI 免费权益清单 2026.11.06", u: "https://post.smzdm.com/p/a6z42x4n/" }, { t: "讯飞开放平台官网", u: "https://www.xfyun.cn/" } ]
  },
  {
    id: "modelscope-free-gpu", brand: "魔搭 ModelScope", cat: "ai", cost: "free", conf: 2, value: 50,
    title: "免费 Notebook GPU · 24G显存36小时",
    reward: "NVIDIA 24G 显存环境共 36 小时免费（单次最长 10 小时、闲置 1 小时自动关停）；另有 AMD 192G 显存 100 小时口径",
    entry: "modelscope.cn → 登录 → 我的 Notebook → 新建 → 选 GPU 规格",
    steps: [ "阿里云账号或手机号登录 modelscope.cn 并绑定阿里云账号（实名）", "进「Notebook」新建实例，规格选 NVIDIA 24G", "在 /mnt/workspace 下工作（唯一持久化目录）", "用完手动关机，避免闲置计时被扣" ],
    schedule: "一次性总额度，不按月刷新", deadline: null,
    note: "36 小时是总量不是每月，用完不返还；不同规格额度不同，以控制台倒计时为准。",
    sources: [ { t: "魔搭 ModelScope 官网", u: "https://modelscope.cn/" }, { t: "全网 AI 免费权益清单 2026.11.06", u: "https://post.smzdm.com/p/a6z42x4n/" } ]
  },
  {
    id: "zhipu-bigmodel-pack", brand: "智谱 BigModel", cat: "ai", cost: "free", conf: 3, value: 40,
    title: "新用户 2000 万 Token 资源包 · 90天",
    reward: "2000 万 Token 分 3 个资源包发放，90 天有效；GLM-4.7-Flash 另永久免费",
    entry: "bigmodel.cn → 控制台 → 【财务】→【资源包】",
    steps: [ "手机号注册 bigmodel.cn 并完成个人实名", "在控制台创建 API Key", "进【财务】→【资源包】确认 3 个包到账", "用兼容 OpenAI 地址调用 GLM-4.7-Flash 测通链路" ],
    schedule: "一次性发放，90 天倒计时", deadline: null,
    note: "多个包到期时间不同，以【财务】→【资源包】为准；ZCode 内「约 3 亿体验 Token」说法不一，别当已到手额度。",
    sources: [ { t: "智谱 BigModel 开放平台", u: "https://bigmodel.cn/" }, { t: "智谱开放平台文档中心", u: "https://docs.bigmodel.cn/" } ]
  },
  {
    id: "tencent-tokenhub-newuser", brand: "腾讯云 TokenHub", cat: "ai", cost: "free", conf: 3, value: 30,
    title: "新人免费体验包 · 每模型100万Token/1年",
    reward: "所有语言模型各 100 万 Token + 所有多模态理解模型各 100 万 Token，均 1 年有效；生视频 50 积分、混元生3D 各 100 积分",
    entry: "console.cloud.tencent.com/tokenhub → 模型广场右上角「新用户福利免费体验」",
    steps: [ "注册腾讯云账号并完成个人实名", "进 TokenHub 控制台按提示开通服务", "进「模型广场」点右上角「新用户福利免费体验」", "弹窗只勾近期要用的模型（每模型只能领一次，领了不用会过期）" ],
    schedule: "一次性领取，额度自领取起 1 年有效；活动至 2026-12-31", deadline: "2026-12-31",
    note: "免费额度按主账号维度、每模型仅一次、不可叠加；额度用尽未开后付费会自动停服（不会扣钱）。",
    sources: [ { t: "TokenHub 新人免费体验包官方文档", u: "https://cloud.tencent.com/document/product/1823/130053" }, { t: "腾讯云开发者社区实测", u: "https://cloud.tencent.com/developer/article/2775276" } ]
  },
  {
    id: "qianfan-newuser-free", brand: "百度智能云 千帆", cat: "ai", cost: "free", conf: 2, value: 20,
    title: "新用户每模型100万Token · 合计约1400万",
    reward: "14 款预置模型各 100 万 Token（ERNIE-4.5 / DeepSeek / Qwen3 / Kimi 等），3 个月有效；ERNIE-Speed、ERNIE-Lite 永久免费不限量（限 QPS）",
    entry: "console.bce.baidu.com/qianfan → 立即开通 → 首页「配额管理」",
    steps: [ "百度账号登录百度智能云并完成实名（刷脸约 1 分钟）", "进千帆 ModelBuilder 控制台点「立即开通」→「确认开通」", "到「配额管理」核对每个模型到账", "「应用接入」→「创建应用」拿 API Key，填进 Cursor/Cline" ],
    schedule: "一次性发放，3 个月有效，不按月重置", deadline: null,
    note: "免费额度仅抵扣在线推理，批量推理不抵扣；官方有「模型赠送资源下线公告」，以控制台为准；高并发会 429。",
    sources: [ { t: "千帆新用户 1400 万 Token 实测整理", u: "http://m.toutiao.com/group/7693790539150033442/" }, { t: "千帆免费额度领取步骤实测", u: "https://m.blog.csdn.net/2601_96199011/article/details/161524055" } ]
  },
  {
    id: "bailian-newuser-free", brand: "阿里云百炼", cat: "ai", cost: "free", conf: 3, value: 15,
    title: "新用户每模型100万Token · 90天",
    reward: "每个在架模型独立 100 万 Token 免费额度，90 天有效；领 10 个模型约 1000 万 Token",
    entry: "bailian.console.aliyun.com → 模型广场 → 模型详情「免费额度/领取」",
    steps: [ "阿里云账号登录并完成个人实名", "开通百炼模型服务，region 选华北2（北京）", "模型广场逐个看「免费额度」标记，只领在架且显示可领的", "创建 API-KEY，用 DashScope 兼容地址跑一次调用验证" ],
    schedule: "一次性发放，每模型 90 天有效", deadline: null,
    note: "官方口径是「每模型通常 100 万 Token」，网传「7000 万/70+ 模型」是旧汇总；2026-10-29、11-13、11-15 已有多批模型下架免费额度，实领清单必须在控制台看。",
    sources: [ { t: "百炼新用户免费额度官方文档", u: "https://help.aliyun.com/zh/model-studio/new-free-quota" }, { t: "全网 AI 免费权益清单 2026.11.06", u: "https://post.smzdm.com/p/a6z42x4n/" } ]
  },

  // ============ 大学生权益 ============
  {
    id: "github-student-pack", brand: "GitHub", cat: "student", cost: "free", conf: 3, req: "在读学籍", value: 1500,
    title: "学生开发者包 · Pro+Copilot+十余家合作方",
    reward: "GitHub Pro 免费 + Copilot Student（无限补全）+ 1Password 2 年 + Namecheap .me 域名与 SSL + Heroku 24 个月 $13/月 + JetBrains/Notion 授权 + Azure $100",
    entry: "education.github.com/pack → Sign up for Student Developer Pack",
    steps: [ "打开 education.github.com/pack 点「Sign up for Student Developer Pack」", "用学校邮箱或上传学生证/学信网截图证明在读", "等待审核（通常数小时到数日）", "通过后在 github.com/settings/education/benefits 逐个激活合作方权益（注意各自激活窗口，过期不补）" ],
    schedule: "随时申请，一年一审", deadline: null,
    note: "需 13 岁以上、在读学位授予机构；2026-04 曾公告学生计划暂停新注册，当前页面已无该提示，申请前先确认入口仍在。",
    sources: [ { t: "GitHub Student Developer Pack 官方页", u: "https://education.github.com/pack" }, { t: "GitHub Docs 学生申请指南", u: "https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student" } ]
  },
  {
    id: "jetbrains-student", brand: "JetBrains", cat: "student", cost: "free", conf: 3, req: "在读学籍", value: 1500,
    title: "学生授权 · 全产品包 IDE 免费",
    reward: "All Products Pack 免费授权：IntelliJ IDEA Ultimate、PyCharm Pro、WebStorm、CLion、GoLand、DataGrip、Rider 等全线 IDE",
    entry: "jetbrains.com.cn/academy/student-pack/ → 立即申请",
    steps: [ "打开学生授权页点「立即申请」", "选验证方式：学校邮箱 / ISIC 国际学生证 / 已认证的 GitHub 学生包", "提交后等待邮件确认", "登录 JetBrains Account 下载 IDE，用学生账号激活" ],
    schedule: "每年复审续期一次，到期前邮件提醒", deadline: null,
    note: "需在读（含本科/硕博）；学校无邮箱则用学信网学籍报告或 ISIC；仅限个人学习不得商用；毕业即失效。",
    sources: [ { t: "JetBrains 学生与教师授权官方页", u: "https://www.jetbrains.com.cn/academy/student-pack/" }, { t: "GitHub 学生包 JetBrains 条目", u: "https://education.github.com/pack" } ]
  },
  {
    id: "autodesk-education", brand: "Autodesk", cat: "student", cost: "free", conf: 3, req: "在读证明", value: 13800,
    title: "教育版 · AutoCAD/Maya/Revit 一年免费",
    reward: "一年期教育许可可续期：AutoCAD、Revit、Maya、3ds Max、Fusion 360、Civil 3D、Inventor 等，最多 3 台设备",
    entry: "autodesk.com.cn/education/edu-software/overview → 注册 → 学生身份审核",
    steps: [ "打开 Autodesk 中国教育页注册账号", "选「学生」身份，填学校、专业、入学与预计毕业年份", "上传学生证/在读证明/学信网报告完成审核", "通过后在「教育产品」列表下载安装，授权自动绑定账号" ],
    schedule: "许可 1 年，在读即可续期", deadline: null,
    note: "教育版文件带教育水印，不得用于商业项目；单账号最多 3 台设备同时登录。",
    sources: [ { t: "Autodesk 中国教育版总览", u: "https://www.autodesk.com.cn/education/edu-software/overview" }, { t: "AutoCAD 官方产品与订阅页", u: "https://www.autodesk.com/products/autocad/overview" } ]
  },
  {
    id: "notion-education", brand: "Notion", cat: "student", cost: "free", conf: 2, req: "学校邮箱", value: 864,
    title: "教育版 · Plus 全功能免费",
    reward: "个人工作区升级 Education 版：Plus 全部功能 + 更长页面历史 + 更高协作上限 + AI 额度",
    entry: "notion.com → Settings → Upgrade/Plans → Education 计划",
    steps: [ "用学校邮箱注册或登录 Notion", "进 Settings → Upgrade/Plans 选 Education 计划", "输入学校邮箱完成院校库（WHED）匹配", "匹配成功后工作区自动升级，额度即时生效" ],
    schedule: "在读期间有效，按院校库状态定期复核", deadline: null,
    note: "需学校邮箱且在 Notion 院校库内；学校域名不在库内时需提交证明材料人工审核。",
    sources: [ { t: "Notion 官方帮助：Notion for Education", u: "https://www.notion.com/zh-cn/help/notion-for-education" }, { t: "GitHub 学生包 Notion 条目", u: "https://education.github.com/pack" } ]
  },
  {
    id: "azure-for-students", brand: "Microsoft Azure", cat: "student", cost: "free", conf: 3, req: "18岁+在读", value: 720,
    title: "Azure for Students · $100 额度免信用卡",
    reward: "100 美元 Azure 额度 + 25 项以上永久免费服务（App Service、Functions、Cosmos DB 免费层），12 个月有效、每年可续",
    entry: "azure.microsoft.com/zh-cn/free/students/ → 免费开始",
    steps: [ "打开 Azure for Students 页点「免费开始」", "用学校邮箱登录并完成学生身份验证", "完成手机验证（官方明确 no credit card required）", "额度到账后创建资源，注意选免费层规格" ],
    schedule: "12 个月额度周期，在读期间每年可续", deadline: null,
    note: "需 18 岁以上全日制在读；超出免费额度需自行升级付费账户否则资源停用；未满 18 岁走 Starter（无额度）。",
    sources: [ { t: "Azure for Students 官方中文页", u: "https://azure.microsoft.com/zh-cn/free/students/" }, { t: "GitHub 学生包 Azure 条目", u: "https://education.github.com/pack" } ]
  },
  {
    id: "aliyun-kaigongwu-300", brand: "阿里云", cat: "student", cost: "free", conf: 3, req: "学信网学籍", value: 300,
    title: "云工开物 · 300元无门槛代金券",
    reward: "300 元无门槛代金券，可用于 ECS、云数据库、百炼等公有云产品；12 个月内限领 1 次，券有效期 1 年",
    entry: "university.aliyun.com/buycenter/ → 实名 + 学信网验证 → 领券",
    steps: [ "打开阿里云高校计划领券页", "用支付宝/淘宝账号登录并完成个人实名认证", "按提示完成学信网学籍在线验证（专/本/硕/博/在职均可）", "领取 300 元券，进「费用中心-卡券」查看有效期" ],
    schedule: "每 12 个月可领 1 次，券有效期 1 年", deadline: null,
    note: "券只能抵消费用，超出部分自付，不构成「免费服务器」；部分特价套餐不可用券。",
    sources: [ { t: "阿里云高校计划领券中心", u: "https://university.aliyun.com/buycenter/" }, { t: "阿里云百炼学生权益说明", u: "https://help.aliyun.com/zh/model-studio/" } ]
  },
  {
    id: "tencent-cloudbase-campus", brand: "腾讯云", cat: "student", cost: "free", conf: 3, req: "学生认证", value: 239,
    title: "校园云开发 · CloudBase 个人版6个月免费",
    reward: "云开发个人版免费最长 6 个月：500 QPS、20 万次调用/月等配额，可做小程序/网页后端",
    entry: "cloud.tencent.com/act/campus → 学生认证 → 校园云开发 0 元下单",
    steps: [ "打开云+校园页登录腾讯云账号", "完成学生认证（学信网/学籍信息 + 二代身份证实名）", "在「校园云开发」区块选 6 个月规格下单（价格显示 0 元）", "到云开发控制台创建环境开始使用" ],
    schedule: "单次最长 6 个月，同一身份证/手机号限购 1 台", deadline: null,
    note: "仅大陆高校在读（除港澳台）、仅二代身份证；不支持续费叠加；同页校园云服务器/BI/数据库均为付费优惠，不是免费项。",
    sources: [ { t: "腾讯云 云+校园 官方活动页", u: "https://cloud.tencent.com/act/campus" }, { t: "云开发 CloudBase 产品页", u: "https://cloud.tencent.com/product/tcb" } ]
  },
  {
    id: "doubao-student-3m", brand: "豆包", cat: "student", cost: "free", conf: 2, req: "学信网学籍", value: 114,
    title: "电脑版学生认证 · 3个月标准套餐",
    reward: "3 个月豆包标准套餐（学生价 38 元/月）+ 1 次额度重置，另解锁免费版 2.5 倍额度",
    entry: "豆包电脑版 → 设置 → 豆包订阅 → 右上角「学生权益」（仅电脑端）",
    steps: [ "从 doubao.com 下载豆包电脑版并升级到最新版", "登录后进「设置-豆包订阅」点右上角「学生权益」", "用抖音 App 扫码完成实名 + 学信网学籍核验", "回活动页点「领取全部奖励」，手机/网页端同步可用" ],
    schedule: "每账号限领一次；活动期标称至 2026-12-31", deadline: "2026-12-31",
    note: "只能电脑端领取，手机 App 与网页版无入口；学信网无学籍的新生可能认证失败；已连续包月的需先退订；入口随版本变动以客户端为准。",
    sources: [ { t: "全网 AI 免费权益清单（2026.09.10）", u: "https://post.m.smzdm.com/p/a2602n2q/" }, { t: "豆包学生权益 2026-11 实测口径", u: "https://m.toutiao.com/article/7703071204156113450/" } ]
  },
  {
    id: "ms365-education-a1", brand: "Microsoft 365", cat: "student", cost: "free", conf: 1, req: "学校已采购", value: 398,
    title: "教育版 Office · 学校已采购则免费",
    reward: "学校已采购 A3/A5 时，学生免费获得含桌面版 Word/Excel/PowerPoint 的账号 + 1TB OneDrive",
    entry: "microsoft.com/zh-cn/education/products/office → 输入学校邮箱判定",
    steps: [ "打开 M365 教育版页输入学校邮箱", "系统判定学校是否已开通教育订阅", "已采购则用学校账号登录并下载桌面版", "提示「学校未开通」时只能使用网页版免费 Office" ],
    schedule: "随学校订阅周期，毕业/离校后失效", deadline: null,
    note: "【先确认】免费 A1 已停售新购、2028-01-01 全面退市；能否拿到完全取决于学校是否已采购，个人无法自助开通，不承诺人人可领。",
    sources: [ { t: "Microsoft 365 教育版官方页", u: "https://www.microsoft.com/zh-cn/education/products/office" }, { t: "GitHub 学生包 Microsoft 365 条目", u: "https://education.github.com/pack" } ]
  },

  // ============ 会员权益 ============
  {
    id: "telecom-member", brand: "中国电信", cat: "vip", cost: "free", conf: 2, req: "电信积分", value: 25,
    title: "1积分兑视听会员月卡 · 每日9点抢",
    reward: "喜马拉雅/网易云/芒果TV/酷我/B站/优酷/QQ音乐月卡 N 选 1（日限 1000 份，共限 1 次）",
    entry: "中国电信 App → 我 → 我的积分 → 双11囤货节",
    steps: [ "先完成「体验云智手机」领抢兑资格券（没有资格券一定抢不到）", "每日 9:00 进 我 → 我的积分 → 双11囤货节（滚动页）", "1 积分兑音视听会员月卡，手慢无", "按页面指引到对应 App 用本机号激活" ],
    schedule: "每日 9:00，11/24 截止", deadline: "2026-11-24",
    note: "天翼生活 App 已停服，一切以「中国电信 App」为准；可选清单无腾讯视频。",
    sources: [ { t: "电信权益中心官方页", u: "https://wapjs.189.cn/tysh/pages/rightsCenter/index.html" }, { t: "微博活动页截图", u: "https://m.weibo.cn/detail/5362540234148260" } ]
  },
  {
    id: "cmcc-netage", brand: "中国移动", cat: "vip", cost: "free", conf: 3, value: 25,
    title: "网龄成长计划 · 每月领流量或视频会员",
    reward: "按 V1–V5 等级每月领 1–3GB 流量月包，或换爱奇艺/腾讯/优酷/芒果/B站/QQ音乐会员月卡 N 选 1",
    entry: "中国移动 App 搜「网龄专区」/「网龄成长计划」",
    steps: [ "打开中国移动 App 搜索「网龄成长计划」", "看自己 V 等级与本月可领权益", "选视频会员月卡或 3GB 流量月包", "点领取直充本机号，到对应 App 同号登录" ],
    schedule: "每月可领，11 月场 11/30 截止", deadline: "2026-11-30",
    note: "网龄越长档位越高，部分省仅限 10 年以上网龄；当月不领月底清零不补发；只做主 App 内活动，别为 1GB 装一堆咪咕系 App。",
    sources: [ { t: "中国移动 App 官方介绍", u: "https://geo.itunes.apple.com/cn/app/id583700738" }, { t: "什么值得买 11 月汇总", u: "https://www.smzdm.com/p/185183460/" } ]
  },
  {
    id: "vip-cmcc-aidou-tencent", brand: "中国移动", cat: "vip", cost: "free", conf: 2, req: "移动AI豆", value: 25,
    title: "AI豆 0 元兑腾讯视频 VIP",
    reward: "用 AI 豆（原移动积分）兑换腾讯视频 VIP 月卡/周卡",
    entry: "腾讯视频 App → 我的 → 领会员 → 通信送会员 → 移动 → 「移动AI豆免费兑换会员」",
    steps: [ "腾讯视频 App 进「我的 → 领会员 → 通信送会员 → 移动」", "或手机直接打开移动积分商城落地页（App 内 H5，必须手机打开）", "移动本机号登录，确认豆够", "选腾讯视频 VIP 商品兑换，到腾讯视频同号登录查看" ],
    schedule: "常态兑换，库存随时段变化", deadline: null,
    note: "话费每实付 1 元积 1 豆、有效期 36 个月；入网未满 6 个月不能用话费产生的豆；2026-11 有值友称渠道收缩，但官方福利页入口仍在，兑换前先自行登录验证。",
    sources: [ { t: "腾讯视频「领会员」官方聚合页", u: "https://film.video.qq.com/x/welfare-new/" }, { t: "中国移动 AI 豆规则官方说明", u: "https://m.jf.10086.cn/5G/explain/" } ]
  },
  {
    id: "vip-cu-plus-129", brand: "中国联通", cat: "vip", cost: "free", conf: 3, req: "129元+套餐内含", value: 25,
    title: "PLUS 黄金会员 · 每月免费领1个热门VIP",
    reward: "每月 1 次，从优酷/爱奇艺/芒果TV/B站/网易云/QQ音乐/饿了么/高德/知乎等热门 VIP 里任选 1 个月卡",
    entry: "中国联通 App → PLUS 会员 → 「领热门VIP」",
    steps: [ "联通 App 进「PLUS 会员」", "确认页面提示「您目前套餐内包含联通PLUS黄金会员，无需付费即可享受」", "进「领热门VIP」看本月剩余次数 > 0", "选 1 个会员领取，到对应 App 绑定号登录" ],
    schedule: "每月 1 次，当月有效", deadline: null,
    note: "只有 129 元及以上套餐才「套餐内含」黄金会员，单独订购要付费（不符合零成本）；腾讯视频月卡 2026-02-12 已下线；微信内打开会被拦，须在联通 App 内操作。",
    sources: [ { t: "联通 PLUS 会员官方页", u: "https://qy.chinaunicom.cn/mobile-h5/plus/plus.html" }, { t: "什么值得买每月领 1 次实测", u: "https://post.m.smzdm.com/p/aene9gn3/" } ]
  },
  {
    id: "vip-cmb-points-tencent", brand: "招商银行", cat: "vip", cost: "free", conf: 2, req: "招行信用卡积分", value: 25,
    title: "1099积分兑腾讯视频 VIP 月卡",
    reward: "1099 积分兑腾讯视频 VIP 月卡（同页另有年卡、VIP 升 SVIP 档位）",
    entry: "掌上生活 App → 积分 → 搜「腾讯视频」",
    steps: [ "掌上生活 App 登录", "进「积分」搜「腾讯视频」", "选月卡档（页面标 1099 积分）", "确认兑换并填腾讯视频绑定手机号，权益直充到账" ],
    schedule: "限量热兑，售罄即止", deadline: null,
    note: "需持招行信用卡且积分够；积分来自既有刷卡消费，属「用已有积分」而非新消费路径；档位以掌上生活实时展示为准。",
    sources: [ { t: "招行积分兑腾讯视频官方页", u: "https://xyk.cmbchina.com/point/tengxun1099" }, { t: "凤凰网信用卡积分兑换盘点", u: "https://hunan.ifeng.com/c/8xbtYZslGxi" } ]
  },
  {
    id: "vip-jd-plus-trial30", brand: "京东", cat: "vip", cost: "free", conf: 2, value: 12,
    title: "PLUS 0元试用30天 · 当场关自动续费",
    reward: "PLUS 会员 30 天（每月免邮券、PLUS 专享价、专属客服、退换免运费）",
    entry: "京东 App → 我的 → PLUS 会员 → 「免费试用30天」（部分账号灰度）",
    steps: [ "京东 App 进 我的 → PLUS 会员", "看是否有「0元试用30天」入口", "点开通（必须勾自动扣款协议）", "当场去 我的 → PLUS会员 → 设置 → 自动续费管理 关闭", "30 天内结算页用免邮券" ],
    schedule: "每账号限 1 次，入口灰度", deadline: null,
    note: "无入口时是灰度未放量，不是下线；开通务必当场关自动续费（也可在京东金融 → 设置 → 自动扣款 关）；试用期购物返利不结算。",
    sources: [ { t: "百度知道 PLUS 0元试用步骤与取消方式", u: "https://zhidao.baidu.com/question/1060025858137692459.html" }, { t: "京东 PLUS 官方页", u: "https://plus.jd.com/index" } ]
  },
  {
    id: "vip-alipay-points-youku", brand: "支付宝", cat: "vip", cost: "free", conf: 1, req: "支付宝积分", value: 25,
    title: "积分兑优酷 VIP 月卡 · 约1999积分",
    reward: "约 1999 积分兑优酷视频 VIP 月卡（部分账号/时段只放 7 天周卡档）",
    entry: "支付宝 App → 我的 → 支付宝会员 → 积分兑换（搜「优酷」）",
    steps: [ "支付宝进 我的 → 支付宝会员", "下拉进「积分兑换」搜「优酷」", "先确认当期是月卡还是周卡、是否含现金", "纯积分月卡才兑，绑定优酷账号后到会员中心确认" ],
    schedule: "每月更新，月初补货，热门档常售罄", deadline: null,
    note: "2026 年多为「积分+现金」（如 88 积分+9.9 元），纯积分月卡时有时无，兑前必核；若形态是「首月0元连续包月」，去 设置 → 支付设置 → 自动扣款 关掉；积分有效期 12 个自然月。",
    sources: [ { t: "微博实测 1999 积分兑优酷月卡", u: "https://m.weibo.cn/detail/5325663839717945" }, { t: "百度百科支付宝积分规则", u: "https://baike.baidu.com/item/%E6%94%AF%E4%BB%98%E5%AE%9D%E7%A7%AF%E5%88%86/69433185" } ]
  },
  {
    id: "vip-quark-svip30", brand: "夸克", cat: "vip", cost: "free", conf: 1, value: 25,
    title: "网盘 0 元领 30 天 SVIP",
    reward: "夸克网盘 SVIP 30 天（不限速下载、6T 空间、在线解压、原画播放）",
    entry: "夸克 App → 网盘首页下滑 → 「免费领30天SVIP」横幅",
    steps: [ "打开夸克 App 进网盘", "首页下滑找「免费领30天SVIP」横幅", "点领取（需登录绑定手机号）", "到 我的 → 会员 确认时长；到期前检查是否勾了自动续费" ],
    schedule: "一次性领取，活动位随时下线", deadline: null,
    note: "未在夸克官方渠道核实横幅长期存在，先自己打开 App 确认；网传「SVIP 365天兑换码」多为拉新或诈骗，绝不收来源不明兑换码。",
    sources: [ { t: "PHP中文网夸克签到领会员教程", u: "https://m.php.cn/faq/3213489.html" }, { t: "IT之家夸克网盘 SVIP 定价", u: "https://www.ithome.com/html/android/1013672.htm" } ]
  },

  // ============ 长窗口 / 平台机制 ============
  {
    id: "douyin-fudai", brand: "抖音直播", cat: "douyin", cost: "free", conf: 3, value: 50,
    title: "超级福袋 · 直播间唯一合规免费抽奖",
    reward: "实物奖品（单一奖品上限 5 万元）；中奖后 48 小时内 0 元订单登记地址",
    entry: "品牌官旗/中小直播间左上角福袋图标",
    steps: [ "蹲常看直播间的左上角福袋图标（或搜「超级福袋」）", "优先选在线人数少、福袋频次高的中小直播间", "参与后留在直播间内（多数福袋要求在场）", "开奖后 48 小时内按「福袋抽奖小助手」通知提交 0 元订单登记地址，逾期作废" ],
    schedule: "长期机制，随直播间场次", deadline: null,
    note: "选不加粉丝团的福袋才是真免费（加团可能要 1 抖币≈0.1 元）。凡不走福袋工具的「红包雨/免单」都是违规玩法；「抽免单」要先下单，不是免费抽。",
    sources: [ { t: "官方超级福袋管理规则", u: "https://school.jinritemai.com/doudian/web/article/aHRzTA4g6UqU" }, { t: "合规使用指南", u: "https://school.jinritemai.com/doudian/wap/article/aJq68y3FEAKA" } ]
  },
  {
    id: "xhs-try", brand: "小红书", cat: "content", cost: "free", conf: 2, value: 60,
    title: "好物体验 · 真0元试用品牌新品",
    reward: "0 元申请美妆/美食/家居新品，中签免费寄送；无粉丝门槛",
    entry: "小红书 App → 我 → 左上角三横线 → 好物体验",
    steps: [ "进「好物体验」浏览当期试用商品（底部上新日历可设提醒）", "申请体验；中签后 24 小时内按系统消息二次确认（不确认视为放弃）", "收到商品后按约发布体验笔记（不发影响信用分与后续资格）", "提高中签率：保持笔记更新频率、账号调性与品类匹配" ],
    schedule: "长期，按商品分批上新", deadline: null,
    note: "中签率低（常见 10–50 份 vs 数百上千人报名）。「惊喜盒子」是品牌广告组件，不是领福利入口。",
    sources: [ { t: "官方招商材料口径", u: "https://m.sohu.com/a/831983029_122076870" }, { t: "好物体验攻略", u: "https://www.yangmaodang.club/articles/xiaohongshu-goods-try/" } ]
  },
  {
    id: "xhs-hunt", brand: "小红书", cat: "content", cost: "free", conf: 2, value: 30,
    title: "站内活动寻宝法 · 品牌抽奖笔记",
    reward: "发笔记带话题领实物/抽奖（按 IP 一期一期开，站外无法穷举）",
    entry: "小红书 App → 我 → 创作中心 → 活动中心；站内搜索「活动」「报名」",
    steps: [ "打开 我 → 创作中心 → 活动中心 看当前横幅", "站内搜索「活动」「报名」「带话题」找品牌联动", "认准平台出具的规则页（含奖品清单与同一用户判定条款）", "固定关注 10–15 个品牌官号开推送，比搜索引擎可靠" ],
    schedule: "长期方法", deadline: null,
    note: "这是结构性盲区：小红书在办活动只能站内取证，任何站外「完整清单」都不可信。",
    sources: [ { t: "小红书官方活动规则页示例", u: "https://fe.xiaohongshu.com/ditto/vincent/c288dcca6ab9477c8c9c00a0d3830e88" } ]
  },

  // ============ v8 聚合增补：银行 / 运营商 ============
  {
    id: "unicom-jifen-lottery", brand: "中国联通", cat: "telco", cost: "free", conf: 1, value: 15, platform: "中国联通App", tags: ["积分抽奖", "缴费券", "零成本"],
    title: "积分狂欢好运开转 · 1000分兑10元水电券",
    reward: "10 积分抽 1 次（可中 300–1000 积分）；1000 积分兑 10 元、1500 积分兑 15 元支付宝水电缴费券",
    entry: "中国联通 App → 搜「积分兑换」→ 左栏「积分狂欢 好运开转」",
    steps: [ "App 搜「积分兑换」进积分频道", "点「积分狂欢 好运开转」10 积分抽 1 次", "再抽「积分幸运抽不停」（约 3 次 8 积分）", "积分满 1000/1500 到兑换页换水电券", "券到支付宝卡包后缴水电抵扣" ],
    schedule: "每日可抽，本轮抽奖至 11/19", deadline: "2026-11-19",
    note: "用已有话费积分存量；概率事件，抽不到 1000 积分即达不到 10 元；线报单源先确认。",
    sources: [ { t: "联通积分抽奖+缴费券线报", u: "https://ym2.cc/ymxb/26098.html" } ]
  },
  {
    id: "migu-video-50gb", brand: "中国移动·咪咕视频", cat: "telco", cost: "free", conf: 1, value: 20, platform: "咪咕视频App", tags: ["免费流量", "定向流量", "咪咕"],
    title: "秋收冬藏 · 0元领50GB定向流量",
    reward: "50GB 咪咕系定向流量月包（0 元）+ 幸运翻盘抽 100 元话费券/流量日包",
    entry: "咪咕视频 App 首页活动位「秋收冬藏」",
    steps: [ "装咪咕视频 App 用移动本机号登录（勿连热点）", "首页进「秋收冬藏」", "点「0 元领 50GB 定向流量包」确认订购", "回移动 App → 我的 → 已订业务 核对生效", "定向流量只在咪咕系 App 生效" ],
    schedule: "11 月场，月包一次性领取", deadline: "2026-11-30",
    note: "订购前确认是 0 元包而非付费叠加包；翻盘抽奖保底为小额日包。",
    sources: [ { t: "什么值得买移动 11 月汇总", u: "https://www.smzdm.com/p/185183460/" }, { t: "移动 10 个活动汇总", u: "https://www.smzdm.com/p/185473093/" } ]
  },
  {
    id: "migu-game-50gb", brand: "中国移动·咪咕游戏", cat: "telco", cost: "free", conf: 2, value: 20, platform: "咪咕游戏App", tags: ["免费流量", "游戏", "月月领"],
    title: "暖冬福利 · 每月登录领50GB定向流量",
    reward: "50GB 定向流量 + 每月抽最高 5 元现金红包（先到先得）",
    entry: "咪咕游戏 App → 首页「暖冬福利」",
    steps: [ "登录咪咕游戏 App（移动号）", "进「暖冬福利」活动页", "领 50GB 定向流量", "点「月月领红包」抽现金" ],
    schedule: "每月 1 次", deadline: "2026-11-30",
    note: "广西/贵州移动官微同期发布，各省入口名不同。",
    sources: [ { t: "中国移动广西公司微博", u: "https://m.weibo.cn/detail/5364454122063010" }, { t: "贵州移动 10086 微博", u: "https://m.weibo.cn/detail/5364762016745629" } ]
  },
  {
    id: "gotone-star-monthly", brand: "中国移动·全球通", cat: "telco", cost: "free", conf: 1, value: 25, platform: "中国移动App", tags: ["全球通", "视频会员", "加油券"],
    title: "星动日每月权益 · 视频月卡+15元加油券",
    reward: "腾讯视频或 B站大会员月卡 1 张 + 15 元中石油加油券；星运盲盒另抽 VIP 月卡",
    entry: "中国移动 App → 全球通专区 / 搜「星动日」",
    steps: [ "进「全球通」专区找「星动日」", "领本月权益（腾讯/B站月卡、15 元加油券）", "开「星运盲盒」抽 VIP 月卡", "到对应 App 同号登录核对" ],
    schedule: "权益每月 1 次，盲盒每日；11/30 截止", deadline: "2026-11-30",
    note: "以全球通/高星级客户为主，普通套餐可能无入口；连签 7 天部分属长期签到已不列入。",
    sources: [ { t: "什么值得买移动 11 月汇总", u: "https://www.smzdm.com/p/185183460/" } ]
  },
  {
    id: "henan-migu-0", brand: "河南移动", cat: "telco", cost: "free", conf: 1, value: 15, platform: "河南移动App", tags: ["省公司", "咪咕会员", "0元"],
    title: "河南号 0 元开咪咕会员一个月",
    reward: "咪咕会员 1 个月（本省号 0 元，外省号 9.9 元不属零成本）",
    entry: "河南移动 App / 掌厅「咪咕会员办理」活动页",
    steps: [ "用河南移动号登录", "进「咪咕会员」活动页", "确认价格为 0 元再提交", "立刻记下退订路径（我的-已订业务）" ],
    schedule: "一次性订购、按月续", deadline: null,
    note: "仅河南号 0 元；线报未说明是否自动续费，开通后立即检查退订入口。",
    sources: [ { t: "25 线报河南移动 0 元咪咕", u: "https://25xianbao.com/page/2" } ]
  },
  {
    id: "spdb-kuajie-15", brand: "浦发银行", cat: "bank", cost: "free", conf: 2, value: 15, platform: "浦发银行App", tags: ["立减金", "直接领", "借记卡"],
    title: "App搜「快捷」直领9或15元立减金券包",
    reward: "9 元或 15 元立减金券包（按客户等级），券入卡包 30 天内用掉",
    entry: "浦发银行 App 首页搜索框 → 「快捷」",
    steps: [ "登录浦发 App", "首页搜「快捷」", "点「立即领取」", "若提示无资格，先去支付宝/微信/京东绑浦发卡再返回重进", "券入卡包 30 天内用掉" ],
    schedule: "每天早上 8 点补名额；11/30 截止", deadline: "2026-11-30",
    note: "存量浦发借记卡即可不需新办；名额每日限量；两条独立线报交叉验证。",
    sources: [ { t: "什么值得买必撸活动汇总", u: "https://post.m.smzdm.com/p/a7046z75/" }, { t: "B站 11 月初银行立减金汇总", u: "https://www.bilibili.com/video/BV1xLxx6EEn3" } ]
  },
  {
    id: "boc-points-jde20", brand: "中国银行", cat: "bank", cost: "free", conf: 1, value: 20, platform: "中国银行App", tags: ["积分兑换", "京东E卡", "存量积分"],
    title: "15500积分兑京东E卡20元",
    reward: "京东 E 卡 20 元（15500 积分，775 分/元）",
    entry: "中国银行 App → 积分 → 搜「京东E卡」",
    steps: [ "登录 App 进「积分」频道", "搜「京东E卡」", "选 20 元档（15500 分）兑换", "券码充入京东账户" ],
    schedule: "长期，库存每日更新", deadline: null,
    note: "零现金消耗存量积分；比例来自 11-05 整理稿，兑换前复核。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "pingan-points-jde20", brand: "平安银行", cat: "bank", cost: "free", conf: 1, value: 20, platform: "平安壹钱包App", tags: ["积分兑换", "京东E卡", "存量积分"],
    title: "11000积分兑京东E卡20元",
    reward: "京东 E 卡 20 元（11000 积分，550 分/元）",
    entry: "平安壹钱包 App → 积分商城 → 搜「京东E卡」",
    steps: [ "登录壹钱包进「积分商城」", "搜「京东E卡」", "选 20 元档兑换", "券码充入京东" ],
    schedule: "长期", deadline: null,
    note: "信用卡/借记卡积分池不同，先查余额。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "cib-points-jde20", brand: "兴业银行", cat: "bank", cost: "free", conf: 1, value: 20, platform: "兴业生活App", tags: ["积分兑换", "京东E卡", "信用卡"],
    title: "37700积分兑京东E卡20元",
    reward: "京东 E 卡 20 元（37700 积分，1885 分/元）",
    entry: "兴业生活 App → 积分兑换 → 搜「京东E卡」",
    steps: [ "登录 App 进「积分兑换」", "搜「京东E卡」", "选 20 元档兑换", "券码入账" ],
    schedule: "长期", deadline: null,
    note: "兴业分/元比最高，仅作积分消化渠道。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "ccb-points-hema10", brand: "建设银行", cat: "bank", cost: "free", conf: 1, value: 10, platform: "建行生活App", tags: ["积分兑换", "盒马", "龙积分"],
    title: "7300龙积分兑盒马10元券",
    reward: "盒马 10 元券（7300 龙积分，730 分/元）；同源另有沃尔玛/永辉档",
    entry: "建行生活 App → 龙积分 → 搜「盒马」",
    steps: [ "登录建行生活进「龙积分」商城", "搜「盒马」", "兑 10 元档", "盒马 App 抵扣" ],
    schedule: "长期", deadline: null,
    note: "零现金消耗存量龙积分。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "icbc-idou-jde10", brand: "工商银行", cat: "bank", cost: "free", conf: 1, value: 10, platform: "工银e生活App", tags: ["积分兑换", "京东E卡", "工银i豆"],
    title: "9870 i豆兑京东E卡10元",
    reward: "京东 E 卡 10 元（9870 i 豆，987 豆/元）",
    entry: "工银e生活 App → 工银i豆商城 → 搜「京东E卡」",
    steps: [ "登录 App 进「工银i豆商城」", "搜「京东E卡」", "兑 10 元档", "券码充入京东" ],
    schedule: "长期", deadline: null,
    note: "部分活动发的是「待激活 i 豆」，需先激活。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "abc-xiaodou-kfc10", brand: "农业银行", cat: "bank", cost: "free", conf: 1, value: 10, platform: "中国农业银行App", tags: ["积分兑换", "肯德基", "小豆"],
    title: "5964小豆兑肯德基10元券",
    reward: "肯德基 10 元代金券（5964 小豆），只能充本人手机号",
    entry: "农业银行 App → 我的 → 小豆 → 搜「肯德基」",
    steps: [ "登录 App 进「我的-小豆」", "搜「肯德基」", "兑换并充到本人手机号", "肯德基小程序「我的-卡券」核销" ],
    schedule: "长期", deadline: null,
    note: "零现金消耗存量小豆。",
    sources: [ { t: "11 月银行权益+积分兑换整理", u: "https://ym2.cc/ymxb/23456.html" } ]
  },
  {
    id: "cmcc-newuser-gift", brand: "中国移动", cat: "telco", cost: "free", conf: 3, value: 20, platform: "中国移动App", tags: ["新人礼", "流量", "话费", "一次性"],
    title: "新人有礼 · 首登至高8GB流量+8元话费",
    reward: "首次登录中国移动 App 领至高 8GB 通用流量 + 8 元话费券（一次性新手礼）",
    entry: "中国移动 App → 首页「新人有礼」弹窗/横幅",
    steps: [ "下载中国移动 App 本机号一键登录（首次登录才触发）", "首页找「新人有礼」", "按提示领流量与话费券", "我的 → 卡券 核对", "话费券在有效期内充值抵扣" ],
    schedule: "一次性，首登触发", deadline: null,
    note: "官方 App Store 描述原文（2026-11-15 更新）；「至高」口径实际档位以 App 内为准；老账号通常无入口。",
    sources: [ { t: "中国移动 App 官方介绍", u: "https://geo.itunes.apple.com/cn/app/id583700738" } ]
  },
  {
    id: "telecom-newuser-10", brand: "中国电信", cat: "telco", cost: "free", conf: 1, value: 10, platform: "中国电信App", tags: ["新人礼", "话费", "一次性"],
    title: "新人注册领10元话费券",
    reward: "新注册中国电信 App 领 10 元话费券",
    entry: "中国电信 App → 我的 → 权益中心 → 新人礼",
    steps: [ "下载中国电信 App 本机号注册登录", "进 我的 → 权益中心 找新人礼", "领 10 元话费券", "充值页勾选券抵扣", "别去天翼生活 App（已停服）" ],
    schedule: "一次性，注册后触发", deadline: null,
    note: "仅新注册账号；官方 H5 文案单源。",
    sources: [ { t: "电信权益中心官方 H5", u: "https://wapjs.189.cn/tysh/pages/rightsCenter/index.html" } ]
  },
  {
    id: "minsheng-8pts-20", brand: "民生银行", cat: "bank", cost: "free", conf: 1, value: 20, platform: "民生银行App", tags: ["积分", "抢兑", "消费金", "星级"],
    title: "星级权益 · 8积分抢20元消费金",
    reward: "四星级及以上客户每周四–周六 9:00 用 8 积分抢 20 元消费金",
    entry: "民生银行 App → 我的 → 星级/权益专区",
    steps: [ "登录后确认星级（需四星及以上）", "进「星级权益」找 8 积分抢 20 元消费金", "周四–周六 9:00 卡点抢", "抢到后在有效期内绑卡消费抵扣" ],
    schedule: "每周四–周六 9:00 限量；12/31 截止", deadline: "2026-12-31",
    note: "「需四星」是既有等级门槛非当期消费；线报单源以 App 页面为准。",
    sources: [ { t: "羊毛村 11.16 银行+平台攻略", u: "https://ym2.cc/ymxb/25768.html" } ]
  },

  // ============ v8 聚合增补：电商 / 出行 / 生活 ============
  {
    id: "alipay-uc-30d", brand: "支付宝", cat: "ecom", cost: "free", conf: 2, value: 10, platform: "支付宝App", tags: ["积分兑换", "网盘会员", "零门槛"],
    title: "10积分兑UC网盘30天会员",
    reward: "UC 网盘 30 天会员（限兑 1 次）",
    entry: "支付宝 App → 我的 → 支付宝会员 → 猜你喜欢 → UC网盘30天",
    steps: [ "支付宝点「我的」", "点头像下方「支付宝会员」", "下滑「猜你喜欢」（找不到点更多）", "点「10积分兑换」授权绑定 UC 账号", "「立即前往」在卡包查看" ],
    schedule: "常驻权益，权益池按月轮换", deadline: null,
    note: "需已有 10 积分存量；同账号限兑 1 次；不绑卡不消费。",
    sources: [ { t: "券妈妈 UC 网盘 10 积分", u: "http://m.quanmama.com/mzdm/2536323.html" }, { t: "PHP中文网 UC 会员积分攻略", u: "https://m.php.cn/faq/2358918.html" } ]
  },
  {
    id: "tmall-uxian-trial", brand: "天猫 U先", cat: "ecom", cost: "free", conf: 2, daily: true, value: 20, platform: "淘宝App", tags: ["免费试用", "大牌小样", "每日可刷"],
    title: "U先0元试用 · 大牌小样免费申领",
    reward: "免费试用装（美妆/护肤/母婴为主），中签 0 元到手",
    entry: "淘宝 App → 我的淘宝 → 更多 → 频道广场 → U先试用",
    steps: [ "「我的淘宝」工具栏左滑找「更多」", "频道广场点「U先试用」", "下拉「大牌试用」选品点「申请免费试用」", "中签确认地址", "结束必须提交试用报告" ],
    schedule: "每天可申请，名额随时放出", deadline: null,
    note: "芝麻分通常 ≥650、近 3 个月无退货纠纷；不写报告永久禁申；标「需付邮费」的不申请。",
    sources: [ { t: "什么值得买 4 大平台免费试用攻略", u: "https://post.m.smzdm.com/talk/p/az837930/" }, { t: "免费试用/0元购实操攻略", u: "https://post.m.smzdm.com/talk/p/a5rd6wx3/" } ]
  },
  {
    id: "suning-free-trial", brand: "苏宁易购", cat: "ecom", cost: "free", conf: 1, value: 20, platform: "苏宁易购App", tags: ["免费试用", "家电日用", "中签制"],
    title: "0元试用免费申领 · 避开付邮试用",
    reward: "试用品免费寄送无需归还付款，需提交试用报告",
    entry: "苏宁易购 App → 首页「0元试用」",
    steps: [ "首页找「0元试用」（找不到搜苏宁试用）", "选品看是否标「免费试用」", "点「立即申请」填地址", "中签短信后收货，15–30 天内提交报告" ],
    schedule: "长期频道", deadline: null,
    note: "只有「免费试用」零现金，「付邮试用」自付运费直接跳过；当前在架未核实 conf=1。",
    sources: [ { t: "中关村在线问答苏宁试用入口", u: "https://wap.zol.com.cn/ask/x_26978895.html" }, { t: "百度知道苏宁免费试用", u: "https://zhidao.baidu.com/question/1546852729172533387.html" } ]
  },
  {
    id: "tongcheng-blackwhale-30", brand: "同程旅行", cat: "ecom", cost: "free", conf: 2, value: 22, platform: "微信小程序", tags: ["免费体验会员", "出行券", "记得取消续费"],
    title: "黑鲸会员30天免费试用 · 含4张出行券",
    reward: "黑鲸会员 30 天 + 2 元火车票、5 元机票、10 元打车、5 元汽车票券",
    entry: "微信 → 我 → 服务 → 火车票机票 → 同程小程序 → 我的 → 黑鲸会员",
    steps: [ "微信「我-服务-火车票机票」进小程序", "右下「我的」进黑鲸会员", "点「免费试用30天」（可能默认勾连续包月）", "当天就去关闭自动续费", "30 天内用掉 4 张券" ],
    schedule: "试用 30 天，随时可开", deadline: null,
    note: "取消路径：微信 → 我 → 服务 → 右上三点 → 扣费服务 → 黑鲸会员 → 关闭；支付宝开通则在 免密支付/自动续费 关。不接受默认勾选就别开。",
    sources: [ { t: "券妈妈黑鲸 30 天试用路径", u: "https://m.quanmama.com/quan/2517687.html" }, { t: "太平洋电脑网同程取消续费", u: "https://g.pconline.com.cn/x/1903/19032854.html" } ]
  },
  {
    id: "qingju-tj-7d", brand: "青桔单车", cat: "ecom", cost: "free", conf: 2, value: 15, platform: "滴滴App", tags: ["骑行卡", "城市限定", "信用分门槛"],
    title: "天津海河分≥600 · 0元领7天骑行卡",
    reward: "7 天骑行卡，单次前 2 小时免费（限量 50 张/期）",
    entry: "海河分/天津本地宝活动页 → 领后滴滴 App「我的-优惠券」",
    steps: [ "海河分小程序确认信用分 ≥600", "天津活动页点领取", "滴滴 App 确认骑行卡", "7 天内骑行单次 2 小时内免费" ],
    schedule: "限量分期放量（11-13 09:00 起一期）", deadline: null,
    note: "仅天津、仅海河分 ≥600；50 张大概率已领完，属蹲下一期内容；信用分可免押。",
    sources: [ { t: "腾讯新闻青桔天津 7 天卡", u: "https://news.qq.com/rain/a/LNK2026111230318100/" } ]
  },
  {
    id: "gaode-hcy-12", brand: "高德地图", cat: "ecom", cost: "free", conf: 1, value: 12, platform: "高德地图App", tags: ["打车券", "明星联动", "明日到期"],
    title: "×华晨宇联动券包 · 新用户12元无门槛",
    reward: "新用户 12 元无门槛打车券 + 券包其余折扣券",
    entry: "高德地图 App → 首页活动横幅 → 领取联动券包",
    steps: [ "高德 App 看首页横幅", "进活动页点领取", "「我的-卡券」确认 12 元券", "结算选券抵扣" ],
    schedule: "活动期内一次性；11/18 到期", deadline: "2026-11-18",
    note: "12 元券限未用过高德打车的新用户；单微博源未交叉，领前再核。",
    sources: [ { t: "高德×华晨宇券包微博", u: "https://m.weibo.cn/detail/5361507229239538" } ]
  },

  // ============ v8 聚合增补：餐饮 / 茶饮 ============
  {
    id: "luckin-wed", brand: "瑞幸咖啡", cat: "tea", cost: "free", conf: 2, value: 29, platform: "瑞幸App/小程序", tags: ["周三", "免单券", "整点抽奖", "咖啡"],
    title: "幸运星期三 · 3万份自提免单券",
    reward: "全场自提饮品免单券 1 张（限 1 杯）+ 甜品免单券 333 份",
    entry: "瑞幸 App / 微信小程序 → 首页 banner「幸运星期三」",
    steps: [ "周三打开活动页", "自动得 1 次免费机会", "点抽奖即时开奖", "券进「我的-优惠券」", "到店自提核销" ],
    schedule: "每周三 00:00–23:59（下一场 11/18）", deadline: "2026-11-18",
    note: "进页面即得 1 次无需下单；与周一抽奖是两套活动。",
    sources: [ { t: "搜狐瑞幸 30000 张免单券", u: "https://m.sohu.com/a/1099972156_681384/" }, { t: "天津本地宝瑞幸 3 万份", u: "https://m.sohu.com/a/1100274622_121123818/" } ]
  },
  {
    id: "guming-wed", brand: "古茗", cat: "tea", cost: "free", conf: 2, value: 16, platform: "微信小程序", tags: ["周三", "猜口令", "免单券", "手速"],
    title: "星期三猜口令 · 12点抢新品免单",
    reward: "指定新品免单券 1 张（口令正确且排名靠前）",
    entry: "古茗小程序 → 首页「猜口令」活动页",
    steps: [ "周三 12:00 前打开活动页", "从「古茗茶饮」公众号当日推文取口令", "12:00–13:00 输入口令提交", "按提交时间先后发券", "到店核销" ],
    schedule: "每周三 12:00–13:00（下一场 11/18）", deadline: "2026-11-18",
    note: "需小程序会员（免费注册）；11/18 场次未获当期公告，依长期机制推断，先确认横幅仍在。",
    sources: [ { t: "青岛本地宝古茗周三规则", u: "http://m.qd.bendibao.com/youhui/103542.shtm" }, { t: "惠州本地宝美食情报", u: "https://huizhou.bendibao.com/meishi/" } ]
  },
  {
    id: "yihetang-10k", brand: "益禾堂", cat: "tea", cost: "free", conf: 3, value: 18, platform: "微信小程序", tags: ["抽奖", "新品免单", "限量", "收尾"],
    title: "「与我同行」抽1万份新品单杯免费券",
    reward: "新品单杯免费券 ×10000 + MacBook Air M5 ×1 + 野兽派闻香杯 ×10 + 欧舒丹护手霜 ×20",
    entry: "益禾堂小程序 → 活动页「与我同行」",
    steps: [ "进活动页", "首次登录自动得 1 次抽奖", "完成任务加次数", "即时开奖", "券 7 天有效到店核销" ],
    schedule: "11/12–11/18（最后一天）", deadline: "2026-11-18",
    note: "奖池与概率官方规则页公示完整。",
    sources: [ { t: "厦门 11/16-19 奶茶免单汇总", u: "https://m.sohu.com/a/1102230378_121117454/" } ]
  },
  {
    id: "hushangayi-caocao", brand: "沪上阿姨", cat: "tea", cost: "free", conf: 2, value: 16, platform: "微信小程序", tags: ["联名", "免单券", "扫码", "收尾"],
    title: "×曹操出行世界善意日 · 抢奶茶免单券",
    reward: "奶茶免单券（另含买一赠一/第二杯半价券，需消费部分不计）",
    entry: "沪上阿姨官微 11-11 海报二维码 / 曹操出行 App 入口",
    steps: [ "找官微 11-11 海报或曹操出行入口", "扫码进活动页", "抢免单券", "券入小程序券包", "到店核销" ],
    schedule: "11/11–11/18 收尾", deadline: "2026-11-18",
    note: "官方未公布券量先到先得。",
    sources: [ { t: "曹操出行×沪上阿姨世界善意日", u: "https://m.sohu.com/a/1101348227_121117479/" }, { t: "沪上阿姨官方微博", u: "https://weibo.com/hushangayi" } ]
  },
  {
    id: "starbucks-bday", brand: "星巴克", cat: "tea", cost: "free", conf: 2, value: 35, platform: "星巴克App", tags: ["生日礼", "长期", "等级门槛", "咖啡"],
    title: "会员生日礼 · 免费中杯手工饮品或蛋糕",
    reward: "中杯手工调制饮品 1 杯 或 指定蛋糕 1 份（二选一）",
    entry: "星巴克 App → 会员 → 权益 → 生日礼券",
    steps: [ "确认账户生日信息已提前填写", "生日当天起 14 天内打开 App", "领生日礼券", "到店核销", "部分门店不参与先电话确认" ],
    schedule: "生日当天起 14 天（全年常态）", deadline: null,
    req: "玉星级+生日",
    note: "门槛：玉星级及以上 + 上一账户年度成长值达标；等级由历史消费累积非当期消费。",
    sources: [ { t: "太原本地宝星巴克生日礼规则", u: "http://m.ty.bendibao.com/news/83622.shtm" }, { t: "北京 11 月生日福利指南", u: "http://m.bj.bendibao.com/news/387503_5.html" } ]
  },
  {
    id: "burgerking-bday", brand: "汉堡王", cat: "food", cost: "free", conf: 1, value: 25, platform: "微信小程序", tags: ["生日礼", "长期", "快餐", "有分歧"],
    title: "会员生日赠券 · 霸王鸡盒+拿铁",
    reward: "生日赠券：霸王鸡盒 1 份 + 拿铁 1 杯（按当月发放内容）",
    entry: "汉堡王小程序 → 我的 → 卡券/生日礼",
    steps: [ "生日前一个月内注册并填生日", "生日月查小程序卡券", "到店出示券码", "核销领取" ],
    schedule: "生日当月（全年常态）", deadline: null,
    req: "生日月会员",
    note: "三方来源冲突（鸡条/鸡盒+拿铁），到店前必看券面规则。",
    sources: [ { t: "大众点评实测生日券", u: "https://m.dianping.com/ugcdetail/264962017" }, { t: "B站生日薅羊毛实测", u: "https://www.bilibili.com/video/BV13e9gBEEfR" } ]
  },
  {
    id: "burgerking-weibo", brand: "汉堡王", cat: "food", cost: "free", conf: 2, value: 13, platform: "微博", tags: ["微博抽奖", "转关", "免费", "快餐"],
    title: "官微转关抽5位送薯霸王（中）",
    reward: "薯霸王（中份）×5 名",
    entry: "微博 @汉堡王中国 → 11-11 08:00 帖",
    steps: [ "关注 @汉堡王中国", "转发并 @ 一位好友", "等 @微博抽奖平台 公示", "中奖后按私信领取" ],
    schedule: "11-11 发布，开奖以平台公示为准", deadline: null,
    note: "纯转关抽零成本；同期另有「揪 3 位大皇堡」。",
    sources: [ { t: "汉堡王中国官方微博", u: "https://e.weibo.com/burgerkingchina" }, { t: "汉堡王官微 11-08 帖", u: "https://m.weibo.cn/detail/5362950077942381" } ]
  },
  {
    id: "laoxiangji-iphone", brand: "老乡鸡", cat: "food", cost: "free", conf: 2, value: 17999, platform: "微博", tags: ["微博抽奖", "转关", "大奖", "中式快餐"],
    title: "官微转关抽 iPhone DUO（17999元）",
    reward: "iPhone DUO 512GB ×1 名（价值 17999 元，不可折现）；另有 6000 元饭卡/请吃饭同类抽",
    entry: "微博 @老乡鸡 → 11-06 帖「鸡爪子送 iPhone DUO 啦」",
    steps: [ "关注 @老乡鸡", "转发该条", "等抽奖平台公示", "按官方指引领奖" ],
    schedule: "11-06 发布，开奖以平台公示为准", deadline: null,
    note: "奖品为手机而非餐品，属品牌零成本抽奖；总部打卡送饭卡需到合肥现场不计入。",
    sources: [ { t: "老乡鸡官微主页", u: "https://m.weibo.cn/u/3844728443" }, { t: "老乡鸡官方微博", u: "https://weibo.sina.com/laoxiangjijituan" } ]
  },
  {
    id: "chabaidao-fri", brand: "茶百道", cat: "tea", cost: "free", conf: 1, value: 20, platform: "晨视频App", tags: ["免费抢券", "周五", "平台活动", "手速"],
    title: "周五潇洒日 · 20元无门槛券限时抢",
    reward: "茶百道 20 元无门槛兑换券（热芋泥/暖奶茶/鲜果茶可选）",
    entry: "晨视频 App → 搜「周五潇洒日」→ 活动页",
    steps: [ "下载晨视频 App", "周五 10:00 进活动页", "点图直达抢券", "到茶百道门店核销" ],
    schedule: "每周五 10:00、14:00 两场", deadline: null,
    note: "媒体侧发券非品牌官方渠道；券量/适用城市未明示，conf=1。",
    sources: [ { t: "腾讯新闻立冬福利奶茶券", u: "https://view.inews.qq.com/a/20261105A0DYS000" } ]
  },
  {
    id: "guming-bday-ss", brand: "古茗", cat: "tea", cost: "free", conf: 2, value: 16, platform: "微信小程序", tags: ["生日礼", "等级门槛", "长期", "会员"],
    title: "会员生日礼 · SS级得免单券",
    reward: "SS 级免单券 1 杯（S1–S3 为折扣券不属零成本，仅 SS 计入）",
    entry: "古茗小程序 → 我的 → 权益中心 → 生日好礼",
    steps: [ "确认生日信息已填", "生日当月进权益中心", "按等级领券", "到店核销" ],
    schedule: "生日当月（全年常态）", deadline: null,
    req: "SS级+生日",
    note: "等级由历史消费累积非当期消费。",
    sources: [ { t: "洛阳 11 月生日福利汇总", u: "https://view.inews.qq.com/a/20261105A0BZZD00" }, { t: "北京生日薅羊毛汇总", u: "http://m.bj.bendibao.com/news/387502.html" } ]
  },
  {
    id: "naixue-bday-v2", brand: "奈雪的茶", cat: "tea", cost: "free", conf: 1, value: 25, platform: "奈雪小程序", tags: ["生日礼", "等级门槛", "长期", "茶饮"],
    title: "V2+会员生日免费饮品或欧包",
    reward: "生日免费饮品 1 杯 或 欧包 1 个",
    entry: "奈雪小程序 → 我的 → 会员权益/生日礼",
    steps: [ "提前填生日信息", "生日当月进权益页", "领生日券", "到店核销" ],
    schedule: "生日当月（全年常态）", deadline: null,
    req: "V2+生日",
    note: "需 V2 及以上（历史消费累积）；单源未见官方规则页；「9.9 开小奈卡送免单」需先付费已排除。",
    sources: [ { t: "什么值得买双十一餐饮折扣", u: "https://m.smzdm.com/post/ju/ae911zy/" } ]
  },

  // ============ v8 聚合增补：数字 / 游戏 / 学生 / AI ============
  {
    id: "epic-weekly", brand: "Epic Games", cat: "content", cost: "free", conf: 3, value: 298, platform: "PC/网页", tags: ["喜加一", "永久入库", "每周轮换"],
    title: "每周喜加一 · 本周斗阵骑士/下周异形隔离",
    reward: "《斗阵骑士》永久入库（国区 45 元）+ 11/20 起《异形：隔离》198 元与《深渊之印》55 元",
    entry: "store.epicgames.com/zh-CN/free-games → 获取 → 0 元下订单",
    steps: [ "打开 Epic 免费游戏页", "登录 Epic 账号", "点「获取」结算页确认应付 0 元", "点「下订单」入库", "11-20 00:00 后再领下一批两款" ],
    schedule: "每周四 23:00（北京时间）换批", deadline: "2026-11-27",
    note: "领取不需下载不需绑卡；「下订单」页金额必须显示 0 元；四家媒体交叉验证。",
    sources: [ { t: "什么值得买本周免费游戏盘点", u: "https://post.m.smzdm.com/p/al399n4e/" }, { t: "游侠一周喜加一汇总", u: "https://3g.ali213.net/news/html/1054241.html" } ]
  },
  {
    id: "migu-guangxi-3m", brand: "广西移动×咪咕", cat: "vip", cost: "free", conf: 3, value: 45, platform: "咪咕视频App", tags: ["咪咕", "3个月", "省移动专享"],
    title: "广西移动0元领3个月咪咕黄金会员+10G",
    reward: "黄金会员 3 个月（蓝光 1080P/电视直播/每月 5 张赛事通看券）+ 10GB 通用流量",
    entry: "广西移动官微活动图二维码 → 咪咕视频 App 领取页",
    steps: [ "确认手机号为广西移动", "打开活动页扫码", "登录咪咕视频", "领 3 个月黄金会员", "「我的-权益」确认到账与流量包" ],
    schedule: "一次性领取，限量放量建议当天领", deadline: null,
    req: "广西移动号",
    note: "非连续包月无自动续费；官微未写截止日。",
    sources: [ { t: "中国移动广西公司微博", u: "https://m.weibo.cn/detail/5364761983714737" } ]
  },
  {
    id: "sc-campus-monthly", brand: "四川移动·动感地带", cat: "vip", cost: "free", conf: 2, value: 30, platform: "中国移动App", tags: ["校园权益", "每月1项", "省移动专享"],
    title: "校园用户每月0元领1项互联网会员月卡",
    reward: "每月任选 1：腾讯/优酷/爱奇艺青春校园/掌阅月卡（30 元）或知乎盐选/B站/喜马拉雅（25 元）或网易云黑胶/酷狗/快看（18 元）等",
    entry: "中国移动 App → 我的 → 我的权益 → 四川权益产品",
    steps: [ "确认是四川移动动感地带校园用户", "打开活动页或 App「我的权益」", "选 1 项会员", "填手机号领取", "到对应 App 同号登录核对有效期" ],
    schedule: "每月可领 1 次，当月有效", deadline: null,
    req: "四川校园套餐",
    note: "页面写明仅限四川动感地带校园用户；热门项可能售罄。",
    sources: [ { t: "四川移动校园权益专区官方页", u: "https://wap.sc.10086.cn/mmplatClientWap/actWap/202008180001_zhengshi/202008180001/index.html?activityCode=202008180001&e=22FD48078ABD478C&fid=7&mark=Y" } ]
  },
  {
    id: "weread-student-30", brand: "微信读书", cat: "student", cost: "free", conf: 2, value: 19, platform: "微信读书App", tags: ["阅读", "学生认证", "30天"],
    title: "学生认证免费领30天付费会员",
    reward: "30 天付费会员（全站付费书库）+ 新人 30 天体验卡；邀请同学认证再各得 10 天",
    entry: "微信读书 App → 我 → 福利区/会员开通页 → 学生认证",
    steps: [ "「我」页找学生认证入口", "提交学信网/学生证信息", "审核通过自动到账 30 天付费会员", "分享认证链接给同学各 +10 天", "到期前用阅读时长兑续期" ],
    schedule: "每人限 1 次", deadline: null,
    req: "学生认证",
    note: "送的是付费会员不是体验卡（书库不同）；不要买闲鱼代认证（会被回收封号）。",
    sources: [ { t: "什么值得买微信读书学生认证", u: "https://post.m.smzdm.com/p/a3md097r/" }, { t: "应用宝微信读书官方说明", u: "https://sj.qq.com/myapp/detail.htm?apkCode=10135212&apkName=com.tencent.weread" } ]
  },
  {
    id: "baidu-netdisk-500g", brand: "百度网盘", cat: "content", cost: "free", conf: 2, value: 12, platform: "鸿蒙负一屏/vivo", tags: ["网盘扩容", "每月领", "鸿蒙"],
    title: "鸿蒙有礼/vivo渠道 · 每月领500G空间",
    reward: "500G 空间（30 天滚动有效，每月可续领，两渠道可叠加）",
    entry: "鸿蒙设备负一屏 → 鸿蒙有礼 → 日日有礼 → 百度网盘位",
    steps: [ "鸿蒙 NEXT 以上设备右滑进负一屏", "进「鸿蒙有礼-日日有礼」找百度网盘位", "跳转百度网盘 App 领 500G", "vivo 用户另在 vivo 官网活动页领一次", "次月重复领取续期" ],
    schedule: "每月 1 次，容量 30 天滚动；12/31 截止", deadline: "2026-12-31",
    req: "鸿蒙NEXT/vivo设备",
    note: "是有期限容量不领就回落，别当永久空间规划。",
    sources: [ { t: "什么值得买百度网盘月月领 500G", u: "https://post.m.smzdm.com/p/a6zpedln/" } ]
  },
  {
    id: "wps-student-ai3m", brand: "WPS", cat: "student", cost: "free", conf: 2, value: 45, platform: "WPS客户端", tags: ["办公", "学生认证", "AI体验卡"],
    title: "学生认证领3个月WPS AI体验卡+组团会员",
    reward: "3 个月 WPS AI 体验卡（首次认证）+ 组团每人最多 15 天超级会员 + 扫描/PDF 权益体验卡",
    entry: "WPS 移动端/PC 端搜「学生」→ 学生专区",
    steps: [ "WPS 内搜「学生」进学生专区", "完成学生身份认证（1–3 个工作日）", "认证通过领 3 个月 AI 体验卡", "邀请同学认证全队各得 5 天超级会员（上限 15 天）", "「我的-权益」核对有效期" ],
    schedule: "认证即领；组团按官方批次；12/31 截止", deadline: "2026-12-31",
    req: "学生认证",
    note: "9 月「3 个月超级会员」秒杀已结束，当前稳定可领的是 AI 体验卡与组团天数。",
    sources: [ { t: "WPS 官方社区会员节", u: "http://home.wps.cn/topic/96977" }, { t: "WPS 官方微博学生专享", u: "https://www.sina.cn/news/detail/5340852328334405.html" } ]
  },
  {
    id: "moma-25m", brand: "移动云 MoMA", cat: "ai", cost: "free", conf: 3, value: 100, platform: "客户端/网页", tags: ["国产大模型", "免费用量", "央企"],
    title: "MobileClaw登录即领2500万tokens",
    reward: "2500 万 tokens（注册实名即领）+ 每月登录 1000 万 ×2，最高合计约 1 亿",
    entry: "移动云官网 → 模型服务平台 MoMA → 模型广场；或 MobileClaw 客户端扫码登录",
    steps: [ "下载 MobileClaw 客户端（Windows/Mac）", "关闭 Wi-Fi 用移动数据扫码登录（验证依赖运营商通道）", "勾选协议登录自动发放 2500 万 tokens", "每月登录再领 1000 万", "模型广场确认可用模型" ],
    schedule: "一次性 2500 万 + 每月登录刷新；12/31 截止", deadline: "2026-12-31",
    note: "实名必需；同一身份仅领 1 次；额度 30 天有效、限流约 3000 tokens/分钟；每日签到部分属长期签到不列入。",
    sources: [ { t: "移动云帮助中心 2500 万 Tokens 指南", u: "https://ecloud.10086.cn/op-help-center/doc/article/92837" }, { t: "移动云 MobileClaw 快速入门", u: "https://ecloud.10086.cn/op-help-center/doc/article/98237" } ]
  },
  {
    id: "sensenova-free", brand: "商汤 SenseNova", cat: "ai", cost: "free", conf: 2, value: 30, platform: "网页/API", tags: ["多模态", "公测免费", "API"],
    title: "Token Plan公测期完全免费",
    reward: "Free 公测档 0 元/月：SenseNova 6.8 Flash Lite 与 U1 Fast，最多 20 个 API Key",
    entry: "sensenova.cn/token-plan → 免费开始 → 控制台创建 API Key",
    steps: [ "打开 Token Plan 页", "点「免费开始」注册登录", "控制台 → API Key → 新建（最多 20 个）", "用 OpenAI 兼容方式调用", "接进 Agent 客户端可直接跑任务" ],
    schedule: "公测期持续免费，付费档即将上线", deadline: null,
    note: "官方页只写公测免费不写配额与结束日；配额数字来自二手实测；无需绑卡。",
    sources: [ { t: "SenseNova Token Plan 官方页", u: "https://www.sensenova.cn/token-plan" } ]
  },
  {
    id: "campus-token", brand: "高校AI算力平台", cat: "student", cost: "free", conf: 2, value: 100, platform: "校园统一身份", tags: ["校园算力", "免费Token", "统一认证"],
    title: "同济/中科大/北邮 · 师生免费领亿级Token",
    reward: "同济每师生每周 1000 积分≈1 亿 Token；中科大词元计划每人每日 1 亿；北邮新生免费算力账户（10+ 大模型）",
    entry: "各校 AI 服务平台 / 中科大「词元计划」/ 北邮「人人有算力」",
    steps: [ "确认所在学校是否已上线", "用校园统一身份认证登录学校 AI 平台", "领取/激活账号（同济为专属 API Key 兼容 OpenAI）", "平台内选模型", "额度按周/日刷新用不完不累计" ],
    schedule: "同济按周；中科大每日清零；北邮按账户", deadline: null,
    req: "本校师生",
    note: "仅限本校师生，非该三校无法领取；与厂商额度不重复。",
    sources: [ { t: "搜狐高校免费发 Token", u: "https://m.sohu.com/a/1101247040_121106842" }, { t: "中科大新闻网转载科技日报", u: "https://news.ustc.edu.cn/info/1056/96873.htm" } ]
  },
  {
    id: "steam-bazaar", brand: "Steam", cat: "content", cost: "free", conf: 2, value: 76, platform: "PC", tags: ["Steam", "永久入库", "喜加一"],
    title: "喜加一 · 《大巴扎》原76元永久免费",
    reward: "《大巴扎》领取后永久保留（国区原价 76 元）；《光辉出征》35 元 11-17 当日截止",
    entry: "Steam 客户端/商店页 → 搜游戏名 → 添加到账户",
    steps: [ "打开 Steam 商店搜「大巴扎」", "商店页点「开始游戏/添加到库」", "确认库中出现该游戏", "顺带搜「光辉出征」今日内领取", "留意「转为付费」提示过后不可补领" ],
    schedule: "长期免费（转为付费前领取）", deadline: null,
    note: "《大巴扎》免费状态为单一二手源未在商店页直接核验；《光辉出征》今日截止需倒计时。",
    sources: [ { t: "vgover 喜加一汇总", u: "https://www.vgover.com/news/245744" }, { t: "游侠一周喜加一汇总", u: "https://3g.ali213.net/news/html/1054241.html" } ]
  },

  // ============ v9 聚合增补：学生 / 工具 / 图书馆 / 游戏 / AI ============
  {
    id: "copilot-student", brand: "GitHub Copilot", cat: "student", cost: "free", conf: 3, value: 70, platform: "web", tags: ["学生认证", "编程助手", "免月费"],
    title: "Copilot 学生认证后 Pro 免费用",
    reward: "Copilot Pro 学生版：Chat、多模型选择、Agent 模式（官方 10 美元/月免月费）",
    entry: "github.com/settings/copilot → Verify student status",
    steps: [ "登录 GitHub 进 Settings → Copilot", "点 Verify student status 跳 SheerID", "上传学生证或在读证明（部分校园邮箱直通）", "通过后自动生效，每月复核学籍" ],
    schedule: "一次性认证，长期有效（每月复核）", deadline: null,
    req: "在读学籍",
    note: "毕业复核失败降级 Free；与 GitHub 学生包是两条入口（包内含合作方权益，本条是 Copilot 订阅本身）。",
    sources: [ { t: "GitHub Docs 学生 Copilot 设置", u: "https://docs.github.com/zh/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students" }, { t: "GitHub Copilot 定价", u: "https://github.com/features/copilot/plans" } ]
  },
  {
    id: "figma-edu", brand: "Figma", cat: "student", cost: "free", conf: 2, value: 115, platform: "web", tags: ["设计工具", "教育认证", "团队协作"],
    title: "教育版师生免费 · Professional 功能",
    reward: "Education 团队：Professional 级功能、无限文件、协作（官方 16 美元/编辑者/月）",
    entry: "figma.com/education/ → Get verified",
    steps: [ "打开 Education 页点 Get verified", "用学校邮箱或上传学籍材料验证", "通过后建 Education team 邀同学" ],
    schedule: "一次性验证", deadline: null,
    req: "教育身份",
    note: "大陆学籍能否过 SheerID 验证存在来源冲突，先实测再依赖；教育团队不得商用；Canva 教育版仅限 K-12 不适用大学生。",
    sources: [ { t: "Figma Education 官方页", u: "https://www.figma.com/education/" }, { t: "Figma 定价", u: "https://www.figma.com/pricing/" } ]
  },
  {
    id: "miro-edu", brand: "Miro", cat: "student", cost: "free", conf: 3, value: 57, platform: "web", tags: ["白板", "学生", "两年免费"],
    title: "学生版免费2年 · 无限白板+10人团队",
    reward: "Education 计划：无限白板、模板库、10 名成员协作（Starter 8 美元/成员/月）",
    entry: "miro.com/education-whiteboard/ → Get Miro free",
    steps: [ "打开 Education 页点 Get Miro free", "学校邮箱注册并提交学籍", "审核通过自动升级 Education" ],
    schedule: "一次性，有效期 2 年，到期可再申请", deadline: null,
    req: "教育邮箱/学籍",
    sources: [ { t: "Miro Education Whiteboard", u: "https://miro.com/education-whiteboard/" }, { t: "Miro 定价", u: "https://miro.com/pricing/" } ]
  },
  {
    id: "axure-edu", brand: "Axure", cat: "student", cost: "free", conf: 3, value: 4170, platform: "desktop", tags: ["原型工具", "教育授权", "年度续期"],
    title: "RP Team 教育版免费1年 · 可逐年续",
    reward: "Axure RP 11 Team 授权 + Axure Cloud 无限发布（官方 49 美元/用户/月）",
    entry: "axure.com/edu → 填学校/专业/在读状态",
    steps: [ "填学校/专业/在读状态", "上传学生证或在读证明", "3–4 个工作日审核邮件发码", "Axure RP 内登录激活" ],
    schedule: "每年可续期一次", deadline: null,
    req: "认证院校师生",
    note: "禁止商用；官方页 2026-06 更新。",
    sources: [ { t: "Axure Education License", u: "https://www.axure.com/edu" }, { t: "Axure RP 定价", u: "https://www.axure.com/pricing" } ]
  },
  {
    id: "ilovepdf-edu", brand: "iLovePDF", cat: "student", cost: "free", conf: 3, value: 426, platform: "web", tags: ["PDF工具", "学生", "一年免费"],
    title: "学生计划免费1年 Premium",
    reward: "Premium 全功能：批量处理、OCR、无广告、大文件（官方 60 美元/年）",
    entry: "ilovepdf.com/zh-cn/education → 加入学生计划",
    steps: [ "打开教育页点加入学生计划", "学校邮箱注册验证", "通过后自动升 Premium 有效期 1 年" ],
    schedule: "每年可重新申请", deadline: null,
    req: "教育邮箱",
    sources: [ { t: "iLovePDF 学生计划", u: "https://www.ilovepdf.com/zh-cn/education" }, { t: "iLovePDF 定价", u: "https://www.ilovepdf.com/zh-cn/pricing" } ]
  },
  {
    id: "jianying-newuser-svip", brand: "剪映", cat: "vip", cost: "free", conf: 1, value: 41, platform: "Windows/Mac", tags: ["视频剪辑", "新用户", "体验卡"],
    title: "专业版新用户30天SVIP体验",
    reward: "30 天 SVIP：无水印导出、全素材库、AI 字幕不限次（约 41 元/月等值）",
    entry: "capcut.cn 下载剪映专业版 → 新号首登弹窗",
    steps: [ "下载安装剪映专业版", "用未开通过会员的手机号登录", "首登弹窗领取", "「我的-会员」确认到账" ],
    schedule: "一次性（新设备/新账号）", deadline: null,
    note: "conf=1 仅二手来源官方无固定入口，先确认弹窗；老用户 1–7 天折算不足 10 元不计。",
    sources: [ { t: "头条剪映会员免费渠道实测", u: "https://www.toutiao.com/a7623987109371642414/" }, { t: "剪映官网", u: "https://www.capcut.cn/" } ]
  },
  {
    id: "zjlib-ecard", brand: "浙江图书馆", cat: "content", cost: "free", conf: 2, value: 50, platform: "支付宝/网页", tags: ["图书馆", "知网", "电子读者证"],
    title: "支付宝办电子读者证 · 免费远程用知网/万方",
    reward: "电子读者证 + 馆外访问知网总库、万方、维普（单篇下载 3–8 元等值）",
    entry: "支付宝搜「浙江图书馆」生活号 → 服务大厅",
    steps: [ "支付宝搜「浙江图书馆」进生活号", "服务大厅 → 开通借阅服务办证（芝麻分一般 ≥550）", "记证号密码登录 zjlib.cn", "「资源-数字资源」进知网检索下载" ],
    schedule: "一次性办证，长期可用", deadline: null,
    req: "支付宝实名+芝麻分",
    note: "知网并发满时提示连接已满，换时段重试；全国可用不限浙江户籍。",
    sources: [ { t: "浙江图书馆官网", u: "https://www.zjlib.cn/" }, { t: "CSDN 浙图+支付宝免费知网", u: "https://blog.csdn.net/w464960660/article/details/149333215" } ]
  },
  {
    id: "shlib-digital-card", brand: "上海图书馆", cat: "content", cost: "free", conf: 2, value: 60, platform: "web", tags: ["图书馆", "外文数据库", "免押金"],
    title: "线上免押金电子证 · 馆外访问Springer/Gale",
    reward: "普通外借电子读者证，远程访问知网/万方/维普/Springer/Gale/Sage（外文单篇 30–200 元等值）",
    entry: "library.sh.cn/guide/banzheng → 诚信免押金电子证",
    steps: [ "打开办证指南选「诚信免押金」电子证", "线上提交身份信息生成电子证", "登录 z.library.sh.cn 馆外访问", "选库检索下载" ],
    schedule: "一次性办证", deadline: null,
    req: "上海常住(口径存疑)",
    note: "二手来源称一般要求 18 周岁以上上海常住居民，外地可能被拦；办不了改用浙江图书馆条目。",
    sources: [ { t: "上海图书馆办证指南", u: "https://www.library.sh.cn/guide/banzheng" }, { t: "上海图书馆馆外访问", u: "https://z.library.sh.cn" } ]
  },
  {
    id: "gog-free-collection", brand: "GOG", cat: "content", cost: "free", conf: 2, value: 40, platform: "PC", tags: ["免费游戏", "永久入库", "GOG"],
    title: "永久免费合集 · 多款经典0元入库",
    reward: "免费合集内全部作品永久入库，DRM-Free 安装包（单款标价常见 30–80 元）",
    entry: "gog.com/zh/games?priceRange=0",
    steps: [ "登录/注册 GOG", "打开免费筛选页 priceRange=0", "逐个「添加到库」无需结账", "Galaxy 或网页收藏确认" ],
    schedule: "常驻长期有效", deadline: null,
    note: "周度喜加一另有独立时限，本条只覆盖常驻免费页。",
    sources: [ { t: "GOG 免费游戏筛选页", u: "https://www.gog.com/zh/games?priceRange=0" } ]
  },
  {
    id: "steam-battlesweeper", brand: "Steam", cat: "content", cost: "free", conf: 1, value: 20, platform: "PC", tags: ["Steam", "下架免费", "永久入库"],
    title: "《Battle Sweeper》下架前免费领",
    reward: "完整游戏永久保留（扫雷+地城+回合制战斗）",
    entry: "store.steampowered.com → 搜 Battle Sweeper",
    steps: [ "登录 Steam", "搜 Battle Sweeper 进商店页", "价格显示「免费」时点添加至库", "库中确认" ],
    schedule: "下架/转付费前有效", deadline: null,
    note: "conf=1 媒体 11-10 报道本日未复价；显示收费即失效。",
    sources: [ { t: "IT之家 Battle Sweeper 下架前免费", u: "https://www.ithome.com/1/025/035.htm" }, { t: "IT之家喜加一动态", u: "https://www.ithome.com/zt/xijiayi" } ]
  },
  {
    id: "fnv-lenovo-code", brand: "联想拯救者×Gamesplanet", cat: "content", cost: "free", conf: 1, value: 41, platform: "PC", tags: ["免费激活码", "限量", "预约"],
    title: "12-02 免费发《辐射：新维加斯》Steam码",
    reward: "《Fallout: New Vegas》Steam 激活码 1 个（国区售价 41 元）",
    entry: "联想拯救者游戏社区活动页",
    steps: [ "提前注册登录拯救者社区并绑定账号", "12-02 活动开启后进页排队领兑换券", "兑换券换 Steam key 激活" ],
    schedule: "2026-12-02 开抢限时限量", deadline: "2026-12-02",
    note: "限量手慢无属限量性质不保证到手；不接受任何付费加购。",
    sources: [ { t: "IT之家拯救者 12-02 发码", u: "https://www.ithome.com/1/022/264.htm" } ]
  },
  {
    id: "cf-workers-ai", brand: "Cloudflare", cat: "ai", cost: "free", conf: 3, value: 23, platform: "API", tags: ["免费推理", "无需绑卡", "API"],
    title: "Workers AI 每日1万Neurons免费额度",
    reward: "每日 10,000 Neurons 推理额度（Llama/Qwen/Whisper 等），不绑卡",
    entry: "dash.cloudflare.com → Workers AI → API Token",
    steps: [ "注册 Cloudflare（免费计划免信用卡）", "控制台进 Workers AI 建 API Token", "按官方 REST 示例调用", "额度每日 00:00 UTC 重置" ],
    schedule: "每日重置，长期有效", deadline: null,
    note: "部分大参数模型仅付费计划可用；定价页 2026-10-20 更新。",
    sources: [ { t: "Workers AI 定价", u: "https://developers.cloudflare.com/workers-ai/platform/pricing/" }, { t: "Workers AI 模型目录", u: "https://developers.cloudflare.com/workers-ai/models/" } ]
  },
  {
    id: "metaso-free", brand: "秘塔AI搜索", cat: "ai", cost: "free", conf: 2, value: 40, platform: "web", tags: ["AI搜索", "学术", "免费"],
    title: "核心功能免费 · 搜索/深度研究/学术/文库",
    reward: "无广告搜索、深度研究、学术检索、文库，基础档免登录可用（同类会员 30–50 元/月等值）",
    entry: "metaso.cn 直接使用",
    steps: [ "打开 metaso.cn 无需登录", "长文研究切「深度研究」", "学术场景切「学术」", "文库免登录检索" ],
    schedule: "常驻免费", deadline: null,
    note: "超长输出/更高并发需会员，本条只算免费档。",
    sources: [ { t: "秘塔AI搜索官网", u: "https://metaso.cn/" } ]
  },
  {
    id: "kiro-free", brand: "Kiro (AWS)", cat: "ai", cost: "free", conf: 3, value: 14, platform: "desktop", tags: ["AI编程", "免绑卡", "IDE"],
    title: "免费档每月50 credits · 无需绑卡",
    reward: "AI IDE 每月 50 credits Agent 编码额度（0.04 美元/credit）",
    entry: "kiro.dev/pricing/ → 下载 → Free 计划",
    steps: [ "下载安装 Kiro", "用 AWS Builder ID / GitHub 登录", "进 Free 计划无需信用卡", "额度每月重置" ],
    schedule: "每月重置", deadline: null,
    note: "价值偏低仅作兜底；Kiroween 类 4000 credits 活动需自行核实不计入。",
    sources: [ { t: "Kiro 定价", u: "https://kiro.dev/pricing/" }, { t: "AWS Kiro 活动页", u: "https://aws.amazon.com/cn/campaigns/kiro/" } ]
  },

  // ============ v9 聚合增补：省运营商 / 移动云盘 ============
  {
    id: "gx-cloud-upload", brand: "广西移动·云盘", cat: "telco", cost: "free", conf: 1, value: 15, platform: "移动云盘App", tags: ["云盘", "流量", "上传任务"],
    title: "云盘有礼 · 上传换5GB+登录领2G",
    reward: "每上传 100MB 换 1G（月上限 5GB）+ 每月登录任选 2G 流量或 2 元话费",
    entry: "移动云盘 App → 广西「云盘有礼」活动页",
    steps: [ "广西移动号登录云盘活动页", "「登录有礼」二选一领 2G/2 元", "上传不重复文件每 100MB 领 1G（月上限 5GB）", "「我的-权益」核对到账" ],
    schedule: "每月 1 次登录礼；上传按月累计；12/31 截止", deadline: "2026-12-31",
    req: "广西移动个人号",
    note: "和多号/惠民卡/流量卡/副卡/物联网不可参与；部分时段安全校验须用移动网络非 WiFi；库存每周更新；邀请拉人部分不计入。",
    sources: [ { t: "广西移动云盘有礼官方页", u: "https://caiyun.feixin.10086.cn:7071/portal/caiyunActConePage/index.html?path=gxTreblingAct" } ]
  },
  {
    id: "hb-ringtone-2gb", brand: "湖北移动·视频彩铃", cat: "telco", cost: "free", conf: 1, value: 12, platform: "咪咕H5", tags: ["视频彩铃", "日包", "湖北"],
    title: "换铃有礼 · 每日设铃音领2GB日包",
    reward: "每日首次设置限免铃音得 2GB 通用日包（160 万份）；每月首次 AI 彩铃审核通过再领 1GB 月包（30 万份）",
    entry: "y.migu.cn 视频彩铃「换铃有礼」活动页（湖北）",
    steps: [ "湖北移动号打开活动页（未开通彩铃可 0 元开通）", "每日首次设一首限免铃音领 2GB", "每月做一次 AI 彩铃创作审核通过领 1GB", "「我的-已订业务」核对" ],
    schedule: "每日设铃音；每月 1 次 AI 彩铃；12/31 截止", deadline: "2026-12-31",
    req: "湖北移动",
    note: "日包当日有效；任务型直领非签到攒积分；名额先到先得。",
    sources: [ { t: "湖北移动换铃有礼官方页", u: "https://y.migu.cn/app/rbt/act/zt/2025/flow-month/index.html?cfrom=hubei1" } ]
  },
  {
    id: "sx-cloud-ai-100g", brand: "陕西移动·云盘", cat: "telco", cost: "free", conf: 1, value: 10, platform: "移动云盘App", tags: ["云盘", "云空间", "陕西"],
    title: "体验云盘AI · 每月领100G空间+1元话费",
    reward: "移动云盘陕西月包 100G 云空间（0 元当月有效）+ 1 元话费券",
    entry: "dx.10086.cn/zZeWCQ（陕西体验云盘 AI 领好礼）",
    steps: [ "陕西移动号打开活动页", "体验一次云盘 AI 工具", "领 1 元话费券 + 100G 月包", "云盘 App「我的-领奖专区」领取" ],
    schedule: "每月 1 次；12/31 截止", deadline: "2026-12-31",
    req: "陕西移动",
    note: "非实名/物联网/代付副号不可，部分鸿蒙暂无法参与；100G 月包月底失效不产生费用；每月各 10 万份；旧链接 xmCOBw 已到期勿用。",
    sources: [ { t: "陕西体验云盘AI领好礼官方页", u: "https://dx.10086.cn/zZeWCQ" } ]
  },
  {
    id: "qh-experience-10gb", brand: "青海移动", cat: "telco", cost: "free", conf: 1, value: 30, platform: "中国移动App", tags: ["体验官", "流量", "青海"],
    title: "服务体验官 · 首次10GB+每月评价5GB",
    reward: "首次成为服务体验官领 10GB 通用流量；次月起每月评价留言领 5GB（当月有效）",
    entry: "dx.10086.cn/6lyDEQ（体验官邀请函）",
    steps: [ "青海移动号打开「体验官邀请函」", "申请成为服务体验官领 10GB", "次月起每月参与「我来说一说」评价留言", "领 5GB（当月有效不可结转）" ],
    schedule: "首次 1 次 + 每月 1 次", deadline: null,
    req: "青海移动",
    note: "停机/欠费/副卡不能领；通用流量不可结转赠送；页面未写截止日属长期机制；青海号持有率低适配面窄。",
    sources: [ { t: "青海移动体验官邀请函官方页", u: "https://dx.10086.cn/6lyDEQ" } ]
  },
  {
    id: "sc-50gb-direct", brand: "四川移动", cat: "telco", cost: "free", conf: 1, value: 30, platform: "四川移动WAP", tags: ["50GB", "直领", "四川"],
    title: "流量畅快领 · 50GB直领入口",
    reward: "50GB 流量畅快领直领入口（套后/定向口径以页面为准）；同页抽奖保底不足 10 元已不列入",
    entry: "四川移动「流量畅快领」活动页",
    steps: [ "四川移动手机上网用户打开活动页", "领「50GB 流量畅快领」", "到「中国移动 App-我的-卡券」核对激活", "确认流量类型与有效期" ],
    schedule: "活动期内领取；12/31 截止", deadline: "2026-12-31",
    req: "四川移动上网客户",
    note: "WAP 不限量/数据卡/上网卡/副号/物联网不可参与；50GB 具体类型页面未完全展开需现场确认；抽奖部分保底<10元不计入。",
    sources: [ { t: "四川移动流量官方活动页", u: "https://wap.sc.10086.cn/scmccMiniWap/flowExcitement2024/index.html?activityCode=20240826Zko162604701&channel=qywx1&goodsShelvesType=1" } ]
  },
  {
    id: "cloud-30gb-0yuan", brand: "中国移动·云盘", cat: "telco", cost: "free", conf: 2, value: 20, platform: "移动云盘App", tags: ["定向流量", "云盘", "全国"],
    title: "云盘30GB定向流量0元包 · 长期",
    reward: "30GB/月移动云盘定向流量，0 元订购按月自动续订",
    entry: "dx.10086.cn/TfM1Ew（官方订购页）",
    steps: [ "打开链接确认号码符合条件", "0 元订购 30GB 定向包", "在云盘 App 内备份/看视频消耗", "「我的-已订业务」确认 0 元资费" ],
    schedule: "一次性订购按月续订；活动期至 2026-12-31", deadline: "2026-12-31",
    note: "不限量套餐/副卡/物联网卡除外；仅云盘 App/小程序内使用；到期是否延续以页面为准。",
    sources: [ { t: "移动云盘30GB定向0元官方订购页", u: "http://dx.10086.cn/TfM1Ew" } ]
  },
  {
    id: "cloud-huanxin-100g", brand: "中国移动·云盘", cat: "telco", cost: "free", conf: 1, value: 25, platform: "移动云盘App", tags: ["云盘", "空间年卡", "会员"],
    title: "焕新权益免费领 · 老用户100G年卡/新用户季卡",
    reward: "老用户 100G 云空间年卡；新用户白银会员季卡；另配长期 30G 定向流量",
    entry: "移动云盘 App → 我的/活动中心 → 「云盘焕新权益免费领」",
    steps: [ "更新并登录云盘 App", "进「我的-活动中心」找该活动", "一键领取（老用户年卡/新用户季卡）", "「我的-我的权益」确认" ],
    schedule: "一次性领取；活动期至 2026-12-31", deadline: "2026-12-31",
    note: "规则仅来自二手与 App 内页面未见官方规则页，先确认；基础空间移动 40G/非移动 20G；30G 定向仅云盘内可用。",
    sources: [ { t: "CSDN 云盘领100G+30G定向", u: "https://blog.csdn.net/wangpankantan/article/details/163565993" }, { t: "什么值得买云盘白嫖100G", u: "https://post.m.smzdm.com/p/arzpwv57/" } ]
  },
  {
    id: "bj-0yuan-zone", brand: "北京移动", cat: "telco", cost: "free", conf: 2, value: 25, platform: "北京移动WAP", tags: ["咪咕会员", "云盘", "北京"],
    title: "流量特惠专区0元领 · 咪咕钻石30天/100G半年",
    reward: "0 元板块：咪咕视频钻石会员体验包 30 天、云盘 100G 半年包、云游戏会员体验包",
    entry: "dx.10086.cn/G319CA（北京流量特惠专区）",
    steps: [ "北京移动号打开「流量特惠专区」", "只点「0元领」板块（跳过 19.9 元 Plus、1 元享 10GB 等付费项）", "领钻石会员 30 天/100G 半年包", "「中国移动 App-我的-我的权益」核对" ],
    schedule: "一次性领取", deadline: null,
    req: "北京移动",
    note: "页面混排付费商品务必只领 0 元项；链接失效改从「中国移动 App-北京-流量特惠」进。",
    sources: [ { t: "北京移动流量特惠专区官方页", u: "http://dx.10086.cn/G319CA" } ]
  },
  {
    id: "tencent-carrier-vip", brand: "腾讯视频×运营商", cat: "vip", cost: "free", conf: 1, value: 25, platform: "腾讯视频", tags: ["视频会员", "运营商", "合作"],
    title: "通信送会员 · 三网用户免费领VIP体验",
    reward: "31 天腾讯视频 VIP 体验会员（按移动/联通/电信分入口）",
    entry: "film.qq.com/x/welfare/ → 免费领视频VIP/通信送会员",
    steps: [ "打开福利页找「免费领视频VIP/通信送会员」", "按自己运营商点入口", "运营商手机号登录授权", "「腾讯视频-我的-卡券」确认" ],
    schedule: "一次性（部分入口每月可领）", deadline: null,
    note: "落地页官方但活动由运营商主办，规则以各入口页为准；不同省份/套餐权益不同部分限新用户；未见单条规则页先确认。",
    sources: [ { t: "腾讯视频领会员官方福利页", u: "https://film.qq.com/x/welfare/" } ]
  },
  {
    id: "sd-friday-10gb", brand: "山东移动", cat: "telco", cost: "free", conf: 1, value: 30, platform: "山东移动小程序", tags: ["周五", "10GB", "话费券"],
    title: "周五特权日 · 抢10GB流量券+10元话费券",
    reward: "限量抢 10GB 大额流量券、10 元话费优惠券",
    entry: "山东移动官方小程序 → 特权活动专区（每周五开放）",
    steps: [ "周五进小程序「特权日」专区", "抢 10GB 流量券/10 元话费券", "「中国移动 App-我的-卡券」激活" ],
    schedule: "每周五—周日", deadline: null,
    req: "山东移动",
    note: "仅二手线报未找到官方规则页，先确认；限量抢；同页安徽 2GB/云南抓娃娃/甘肃 500M 因价值不足未收。",
    sources: [ { t: "各省移动周末免费流量汇总(二手)", u: "http://leiotx.com/640.html" }, { t: "全国多省移动周末流量特权汇总(二手)", u: "https://leiotx.com/646.html" } ]
  }
];

// 零成本羊毛日历
window.CALENDAR = [
  { d: "11/17 周二", ev: "塔斯汀微博转发抽汉堡套餐 15:00 截止（顺手一转）· 华为码道每日 Token 额度刷新", hot: true },
  { d: "11/18 周三", ev: "美团「18会员惊喜日」· 瑞幸幸运星期三 3 万份免单 · 古茗周三口令 · 益禾堂/沪上阿姨收尾 · 高德联动券到期", hot: true },
  { d: "11/19 周四", ev: "联通客户日 · 联通积分抽奖本轮截止", hot: false },
  { d: "11/20 周五", ev: "微软 Rewards 兑 B站大会员兑换码失效 · Epic 换批《异形：隔离》+《深渊之印》", hot: true },
  { d: "11/21 周六", ev: "美团「神价日」限时免单 · 1 元秒杀", hot: true },
  { d: "11/24 周二", ev: "电信 1 积分兑视听会员月卡截止（每日 9:00 抢，日限 1000 份）", hot: true },
  { d: "11/27 周四", ev: "Epic 本批喜加一领取窗口结束（异形隔离/深渊之印）", hot: false },
  { d: "11/30 周日", ev: "到期墙：移动网龄礼 · 霸王茶姬生日礼 · 交行数币活动期", hot: true },
  { d: "12/16 周三", ev: "交行数币月享节下一场 12:00（16 元红包，需数币钱包）", hot: false },
  { d: "12/31 周四", ev: "腾讯云 TokenHub 新人包 / 豆包学生 3 个月套餐活动期截止", hot: false }
];

// 排雷区
window.AVOID = [
  { t: "长期签到型活动已按偏好移出", d: "拼多多签到金、移动幸运三日签、B站大积分/漫画签到、全球通星动日连签7天、腾讯视频3000/2000积分兑月卡、B站1250积分兑月卡、麦当劳24签到积分抽巨无霸等靠每日/连续签到攒奖励的活动不再显示；飞桨算力只保留一次性新手100点。已参加的活动也会自动隐藏进「记录」。" },
  { t: "估值 < 10 元的小额福利已按门槛移出", d: "支付宝每日实体店红包（0.1–数元）、京东猜价格京豆（约1元/日）、微信摇优惠小额券、建行/交行/华夏每日抽（保底0.2–1元）、工行 i 豆（保底0.1元）、农行数币 8 元、蜜雪社群 7 元免单券、无锡一颗然赠饮等已不显示。它们不是骗局，只是不值得你花时间。" },
  { t: "硅基流动 16 元券需先充 0.01 元", d: "实测激活券要先充值 1 分钱，违反零现金成本标准，已剔除。凡「先充 X 元再送券」的一律不算免费。" },
  { t: "Figma 教育版大陆验证存疑", d: "官方教育页称支持高等教育学生，但有 2026-10 来源称 SheerID 验证不支持中国大陆；未经真实大陆学籍实测，暂不收录。Canva 教育版官方帮助明确仅限 K-12，大学生只能走 GitHub 学生包内 12 个月权益。" },
  { t: "腾讯视频月卡在部分渠道已下线", d: "移动全球通星动日 2026-10-16 起下线腾讯视频月卡；联通 PLUS 2026-02-12 下线。移动 AI 豆渠道入口仍在但库存存疑，兑换前先登录确认。" },
  { t: "B站 BLG 7天大会员已结束", d: "11/16 12:00 硬截止，入口已关。别信任何「补领通道」链接。仍可用：1250 会员积分兑月卡、大积分任务。" },
  { t: "需消费 / 绑卡的活动已全部移出本站", d: "按「零成本」标准：库迪免单（要先下单）、霸王茶姬抽奖（要下单）、惠购广西消费券（买东西才减）、银行刷卡达标礼、联通 PLUS 单独订购（129 元以下套餐需付费）等已移除。它们不是骗局，只是不免费。" },
  { t: "双11 红包口令全部过期", d: "天猫/京东 11-13、抖音 11-11 收官。网传「美团口令 333777/996996」等是 SEO 引流稿。一律用 App 内搜活动名代替数字口令。" },
  { t: "美团「神券节」已不存在", d: "官方帮助页标注 5 月场次已结束，升级为「18会员惊喜日」。" },
  { t: "饿了么「猜答案免单」是 2023 年活动", d: "淘宝答题免单是 5 月/8 月短期场。当前均无场次证据，别按旧攻略蹲点。" },
  { t: "抖音没有官方「霸王餐」", d: "官方明令禁止并封号。已有「免费探店先扫码付 648 元」实际被骗案例。凡免费吃要先付款/拉人/交证件照的，全是骗局。" },
  { t: "抖音「抽免单」不是免费抽", d: "要先在直播间下单才有抽奖资格，且仅对定向邀约创作者开放。说成「免费抽」的都是话术。" },
  { t: "天翼生活 App 已停服", d: "2026-05-01 起电信权益全部迁到「中国电信 App」，老教程失效。" },
  { t: "品牌侧已结束", d: "霸王茶姬 100 万份买一送一抢券（11/13）、肯德基 10 万份鸡翅（11/12）、沪上阿姨冬一杯（11/8）、茶百道 10 月场、华莱士 15.9 元堡（11/15）。喜茶/星巴克/书亦/汉堡王当前无免费型活动。" },
  { t: "极速版「日赚30+」不可信", d: "抖音/快手极速版金币日常任务一天 1–2 元量级，提现 0.3/1 元档每月各限 1 次。「365 天打卡领 5000」仅受邀用户。别为它投入时间。" },
  { t: "「千问口令 1分钱奶茶」是拉人头", d: "口令是邀请/拉新码，需未注册手机号登录，收益来自被邀请关系。同批文案出现不同口令即为分销码。不推荐。" },
  { t: "小红书「惊喜盒子」不是福利入口", d: "那是给品牌方的广告互动组件，点击跳广告 H5，本身不发福利。真 0 元入口是「好物体验」。" },
  { t: "百炼「7000万Token」是旧汇总", d: "官方口径为每模型通常 100 万 Token / 90 天，且 10-29、11-13、11-15 已有多批模型下架免费额度。实领清单以控制台为准，别按 7000 万规划。" }
];

// 防骗硬规则
window.SAFETY = {
  case: "真实案例：天津李女士点「免费领奶茶」陌生链接 → 假客服 → 代付 → 共享屏幕「核验退款」→ 被骗 2 万余元（警方 2026-08 通报）。另有「免费探店」扫码付 648 元买到游戏道具的案例。",
  rules: [
    "要先付款/代付/充值、承诺事后退款的 → 退出（官方免单是下单后系统自动原路退，不经任何「客服」）",
    "要身份证号、银行卡号、支付密码、短信验证码的 → 退出",
    "要下载共享屏幕/远程协助类软件的 → 退出",
    "要拉 N 人助力才解锁「免费」的 → 退出",
    "链接不在品牌官方小程序/APP、银行官方 App、官网域名内的 → 退出"
  ],
  bottom: "总原则：官方活动永远在官方 App/小程序里完成。街头「扫码免费送」多为收集个人信息，一律拒绝。"
};
