let URL = "https://gist.githubusercontent.com/stevekinney/8334552/raw/28d6e58f99ba242b7f798a27877e2afce75a5dca/currency-symbols.json"
let data;

let symbols = async () =>{
    let response = await fetch(URL);
    data = await response.json();
    // console.log(data);
    return data;
}
(async () => {
    let symbol = await symbols();
    symbol.forEach((indexObj)=>{
        console.log(indexObj['currency']);
        console.log(indexObj['abbreviation']);
    })
    // console.log(ans); // Ab yeh properly data ko print karega
})();
symbols();


// let URL = "https://gist.githubusercontent.com/stevekinney/8334552/raw/28d6e58f99ba242b7f798a27877e2afce75a5dca/currency-symbols.json";
// let globalData;  // Global variable

// let symbols = async () => {
//     let response = await fetch(URL);
//     globalData = await response.json();  // Global variable mein store kar diya
//     return globalData;
// };

// // Function ko call karte hain aur data ko global variable mein store karte hain
// symbols();

// // Ab function ke bahar kahin bhi data ko access kar sakte hain, lekin ensure karein ke data pehle fetch ho chuka ho
// setTimeout(() => {
//     // console.log(globalData);  // Data ko thori der baad access karein, kyunki fetch async hai
//     globalData.forEach((item)=>{
//         console.log(item['currency']);
//         console.log(item['abbreviation']);
//     })
// }, 2000);  // Delay of 2 seconds to wait for the fetch to complete
