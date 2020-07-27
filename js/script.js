const zipButton = document.getElementById("zipButton");
const zipInput = document.getElementById("zipcode");
const coordButton = document.getElementById("coordButton");
const latInput = document.getElementById("lat");
const longInput = document.getElementById("long");
const result = document.getElementById('result');

const onZipButtonPress = function() {
  const value = zipInput.value;
  result.innerHTML = "<b>results</b>";
  if (value in zipcodes) result.innerHTML += "<br><br>" + displayBortle(zipcodes[value][0], zipcodes[value][1][0], zipcodes[value][1][1]);
  else result.innerHTML += "<br><br>Sorry, we don't have this zipcode in our system. It's possible you typed it in wrong, or there is no SQM data for this zip code.\
                            <br>You can also try inputting your latitude and longitude.";
}

const onCoordButtonPress = function() {
  const lat = latInput.value;
  const long = longInput.value;
  result.innerHTML = "<b>results</b>";
  let sqm = searchByCoords(lat, long, 0.1)
  if (sqm != 0) result.innerHTML += "<br><br>" + displayBortle(sqm, parseFloat(lat), parseFloat(long));
  else result.innerHTML += "<br><br>Sorry, we can't find any SQM data for these coordinates. <br>You can also try inputting your zipcode if you live in the US.";
}

const searchByCoords = function(lat, long, radius) {
  if (radius > 0.5) return 0;
  let sum = 0;
  let count = 0;
  for (var key in coords) {
    if (Math.abs(lat - parseFloat(key)) < radius) {
      if (Math.abs(long - parseFloat(coords[key][0])) < radius)  {
         sum += parseFloat(coords[key][1]);
         count++;
      }
    }
  }
  if (count > 0) return sum/count;
  else return searchByCoords(lat, long, radius*1.1);
}

const calculateNelm = function(sqm) {
  if (sqm > 20) return ((sqm-9)/2+0.5);
  if (sqm > 18) return (sqm-9)/2-0.5;
  return ((sqm-9)/2-1);
}

const starCount = function(sqm, lat, long) {
  let starNum = 0;
  let nelm = calculateNelm(sqm);
  let stars = [];
  for (var key in hygfull) if (hygfull[key][2] <= nelm && compute(hygfull[key][0], hygfull[key][1], lat, long)[0] > 15) {
      starNum++;
      if (hygfull[key][3] != "" && hygfull[key][3] != " " && hygfull[key][2] <= nelm*0.66) stars.push(hygfull[key]);
    }
  return [starNum - starNum % 10, stars];
}

const displayBortle = function(sqm, lat, long) {
  console.log(sqm, lat, long);
  let msg = "";
  if (sqm < 17.8) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><br><h2>Your zip code falls into class 9 of the Bortle Scale: an <b>inner city sky!</h2></b>\
            <br><br>This means that you can see very few stars in the sky due to heavy light pollution in your area.\
            <br>The sky is brightly lit and has a strong glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes all but a select few stars of the brightest constellations to be invisible..";
  }
  else if (sqm < 18.38) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><br><h2>Your zip code falls into class 8 of the Bortle Scale: a <b>city sky</b>!</h2>\
            <br><br>Although not quite as bad as an inner city sky, this means that you can see only a few stars due to light pollution in your area.\
            The sky is brightly lit and has a gray or orange glow (\"skyglow\"), caused by the use of artificial light at night,\
            which causes most stars to be invisible.";
  }
  else if (sqm < 19.2) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 7 of the Bortle Scale: a <b>suburban-urban sky</b>!</h2>\
          <br><br>Although your sky is not as bright as the city sky, and you may be able to see a few more stars, the Milky Way is, unfortunately, invisible to you.\
          <br>You may be able to see a few constellations, but the sky is lit with a white or gray glow (\"skyglow\"), caused by the use of artificial light at night.";
  }
  else if (sqm < 19.7) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 6 of the Bortle Scale: a <b>bright suburban transition sky</b>!</h2>\
          <br><br>This is the most bright class on the scale that allows the Milky Way to begin to be seen, very faintly, at the zenith, on clear days.\
          <br>The sky is light gray due to the light pollution, and brightly lit. However, you may be able to identify some constellations!";
  }
  else if (sqm < 20.49) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 5 of the Bortle Scale: a <b>suburban sky</b>!</h2>\
          <br>You live under a somewhat dark sky. While light pollution is visible in all directions, you are able to faintly see the Milky Way.\
          <br>However, the sky is mostly clear of \"skyglow\", and you will be able to identify many constellations!";
  }
  else if (sqm < 21.69) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 4 of the Bortle Scale: a <b>rural-suburban transition sky</b>!</h2>\
          <br>You live under a fairly clear sky! While light pollution is present, you can still see the Milky Way fairly well (although it lacks detail).\
          <br>Your surroundings are visible and you can see at a great distance.";
  }
  else if (sqm < 21.89) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 3 of the Bortle Scale: a <b>rural sky</b>!</h2>\
          <br>You live under a very clear sky! Although this is not the darkest sky, it is difficult to find skies darker than this in the modern day, so you should feel lucky!\
          <br>During the summer, you will be able to see the Milky Way in great detail. Although some light pollution is evident, for the most part, the sky is very clear.";
  }
  else if (sqm < 21.99) {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 2 of the Bortle Scale: a <b>truly dark sky</b>!</h2>\
            <br>Wow! You are very lucky to be living under such a dark sky. Although not the darkest possible sky, in the modern day, this is often as dark as it gets,\
            even in designated dark-sky sites.\
            <br>In a truly dark sky, you will be able to see the Milky Way in fine detail. There is very little light pollution in your area. The sky is clear and absent of\
            \"skyglow\".";
  }
  else {
    msg = "<img src=\"img/bortle_scale.jpeg\"><br><h2>Your zip code falls into class 1 of the Bortle Scale: an <b>excellent dark sky site</b>!</h2>\
            <br>WOW! You are very lucky to be seeing the beauty of the true night sky, as this is EXTREMELY rare: there is virtually no light pollution in your area.\
            <br>In an excellent dark sky site, you will be able to see the full extent of the stars visible from Earth, as well as the full Milky Way.";
  }
  let st = starCount(sqm, lat, long);

  st[1].sort(function(val1, val2) {return parseFloat(val1[2]) - parseFloat(val2[2])});

  msg += "<br><h3>Based on the sky quality meter readings in your area, you might be able to see <b>" + st[0] + " stars</b> in the sky on a clear night!</h3><br>";
  msg += "<br>Here are some stars you might be able to see, in order of decreasing brightness: <br>";

  for (star in st[1]) {
    msg += "<b>" + st[1][star][3] + "</b><br>";
  }
  msg += "<br> ...and " + (st[0] - st[1].length) + " more!";

  return msg;
}

zipButton.addEventListener('click', onZipButtonPress);
coordButton.addEventListener('click', onCoordButtonPress);
