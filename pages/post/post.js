//只能用相对路径
var postData = require("../../data/post_data.js");

Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      post_key: postData.post_data
    });
  },
  openDetail: function (event) {
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    })
  },
  openPostDetail: function (event) {
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    })
  }
})