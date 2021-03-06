
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;

    $greeting.text("Great choice! Who wouldn't want to live at " + address + "?");
    // load streetview
    var streetviewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + "";
    var image = $("<img class='bgimg' src='" + streetviewURL + "'>");
    $body.append(image);
    // YOUR CODE GOES HERE!

    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=92e51f9adb11f7195f597909588d0ffa:19:72605905"
     $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text("New York Times Articles About " + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append("<li class='article'>"+
                "<a href='"+article.web_url+"'>"+article.headline.main+"</a>"+
                "<p>" + article.snippet + "</p>"+
            "</li>");
        };

    }).error(function(e){
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });

     var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityStr + "&format=json&callback=wikiCallback";
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to retrieve wikipedia articles");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append("<li><a href='" + url + "'>" + articleStr + "</a></li>");
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
