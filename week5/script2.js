let z = 10;
let x = 20;

// declaring or defining a function
function add(z, x) {
  let v = z + x;
  console.log("value of v", v);
  return v;
}

// calling of a function
let sum = add(z, x);
console.log("value of sum", sum);
let sum2 = add(65, 73);
let sum3 = add(359999, 450000);

let balance = subtract(z, x);
function subtract(z, x) {
  let b = z - x;
  console.log("value of b", b);
  return b;
}

function greet(name) {
  let newName = name.toUpperCase();
  let msg = "";
  if (newName === "Gavin") {
    msg = "Hello " + newName;
  } else {
    msg = "Who r u";
  }
  console.log(msg);
  return newName;
}
let name = "Gavin";
greet(name);

greet("Sarah");
