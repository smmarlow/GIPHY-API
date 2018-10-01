

var apiKey = 'bAziyAO8AUxEXKCVSpuIBuD0tzPFo67f'
var places = 'sacramento';
var displayAmount = 10;
var rating = "G";
// Performing an AJAX request with the queryURL
var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=bAziyAO8AUxEXKCVSpuIBuD0tzPFo67f&q=' + places + '&displayAmount=' + displayAmount + '&offset=0&rating=' + rating + '&lang=en';

$('#clearButton').on('click', function() {
    $('#list').html('<button type="button" class="btn btn-light buttonLocation" data-place="California" data-display="5" data-rating="PG"><p>Example</p><p>Location: California</p><p>Display: 5</p><p>Rating: PG</p></button>');
});
$('#clearButtonGif').on('click', function() {
    $('#bodyRight').html('');
});

$('#add').on( "click", function() {
    places = $('#location').val().trim();
    displayAmount = $('#displayAmount option:selected').text();
    rating = $('#rating option:selected').text();

    var newButton = $('<button type="button" class="btn btn-light buttonLocation">');
    newButton.attr('data-place', places);
    newButton.attr('data-display', displayAmount);
    newButton.attr('data-rating', rating);
    pPlaces = $('<p>').text('Location: ' + places);
    pDisplayAmount = $('<p>').text('Display: ' + displayAmount);
    pRating =  $('<p>').text('Rating: ' + rating)
    newButton.append(pPlaces);
    newButton.append(pDisplayAmount);
    newButton.append(pRating);

    $('#list').append(newButton);
});
    
$(document).on('click', '.buttonLocation', function() {
    console.log($(this).attr('data-place'));
    console.log($(this).attr('data-display'));
    console.log($(this).attr('data-rating'));


    places = $(this).attr('data-place');
    displayAmount = $(this).attr('data-display');
    rating = $(this).attr('data-rating');

    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=bAziyAO8AUxEXKCVSpuIBuD0tzPFo67f&q=" + places + "&limit=" + displayAmount + "&offset=0&rating=" + rating +"&lang=en";

    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
        console.log(response);
        
        for (let i = 0; i < response.data.length; i++) {
            var results = response.data;
            var gifTitle = results[i].title;
            console.log(gifTitle);
            var gifRating = results[i].rating;
            console.log(gifRating);
            var gifImage = results[i].images.original_still.url;
            console.log(gifImage);
            var gifMoving = results[i].images.original.url;
            
            var newCard = $('<div class="card" style="width: 100%">');
            var cardImage = $('<img class="card-img-top gify" data-state="still" data-still="' + gifImage + '" data-moving="' + gifMoving + '" src="' + gifImage + '" alt="Card image cap">');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + gifTitle + '</h5>');
            var cardText = $('<p class="card-text">Rating: ' + gifRating + '</p>')
    
            cardBody.append(cardTitle);
            cardBody.append(cardText);
    
            newCard.append(cardImage);
            newCard.append(cardBody);
    
            $('#bodyRight').prepend(newCard);
        };
    });
});

$(document).on('click', '.gify', function() {
    console.log('clicked');
    var moving = $(this).attr('data-moving');
    var still = $(this).attr('data-still');
    var state = $(this).attr('data-state')
    if (state === 'still') {
        $(this).attr('src', moving);
        $(this).attr('data-state', 'moving');
    }
    if (state === 'moving') {
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
    }
});

