var a = getApp(),
  e = a.requirejs("core");
Page({
  data: {
    ishowgoods: false,
    goods_list: [],
    page: 1
  },
  map: function(a) {
    var t = this;
    wx.openLocation({
      latitude: parseFloat(t.data.lat),
      longitude: parseFloat(t.data.lng),
      name: t.data.address,
      address: t.data.address,
      scale: 28
    });
  },
  onLoad: function(a) {
    var merchid = a.id;
    this.setData({
      merchid: merchid
    })
    this.getmerchdetail();
    this.get_recommand_goods();
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
    console.log(this.data)
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {
    var o = this;
  },
  onReachBottom: function() {
    this.get_recommand_goods();
  },
  call: function(a) {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    });
  },
  onShareAppMessage: function() {    
    var o = this;    
    var a = "/store/pages/detail/detail?&id=" + o.data.id;    
    return a = escape(a), {      
      title: that.data.name,
      path: a,
      success: function(a) {        
        console.log(a);      
      },
      fail: function(a) {        
        console.log(a);      
      }    
    };  
  },
  getmerchdetail: function() {
    var that = this;
    e.get("merch/getpage", {
      merchid: that.data.merchid
    }, function(e) {
      if (e.code == 1) {
        that.setData({
          banners: e.banners,
          address: e.merch_info.address,
          mobile: e.merch_info.mobile,
          name: e.merch_info.merchname,
          desc: e.merch_info.desc,
          lat: e.merch_info.lat,
          lng: e.merch_info.lng,
          id: e.merch_info.id
        })
        wx.setNavigationBarTitle({
          title: that.data.name
        })
      }
    });
  },
  get_recommand_goods: function() {
    var that = this;
    e.get("merch/get_recommand", {
      merchid: that.data.merchid,
      page: that.data.page
    }, function(e) {
      if (e.code == 1 && e.list != '') {
        that.setData({
          goods_list: that.data.goods_list.concat(e.list),
          ishowgoods: true,
        })
      }
      var page = e.page += 1;
      that.setData({
        page: page
      })
    });
  }
});