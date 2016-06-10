$(document).ready(function(){
  var gifs;
  var animals = [];
  //html divs
  var div = $('.gifs');
  var buttons = $('.buttons');
  var animalBtn = $('.animalSearch');
  var submitBtn = $('.submit');
  var searchInput = $('.gifSearch');
  var clear = $('.clear');

  //creates buttons from the animals array
  function createButtons(){
    for (var i = 0; i < animals.length; i+=1){
      var newButton = $('<button>');
      var closeButton = $('<button>');
      var x = $('<i class="fa fa-times" aria-hidden="true"></i>');
      closeButton.attr('class', 'btn btn-primary delete').val(animals[i]).append(x)
      newButton.attr('class', 'btn btn-primary animalSearch').val(animals[i]).text(animals[i]);
      buttons.append(newButton).append(closeButton);
      // closeButton();
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

  function clearGifs(){
    clear.on('click', function(){
      div.empty();
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
        var gifDiv = $('<div>');
        var newImg = $('<img>');
        var pre = $('<p>');
        pre.addClass('embed').text(gifObj.data[i].embed_url);
        newImg.attr('src', gifObj.data[i].images.fixed_height.url);
        gifDiv.addClass('gifDiv').append(newImg, pre);
        div.append(gifDiv);
      }
    })
  }

  createButtons();
  submit();
  clearGifs();

  //button click handler for the animal buttons 
  function buttonClick(){
    $('.animalSearch').on('click', function(){
      search(this.value);
      console.log("this button is working");
      closeButton();
    })
  }

  function closeButton(){
    $('.delete').on('click', function(){
      var btnVal; 
      btnVal = this.value;
      console.log(btnVal);
      var btn = ($('button').filter(function(){
         return $(this).val() == btnVal;
      }));
      btn.remove();
      animals.splice(animals.indexOf(btnVal), 1);
    })
  }
  // buttonClick();
  closeButton();

}); //end of document.ready 