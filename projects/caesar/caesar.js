function rot13(str) {
    const arrWords = str.split(' ');
    const abc = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const cipherStr = [];
    arrWords.forEach((word, i) => {
      const arrWord = word.toUpperCase().split('');
      const cipherWord = [];
      arrWord.forEach(charac => {
        if(abc.indexOf(charac) !== -1) {
          cipherWord.push(abc[abc.indexOf(charac) < 13 ? abc.indexOf(charac) + 13 : abc.indexOf(charac) - 13]);
        } else {
          cipherWord.push(charac);
        }
      });
      cipherStr.push(cipherWord.join(''), i == arrWords.length - 1 ? '' : ' ');
    });
    return cipherStr.join('');
}

function showResult() {
    let textToCipher = document.querySelector('#primary-input').value;
    let resultContainer = document.querySelector('.result-container');
    let result = `<h1 class="result" id="truePalindrome">${rot13(textToCipher)}</h1>`;
  
    if(textToCipher) {
      resultContainer.innerHTML = result;
    }else {
      resultContainer.innerHTML = '';
    }
  }

  document.querySelector('#check-btn').addEventListener('click', (e) => {
    e.preventDefault();
    showResult();
  });