$(document).ready(function(){
  var gifs;
  var animals = [];
  //html divs
  var div = $('.gifs');
  var buttons = $('.buttons');
  var animalBtn = $('.animalSearch');
  var submitBtn = $('.submit');
  var searchInput = $('.gifSearch');

  //creates buttons from the animals array
  function createButtons(){
    for (var i = 0; i < animals.length; i+=1){
      var newButton = $('<button>');
      newButton.attr('class', 'btn btn-primary animalSearch').val(animals[i]).text(animals[i]);
      buttons.append(newButton);
      buttonClick();
    }
  }

  //pushes the user input into the animals array 
  function submit(){
    submitBtn.on('click', function(){
      if(searchInput.val() && animals.indexOf(searchInput.val()) == -1){
        animals.push(searchInput.val());
        buttons.empty();
        createButtons();
       }else{
        console.log('Do not repeat buttons');
      }
      return false;
    })
  }

  //ajax call to giphy to get the searched gifs and adds it to the document
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
  submit();
  //button click handler for the animal buttons 
  function buttonClick(){
    $('.animalSearch').on('click', function(){
      search(this.value);
      console.log("this button is working");
    })
  }

  

  // buttonClick();

}); //end of document.ready 