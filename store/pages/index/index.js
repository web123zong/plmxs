var a = getApp() ,e = a.requirejs("core");

Page({
  data: {
    page: 1,
    isbottom: !1,
    array: ['距离', '销量','评分'],
    chooseschool: 0,
    city: '',
    name: '',
    list: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    keyword:'',
    sort:0,
    showsortmodal:0,
  },
  showsort:function(){
    if (this.data.showsortmodal == 0){
      this.setData({
        showsortmodal:1,
      })
    }else{
      this.setData({
        showsortmodal:0,
      })
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list:'',
      sort:0,
      showsortmodal: 0,
      list: [],
      page:1,
      isbottom:false,
    })
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
  gosearch:function(e){
    this.setData({
      page:1,
      sort: e.currentTarget.dataset.index,
      list:[],
      isbottom: false,
    })
    this.getmerch();
  },
  serchinput:function(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  serch:function(){
    var that = this;
    that.setData({
      sort:0,
      showsortmodal: 0,
      list: [],
      page: 1,
      isbottom: false,  
    })
    e.get("merch/ajaxmerchuser", {
      'keyword': that.data.keyword,
      'sorttype': that.data.lng
    }, function (e) {
      if (e.result.list.length > 0){
        that.setData({
          list: e.result.list
        }) 
      }else{
        that.setData({
          isbottom:true
        })
      }
     
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
      'page': that.data.page,
      'sort':that.data.sort,
      'keyword': that.data.keyword,
    }, function(e) {
      wx.stopPullDownRefresh();
      if(e.result.list.length > 0){
        that.setData({
          list: that.data.list.concat(e.result.list),
          showsortmodal: 0,
        })
      }else{
      console.log(111)
        that.setData({
          isbottom:true
        })
      }
    });
    var page = that.data.page + 1;
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