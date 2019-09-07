var a = getApp() ,e = a.requirejs("core");

Page({
  data: {
    page: 1,
    isbottom: !1,
    array: ['根据距离（默认）', '销量','评分'],
    index: 0,
    chooseschool: 0,
    city: '',
    name: '',
    list: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    keyword:''
  },
  onPullDownRefresh: function () {
    var that = this;
    that.getmerch();
  },
  onLoad: function(a) {
    var that = this;
    that.getswipe();
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        that.getmerch();
      }
    })
  },
  serchinput:function(e){
    console.log(e.detail.value)
    this.setData({
      keyword:e.detail.value
    })
  },
  serch:function(){
    var that = this;
    e.get("merch/ajaxmerchuser", {
      'keyword': that.data.keyword,
      'sorttype': that.data.lng
    }, function (e) {
      that.setData({
        list: e.result.list
      })
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onReachBottom: function () {
    this.getmerch();
  },
  getmerch: function() {
    var that = this;
    e.get("merch/ajaxmerchuser", {
      'lat': that.data.lat,
      'lng': that.data.lng,
      'page': that.data.page
    }, function(e) {
      wx.stopPullDownRefresh();
      that.setData({
        list: that.data.list.concat(e.result.list)
      })
    });
    var page = e.page += 1;
    that.setData({
      page: page
    })
  },
  getswipe:function(){
    var that = this;
    console.log(that.data, 1010);
    e.get("merch/swipe", {}, function (e) {
      that.setData({
        swipe:e.category_swipe
      })
    });
  }
});