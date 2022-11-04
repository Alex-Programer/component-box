var button = document.getElementById("buttons");
var result = document.getElementById("result");
var num1 = "";
var num2 = "";
var symbol = "";

var hasNotPoint = function (target) {
  return target.toString().indexOf(".") === -1;
};

button.onclick = function (e) {
  var content = e.target.innerText;
  if (content === "") return;

  if (isNaN(Number(content))) {
    if (content === ".") {
      if (symbol === "") {
        if (num1 !== "" && hasNotPoint(num1)) num1 = num1 + ".";
      } else {
        if (num2 !== "" && hasNotPoint(num2)) num2 = num2 + ".";
      }
    } else if (content === "C") {
      num1 = "";
      num2 = "";
      symbol = "";
      result.innerHTML = "";
    } else if (content === "=") {
      if (symbol === "") return;

      var n1 = Number(num1);
      var n2 = Number(num2);
      var r = 0;

      switch (symbol) {
        case "+":
          r = n1 + n2;
          break;
        case "-":
          r = n1 - n2;
          break;
        case "*":
          r = n1 * n2;
          break;
        case "/":
          r = n1 / n2;
          break;
      }

      result.innerHTML = hasNotPoint(r) ? r : r.toFixed(2);
      symbol = "";
    } else {
      symbol = content;

      if (result.innerHTML !== "" && num2 !== "") {
        num1 = result.innerHTML;
        num2 = "";
      }
    }
  } else {
    if (num1 !== "" && num2 !== "" && symbol === "") {
      num1 = content;
      num2 = "";
    } else {
      if (symbol === "") {
        num1 += content;
      } else {
        num2 += content;
      }
    }
  }
};
