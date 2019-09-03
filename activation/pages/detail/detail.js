var a = getApp(),
  e = a.requirejs("core"), l = a.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsid: '',
    sn: '',
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    that.setData({
      goodsid: options.goodsid,
      sn: options.sn
    })

    wx.request({
      url: a.globalData.api + '&r=activation.goods_info',
      data: {
        'goodsid': that.data.goodsid,
        'sn': that.data.sn
      },
      method: "POST",
      success: function(res) {
        console.log(res)
        that.setData({
          piclist: res.data.info.piclist,
          sn: res.data.info.sn,
          goods_status: res.data.info.goods_status,
          status: res.data.info.status,
          scraptime: res.data.info.scraptime,
          usetime: res.data.info.usetime,
          title: res.data.info.title,
          marketprice: res.data.info.marketprice
        })
        l.wxParse("wxParseData", "html", res.data.info.content, that, "0")
      }
    })
  },

  bind_activation:function(){
    var that = this;
    e.get("activation/bind_openid", {'sn':that.data.sn}, function (e) {
       if(e.data.code==1){
        wx.showToast({
          title: '激活成功',
          icon:'success'
        })
         setTimeout(function () {
           wx.navigateTo({
             url: 'activation/pages/index/index'
           })
         }, 1500)
       }
    });

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