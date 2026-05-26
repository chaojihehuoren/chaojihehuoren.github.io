var app = getApp();

Page({
  data: {
    agreementChecked: false,
    isLoading: false,
    showAgreementError: false,
    phone: '',
    code: '',
    codeCooldown: 0,
    codeBtnText: '获取验证码',
    canGoBack: false,
    showPrivacyPopup: false,
    privacyContractName: '',
    privacyResolved: false
  },

  onLoad: function () {
    var that = this;
    var pages = getCurrentPages();
    that.setData({
      canGoBack: pages.length > 1
    });

    /* 先调用 tt.login 确保用户已登录（button getUserInfo 的前置条件） */
    tt.login({
      success: function () {
        console.log('tt.login 成功');
      },
      fail: function (err) {
        console.log('tt.login 失败:', err);
      }
    });

    /* 检查隐私授权状态，若未授权则弹出隐私协议弹窗 */
    if (tt.getPrivacySetting) {
      tt.getPrivacySetting({
        success: function (res) {
          if (res.needAuthorization) {
            that.setData({
              showPrivacyPopup: true,
              privacyContractName: res.privacyContractName || '《小程序用户隐私保护协议》'
            });
          } else {
            that.setData({ privacyResolved: true });
          }
        },
        fail: function () {
          /* 低版本基础库降级：直接允许调用 */
          that.setData({ privacyResolved: true });
        }
      });
    } else {
      /* 低版本基础库降级：直接允许调用 */
      that.setData({ privacyResolved: true });
    }
  },

  onUnload: function () {
    if (this._cooldownTimer) {
      clearInterval(this._cooldownTimer);
      this._cooldownTimer = null;
    }
  },

  handleAgreementToggle: function () {
    this.setData({
      agreementChecked: !this.data.agreementChecked,
      showAgreementError: false
    });
  },

  handlePhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },

  handleCodeInput: function (e) {
    this.setData({ code: e.detail.value });
  },

  /* 用户同意隐私协议后的回调 */
  handleAgreePrivacyAuthorization: function () {
    this.setData({
      showPrivacyPopup: false,
      privacyResolved: true
    });
    /* 隐私授权完成后，通知用户可使用抖音一键登录 */
    tt.showToast({ title: '隐私授权成功，请点击登录', icon: 'none', duration: 1500 });
  },

  handleOpenPrivacyContract: function () {
    if (tt.openPrivacyContract) {
      tt.openPrivacyContract({});
    }
  },

  /* button open-type="getUserInfo" 的回调 - 抖音官方推荐方式 */
  handleGetUserInfo: function (e) {
    var that = this;

    if (that.data.isLoading) return;

    if (!that.data.agreementChecked) {
      that.setData({ showAgreementError: true });
      tt.showToast({ title: '请先阅读并同意相关协议', icon: 'none' });
      return;
    }

    that.setData({ isLoading: true, showAgreementError: false });

    var detail = e.detail || {};
    var errMsg = detail.errMsg || '';

    if (errMsg.indexOf('ok') > -1 && detail.userInfo) {
      /* 授权成功 */
      var userInfo = detail.userInfo;
      if (app && app.globalData) {
        app.globalData.userInfo = userInfo;
        app.globalData.isLoggedIn = true;
      }
      try {
        tt.setStorageSync('userInfo', userInfo);
        tt.setStorageSync('isLoggedIn', true);
      } catch (err) {
        console.error('存储用户信息失败:', err);
      }
      that.setData({ isLoading: false });
      tt.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      setTimeout(function () {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          tt.navigateBack();
        } else {
          tt.switchTab({ url: '/pages/index/index' });
        }
      }, 1500);
    } else if (errMsg.indexOf('ok') > -1 && !detail.userInfo) {
      /* 模拟器中 userInfo 可能为空，使用默认用户信息完成登录 */
      var defaultUserInfo = {
        nickName: '食愈用户',
        avatarUrl: '',
        gender: 0,
        city: '',
        province: '',
        country: ''
      };
      if (app && app.globalData) {
        app.globalData.userInfo = defaultUserInfo;
        app.globalData.isLoggedIn = true;
      }
      try {
        tt.setStorageSync('userInfo', defaultUserInfo);
        tt.setStorageSync('isLoggedIn', true);
      } catch (err) {
        console.error('存储失败:', err);
      }
      that.setData({ isLoading: false });
      tt.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      setTimeout(function () {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          tt.navigateBack();
        } else {
          tt.switchTab({ url: '/pages/index/index' });
        }
      }, 1500);
    } else if (errMsg.indexOf('auth deny') > -1 || errMsg.indexOf('cancel') > -1) {
      that.setData({ isLoading: false });
      tt.showToast({
        title: '您取消了授权',
        icon: 'none',
        duration: 2000
      });
    } else if (errMsg.indexOf('privacy') > -1 || errMsg.indexOf('Privacy') > -1) {
      that.setData({
        isLoading: false,
        showPrivacyPopup: true,
        privacyContractName: '《小程序用户隐私保护协议》',
        privacyResolved: false
      });
    } else if (errMsg.indexOf('not login') > -1) {
      /* 未登录，重新调用 tt.login 后再试 */
      that.setData({ isLoading: false });
      tt.login({
        success: function () {
          tt.showToast({ title: '请再次点击登录', icon: 'none', duration: 1500 });
        },
        fail: function () {
          tt.showToast({ title: '登录失败，请使用手机号登录', icon: 'none' });
        }
      });
    } else {
      that.setData({ isLoading: false });
      tt.showToast({
        title: '获取用户信息失败，请使用手机号登录',
        icon: 'none',
        duration: 2000
      });
    }
  },

  handlePhoneLogin: function () {
    var that = this;

    if (that.data.isLoading) return;

    if (!that.data.agreementChecked) {
      that.setData({ showAgreementError: true });
      tt.showToast({ title: '请先阅读并同意相关协议', icon: 'none' });
      return;
    }

    if (!that.data.phone || that.data.phone.length !== 11) {
      tt.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    if (!that.data.code || that.data.code.length < 4) {
      tt.showToast({ title: '请输入验证码', icon: 'none' });
      return;
    }

    that.setData({ isLoading: true });

    tt.request({
      url: 'https://your-server.com/api/login/sms',
      method: 'POST',
      data: { phone: that.data.phone, code: that.data.code },
      success: function (res) {
        that.setData({ isLoading: false });
        if (res.data && res.data.token) {
          if (app && app.globalData) {
            app.globalData.isLoggedIn = true;
          }
          try {
            tt.setStorageSync('isLoggedIn', true);
            tt.setStorageSync('token', res.data.token);
          } catch (e) {
            console.error(e);
          }
          tt.showToast({ title: '登录成功', icon: 'success', duration: 1500 });
          setTimeout(function () {
            var pages = getCurrentPages();
            if (pages.length > 1) {
              tt.navigateBack();
            } else {
              tt.switchTab({ url: '/pages/index/index' });
            }
          }, 1500);
        } else {
          tt.showToast({ title: '登录失败，请重试', icon: 'none' });
        }
      },
      fail: function () {
        that.setData({ isLoading: false });
        tt.showToast({ title: '登录失败，请检查网络', icon: 'none' });
      }
    });
  },

  handleSendCode: function () {
    var that = this;

    if (that.data.codeCooldown > 0) return;

    if (!that.data.phone || that.data.phone.length !== 11) {
      tt.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    tt.request({
      url: 'https://your-server.com/api/sms/send',
      method: 'POST',
      data: { phone: that.data.phone },
      success: function () {
        tt.showToast({ title: '验证码已发送', icon: 'success' });
        that.setData({ codeCooldown: 60, codeBtnText: '60s后重发' });
        that._cooldownTimer = setInterval(function () {
          var remaining = that.data.codeCooldown - 1;
          if (remaining <= 0) {
            clearInterval(that._cooldownTimer);
            that._cooldownTimer = null;
            that.setData({ codeCooldown: 0, codeBtnText: '获取验证码' });
          } else {
            that.setData({ codeCooldown: remaining, codeBtnText: remaining + 's后重发' });
          }
        }, 1000);
      },
      fail: function () {
        tt.showToast({ title: '发送失败，请重试', icon: 'none' });
      }
    });
  },

  handleGoBack: function () {
    tt.navigateBack();
  },

  navigateToService: function () {
    tt.navigateTo({
      url: '/pagesA/agreement/service'
    });
  },

  navigateToPrivacy: function () {
    tt.navigateTo({
      url: '/pagesA/agreement/privacy'
    });
  }
})