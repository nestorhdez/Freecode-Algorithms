function telephoneCheck(str) {
    if(str.match(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/) !== null) {
      return true;
    }else{
      return false;
    };
  }

  function showResult() {
    let phoneToCheck = document.querySelector('#primary-input').value;
    let result = document.querySelector('.result-container');
    let resultTrue = `<h1 class="result" id="truePalindrome">${phoneToCheck} is valid!</h1>`;
    let resultFalse = `<h1 class="result" id="faslePalindrome">${phoneToCheck} is not valid!</h1>`;
  
    if(telephoneCheck(phoneToCheck)) {
      result.innerHTML = resultTrue;
    }else if(!telephoneCheck(phoneToCheck)) {
      result.innerHTML = resultFalse;
    }else {
      result.innerHTML = '';
    }
  }
  
  document.querySelector('#checker-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showResult();
  });