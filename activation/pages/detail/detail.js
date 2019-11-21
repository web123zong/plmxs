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
    duration: 1000,
    showDialog: false,
    c_name: '',
    c_mobile: '',
    c_year: ''
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

    e.get(a.globalData.api + '&r=activation.goods_info',{
        'goodsid': that.data.goodsid,
        'sn': that.data.sn,
    }, function (res) {
      that.setData({
        piclist: res.info.piclist,
        sn: res.info.sn,
        goods_status: res.info.goods_status,
        status: res.info.status,
        surplus: res.info.surplus,
        usetime: res.info.usetime,
        title: res.info.title,
        marketprice: res.info.marketprice,
        map: res.info.map,
        date: res.info.date,
        model: res.info.model,
        mobile: res.info.mobile,
        address_label: res.info.address_label,
        province: res.info.province,
        area: res.info.area,
        city: res.info.city,
        scraptime: res.info.scraptime,
        sy_time: res.info.sytime,
        years: res.info.years,
        c_name: res.member.realname,
        c_mobile: res.member.mobile,
      })
      l.wxParse("wxParseData", "html", res.info.content, that, "0")
    })

    // wx.request({
    //   url: a.globalData.api + '&r=activation.goods_info',
    //   data: {
    //     'goodsid': that.data.goodsid,
    //     'sn': that.data.sn
    //   },
    //   method: "POST",
    //   success: function(res) {
    //     console.log(res)
    //     that.setData({
    //       piclist: res.data.info.piclist,
    //       sn: res.data.info.sn,
    //       goods_status: res.data.info.goods_status,
    //       status: res.data.info.status,
    //       surplus: res.data.info.surplus,
    //       usetime: res.data.info.usetime,
    //       title: res.data.info.title,
    //       marketprice: res.data.info.marketprice,
    //       map: res.data.info.map,
    //       date: res.data.info.date,
    //       model: res.data.info.model,
    //       mobile: res.data.info.mobile,
    //       address_label: res.data.info.address_label,
    //       province: res.data.info.province,
    //       area: res.data.info.area,
    //       city: res.data.info.city,
    //       scraptime: res.data.info.scraptime,
    //       sy_time:res.data.info.sytime,
    //       years:res.data.info.years
    //     })
    //     l.wxParse("wxParseData", "html", res.data.info.content, that, "0")
    //   }
    // })
  },

  bind_activation:function(){
    var that = this;
    var name = that.data.c_name
    var mobile = that.data.c_mobile
    var year = that.data.c_year
    if (name == ''){
      wx.showToast({
        title: '请输入车主姓名',
        icon: 'none'
      })
      return
    }
    if (mobile == '' || mobile.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return
    }
    if (year == ''){
      wx.showToast({
        title: '请输入汽车型号年份',
        icon: 'none'
      })
      return
    }
    
    e.get("activation/bind_openid", { 'sn': that.data.sn, 'name': name, 'mobile': mobile,'year':year}, function (res) {
      if (res.code==1){
        wx.showToast({
          title: res.msg,
          icon:'success'
        })
         setTimeout(function () {
           wx.navigateTo({
             url: '/log/pages/integral/integral'
           })
         }, 1500)
       }else{
         wx.showToast({
           title: res.msg,
           icon: 'success'
         })
       }
    });

  },
  map: function (a) {
    var t = this;
    wx.openLocation({
      latitude: parseFloat(t.data.map.lat),
      longitude: parseFloat(t.data.map.lng),
      name: t.data.address,
      address: t.data.address,
      scale: 28
    });
  },
  show_activation: function(){
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  inputTap:function(e){
    var that = this
    console.log(e.detail.value)
    var val = e.detail.value
    var name = e.currentTarget.dataset.name
    that.setData({
      [name]:val
    })
    console.log(that.data.c_mobile, that.data.c_name, that.data.c_year)
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