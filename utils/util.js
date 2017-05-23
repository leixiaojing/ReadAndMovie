function convertStarToArraay(starNum) {
	var star = [];
	starNum = Math.floor(starNum/10);
	for (var i = 0; i < 5; i++) {
	  i <= starNum ? star[i] = 1 : star[i] = 0;
	};
	return star;
}
function convertStarToString(obj) {
  var arr = [];
  for(var i in obj) {
    arr.push(obj[i].name);
  }
  return arr.join(" / ");
}
function convertStarTocastInfo(obj) {
  var castInfo = [];
  for(var i in obj) {
    var casts = {
      img:obj[i].avatars ? obj[i].avatars.large : "",
      name:obj[i].name
    }
    castInfo.push(casts);
  }
  return castInfo;
}
function getMovieRequest(url,callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      
    },
    fail: function () {
     
    },
    complete:function(res) {
      callback(res);
    }
  })
}
function handleData (data) {
  var movieMsg = [];
  for(var index in data) {
    var movieName = data[index].title;
    if(movieName.length > 6) {
      movieName = movieName.substring(0,6)+"...";
    }
    var movielist = {
      moviePost:data[index].images.medium,
      movieName:movieName,
      scroe:data[index].rating.average,
      star:convertStarToArraay(data[index].rating.stars),
      movieId:data[index].id
    }
    movieMsg.push(movielist);
  }
  return movieMsg;
}
module.exports = {
	convertStarToArraay:convertStarToArraay,
	getMovieRequest:getMovieRequest,
  handleData:handleData,
  convertStarToString:convertStarToString,
  convertStarTocastInfo:convertStarTocastInfo
}