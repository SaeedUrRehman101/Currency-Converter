const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// SYMBOLS;
let URL = "https://gist.githubusercontent.com/stevekinney/8334552/raw/28d6e58f99ba242b7f798a27877e2afce75a5dca/currency-symbols.json"
let data;
let currCodeAbbre;

let symbols = async () =>{
  let response = await fetch(URL);
  data = await response.json();
  // console.log(data);
  return data;
}

symbols();



document.addEventListener('DOMContentLoaded',()=>{

  for (let select of dropdowns) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "PKR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }

  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    // console.log(fromCurr.value)
  
    currCodeAbbre = () => {
      for(let values in data){
        if(values == 'usd'){
        // console.log(data[values])
        Object.keys(data[values]).forEach( async (items)=>{
          // console.log(items.toUpperCase())
          let abbre = items.toUpperCase();
          let symbol = await symbols();
          symbol.forEach((indexObj)=>{
              // console.log(indexObj['abbreviation']);
              if(abbre === indexObj['abbreviation']){
                if(toCurr.value === abbre){
                // console.log(indexObj['symbol'].replace(/[^0-9]/g,''))
                let currAbbre = indexObj['symbol'].replace(/[^0-9]/g,'');
                console.log(indexObj['symbol'].replace(/[^0-9]/g,''))
                // let finalAmount = amtVal * rate;
                // let currSymbol = `${String.fromCharCode(8360)}`;  country currency symbol
                msg.innerText = `${amtVal} ${fromCurr.value} = ${String.fromCharCode(currAbbre)} ${finalAmount} ${toCurr.value}`;
                }
              }
              else if(!abbre === indexObj['abbreviation']){
                msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
              }
          })
        })
        }
        else{
          msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        }
      }
    };
  
    currCodeAbbre();
  };

  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    currCodeAbbre();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });

})



