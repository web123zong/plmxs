var a = getApp(),
  e = a.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  sn: function(e) {
    this.setData({
      sn: e.detail.value
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

  },

  check_sn: function(sn) {
    var e = this;
    wx.request({
      url: a.globalData.api + '&r=activation.checkCode',
      data: {
        sn: e.data.sn
      },
      method: 'POST',
      success: function(res) {
        if (res['data']['code'] == 0) {
          wx.showToast({
            title: '二维码校验失败',
            icon: 'none'
          })
          return;
        } else if (res['data']['code'] == 1 || res['data']['code'] == 2) {
          wx.showToast({
            title: '二维码校验成功',
            icon: 'success',
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '/activation/pages/detail/detail?goodsid=' + res['data']['goodsid'] + '&sn=' + e.data.sn,
            })
          },1500)
        } 
      }
    })
  },

  /**
   * 调起相机扫码
   */
  btn_scanCode: function() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success: res => {
        console.log(res,1212);
        if (res.errMsg == 'scanCode:ok') {

          var sn = res.result.split('&sn=')[1];

          this.setData({
            sn: sn
          })

          if (this.data.sn == '') {
            wx.showToast({
              title: '二维码不正确',
              icon: 'none'
            })
            return;
          } else {
            //验证请求
            this.check_sn(this.data.sn);
          }
        }
      },
      fail: res => {
        // 接口调用失败
        wx.showToast({
          icon: 'none',
          title: '接口调用失败！'
        })
      },
      complete: res => {
        // 接口调用结束
        // console.log(res)
      }
    })
  },

  /**
   * 点击提交校验码
   */
  btn_SubmitCode: function() {
    var sn = this.data.sn;
    var res = this.check_sn(sn);
  },

  log:function(){
    wx.navigateTo({
      url: '/log/pages/integral/integral',
    })
  }

})