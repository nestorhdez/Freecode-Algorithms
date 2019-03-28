function convertToRoman(num) {
    let romLetters = [['I', 'V', 'X'], ['X', 'L', 'C'], ['C', 'D', 'M'], ['M']];
    let romanNumber = []
    breakNumber(num).forEach((val, i) => {
      romanNumber.unshift(convert(val, romLetters[i], i));
    });
    return romanNumber.join('').replace(/,/g,"");
  }
  
  function breakNumber(num) {
    let numToArr = num.toString().split('').reverse();
    let breakedNum = numToArr.map((val, i) => {
      let valArr = [];
      while(val > 0) {
        valArr.push(1);
        val--;
        }
      return valArr;
    });
    return breakedNum;
  }
  
  function convert(numArr, romArr, i) {
    let roman = [];
    if(i >= 3) {
      numArr.forEach(val => roman.push('M'));
    } else {
      numArr.forEach((val, i) => {
        switch(i) {
          case 3: roman.splice(0, 2); roman.push(romArr[1]);
            break;
          case 4: roman.shift();
            break;
          case 8: roman.splice(0, 3); roman.push(romArr[2]);
            break;
          default:
            roman.push(romArr[0]);
         }
      });
    }
    return roman;
  }

  function showResult() {
    let numberToCheck = document.querySelector('#primary-input').value;
    let resultContainer = document.querySelector('.result-container');
    let result = `<h1 class="result" id="truePalindrome">${convertToRoman(numberToCheck)}</h1>`;
  
    if(numberToCheck) {
      resultContainer.innerHTML = result;
    }else {
      resultContainer.innerHTML = '';
    }
  }

  document.querySelector('#checker-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showResult();
  });