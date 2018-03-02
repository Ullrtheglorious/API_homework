var games = ["Metal Gear", "Red Dead Redemption", "Destiny", "PUBG", "Rainbow Six Siege", "Far Cry", "GTA V", "Fallout 4", "Dark Souls", "God of War"];
var offSet = 10;
var addMore;
function APISearch() {
    var gameSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameSearch + "&limit=10&api_key=gVFYG1uGKnUOa3ncEYW83t1gDOKOWH7y";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var resultDiv = $("<div class='gifStill' data-state='still'> ");
        for (var i = 0; i < response.data.length; i++) {
            var p1 = ("Rated: " + response.data[i].rating);
            var gifUrl = response.data[i].images.fixed_height_still.url;
            var gif = $("<img class='gifImg col-sm-6'>");
            gif.attr('title', p1);
            gif.attr("src", gifUrl);
            gif.attr({ 'data-animate': response.data[i]
            .images.fixed_height.url });
            gif.attr('data-rating', p1);
            gif.attr({ 'data-still': response.data[i].images.fixed_height_still.url });
            gif.attr({ 'data-state': 'still' });
            resultDiv.append(gif);
            $('#game-view').html(resultDiv)
            var addMore = $("#add-more").attr("gameTitle", gameSearch);
            $("#add-more").show("fast");
        }
        hoverAnimate();
    });
}

function searchMore() {
    var moreSearch = $(this).attr("gameTitle");
    var queryMoreURL = "https://api.giphy.com/v1/gifs/search?q=" + moreSearch + "&offset=" + offSet + "&limit=10&api_key=gVFYG1uGKnUOa3ncEYW83t1gDOKOWH7y";
    $.ajax({
        url: queryMoreURL,
        method: "GET"
    }).then(function (response) {
        var resultDiv = $("<div class='gifStill' data-state='still'> ");
        for (var i = 0; i < response.data.length; i++) {
            var p1 = ("Rated: " + response.data[i].rating);
            var gifUrl = response.data[i].images.fixed_height_still.url;
            var gif = $("<img class='gifImg col-sm-6'>");
            gif.attr('title', p1);
            gif.attr("src", gifUrl);
            gif.attr({
                'data-animate': response.data[i].images.fixed_height.url
            });
            gif.attr('data-rating', p1);
            gif.attr({ 'data-still': response.data[i].images.fixed_height_still.url });
            gif.attr({ 'data-state': 'still' });
            // resultDiv.append(p1);
            resultDiv.append(gif);
            $('#game-view').append(resultDiv)
            // $("#add-more").hide("fast");
        }
        offSet += 10;
        hoverAnimate();
    });
}
function hoverAnimate() {
    $('.gifImg').off();
    $('.gifImg').hover(function () {
        if ($(this).attr('data-state') === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'data-animate');
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
}


function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < games.length; i++) {
        var gameButton = $("<button>");
        gameButton.addClass("game-btn btn-outline-light");
        gameButton.attr("data-name", games[i]);
        gameButton.text(games[i]);
        $("#buttons-view").append(gameButton);
    }
}
$("#add-game").on("click", function (event) {
    event.preventDefault();
    var gameSearch = $("#game-input").val().trim();
    games.push(gameSearch);
    $("#game-input").val("");
    renderButtons();
});
$(document).on("click", ".game-btn", APISearch);
$(document).on("click", "#add-more", searchMore);
renderButtons();