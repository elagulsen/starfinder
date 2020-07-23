const zipButton = document.getElementById("zipButton");
const zipInput = document.getElementById("zipcode");
const result = document.getElementById('result');

const onZipButtonPress = function() {
  const value = zipInput.value;
  if (zipcodes[value]) result.innerHTML = displayMessage(zipcodes[value]);
  else result.innerHTML = "Sorry, we don't have this zipcode in our system. It's possible you typed it in wrong, or there is no SQM data for this zip code.";
}

function displayMessage(sqm) {
  if (sqm < 17.8) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 9 of the Bortle Scale: an <b>inner city sky</b>!"
  }
  else if (sqm < 18.38) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 8 of the Bortle Scale: a <b>city sky</b>!"
  }
  else if (sqm < 18.95) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 7 of the Bortle Scale: a <b>suburban-urban sky</b>!"
  }
  else if (sqm < 19.5) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 6 of the Bortle Scale: a <b>bright suburban transition sky</b>!"
  }
  else if (sqm < 20.49) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 5 of the Bortle Scale: a <b>suburban sky</b>!"
  }
  else if (sqm < 21.69) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 4 of the Bortle Scale: a <b>rural-suburban transition sky</b>!"
  }
  else if (sqm < 21.89) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 3 of the Bortle Scale: a <b>rural sky</b>!"
  }
  else if (sqm < 21.99) {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 2 of the Bortle Scale: a <b>truly dark sky</b>!"
  }
  else {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 1 of the Bortle Scale: an <b>excellent dark sky site</b>!"
  }
}

zipButton.addEventListener('click', onZipButtonPress);
