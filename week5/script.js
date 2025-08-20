// string variables = text variables alphanumeric
const myName = "pp";
const myAge = "18";
console.log(myName, myAge);

// number variable add subtract multiply duvude
let a = 1;
let b = 1234;
let c = a + b;
console.log(c);
const id = 12345;
const city = "melbourne";
const uni = "RMIT";

// OBJECTS : collection of related variables or data
const myStudentRecord = {
  name: "Gavin",
  id: "12345",
  city: "melbourne",
};

console.log(myStudentRecord.name);
console.log(myStudentRecord.city);

const myAssignmentRecord = {
  id: 12345,
  as1Score: 98,
  as2Score: 97,
  as3Score: 96,
};
const total =
  myAssignmentRecord.as1Score +
  myAssignmentRecord.as2Score +
  myAssignmentRecord.as3Score;
console.log(total);

//  boolean = test condition check True or false
const isItEvening = true;
const isItRaining = false;

//  back ticks
const myAddress = `Rmit Uni 123
latrobe st
melbourne is ${myAssignmentRecord.as1Score}'s Address`;
console.log(myAddress);
const Mydetails = `hello, i am ${myName}, i live in ${myStudentRecord.city}`;
console.log(Mydetails);

const student1 = "pop";
const student2 = "lop";
const student3 = "simu";
const student4 = "kul";

let students = ["pop", "lop", "simu", "kul", "sos", "lol", "pol"];
// console.log("hello", students[0]);
// console.log("hello", students[1]);
// console.log("hello", students[2]);
// console.log("hello", students[3]);
console.log("array size", students.length);
for (let i = 0; i < students.length; i++) {
  console.log("value of i", i);
  console.log("hello", students[i]);
}
// let ids = [12, 13, 14, 15, 16];
// console.log(ids[2]);

// let score = 5;
// if (score > 80) {
//   console.log("hey you got HD");
//   console.log("happytime");
// } else if (score <= 80 && score > s70) {
//   console.log("sorry you get D");
// } else if (score <= 70 && score > 50) {
//   console.log("hey you passed");
// } else if (score < 50) {
//   console.log("fail");
// }

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];

console.log("shopping array size", shoppingCart.length);
let cartTotal = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  cartTotal = cartTotal + shoppingCart[i].price;
  console.log("my purchased item is", shoppingCart[i].name);
  console.log("the price is", shoppingCart[i].price);
  console.log("value of i", i);
  console.log("total so far", cartTotal);
}
if (cartTotal > 200) {
  console.log("you got 10% off");
}
