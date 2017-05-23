var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data:{
  	movies:[],
    requestUrl:"",
    currentCount:0,
    isMoviesDataEmpty:true
  },
  onLoad:function(options){
    var movietype = options.movietype;
    wx.setNavigationBarTitle({
      title: movietype,
    });

    var requestUrl = "";
    switch(movietype) {
    	case "正在热映":
    		requestUrl = app.globalData.doubanSite + "/v2/movie/in_theaters";
    		break;
    	case "即将上映":
    		requestUrl = app.globalData.doubanSite + "/v2/movie/coming_soon";
    		break;
    	case "豆瓣top250":
    		requestUrl = app.globalData.doubanSite + "/v2/movie/top250";
    		break;
    };
    this.setData({requestUrl:requestUrl});
    util.getMovieRequest(requestUrl,this.handleMovieData);

    wx.showLoading({
      title:"加载中"
    })
    
  },
  handleMovieData:function(data) {
    var data = data.data.subjects;
  	var movieMsg = util.handleData(data);
    //绑定新家在的数据
    var totalMovieMsg = [];
    if(this.data.isMoviesDataEmpty) {
      totalMovieMsg = movieMsg;
      this.setData({isMoviesDataEmpty:false});
    }else {
      totalMovieMsg = this.data.movies.concat(movieMsg);
    }
  	this.setData({
  		movies:totalMovieMsg,
  	}); 
    wx.hideNavigationBarLoading();
    wx.hideLoading();
    wx.stopPullDownRefresh()
    this.data.currentCount += 20;
  },
  onReachBottom:function(event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.currentCount + "&count=20";
    util.getMovieRequest(nextUrl,this.handleMovieData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh:function() {
    this.data.movies = {};
    this.data.isMoviesDataEmpty = true;
    util.getMovieRequest(this.data.requestUrl,this.handleMovieData);
    wx.showNavigationBarLoading();
  },
  viewDetails:function(event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"../movie-detail/movie-detail?id="+movieId
    })
  }
})