var games = ["Metal Gear", "Red Dead Redemption", "Destiny", "Planet Coaster", "PUBG", "Rainbow Six Siege", "Far Cry", "GTA V", "Binding of Isaac", "Magic the Gathering", "Dungeons and Dragons", "Dark Souls", "God of War"];

function APISearch() {
    var gameSearch = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gameSearch + "&limit=9&api_key=gVFYG1uGKnUOa3ncEYW83t1gDOKOWH7y";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var resultDiv = $("<div class='gifStill d-flex flex-sm-wrap' data-state='still'> ");

        for (var i = 0; i < response.data.length; i++) {
            var p1 = $("<p class='rating'>").text("Rated: " + response.data[i].rating);
            var gifUrl = response.data[i].images.fixed_height_still.url;
            var gif = $("<img class='gifImg'>");
            gif.attr("src", gifUrl);
            gif.attr({ 'data-animate': response.data[i].images.fixed_height.url });
            gif.attr({ 'data-still': response.data[i].images.fixed_height_still.url });
            gif.attr({ 'data-state': 'still' });
            resultDiv.append(p1);
            resultDiv.append(gif);
            $('#game-view').html(resultDiv)
        }
        hoverAnimate();
    });
}

function hoverAnimate() {
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
        var a = $("<button>");
        a.addClass("game-btn btn-outline-dark");
        a.attr("data-name", games[i]);
        a.text(games[i]);
        $("#buttons-view").append(a);
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
renderButtons();