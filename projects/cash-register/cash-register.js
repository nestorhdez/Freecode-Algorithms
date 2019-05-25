let changeDueTotal;

const coinValue = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.10,
  QUARTER: 0.25,
  ONE: 1.00,
  FIVE: 5.00,
  TEN: 10.00,
  TWENTY: 20.00,
  "ONE HUNDRED": 100.00
}

const sumAmountOfMoney = (cid) => {
  let total = 0;
  cid.map( val => total += val[1]);
  return total;
}

const setChangeDue = (price, cash) => {
  return (cash - price);
}

const checkCashRegister = (price, cash, cid) => {
  changeDueTotal = setChangeDue(price, cash);
  if(sumAmountOfMoney(cid) < changeDueTotal){
    return {status: 'INSUFFICIENT_FUNDS', change: []};
  }else if(sumAmountOfMoney(cid) === changeDueTotal) {
    return {status: 'CLOSED', change: cid};
  }else {
    return changeToReturn( cid.reverse() );
  }
}

const changeToReturn = (cid) => {
  let change = [];
  cid.forEach( coin => change.push( changePerCoin(coin) ) );
  return sumAmountOfMoney(change) < changeDueTotal ? {status: 'INSUFFICIENT_FUNDS', change: []} : {status: 'OPEN', change: change.filter(val => val[1])};
}

const changePerCoin = (coinArray) => {
  let amountOfMoney = coinArray[1];
  let currencyUnit = coinArray[0];
  if(coinValue[currencyUnit] > changeDueTotal || amountOfMoney == 0) {
    return [currencyUnit, 0];
  }else if(changeDueTotal === amountOfMoney) {
    changeDueTotal -= amountOfMoney;
    return coinArray;
  }else {
    let amountToReturn = 0;
    if(changeDueTotal > 0){
      while(amountToReturn <= changeDueTotal) {
        if( ( amountToReturn + coinValue[currencyUnit] ).toFixed(2) > changeDueTotal  || amountToReturn >= amountOfMoney ) {
          break;
        }
        amountToReturn += coinValue[currencyUnit];
      }
    }
    changeDueTotal = Number.parseFloat((changeDueTotal - amountToReturn).toFixed(2));
    return [currencyUnit, amountToReturn];
  }
}


// TESTS

// should return an object.
// console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
// console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
// console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

//should return {status: "INSUFFICIENT_FUNDS", change: []}.
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))

//should return {status: "INSUFFICIENT_FUNDS", change: []}.
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))

// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))