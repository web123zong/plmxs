var a = getApp(),
  e = a.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbottom: false,
    noshowdata: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    e.get("activation/log", {}, function (e) {
      console.log(e)
      if (e.code == 1) {
        wx.showToast({
          title: '加载成功',
          icon: 'loading'
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      page: 1
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    var o = this
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this
    var page = that.data.page + 1;
    console.log(page)
    
    app.util.request({
      url: "entry/wxapp/commission",
      data: {
        op: "getIntegralList",
        page: page
      },
      showLoading: !1,
      success: function (t) {
        var a = t.data;
        var newarray = a.data
        if (newarray.length == 0) {
          that.setData({
            isbottom: true,
          })
        }
        "" != a.data && that.setData({
          record: that.data.record.concat(newarray),
          page: page
        });
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})