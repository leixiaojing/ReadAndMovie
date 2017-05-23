var util = require("../../../../utils/util.js");
class Movie {
	constructor(url) {
		this.url = url;
	}
	getMovieData(cb) {
		this.cb = cb;
		util.getMovieRequest(this.url, this.handleSearchData.bind(this));
	}
	handleSearchData(data) {
		if (!data) return;
		var data = data.data;
		var director = {
			avatar: "",
			name: "",
			id: ""
		};
		if (data.directors[0] != null) {
			if (data.directors[0].avatars != null) {
				director.avatar = data.directors[0].avatars;
			}
			director.name = data.directors[0].names;
			director.id = data.directors[0].ids;
		}
		var movieMsg = {
			maxImg: data.images ? data.images.large : "",
			title: data.title,
			countrie: data.countries[0],
			year: data.year,
			collect_count: data.collect_count,
			comments_count: data.comments_count,
			original_title: data.original_title,
			star: util.convertStarToArraay(data.rating.stars),
			average: data.rating.average,
			director: director,
			casts: util.convertStarToString(data.casts),
			castsInfo: util.convertStarTocastInfo(data.casts),
			genres: data.genres.join("、"),
			summary: data.summary
		};
		this.cb(movieMsg);
	}
}

export {Movie}