var e = getApp(),
  a = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    a.get('merch/register_submit', {}, function(e) {
      wx.showToast({
        title: e.message,
        icon:'none'
      })
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/member/index/index',
        })
      }, 1500)
    })
  },
  // 提交表单
  formSubmit: function(e) {
    var datas = e.detail.value;
    switch (true) {
      case datas.name == '':
        wx.showToast({
          title: '请先填写商户名称',
          icon: 'none'
        })
        return
      case datas.project == '':
        wx.showToast({
          title: '请先填写主营项目',
          icon: 'none'
        })
        return
      case datas.nickname == '':
        wx.showToast({
          title: '请先填写联系人',
          icon: 'none'
        })
        return
      case datas.mobile == '':
        wx.showToast({
          title: '请先填写手机号',
          icon: 'none'
        })
        return
      case datas.account == '':
        wx.showToast({
          title: '请先填写账号',
          icon: 'none'
        })
        return
      case datas.password == '':
        wx.showToast({
          title: '请先填写密码',
          icon: 'none'
        })
        return
    }
    this.register_submit(datas)
  },

  register_submit: function(e) {
    a.get('merch/register_submit', {
      uname: e.account,
      upass: e.password,
      realname: e.nickname,
      mobile: e.mobile,
      merchname: e.name,
      salecate: e.project,
      desc: e.intro
    }, function(e) {
      wx.showToast({
        title: e.message,
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/member/index/index'
        })
      }, 1500)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})