
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
    var streetviewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400$location=" + address + "";
    $body.append("<img class='bgimg' src=''" + streetviewURL + ">");
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
