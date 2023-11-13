const baseURL = "http://numbersapi.com";
let favNumber = 19;

//1. 
async function getNumber() {
    let numFacts = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(numFacts);
  }
  getNumber();

//2.

let multiNum = [11, 13, 17]

async function getMultiNumbers() {
    let numFacts = await $.getJSON(`${baseURL}/${multiNum}?json`);
    console.log(numFacts);
  }
  getMultiNumbers();


//3. 

async function multiFacts() {
    let numFacts = await Promise.all(
        Array.from({length : 4}, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    numFacts.forEach(data => {$('body').append(`<p>${data.text}</p>`);
});
}
multiFacts()