var a, e, i = getApp(), s = i.requirejs("core");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    results:[],
    key:'',
  },
  bindInput:function(e){
    this.setData({
      key: e.detail.value
    })
  },
  search:function(){
    var that = this;
    if (that.data.key == ''){
      wx.showToast({
        title: '请先输入型号',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    s.get("merch/select_cate_get_goods", {
      'keyword': that.data.key
    }, function (t) {
        wx.hideLoading();
        console.log(t)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})