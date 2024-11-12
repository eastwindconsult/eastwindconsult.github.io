// myscript written by Peter Nunekpeku | pnunekpeku5@gmail.com

var controls = document.querySelectorAll('.controls');
for (var i = 0; i < controls.length; i++) {
    controls[i].style.display = 'inline-block';
}

const el = document.querySelector("#map > div.legend");

const hidelegend = document.querySelector("#map > div.legend > img");

const hidecaption = document.querySelector("#map > div.legend > div");

el.addEventListener('mouseover', function handleMouseOver() {
hidelegend.style.visibility = 'visible';
hidecaption.style.visibility = 'visible';
});

el.addEventListener('mouseout', function handleMouseOut() {
hidelegend.style.visibility = 'hidden';
});

el.addEventListener('mouseout', function handleMouseOut() {
    hidecaption.style.visibility = 'hidden';
    });

el.addEventListener("dblclick", function() {
    hidelegend.style.display = 'visible';
    hidecaption.style.display = 'visible';
    el.style.display = 'visible';
    });
    

/*

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "visible";
        document.querySelector("#loader").style.display = "visible";
        document.querySelector("#fslides > li:nth-child(3)").style.display = "none";
    } 
    else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
        document.querySelector("#fslides > li:nth-child(3)").style.visibility = "visible";
    }
};

*/

window.addEventListener('load', function() {

    var numForecasts = document.querySelectorAll("#map img.leaflet-image-layer.leaflet-zoom-animated");
    
    var totalForecasts = numForecasts.length;
    var loopForecasts = totalForecasts - 1;
//    this.console.log(loopForecasts, totalForecasts);
    for (var i = 0; i < totalForecasts; i++) {
    document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(numForecasts[i]);
    }

    document.getElementsByTagName("body")[0].style.opacity = "1";

    var forecastIndex = 0;
    var forecastInterval = setInterval(nextForecast, 750); // 1000 = 1sec

    function nextForecast() {
        goToForecast((forecastIndex + 1) % totalForecasts);
    }

    function previousForecast() {
        goToForecastReverse((forecastIndex - 1) % totalForecasts);
    }

    function goToForecast(n) {

 //   var nForecasts = document.querySelectorAll("#map img.leaflet-image-layer.leaflet-zoom-animated");
 // console.log(n);
       forecastIndex = (n + totalForecasts) % totalForecasts;

        if (n > 0 && n <= loopForecasts) {
        n = (n + totalForecasts) % totalForecasts;
        p = (n - 1) % totalForecasts;
        } else {
            //            currentSlide = (tSlides + n) % tSlides;
            p = totalForecasts + n - 1;
        }
        //iternumForecasts = tSlides - 1;
        //console.log("currentslide : " + currentSlide + " ; " + "n : " + n + " ; " + "p : " + p);
        var pSlides = document.querySelectorAll("#map img.leaflet-image-layer.leaflet-zoom-animated");
        var npSlides = pSlides.length;

                if (n < totalForecasts && npSlides == 1) {
            document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(pSlides[0]);
            var shopreSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[p]);
            shopreSlide;

            var shonexSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[n]);
            var slideTitle = shonexSlide.currentSrc;
            //console.log(slideTitle);
            var splitTitle = slideTitle.split("_", );
            var splitTime = splitTitle[3].split(".", );
            var getDate = splitTitle[2];
            //console.log(getDate);
            var getTime = splitTime[0].replace(/-/g, ":");
            //console.log(getTime);

            var dateTime = document.getElementsByTagName("li");

            dateTime[0].innerText = getDate;
            dateTime[1].innerText = getTime;
            shonexSlide;
            document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(numForecasts[p]);

        } else if (n < totalForecasts) {
            var shopreSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[p]);
            var shonexSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[n]);
            var reprevSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(numForecasts[p]);
            shopreSlide;
            shonexSlide;
            var slideTitle = shonexSlide.currentSrc;
            //console.log(slideTitle);
            var splitTitle = slideTitle.split("_", );
            var splitTime = splitTitle[3].split(".", );
            var getDate = splitTitle[2];
            //console.log(getDate);
            var getTime = splitTime[0].replace(/-/g, ":");
            //console.log(getTime);

            var dateTime = document.getElementsByTagName("li");

            dateTime[0].innerText = getDate;
            dateTime[1].innerText = getTime;
            reprevSlide;

            } else {
            var shonexSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[n]);
            //document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(numForecasts[n - 1]);
            shonexSlide;

            var slideTitle = shonexSlide.currentSrc;
            var splitTitle = slideTitle.split("_", );
            var splitTime = splitTitle[3].split(".", );
            var getDate = splitTitle[2];
            var getTime = splitTime[0].replace(/-/g, ":");

            var dateTime = document.getElementsByTagName("li");

            dateTime[0].innerHTML = getDate;
            dateTime[1].innerHTML = getTime;
        }

    }
    var showDateTime = document.querySelectorAll('.fslide');
    for (var i = 0; i < showDateTime.length; i++) {
        showDateTime[i].style.display = 'inline-block';
    }

    function goToForecastReverse(n) {
        forecastIndex = (n + totalForecasts) % totalForecasts;
        n = (n + totalForecasts) % totalForecasts;
        //console.log("currentslide : " + currentSlide + " ; " + "n : " + n);

        var pSlides = document.querySelectorAll("#map img.leaflet-image-layer.leaflet-zoom-animated");
        //var delSlides = pSlides[0];
        //console.log(delSlides);
        //console.log(pSlides.length);


        if (n > 1 && n <= loopForecasts) {
            var reprevSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(pSlides[0]);
            var shonexSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[n]);
            reprevSlide;
            var slideTitle = shonexSlide.currentSrc;
            var splitTitle = slideTitle.split("_", );
            var splitTime = splitTitle[3].split(".", );
            var getDate = splitTitle[2];
            var getTime = splitTime[0].replace(/-/g, ":");

            var dateTime = document.getElementsByTagName("li");

            dateTime[0].innerHTML = getDate;
            dateTime[1].innerHTML = getTime;

            shonexSlide;


        } else {
            currentSlide = (totalForecasts + n) % totalForecasts;
            n = (totalForecasts + n) % totalForecasts;

            var reprevSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").removeChild(pSlides[0]);
            var shonexSlide = document.querySelector("#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane").appendChild(numForecasts[n]);
            reprevSlide;

            var slideTitle = shonexSlide.currentSrc;
            var splitTitle = slideTitle.split("_", );
            var splitTime = splitTitle[3].split(".", );
            var getDate = splitTitle[2];
            var getTime = splitTime[0].replace(/-/g, ":");

            var dateTime = document.getElementsByTagName("li");

            dateTime[0].innerHTML = getDate;
            dateTime[1].innerHTML = getTime;

            shonexSlide;
        }
    }

    var playing = true;
    var pauseButton = document.getElementById('pause');

    function pauseForecast() {
        pauseButton.innerHTML = '&#9658;'; // play character
        playing = false;
        clearInterval(forecastInterval);
    }

    function playForecast() {
        pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
        playing = true;
        forecastInterval = setInterval(nextForecast, 750);
    }

    pauseButton.onclick = function() {
        if (playing) { pauseForecast(); } else { playForecast(); }
    };

    var next = document.getElementById('next');
    var previous = document.getElementById('previous');

    next.onclick = function() {
        pauseForecast();
        nextForecast();
    };
    previous.onclick = function() {
        pauseForecast();
        previousForecast();
    };
});
