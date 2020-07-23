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
    return "<img src=\"img/bortle_scale.jpeg\"><br><br>Your zip code falls into class 9 of the Bortle Scale: an <b>inner city sky</b>!\
            <br><br>This means that you can see very few stars in the sky due to heavy light pollution in your area.\
            <br>The sky is brightly lit and has a strong glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes all but a select few stars to be invisible..\
            <br>"
  }
  else if (sqm < 18.38) {
    return "<img src=\"img/bortle_scale.jpeg\"><br><br>Your zip code falls into class 8 of the Bortle Scale: a <b>city sky</b>!\
            <br><br>Although not quite as bad as an inner city sky, this means that you can see only a few stars due to light pollution in your area.\
            The sky is brightly lit and has a gray or orange glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes most stars to be invisible.\
            <br>"
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
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 2 of the Bortle Scale: a <b>truly dark sky</b>!\
            <br>Wow!"
  }
  else {
    return "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 1 of the Bortle Scale: an <b>excellent dark sky site</b>!\
            <br>You are very lucky to be seeing the beauty of the true night sky, as this is extremely rare.\
            <br>In an excellent dark sky site, you will be able to see more than 4,500 stars, as well as the Milky Way."
  }
}

zipButton.addEventListener('click', onZipButtonPress);
