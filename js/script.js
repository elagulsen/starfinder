const zipButton = document.getElementById("zipButton");
const zipInput = document.getElementById("zipcode");
const result = document.getElementById('result');

const onZipButtonPress = function() {
  const value = zipInput.value;
  if (zipcodes[value]) {
    result.innerHTML = zipcodes[value]
    console.log(zipcodes[value])
  }
  else {
    result.innerHTML = "Sorry, we don't have this zipcode in our system";
    console.log("Sorry, we don't have this zipcode in our system");
  }

  console.log(value);
}

zipButton.addEventListener('click', onZipButtonPress);
