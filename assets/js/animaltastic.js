$(document).ready(function(){
  var gifs; 
  var animals = ['cats', 'dogs', 'racoons'];
  //html divs
  var div = $('.gifs');
  var buttons = $('.buttons');

  function createButtons(){
    for (var i = 0; i < animals.length; i++){
      var newButton = $('<button>');
      newButton.attr('class', 'btn btn-primary animalSearch').val(animals[i]).text(animals[i]);
      console.log(animals[i]);
      buttons.append(newButton);
    }
  }
  function buttonClick(){
    $('.animalSearch').on('click', function(){
      search(this.value)
    })
  }

  function search(term){
    $.ajax({
      url:'http://api.giphy.com/v1/gifs/search?q='+term+'&api_key=dc6zaTOxFJmzC',
      method: 'GET',
    }).done(function(gifObj){
      div.empty();
      for (var i = 0; i < gifObj.data.length; i++){
        var newImg = $('<img>');
        var slug = $('<p>');
        slug.text(gifObj.data[i].slug)
        newImg.attr('src', gifObj.data[i].images.fixed_height.url);
        div.append(newImg);
        console.log(gifObj)
      }
    })
  }

  createButtons();
  buttonClick();

}); 