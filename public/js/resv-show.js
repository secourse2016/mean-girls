'use strict';

(function() {

var card = document.getElementById("number");
var name = document.getElementById("name");
var date = document.getElementById("date");
var card = document.getElementById("number");
var cvc = document.getElementById("cvc");
var fields = document.querySelectorAll(".field");
var signature = document.getElementById("sign");
var cardContainer = document.getElementById("card-container");
var confirm = document.getElementById("confirm");


for (var i = 0; i < fields.length; i++) {
  fields[i].addEventListener("focus", function() {
    this.classList.remove("active");
  })
}



date.addEventListener("blur", function(evt) {
  if (date.value.length > 3) {
    date.classList.add("active");
    cardContainer.classList.add("flip");
    cvc.focus();
  }
});

card.addEventListener("focus", function(evt) {
  card.value = card.value.replace(/ /g,'');
});

card.addEventListener("blur", function(evt) {
  if (card.value.length >= 16) {
    card.classList.add("active");

    var updated = this.value.replace(/(.{4})/g, '$1 ');
    card.value = updated;
  }
});



card.addEventListener("input", function(evt) {
  var val = card.value;
  if (val.length > 4) {
    var number = parseInt(val.charAt(1), 10);
    if (number > 5) {
      document.getElementById("mastercard").classList.add("active");
      document.getElementById("visa").classList.remove("active");
    } else {
      document.getElementById("visa").classList.add("active");
      document.getElementById("mastercard").classList.remove("active");
    }
  } else {
    document.getElementById("mastercard").classList.remove("active");
    document.getElementById("visa").classList.remove("active");
  }

});
})();
