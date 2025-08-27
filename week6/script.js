const topHeading = document.querySelector("h1");
console.log(topHeading);
console.log(topHeading.textContent);
topHeading.textContent = "this is my new h1";
topHeading.style.color = "red";

const firstP = document.querySelector("p");
console.log(firstP);
console.log(firstP.textContent);
firstP.textContent = "this is my new p";
firstP.innerHTML += "<span New Element</span>";

const mySection = document.querySelector("section");
console.log(mySection);
let mynewContent = "<h2>This is an image of a cat</h2><p>white</p>";
mySection.innerHTML += mynewContent;
const h2Heading = document.querySelector("#thirdHeading");
console.log(h2Heading);

const allP = document.querySelectorAll("p");
console.log(allP);
// console.log(allP.textContent);

for (let i = 0; i < allP.length; i++) {
  console.log("P", i + 1, ":", allP[i].textContent);
  // allP[i].style.backgroundColor = "GRAY";
  // allP[i].textContent = "this is new p";
  allP[i].classList.add("para-style");
}
const allAnother = document.querySelectorAll(".another");
console.log(allAnother);
for (let i = 0; i < allAnother.length; i++) {
  console.log("another", i + 1, ":", allAnother[i].textContent);
}

function toggleMe() {
  const myImg = document.querySelector("img");
  console.log(myImg);
  myImg.classList.toggle("round");
}

const myImg = document.querySelector("img");
console.log(myImg);
myImg.addEventListener("mouseenter", addMe);
myImg.addEventListener("mouseleave", removeMe);
myImg.addEventListener("click", handleClick);

function addMe() {
  myImg.classList.add("round");
}
function removeMe() {
  myImg.classList.remove("round");
}
function handleClick() {
  alert("did you just clicked me");
  topHeading.textContent = "you clicked the cat";
}
