;(function() {var link = document.querySelector(".write-us");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".btn-close")

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-content-show");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
});})();

;(function() {
  var scale = document.querySelector('.scale');
  var toggles = document.querySelectorAll('.toggle');
  var maxToggle = document.querySelectorAll('.max-toggle')

  var bar = document.querySelector('.bar');

  var minValue = document.querySelector('.min-price');
  var maxValue = document.querySelector('.max-price');

  toggles.forEach(toggle => toggle.onmousedown = function(e) {
    var toggleCoords = getCoords(toggle);
    var shiftX = e.pageX - toggleCoords.left;
    
    var scaleCoords = getCoords(scale);

      document.onmousemove = function(e) {
        var newLeft = e.pageX - shiftX - scaleCoords.left;

        if (newLeft < 10) {
          newLeft = 10;
        }

        if (newLeft > 210) {
          newLeft = 210;
        }

        toggle.style.left = `${newLeft}px`;

        if (toggle.classList.contains('min-toggle')) {
          minValue.value = `${Math.round(((newLeft - 10) / 200) * 20000)}`;

          bar.style.left = `${newLeft}px`;
          bar.style.width = `${maxToggle[0].offsetLeft - newLeft}px`;
          if (maxToggle.offsetLeft - newLeft < 0) bar.style.width = 0;
        } else {
          maxValue.value = `${Math.ceil(((newLeft - 10) / 200) * 20000)}`;
          bar.style.width = `${newLeft - 10}px`;
        }
      }

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      return false; // disable selection start (cursor change)
  });

    toggles.forEach(toggle => toggle.ondragstart = function() {
      return false;
    });

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
};
})();