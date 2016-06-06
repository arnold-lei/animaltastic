$(document).ready(function(){
  var gifs; 

  //html divs
  var div = $('.gifs');
  $.ajax({
    url:'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC',
    method: 'GET',
  }).done(function(gifObj){
    console.log(gifObj.data)
    for (var i = 0; i < gifObj.data.length; i++){
      var newImg = $('<img>');
      newImg.attr('src', gifObj.data[i].images.fixed_height.url);
      div.append(newImg);
      console.log(gifObj)
    }
  })
}); 