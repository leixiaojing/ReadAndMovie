import {Movie} from "class/Movie.js";
var app = getApp();
// var util = require("../../../utils/util.js");
Page({
	data: {},
	onLoad: function (options) {
		var movieId = options.id;
		var requestUrl = app.globalData.doubanSite + "/v2/movie/subject/" + movieId;
		// util.getMovieRequest(requestUrl, this.handleSearchData);
		var movie = new Movie(requestUrl);
		// var _this = this;
		// movie.getMovieData(function(movieMsg) {
		// 	_this.setData({ movie: movieMsg });
		// })
		//ES6箭头函数
		movie.getMovieData((movieMsg) => {
			this.setData({ movie: movieMsg });
		})
	},
	// handleSearchData: function (data) {
	// 	if (!data) return;
	// 	var data = data.data;
	// 	var director = {
	// 		avatar: "",
	// 		name: "",
	// 		id: ""
	// 	};
	// 	if (data.directors[0] != null) {
	// 		if (data.directors[0].avatars != null) {
	// 			director.avatar = data.directors[0].avatars;
	// 		}
	// 		director.name = data.directors[0].names;
	// 		director.id = data.directors[0].ids;
	// 	}
	// 	var movieMsg = {
	// 		maxImg: data.images ? data.images.large : "",
	// 		title: data.title,
	// 		countrie: data.countries[0],
	// 		year: data.year,
	// 		collect_count: data.collect_count,
	// 		comments_count: data.comments_count,
	// 		original_title: data.original_title,
	// 		star: util.convertStarToArraay(data.rating.stars),
	// 		average: data.rating.average,
	// 		director: director,
	// 		casts: util.convertStarToString(data.casts),
	// 		castsInfo: util.convertStarTocastInfo(data.casts),
	// 		genres: data.genres.join("、"),
	// 		summary: data.summary
	// 	};
	// 	this.setData({ movie: movieMsg });
	// },
	previewImageFunc: function (event) {
		var src = event.currentTarget.dataset.src
		wx.previewImage({
			current: src,
			urls: [src],
		})
	}
})