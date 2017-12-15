// tweetに個別の識別番号を付与する為のロジック
var utils = {
  uuid: function () {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  }
}

var App = function() {
  this.tweets = []
  this.bindEvents();
  this.tweetTemplate = Handlebars.compile($('#js-tweet-template').html());
}

App.prototype.tweet = function (e) {
  if(e.keyCode === 13) {
    e.preventDefault();
    var $tweetBody = $('#js-tweet-body');
    var body = $tweetBody.val();//value を取得
    if (body.length != 0) {
      var tweet = new Tweet(body)
      this.tweets.unshift(tweet)
      this.render();
      $tweetBody.val('');

    }
  }
};

App.prototype.bindEvents = function(){
  $('#js-tweet-body').on('keydown',this.tweet.bind(this));
}

App.prototype.render = function(){
  $('#js-tweets').html(this.tweetTemplate(this.tweets));
}

var Tweet = function(body){
    this.uuid = utils.uuid();
    this.body = body;
    this.isFavorited = false;
}




// applicationの起動
$(function() {
  new App()
})
