Page({
  data: {
    pageReady: false,
    statusBarHeight: 0,
    heroHeight: 200,
    currentTerm: null,
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
    displayProducts: [],
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
    termProducts: [],
    activeCheckinPlan: null,
    showNewcomerPopup: false,
    seckillProducts: [
      { id: 's1', name: '野生灵芝片', price: 68, originalPrice: 128, discount: 47, stock: 23, category: 'immunity' },
      { id: 's2', name: '铁皮石斛鲜条', price: 88, originalPrice: 168, discount: 48, stock: 15, category: 'stomach' },
      { id: 's3', name: '宁夏枸杞王', price: 35, originalPrice: 69, discount: 49, stock: 42, category: 'liver' }
    ],
    seckillCountdownText: '限时抢购中',
    activeSeckillLabel: '上午场 10:00-12:00',
    userConstitution: null,
    constitutionProducts: [],
    searchPlaceholder: '搜索商品、食谱、课程、体质与打卡计划'
  },

  onLoad: function () {
    const that = this;
    const sysInfo = tt.getSystemInfoSync();
    const statusBarHeight = sysInfo.statusBarHeight || 0;
    const heroHeight = Math.max(156, statusBarHeight + 112);

    /* 获取节气数据 */
    const currentTerm = this._getCurrentSolarTerm();

    /* 获取体质数据 */
    const savedResult = tt.getStorageSync('constitutionResult');
    let userConstitution = null;
    let constitutionProducts = [];
    if (savedResult) {
      userConstitution = this._getConstitutionType(savedResult);
      if (userConstitution) {
        constitutionProducts = this._getConstitutionProducts(userConstitution);
      }
    }

    /* 获取打卡计划 */
    const checkinData = tt.getStorageSync('checkinData');
    let activeCheckinPlan = null;
    if (checkinData && typeof checkinData === 'string') {
      try {
        const parsed = JSON.parse(checkinData);
        if (parsed.activePlan) {
          activeCheckinPlan = parsed.activePlan;
        }
      } catch (e) {}
    } else if (checkinData && checkinData.activePlan) {
      activeCheckinPlan = checkinData.activePlan;
    }

    /* 获取新人弹窗状态 */
    const commerceNewcomer = tt.getStorageSync('commerceNewcomerProfile');
    let showNewcomerPopup = false;
    if (commerceNewcomer && typeof commerceNewcomer === 'string') {
      try {
        const np = JSON.parse(commerceNewcomer);
        if (!np.popupSeen) {
          showNewcomerPopup = true;
        }
      } catch (e) {}
    } else if (commerceNewcomer && !commerceNewcomer.popupSeen) {
      showNewcomerPopup = true;
    }

    const termProducts = this._getTermProducts(currentTerm);

    /* 计算秒杀倒计时 */
    const countdownText = this._buildSeckillCountdown();

    setTimeout(function () {
      that.setData({
        pageReady: true,
        statusBarHeight: statusBarHeight,
        heroHeight: heroHeight,
        currentTerm: currentTerm,
        userConstitution: userConstitution,
        constitutionProducts: constitutionProducts,
        termProducts: termProducts,
        activeCheckinPlan: activeCheckinPlan,
        showNewcomerPopup: showNewcomerPopup,
        displayProducts: that.data.hotProducts.slice(0, 6),
        seckillCountdownText: countdownText
      });
    }, 150);
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
    const now = new Date();
    const month = now.getMonth() + 1;
    const terms = [
      { name: '立春', season: '春季', emoji: '🌱', desc: '春回大地，万物复苏，养肝护肝正当时', dos: ['食甘', '养肝'], donts: ['酸味', '熬夜'], tea: '枸杞菊花茶', id: 'lichun' },
      { name: '雨水', season: '春季', emoji: '🌧️', desc: '春雨润物，健脾祛湿是关键', dos: ['健脾', '祛湿'], donts: ['寒凉', '油腻'], tea: '陈皮茯苓茶', id: 'yushui' },
      { name: '惊蛰', season: '春季', emoji: '⚡', desc: '春雷乍动，万物生机盎然', dos: ['养肝', '润肺'], donts: ['辛辣', '燥热'], tea: '蜂蜜柠檬水', id: 'jingzhe' },
      { name: '春分', season: '春季', emoji: '🌸', desc: '昼夜均分，阴阳平衡养生', dos: ['平补', '调和'], donts: ['偏热', '偏寒'], tea: '玫瑰花茶', id: 'chunfen' },
      { name: '清明', season: '春季', emoji: '🍃', desc: '气清景明，养肝明目好时节', dos: ['清肝', '明目'], donts: ['油腻', '发物'], tea: '决明子茶', id: 'qingming' },
      { name: '谷雨', season: '春季', emoji: '🌾', desc: '雨生百谷，健脾养胃防湿邪', dos: ['健脾', '利湿'], donts: ['生冷', '甜腻'], tea: '薏仁红豆茶', id: 'guyu' }
    ];
    for (let i = terms.length - 1; i >= 0; i--) {
      /* 简化：按月份粗略匹配节气 */
      if (month >= 2 && month <= 4) {
        const idx = Math.min(month - 2, terms.length - 1);
        return terms[idx];
      }
    }
    return terms[0];
  },

  _getConstitutionType: function (resultId) {
    const types = {
      'pinghe': { id: 'pinghe', name: '平和质', emoji: '😊', recommendProducts: ['p1', 'p2'] },
      'qixu': { id: 'qixu', name: '气虚质', emoji: '😮‍💨', recommendProducts: ['p3', 'p4'] },
      'yangxu': { id: 'yangxu', name: '阳虚质', emoji: '🥶', recommendProducts: ['p2', 'p3'] },
      'yinxu': { id: 'yinxu', name: '阴虚质', emoji: '🥵', recommendProducts: ['p1', 'p5'] },
      'tanshi': { id: 'tanshi', name: '痰湿质', emoji: '😰', recommendProducts: ['p5', 'p6'] },
      'shire': { id: 'shire', name: '湿热质', emoji: '😤', recommendProducts: ['p5', 'p1'] },
      'xueyu': { id: 'xueyu', name: '血瘀质', emoji: '😣', recommendProducts: ['p1', 'p6'] },
      'qiyu': { id: 'qiyu', name: '气郁质', emoji: '😔', recommendProducts: ['p4', 'p3'] },
      'tebing': { id: 'tebing', name: '特禀质', emoji: '🤧', recommendProducts: ['p1', 'p2'] }
    };
    return types[resultId] || null;
  },

  _getConstitutionProducts: function (constitution) {
    const that = this;
    const recommended = (constitution.recommendProducts || []).map(function (pid) {
      return that._findProduct(pid);
    }).filter(Boolean);
    return recommended.slice(0, 4);
  },

  _findProduct: function (id) {
    const all = this.data.hotProducts;
    for (let i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  },

  _getTermProducts: function (term) {
    if (!term) return [];
    const that = this;
    const termProductMap = {
      'lichun': ['p1', 'p3'],
      'yushui': ['p5', 'p2'],
      'jingzhe': ['p1', 'p4'],
      'chunfen': ['p4', 'p3'],
      'qingming': ['p1', 'p5'],
      'guyu': ['p5', 'p2']
    };
    const ids = termProductMap[term.id] || ['p1', 'p2'];
    return ids.map(function (id) { return that._findProduct(id); }).filter(Boolean);
  },

  _buildSeckillCountdown: function () {
    const now = new Date();
    const hours = now.getHours();
    const slotEnd = hours < 12 ? 12 : hours < 18 ? 18 : 24;
    const endMinutes = slotEnd * 60;
    const currentMinutes = hours * 60 + now.getMinutes();
    const diff = Math.max(endMinutes - currentMinutes, 0);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const hStr = h < 10 ? '0' + h : '' + h;
    const mStr = m < 10 ? '0' + m : '' + m;
    if (diff === 0) return '即将开始下一场';
    return hStr + ':' + mStr + ' 后结束';
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

  getCategoryEmoji: function (categoryId) {
    const emojiMap = {
      'circulation': '🫀',
      'immunity': '🛡️',
      'beauty': '🌸',
      'liver': '👁️',
      'qi': '🔥',
      'kidney': '💎',
      'stomach': '🫁'
    };
    return emojiMap[categoryId] || '🌿';
  },

  _getDiscountPercent: function (p) {
    if (!p) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  }
})