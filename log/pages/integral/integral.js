var a = getApp(),
  e = a.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbottom: false,
    noshowdata: 0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    e.get("activation/log", {}, function (e) {
      console.log(e)
      if (e.code == 1) {
        wx.showToast({
          title: '加载成功',
          icon: 'loading'
        })
        that.setData({
          list:e.list
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
    e.get("activation/log", {
      page:page
    }, function (e) {
      console.log(e)
      if (e.code == 1) {
        wx.showToast({
          title: '加载成功',
          icon: 'loading'
        })
        that.setData({
          list: e.list
        })
      }
    });
  },
  moreInfoTap:function(e){
    var that = this
    var list = that.data.list
    var idx = e.currentTarget.dataset.idx
    var id = e.currentTarget.dataset.id
    var show = e.currentTarget.dataset.show
    console.log(list)
    console.log(list.lenght)
    for (let i in list) {
      list[i].show = 0
      console.log(i, list[i].show)
    }
    
    console.log(list)
    if(show == 1){
      list[idx].show = 0
    }else{
      list[idx].show = 1
    }
    that.setData({
      list:list
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})