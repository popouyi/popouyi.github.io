function checkWeather() {
  const temp = document.querySelector("#myTemp");
  console.log(temp);
  const t = temp.value;
  console.log(t);
  if (t > 40) {
    console.log("supa hot");
  } else if (t <= 40 && t > 30) {
    console.log("nice weather");
  } else if (t < 30 && t > 18) {
    console.log("a bit chilly");
  } else if (t < 18) {
    console.log("kinda cold");
  }
}
