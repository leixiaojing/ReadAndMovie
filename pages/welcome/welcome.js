Page({
  data:{
    
  },
  onTap:function(event) {
    // wx.navigateTo({
    //     url:"../post/post"
    // });
    wx.switchTab({
        url:"../post/post"
    });
  },
})
// Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。