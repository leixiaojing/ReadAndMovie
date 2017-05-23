var app = getApp();
var util = require("../../utils/util.js");

Page({
  data: {
    in_theaters:{},
    coming_soon:{},
    top250:{},
    contentShow:true,
    searchPannelShow:false,
    searchData:{},
    inputvalue:""
  },
  onLoad: function (options) {
    var in_theaters_url = app.globalData.doubanSite + "/v2/movie/in_theaters";
    var coming_soon_url = app.globalData.doubanSite + "/v2/movie/coming_soon";
    var top250_url = app.globalData.doubanSite + "/v2/movie/top250";

    this.getMovieListData(in_theaters_url,"正在热映","in_theaters");
    this.getMovieListData(coming_soon_url,"即将上映","coming_soon");
    this.getMovieListData(top250_url,"豆瓣top250","top250");
    
  },
  getMovieListData:function(url,title,key) {
    var _this = this;
    wx.request({
      url: url + "?start=0&count=3",
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        // console.log(res.data);
      },
      fail: function () {},
      complete:function(res) {
        _this.handleMovieData(res.data.subjects,title,key);
      }
    })
  },
  handleMovieData:function(data,title,key) {
    var movieListTitle = title;
    var movieMsg = util.handleData(data);
    var movieData = {};
    //模板异步调用数据，必须先填充data里面的数据，才不会报错
    movieData[key] = {
      movies:movieMsg,
      title:movieListTitle
    };
    this.setData(movieData); 
  },
  viewMoreMovies:function(event) {
    var movietype = event.currentTarget.dataset.movietype;
    wx.navigateTo({
      url: 'more-movies/more-movies?movietype='+movietype,
    })
  },
  onInputFocus:function(event) {
    this.setData({
      contentShow:false,
      searchPannelShow:true
    })
  },
  onInputBlur:function(event) {
    var value = event.detail.value;
    var searchUrl = app.globalData.doubanSite + "/v2/movie/search?q="+value;
    util.getMovieRequest(searchUrl,this.handleSearchData);
  },
  handleSearchData:function(data) {
    var data = data.data.subjects;
    var searchData = util.handleData(data);
    this.setData({searchData:{movies:searchData}});
  },
  closeSearchView:function(event) {
    this.setData({
      contentShow:true,
      searchPannelShow:false,
      inputvalue:""
    })
  },
  viewDetails:function(event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"movie-detail/movie-detail?id="+movieId
    })
  }
})