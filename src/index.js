// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const INPUT_BOX = "InputBox";
const MODE_PLUS = "plus";
const MODE_MINUS = "minus";
const MODE_MULTIPLY = "multiply";
const MODE_DIVIDE = "divide";
const MODE_CLEARED = "";
const myCal = document.querySelector("div");
const aButtons = myCal.querySelectorAll("div");
let gMyBrain = 0;
let gMode = MODE_CLEARED;
let gRightAfterPushedFunctionKey = false;
// let gFunctionMode = false;
function init() {
  paintCal();
  registerEvents();
}

function paintCal() {
  aButtons[0].appendChild(createInputBox(INPUT_BOX));
  aButtons[0].appendChild(createButton("Clear", "C"));

  aButtons[1].appendChild(createButton("B7", 7));
  aButtons[1].appendChild(createButton("B8", 8));
  aButtons[1].appendChild(createButton("B9", 9));
  aButtons[1].appendChild(createButton("plus", "+"));

  aButtons[2].appendChild(createButton("B4", 4));
  aButtons[2].appendChild(createButton("B5", 5));
  aButtons[2].appendChild(createButton("B6", 6));
  aButtons[2].appendChild(createButton("minus", "-"));

  aButtons[3].appendChild(createButton("B1", 1));
  aButtons[3].appendChild(createButton("B2", 2));
  aButtons[3].appendChild(createButton("B3", 3));
  aButtons[3].appendChild(createButton("multiply", "*"));

  aButtons[4].appendChild(createButton("B0", 0));
  aButtons[4].appendChild(createButton("equal", "="));
  aButtons[4].appendChild(createButton("/", "/"));
}

function registerEvents() {
  //## number keys
  for (let i = 0; i < 10; i++) {
    document
      .querySelector(`#B${i}`)
      .addEventListener("click", handlePushDownNumKey); // 7
  }

  //## function keys
  aButtons[0].children[1].addEventListener("click", handleClear); // C
  aButtons[1].children[3].addEventListener("click", handlePlus); // +
  aButtons[2].children[3].addEventListener("click", handleMinus); // -
  aButtons[3].children[3].addEventListener("click", handleMultiply); // *
  aButtons[4].children[2].addEventListener("click", handleDivide); // /

  //## get result key "="
  aButtons[4].children[1].addEventListener("click", handleEqual); // =
}

//## function key
function handleClear() {
  const oInputBox = document.querySelector(`#${INPUT_BOX}`);
  oInputBox.value = "";
  gMyBrain = 0;
  gMode = MODE_CLEARED;
  gRightAfterPushedFunctionKey = false;
}

function handlePlus() {
  handleMode(MODE_PLUS);
}

function handleMinus() {
  handleMode(MODE_MINUS);
}

function handleMultiply() {
  handleMode(MODE_MULTIPLY);
}

function handleDivide() {
  handleMode(MODE_DIVIDE);
}

function handleMode(pMODE) {
  const oInputBox = document.querySelector(`#${INPUT_BOX}`);
  const currentNumber = oInputBox.value;
  if (gRightAfterPushedFunctionKey) {
    // click just function key twice
    return false;
  }
  if (gMode === MODE_CLEARED) {
    gMyBrain = currentNumber;
    gMode = pMODE;
    gRightAfterPushedFunctionKey = true;
  } else {
    gMode = pMODE;
    showNumOnInputBox(calculate(oInputBox.value, gMode));
    gMyBrain = 0;
    gRightAfterPushedFunctionKey = true;
  }
  console.log("pMODE", pMODE);
  console.log("gRightAfterPushedFunctionKey", gRightAfterPushedFunctionKey);
}

function handleEqual() {
  gRightAfterPushedFunctionKey = true;
  const oInputBox = document.querySelector("#InputBox");
  showNumOnInputBox(calculate(oInputBox.value, gMode));

  gMyBrain = 0;
  gMode = MODE_CLEARED;
  gRightAfterPushedFunctionKey = true;
}

function calculate(pNewNum, pMODE) {
  const num1 = gMyBrain;
  const num2 = pNewNum;
  let result = 0;
  switch (pMODE) {
    case MODE_PLUS:
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case MODE_MINUS:
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case MODE_MULTIPLY:
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case MODE_DIVIDE:
      if (parseFloat(num1) === 0) {
        return 0;
      }
      result = parseFloat(num1) / parseFloat(num2);
      break;

    default:
      break;
  }

  return result;
}

function showNumOnInputBox(pNum) {
  const oInputBox = document.querySelector("#InputBox");
  oInputBox.value = pNum;
}

// ###################################
function createButton(pId, pTxt) {
  const btn = document.createElement("button");
  btn.innerHTML = pTxt;
  btn.id = pId;
  btn.setAttribute("ID", pId);
  return btn;
}

function createInputBox(pId) {
  const input = document.createElement("input");
  input.id = pId;
  return input;
}

function handlePushDownNumKey(e) {
  const oInputBox = document.querySelector("#InputBox");
  const pushedNum = e.target.innerText;
  const previousNum = oInputBox.value;
  const newNum = previousNum.concat(pushedNum);
  if (gRightAfterPushedFunctionKey) {
    oInputBox.value = pushedNum;
    gMyBrain = previousNum;
    gRightAfterPushedFunctionKey = false;
  } else {
    oInputBox.value = newNum;
  }
}

//
init();