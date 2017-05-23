var postData = require("../../../data/post_data.js");
var app = getApp();
Page({
  data: {
    playing: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var postid = options.id;

    this.setData(postData.post_data[postid]);
    // 设置缓存，如果不主动清除，缓存会一直存在

    var collectionState = wx.getStorageSync('collected');
    if (collectionState) {
      var c_state = collectionState[postid];
      this.setData({
        collected: c_state
      })
    } else {
      collectionState = {};
      collectionState[postid] = false;
      wx.setStorageSync('collected', collectionState);
    }

    if (app.globalData.g_musicState == true && app.globalData.g_palyPostId == postid) {
      this.setData({ playing: true });
    }

    this.musicState();
  },

  musicState: function () {
    var _this = this;
    wx.onBackgroundAudioPlay(function () {
      _this.setData({ playing: true });
      app.globalData.g_palyPostId = _this.data.postid;
      app.globalData.g_musicState = true;
    });
    wx.onBackgroundAudioPause(function () {
      _this.setData({ playing: false });
      app.globalData.g_palyPostId = null;
      app.globalData.g_musicState = false;
    });
    wx.onBackgroundAudioStop(function() {
      _this.setData({ playing: false });
      app.globalData.g_palyPostId = null;
      app.globalData.g_musicState = false;
    })
  },
  collectionFunc: function (event) {
    var index = this.data.postid;
    var collectionState = wx.getStorageSync('collected');
    var pageId = collectionState[index];
    pageId = !pageId;

    collectionState[index] = pageId;
    // 更新了文章是否收藏的缓存值
    wx.setStorageSync('collected', collectionState);
    // 更新数据绑定
    this.setData({
      collected: pageId
    });
    wx.showToast({
      title: pageId ? '收藏成功' : '取消收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  shareFunc: function (event) {
    // var itemList = ['分享给微信好友', '分享到朋友圈', '分享给QQ好友'];
    // wx.showActionSheet({
    //   itemList: itemList,
    //   success: function (res) {
    //     if (res.cancel != true) {
          wx.showModal({
            // title: "用户 " + itemList[res.tapIndex],
            title: "提示",
            content: '请点击页面右上角的小点进行分享！'
          })
    //     }
    //   }
    // })
  },
  onShareAppMessage:function() {
    return {
      title: this.data.title,
      path: "pages/movies/movie-detail/movie-detail?id="+this.data.postid,
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  playmusic: function () {
    // 音乐路径和封面图片只能用服务器路径
    var playing = this.data.playing;
    if (playing != true) {
      wx.playBackgroundAudio({
        dataUrl: this.data.music.dataUrl,
        title: this.data.music.title,
        coverImgUrl: this.data.music.coverImgUrl
      });
      this.setData({ playing: true });
    } else {
      wx.pauseBackgroundAudio();
      this.setData({ playing: false });
    }
  }
})