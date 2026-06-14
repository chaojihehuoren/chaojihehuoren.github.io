/* 静态数据预定义，避免在 data 中创建大量对象 */
const STATIC = {
  bannerList: [
    { id: 1, title: '春季养肝正当时', subtitle: '药食同源 · 以食养人', link: '/pagesA/academy/index' },
    { id: 2, title: '限时秒杀专区', subtitle: '每日特价养生食材', link: '/pagesA/product/list?category=all' },
    { id: 3, title: '体质测评免费做', subtitle: '九种体质精准辨识', link: '/pages/test/constitution?mode=quick' }
  ],
  categories: [
    { id: 'circulation', icon: '🫀', name: '活血化瘀' },
    { id: 'immunity', icon: '🛡️', name: '增强免疫' },
    { id: 'beauty', icon: '🌸', name: '美容养颜' },
    { id: 'liver', icon: '👁️', name: '养肝明目' },
    { id: 'qi', icon: '🔥', name: '补气养血' },
    { id: 'kidney', icon: '💎', name: '补肾固本' },
    { id: 'stomach', icon: '🫁', name: '健脾养胃' }
  ],
  hotProducts: [
    { id: 'p1', name: '有机枸杞原浆', subtitle: '宁夏头茬枸杞鲜榨', price: 39.9, originalPrice: 69.9, sales: 2834, category: 'liver', tags: ['热销'] },
    { id: 'p2', name: '黑芝麻丸', subtitle: '九蒸九晒古法', price: 29.9, originalPrice: 49.9, sales: 1652, category: 'kidney', tags: ['新品'] },
    { id: 'p3', name: '黄芪党参茶', subtitle: '补气养血代茶饮', price: 49.9, originalPrice: 79.9, sales: 987, category: 'qi', tags: ['热销'] },
    { id: 'p4', name: '红枣桂圆膏', subtitle: '手工熬制零添加', price: 35.9, originalPrice: 55.9, sales: 2103, category: 'qi', tags: [] },
    { id: 'p5', name: '茯苓薏仁粉', subtitle: '祛湿健脾代餐粉', price: 45.9, originalPrice: 68.9, sales: 756, category: 'stomach', tags: ['新品'] },
    { id: 'p6', name: '阿胶糕礼盒', subtitle: '东阿原产地道地', price: 128, originalPrice: 198, sales: 4321, category: 'beauty', tags: ['热销'] }
  ],
  recipeList: [
    { id: 'r1', title: '枸杞菊花炖雪梨', description: '清肝明目，润肺止咳，适合长期用眼人群', difficulty: '简单', cookTime: '30分钟', servings: '2人' },
    { id: 'r2', title: '当归生姜羊肉汤', description: '温经散寒，补血养气，冬季暖身首选', difficulty: '中等', cookTime: '90分钟', servings: '3人' },
    { id: 'r3', title: '山药薏仁粥', description: '健脾祛湿，养胃安神，老少皆宜', difficulty: '简单', cookTime: '40分钟', servings: '2人' }
  ],
  healthTips: [
    { text: '春季养肝，宜食甘味食物，少吃酸味' },
    { text: '早睡早起，23点前入睡最养生' },
    { text: '每天喝够1500ml温水，温补不伤胃' },
    { text: '饭后百步走，活到九十九' },
    { text: '枸杞菊花茶，清肝明目抗疲劳' }
  ],
  seckillProducts: [
    { id: 's1', name: '野生灵芝片', price: 68, originalPrice: 128, discount: 47, stock: 23, category: 'immunity' },
    { id: 's2', name: '铁皮石斛鲜条', price: 88, originalPrice: 168, discount: 48, stock: 15, category: 'stomach' },
    { id: 's3', name: '宁夏枸杞王', price: 35, originalPrice: 69, discount: 49, stock: 42, category: 'liver' }
  ],
  termProductMap: {
    'lichun': ['p1', 'p3'], 'yushui': ['p5', 'p2'], 'jingzhe': ['p1', 'p4'],
    'chunfen': ['p4', 'p3'], 'qingming': ['p1', 'p5'], 'guyu': ['p5', 'p2']
  },
  constitutionTypes: {
    'pinghe': { id: 'pinghe', name: '平和质', emoji: '😊', recommendProducts: ['p1', 'p2'] },
    'qixu': { id: 'qixu', name: '气虚质', emoji: '😮‍💨', recommendProducts: ['p3', 'p4'] },
    'yangxu': { id: 'yangxu', name: '阳虚质', emoji: '🥶', recommendProducts: ['p2', 'p3'] },
    'yinxu': { id: 'yinxu', name: '阴虚质', emoji: '🥵', recommendProducts: ['p1', 'p5'] },
    'tanshi': { id: 'tanshi', name: '痰湿质', emoji: '😰', recommendProducts: ['p5', 'p6'] },
    'shire': { id: 'shire', name: '湿热质', emoji: '😤', recommendProducts: ['p5', 'p1'] },
    'xueyu': { id: 'xueyu', name: '血瘀质', emoji: '😣', recommendProducts: ['p1', 'p6'] },
    'qiyu': { id: 'qiyu', name: '气郁质', emoji: '😔', recommendProducts: ['p4', 'p3'] },
    'tebing': { id: 'tebing', name: '特禀质', emoji: '🤧', recommendProducts: ['p1', 'p2'] }
  },
  solarTerms: [
    { name: '立春', season: '春季', emoji: '🌱', desc: '春回大地，万物复苏，养肝护肝正当时', dos: ['食甘', '养肝'], donts: ['酸味', '熬夜'], tea: '枸杞菊花茶', id: 'lichun' },
    { name: '雨水', season: '春季', emoji: '🌧️', desc: '春雨润物，健脾祛湿是关键', dos: ['健脾', '祛湿'], donts: ['寒凉', '油腻'], tea: '陈皮茯苓茶', id: 'yushui' },
    { name: '惊蛰', season: '春季', emoji: '⚡', desc: '春雷乍动，万物生机盎然', dos: ['养肝', '润肺'], donts: ['辛辣', '燥热'], tea: '蜂蜜柠檬水', id: 'jingzhe' },
    { name: '春分', season: '春季', emoji: '🌸', desc: '昼夜均分，阴阳平衡养生', dos: ['平补', '调和'], donts: ['偏热', '偏寒'], tea: '玫瑰花茶', id: 'chunfen' },
    { name: '清明', season: '春季', emoji: '🍃', desc: '气清景明，养肝明目好时节', dos: ['清肝', '明目'], donts: ['油腻', '发物'], tea: '决明子茶', id: 'qingming' },
    { name: '谷雨', season: '春季', emoji: '🌾', desc: '雨生百谷，健脾养胃防湿邪', dos: ['健脾', '利湿'], donts: ['生冷', '甜腻'], tea: '薏仁红豆茶', id: 'guyu' }
  ]
};

