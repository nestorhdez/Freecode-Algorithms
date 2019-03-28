function palindrome(str) {
  const reg = /[A-Za-z0-9]+$/;
  let arrWord = str.toLowerCase().split("").filter(val => val.match(reg));
  let word = arrWord.join('');
  let reverseWord = arrWord.reverse().join('');
  return word === reverseWord ? true : false;
}

function showResult() {
  let wordToCheck = document.querySelector('#primary-input').value;
  let result = document.querySelector('.result-container');
  let resultTrue = `<h1 class="result" id="truePalindrome">${wordToCheck} is a palindrome!</h1>`;
  let resultFalse = `<h1 class="result" id="faslePalindrome">${wordToCheck} is not a palindrome!</h1>`;

  if(palindrome(wordToCheck) && wordToCheck) {
    result.innerHTML = resultTrue;
  }else if(!palindrome(wordToCheck) && wordToCheck) {
    result.innerHTML = resultFalse;
  }else {
    result.innerHTML = '';
  }
}

document.querySelector('#checker-form').addEventListener('submit', (e) => {
  e.preventDefault();
  showResult();
});