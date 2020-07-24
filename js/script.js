const zipButton = document.getElementById("zipButton");
const zipInput = document.getElementById("zipcode");
const result = document.getElementById('result');

const onZipButtonPress = function() {
  const value = zipInput.value;
  console.log(compute(29.09, 0.139, zipcodes[value][1][0], zipcodes[value][1][1]));
  if (zipcodes[value]) result.innerHTML = displayBortle(value);
  else result.innerHTML = "Sorry, we don't have this zipcode in our system. It's possible you typed it in wrong, or there is no SQM data for this zip code.";
}

const calculateNelm = function(sqm) {
  if (sqm > 20) return ((sqm-8.89)/2)+1;
  if (sqm > 17) return (sqm-8.89)/2;
  else return ((sqm-8.89)/2)-1;
}

const starCount = function(value) {
  let starNum = 0;
  let nelm = calculateNelm(zipcodes[value][0]);
  let stars = [];
  for (var key in hygfull) if (hygfull[key][2] <= nelm && compute(hygfull[key][0], hygfull[key][1], zipcodes[value][1][0], zipcodes[value][1][1])[0] > 0) {
      starNum++;
      if (hygfull[key][3] != "" && hygfull[key][3] != " ") stars.push(hygfull[key]);
    }
  return [starNum - starNum % 10, stars];
}

function displayBortle(value) {
  let sqm = zipcodes[value][0];
  let msg = "";
  if (sqm < 17.8) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><br>Your zip code falls into class 9 of the Bortle Scale: an <b>inner city sky</b>!\
            <br><br>This means that you can see very few stars in the sky due to heavy light pollution in your area.\
            <br>The sky is brightly lit and has a strong glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes all but a select few stars to be invisible..\
            <br>"
  }
  else if (sqm < 18.38) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><br>Your zip code falls into class 8 of the Bortle Scale: a <b>city sky</b>!\
            <br><br>Although not quite as bad as an inner city sky, this means that you can see only a few stars due to light pollution in your area.\
            The sky is brightly lit and has a gray or orange glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes most stars to be invisible.\
            <br>"
  }
  else if (sqm < 18.95) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 7 of the Bortle Scale: a <b>suburban-urban sky</b>!"
  }
  else if (sqm < 19.5) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 6 of the Bortle Scale: a <b>bright suburban transition sky</b>!"
  }
  else if (sqm < 20.49) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 5 of the Bortle Scale: a <b>suburban sky</b>!"
  }
  else if (sqm < 21.69) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 4 of the Bortle Scale: a <b>rural-suburban transition sky</b>!"
  }
  else if (sqm < 21.89) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 3 of the Bortle Scale: a <b>rural sky</b>!"
  }
  else if (sqm < 21.99) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 2 of the Bortle Scale: a <b>truly dark sky</b>!\
            <br>Wow!"
  }
  else {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br>Your zip code falls into class 1 of the Bortle Scale: an <b>excellent dark sky site</b>!\
            <br>You are very lucky to be seeing the beauty of the true night sky, as this is extremely rare.\
            <br>In an excellent dark sky site, you will be able to see more than 4,500 stars, as well as the Milky Way."
  }
  let st = starCount(value);

  st[1].sort(function(val1, val2) {return parseFloat(val1[2]) - parseFloat(val2[2])});

  msg += "<br>Based on the sky quality meter readings in your area, you might be able to see " + st[0] + " stars in the sky!<br>";
  msg += "<br>Here are some stars you might be able to see, in order of decreasing brightness: <br>";

  for (star in st[1]) {
    msg += "<b>" + st[1][star][3] + "</b><br>";
  }

  return msg;
}

zipButton.addEventListener('click', onZipButtonPress);