Page({
  data: {
    pageReady: false,
    statusBarHeight: 0,
    heroHeight: 200,
    currentTerm: null,
    bannerList: STATIC.bannerList,
    categories: STATIC.categories,
    displayProducts: STATIC.hotProducts.slice(0, 6),
    hotProducts: STATIC.hotProducts,
    recipeList: STATIC.recipeList,
    healthTips: STATIC.healthTips,
    termProducts: [],
    activeCheckinPlan: null,
    showNewcomerPopup: false,
    seckillProducts: STATIC.seckillProducts,
    seckillCountdownText: '限时抢购中',
    activeSeckillLabel: '上午场 10:00-12:00',
    userConstitution: null,
    constitutionProducts: [],
    searchPlaceholder: '搜索商品、食谱、课程、体质与打卡计划'
  },

  onLoad: function () {
    /* 快速获取系统信息 — 只做这一次同步调用 */
    const sysInfo = tt.getSystemInfoSync();
    const statusBarHeight = sysInfo.statusBarHeight || 0;
    const heroHeight = Math.max(156, statusBarHeight + 112);

    /* 计算节气 */
    const currentTerm = this._getCurrentSolarTerm();
    const termProducts = this._getTermProducts(currentTerm);
    const countdownText = this._buildSeckillCountdown();

    /* 立即设置首屏关键数据，让骨架屏尽快消失 */
    this.setData({
      statusBarHeight: statusBarHeight,
      heroHeight: heroHeight,
      currentTerm: currentTerm,
      termProducts: termProducts,
      seckillCountdownText: countdownText
    });

    /* 在 onReady 中延迟加载非关键动态数据，减少首屏阻塞 */
    this._pendingDynamicLoad = true;
  },

  onReady: function () {
    const that = this;
    if (!this._pendingDynamicLoad) return;
    this._pendingDynamicLoad = false;

    /* 使用 setTimeout 0 将 Storage 读取推入下一个微任务，不阻塞首屏渲染 */
    setTimeout(function () {
      that._loadDynamicData();
    }, 0);
  },

  _loadDynamicData: function () {
    const that = this;
    /* 一次性批量读取所有 Storage，减少同步调用次数 */
    const constitutionResult = tt.getStorageSync('constitutionResult');
    let checkinData = tt.getStorageSync('checkinData');
    let commerceNewcomer = tt.getStorageSync('commerceNewcomerProfile');

    /* 解析体质 */
    let userConstitution = null;
    let constitutionProducts = [];
    if (constitutionResult) {
      userConstitution = STATIC.constitutionTypes[constitutionResult] || null;
      if (userConstitution) {
        constitutionProducts = this._getConstitutionProducts(userConstitution);
      }
    }

    /* 解析打卡 */
    let activeCheckinPlan = null;
    if (checkinData) {
      if (typeof checkinData === 'string') {
        try { checkinData = JSON.parse(checkinData); } catch (e) { checkinData = null; }
      }
      if (checkinData && checkinData.activePlan) {
        activeCheckinPlan = checkinData.activePlan;
      }
    }

    /* 解析新人弹窗 */
    let showNewcomerPopup = false;
    if (commerceNewcomer) {
      if (typeof commerceNewcomer === 'string') {
        try { commerceNewcomer = JSON.parse(commerceNewcomer); } catch (e) { commerceNewcomer = null; }
      }
      if (commerceNewcomer && !commerceNewcomer.popupSeen) {
        showNewcomerPopup = true;
      }
    }

    /* 一次性 setData，减少渲染次数 */
    that.setData({
      pageReady: true,
      userConstitution: userConstitution,
      constitutionProducts: constitutionProducts,
      activeCheckinPlan: activeCheckinPlan,
      showNewcomerPopup: showNewcomerPopup
    });
  },

  onPullDownRefresh: function () {
    const that = this;
    this.setData({ pageReady: false });
    const currentTerm = this._getCurrentSolarTerm();
    const termProducts = this._getTermProducts(currentTerm);
    const countdownText = this._buildSeckillCountdown();
    setTimeout(function () {
      that.setData({
        pageReady: true,
        currentTerm: currentTerm,
        termProducts: termProducts,
        seckillCountdownText: countdownText
      });
      tt.stopPullDownRefresh();
    }, 600);
  },

  _getCurrentSolarTerm: function () {
    const month = new Date().getMonth() + 1;
    const terms = STATIC.solarTerms;
    if (month >= 2 && month <= 4) {
      return terms[Math.min(month - 2, terms.length - 1)];
    }
    return terms[0];
  },

  _getConstitutionProducts: function (constitution) {
    const ids = constitution.recommendProducts || [];
    const result = [];
    const products = this.data.hotProducts;
    for (let i = 0; i < ids.length && result.length < 4; i++) {
      const found = this._findProduct(ids[i], products);
      if (found) result.push(found);
    }
    return result;
  },

  _findProduct: function (id, products) {
    products = products || this.data.hotProducts;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) return products[i];
    }
    return null;
  },

  _getTermProducts: function (term) {
    if (!term) return [];
    const ids = STATIC.termProductMap[term.id] || ['p1', 'p2'];
    const products = this.data.hotProducts;
    const result = [];
    for (let i = 0; i < ids.length; i++) {
      const found = this._findProduct(ids[i], products);
      if (found) result.push(found);
    }
    return result;
  },

  _buildSeckillCountdown: function () {
    const now = new Date();
    const hours = now.getHours();
    const slotEnd = hours < 12 ? 12 : hours < 18 ? 18 : 24;
    const diff = Math.max(slotEnd * 60 - (hours * 60 + now.getMinutes()), 0);
    if (diff === 0) return '即将开始下一场';
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ' 后结束';
  },

  /* 导航函数 */
  goSearch: function () {
    tt.navigateTo({ url: '/pages/search/index' });
  },

  goDistributor: function () {
    tt.navigateTo({ url: '/pagesA/distributor/index' });
  },

  goCategory: function (e) {
    const catId = e.currentTarget.dataset.catid;
    tt.navigateTo({ url: '/pagesA/product/list?category=' + catId });
  },

  goDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    tt.navigateTo({ url: '/pagesA/product/detail?id=' + id });
  },

  goSeckillDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    tt.navigateTo({ url: '/pages/goods/detail?id=' + id + '&activity=seckill' });
  },

  goProductList: function () {
    tt.navigateTo({ url: '/pagesA/product/list?category=all' });
  },

  goRecipeList: function () {
    tt.switchTab({ url: '/pages/recipe/recipe' });
  },

  goRecipeDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    tt.navigateTo({ url: '/pagesB/recipe/detail?id=' + id });
  },

  goAcademy: function () {
    tt.navigateTo({ url: '/pagesA/academy/index' });
  },

  goCheckin: function () {
    tt.navigateTo({ url: '/pages/checkin/index' });
  },

  goPoints: function () {
    tt.navigateTo({ url: '/pages/points/index' });
  },

  goConstitutionTest: function () {
    tt.navigateTo({ url: '/pages/test/constitution?mode=quick' });
  },

  goFullConstitutionTest: function () {
    tt.navigateTo({ url: '/pages/test/constitution?mode=full' });
  },

  navigateTo: function (e) {
    const link = e.currentTarget.dataset.link;
    if (link) {
      tt.navigateTo({ url: link });
    }
  },

  dismissNewcomerPopup: function () {
    const commerceNewcomer = tt.getStorageSync('commerceNewcomerProfile');
    let data = commerceNewcomer;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (e) { data = {}; }
    }
    if (!data) data = {};
    data.popupSeen = true;
    tt.setStorageSync('commerceNewcomerProfile', JSON.stringify(data));
    this.setData({ showNewcomerPopup: false });
  },

  handleNewcomerPrimary: function () {
    this.dismissNewcomerPopup();
    tt.navigateTo({ url: '/pages/coupon/index' });
  },

  getDiscount: function (product) {
    return Math.round((1 - product.price / product.originalPrice) * 100);
  },

  _getDiscountPercent: function (p) {
    if (!p) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  }
})