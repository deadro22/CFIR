$(function() {
  //chat
  //web work

  $(window).scroll(function() {
    if ($(window).scrollTop() >= 50) {
      $("#mn_menu").css("box-shadow", "2px 2px 2px 1px #63a85a");
      $("#mn_menu").css("border-bottom", "5px #63a85a solid");
    } else {
      $("#mn_menu").css("box-shadow", "");
      $("#mn_menu").css("border-bottom", "");
    }
  });

  $("#clb-nav").click(function() {
    $("#clb-nav").css("opacity", "0.6");
  });

  var clickIndex = 0;
  $("#resize-click").click(function() {
    clickIndex++;
    if (clickIndex == 1) {
      $("#mn_menu").css("border-bottom", "5px #63a85a solid");
      $("#mn_menu").css("box-shadow", "2px 2px 2px 1px #63a85a");
    } else {
      $("#mn_menu").css("box-shadow", "");
      $("#mn_menu").css("border-bottom", "");
      clickIndex = 0;
    }
  });

  function generateThumb(src, alt) {
    var innerMContent =
      '<div class="carousel-item">' +
      '<div class="view">' +
      '<img class="d-block w-100" id="mainThumbImage" style="object-fit: cover;" src=' +
      src +
      " alt=" +
      alt +
      ">";
    '<div class="mask rgba-black-light"></div>' + "</div>" + "</div>";
    $("#use-gen").append(innerMContent);
  }

  //main page image rep generation
  generateThumb("/images/1.jpg", "1");
  generateThumb("/images/3.jpg", "3");
  generateThumb("/images/4.jpg", "4");
  generateThumb("/images/5.jpg", "5");
  generateThumb("/images/6.jpg", "6");
  generateThumb("/images/12.jpg", "7");
});
