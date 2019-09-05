// *************display weather app info*****************

$(document).ready(function () {
  $("#submitWeather").click(function () {
    var city = $("#city").val();

    if (city != "") {
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial" +
          "&APPID=d2032e58f9c4ad9419826cd0fe298077",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
          console.log(data);

          var widget = show(data);

          $("#show").html(widget);

          $("#city").val("");
        }
      });
    } else {
      $("#error").show();
      $("#submitWeather").hide();
      $("#show").html("");
      $("#error").html("Please Enter A City Name");
      $("#closeErrorBtn").show();
      $("#hideWeatherBtn").hide("");
    }
  });
});
/***********display weather data from api*********/

function show(data) {
  return (
    "<div class='tempCity'><span class='bold'> Current Weather for: </span> " +
    data.name +
    ", " +
    data.sys.country +
    "		</div>" +
    /* "<h4><strong>Weather</strong>: " +
    data.weather[0].main +
    "</h4>" + */ "<h4>Description: " +
    "<span class='normalFontWeight'>" +
    data.weather[0].description +
    "</span>" +
    /*"<img src='http://openweathermap.org/img/w/" +
    data.weather[0].icon +
    ".png'>"*/ "</h4>" +
    "<h4>Temperature: " +
    " " +
    "<span class='normalFontWeight'>" +
    Math.floor(data.main.temp) +
    "&#8457</span>" +
    "  " +
    /*"<h3><strong>Pressure</strong>: "+data.main.pressure+"</h3>"+*/
    "High: " +
    "  " +
    "<span class='normalFontWeight'>" +
    Math.floor(data.main.temp_max) +
    "&#8457</span>" +
    "  " +
    "Low: " +
    "<span class='normalFontWeight'>" +
    Math.floor(data.main.temp_min) +
    "&#8457</h4></span>" +
    "<h4><strong>Wind Speed</strong>: " +
    "<span class='normalFontWeight'>" +
    Math.floor(data.wind.speed) +
    " MPH</h4></span>" +
    "<h4><strong>Humidity</strong>: " +
    "<span class='normalFontWeight'>" +
    data.main.humidity +
    "% </span>" +
    "</h4>"
  );
  /*"<h3><strong>Wind Direction</strong>: "+data.wind.deg+"&deg</h3>"*/
}

// add or remove class hideWeather

$(document).ready(function () {
  $("#hideWeatherBtn").click(function () {
    $(".hideWeather").fadeOut();
    $("#submitWeather").show();
    /*$("#city").value("");*/
    $("#city").show();
    $("#submitWeather").show();
  });
});

$(document).ready(function () {
  $("#submitWeather").click(function () {
    $(".hideWeather").fadeIn();
    $("#city").hide();
    $("#submitWeather").hide();
  });
});

$(document).ready(function () {
  $("#closeErrorBtn").click(function () {
    $("#error").hide();
    $(".hideWeather").hide();
    $("input").show();
    $("#submitWeather").show();
  });
});

////////////////////////////////////////////////////////////// slider function
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true;
const intervalTime = 5000;
let slideInterval;

// Add and remove current class function
const nextSlide = () => {
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");
  // Check for next slide
  if (current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add("current");
  } else {
    // Add current to starting div
    slides[0].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");
  // Check for next slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add("current");
  } else {
    // Add current to last slide div
    slides[slides.length - 1].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

// Button events
next.addEventListener("click", e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener("click", e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto Slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}
