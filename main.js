var result = document.getElementById("result");
var arrayNum = ["0","1","2","3","4","5","6","7","8","9"];
var arrayOpeDeci = ["+","-","*","/","."];
var arrayOpe = ["+","-","*","/"];
if (result.value == "0") {
 var mode = "integer_mode";
 var resetResult = 0;
}

function allClear() {
  result.value = "0";
  mode = "integer_mode";
  resetResult = 0;
}

function edit(elem) {
  /*「＝」を直前に入力していた場合resultをリセットする*/
  if (resetResult == 1) {
    result.value = "";
    resetResult = 0;
  }
  /*小数点複数使用禁止*/
  if (elem.value == ".") {
    if (mode == "decimal_mode") {
      mode = "integer_mode";
    } else {
      mode = "decimal_mode";
    }
  }
  if (arrayOpe.includes(elem.value)) {
    mode = "integer_mode"; //四則演算子入力されたら小数点モード解除//
  }
  /*四則演算子の連続入力禁止*/
  if (arrayOpe.includes(result.value.slice(-1))) {
    if (arrayOpe.includes(elem.value)) {
      result.value = result.value.slice(0,-1);
    }
  }
  /*前ゼロの処理(初期値0のとき)*/
  if (result.value == "0") {
    if (arrayOpeDeci.includes(elem.value)) {
      ; //処理なし//
    } else if (elem.value == "00") {
      elem.value = ""; //「00」は入力禁止//
    } else {
      result.value = result.value.slice(0,-1);
    }
  }
  /*前ゼロの処理(四則演算子の直後)*/
  if (arrayOpe.includes(result.value.substr(-2,1))) {
    if (result.value.slice(-1) == "0") {
      if (elem.value == "00") {
        elem.value = ""; //「四則演算子＋「0」」の後「00」は入力禁止//
      } else if (arrayNum.includes(elem.value)) {
        result.value = result.value.slice(0,-1);
      } else {
        ;
      }
    }
  }
  /*入力値を結果表示に足す*/
  result.value += elem.value;
  /*小数点の制御*/
  if (mode == "integer_mode" && result.value.slice(-1) == ".") {
    result.value = result.value.slice(0,-1);
    mode = "decimal_mode";
  }
  /*「四則演算子＋「00」」の場合、「四則演算子＋「0」」に修正*/
  if (arrayOpe.includes(result.value.substr(-3,1))) {
    if (result.value.slice(-2) == "00") {
      result.value = result.value.slice(0,-1);
    }
  }
  /*「00」を要素に戻す*/
  if (elem.value == "") {
    elem.value = "00";
  }
}

function getCalc() {
  result.value = eval(result.value);
  mode = "integer_mode";
  resetResult = 1;
}