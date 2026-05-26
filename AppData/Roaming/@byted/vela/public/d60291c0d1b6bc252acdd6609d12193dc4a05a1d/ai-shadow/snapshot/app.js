"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./utils/wxPolyfill.js");

/* 兼容微信小程序 showShareMenu 参数到抖音小程序 */
(function patchShowShareMenu() {
  if (typeof tt !== 'undefined' && tt.showShareMenu) {
    const _originalShowShareMenu = tt.showShareMenu;
    const MENU_MAP = { shareAppMessage: 'share', shareTimeline: 'record' };
    tt.showShareMenu = function (options) {
      if (options && options.menus && Array.isArray(options.menus)) {
        options = Object.assign({}, options);
        options.menus = options.menus.map(function (m) {
          return MENU_MAP[m] || m;
        });
      }
      return _originalShowShareMenu.call(tt, options);
    };
  }
})();
const store_app = require("./store/app.js");
const store_commerce = require("./store/commerce.js");
const store_user = require("./store/user.js");
const utils_reminder = require("./utils/reminder.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/recipe/recipe.js";
  "./pages/recipe/detail.js";
  "./pages/cart/cart.js";
  "./pages/user/user.js";
  "./pages/search/index.js";
  "./pages/search/search.js";
  "./pages/goods/detail.js";
  "./pages/order/confirm.js";
  "./pages/order/list.js";
  "./pages/coupon/index.js";
  "./pages/member/index.js";
  "./pages/aftersale/index.js";
  "./pages/family/index.js";
  "./pages/family/checkin.js";
  "./pages/test/constitution.js";
  "./pages/test/report.js";
  "./pages/checkin/index.js";
  "./pages/checkin/square.js";
  "./pages/points/index.js";
  "./pages/remind/index.js";
  "./pagesB/recipe/detail.js";
  "./pagesA/product/list.js";
  "./pagesA/product/detail.js";
  "./pagesA/recipe/detail.js";
  "./pagesA/order/confirm.js";
  "./pagesA/order/result.js";
  "./pagesA/user/orders.js";
  "./pagesA/user/address.js";
  "./pagesA/user/plan.js";
  "./pagesA/user/favorites.js";
  "./pagesA/user/about.js";
  "./pagesA/academy/index.js";
  "./pagesA/academy/detail.js";
  "./pagesA/academy/quiz.js";
  "./pagesA/community/qa.js";
  "./pagesA/community/showwall.js";
  "./pagesA/distributor/index.js";
  "./pagesA/distributor/team.js";
  "./pagesA/distributor/rank.js";
  "./pagesA/distributor/earnings.js";
  "./pagesA/distributor/withdraw.js";
  "./pagesA/distributor/poster.js";
  "./pagesA/service/faq.js";
  "./pagesA/service/reminders.js";
  "./pagesA/service/stores.js";
  "./pagesA/agreement/service.js";
  "./pagesA/agreement/privacy.js";
  "./pagesA/login/login.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    let reminderTimer = null;
    const JSON_STORAGE_DEFAULTS = [
      ["cart", []],
      ["userInfo", null],
      ["favorites", []],
      ["recipeFavorites", []],
      ["recipeHistory", []],
      ["recipeCheckins", []],
      ["addresses", []],
      ["orders", []],
      ["healthPlan", null],
      ["checkinData", {}],
      ["constitutionProfile", null],
      ["constitutionReport", null],
      ["commerceNewcomerProfile", {
        firstOpenAt: "",
        popupSeen: false,
        claimed: false,
        claimedAt: "",
        handbookUnlocked: false,
        fullAssessmentUnlocked: false,
        firstOrderRewardClaimed: false
      }],
      ["commerceCouponCenter", []],
      ["commerceGroupActivities", []],
      ["commerceAftersales", []]
    ];
    function ensureJsonStorage(key, fallback) {
      const raw = common_vendor.index.getStorageSync(key);
      if (raw === "" || raw === void 0 || raw === null) {
        common_vendor.index.setStorageSync(key, JSON.stringify(fallback));
        return fallback;
      }
      if (typeof raw === "string") {
        try {
          return JSON.parse(raw);
        } catch (error) {
          common_vendor.index.setStorageSync(key, JSON.stringify(fallback));
          return fallback;
        }
      }
      common_vendor.index.setStorageSync(key, JSON.stringify(raw));
      return raw;
    }
    function bootstrapStorage() {
      JSON_STORAGE_DEFAULTS.forEach(([key, fallback]) => {
        ensureJsonStorage(key, fallback);
      });
    }
    function syncAppLifecycle() {
      const appStore = store_app.useAppStore();
      appStore.syncWindowInfo();
      appStore.initNetworkWatcher();
    }
    function syncCommerceLifecycle({ showToast = false } = {}) {
      try {
        const userStore = store_user.useUserStore();
        const commerceStore = store_commerce.useCommerceStore();
        if (commerceStore && commerceStore.markFirstOpen) {
          commerceStore.markFirstOpen();
        }
        if (commerceStore && commerceStore.processLifecycle) {
          commerceStore.processLifecycle(userStore, { showToast });
        }
      } catch (err) {
        console.warn('[App] syncCommerceLifecycle error (non-fatal):', err && err.errMsg || err);
      }
    }
    function startReminderPolling() {
      stopReminderPolling();
      reminderTimer = setInterval(() => {
        utils_reminder.processDueReminderNotifications({ showModal: true });
      }, 6e4);
    }
    function stopReminderPolling() {
      if (reminderTimer) {
        clearInterval(reminderTimer);
        reminderTimer = null;
      }
    }
    common_vendor.onLaunch(() => {
      bootstrapStorage();
      syncAppLifecycle();
      setTimeout(() => {
        syncCommerceLifecycle();
        utils_reminder.processDueReminderNotifications({ showModal: false });
        startReminderPolling();
      }, 2e3);
    });
    common_vendor.onShow(() => {
      syncAppLifecycle();
      setTimeout(() => {
        syncCommerceLifecycle();
        utils_reminder.processDueReminderNotifications({ showModal: false });
      }, 1e3);
    });
    common_vendor.onHide(() => {
      stopReminderPolling();
    });
    return () => {
    };
  }
};
const TABBAR_PATHS = [
  "/pages/index/index",
  "/pages/recipe/recipe",
  "/pages/cart/cart",
  "/pages/user/user"
];
function isTabbarPage(url) {
  if (!url) return false;
  const path = url.split("?")[0];
  return TABBAR_PATHS.some((tabPath) => path === tabPath || path.startsWith(tabPath + "/"));
}
function goTo(url) {
  if (!url) return;
  if (isTabbarPage(url)) {
    common_vendor.index.switchTab({ url });
  } else {
    common_vendor.index.navigateTo({ url });
  }
}
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  app.config.globalProperties.$goTo = goTo;
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;