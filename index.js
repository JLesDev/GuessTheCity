globalThis.won = 0;
globalThis.city = "";
globalThis.guesses = 0;

// globalThis.cities = new Map;
// cities.set('Brisbane', ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png']);
// cities.set('Hobart', ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png']);
// cities.set('Zhaoqing', ['https://i.ibb.co/tMxvBR0Y/zhaoqing1.png','https://i.ibb.co/fV9fLQ9R/zhaoqing2.png','https://i.ibb.co/N2mFL4vJ/zhaoqing3.png']);
// cities.set('New York City', ['https://i.ibb.co/d0WsKfhw/newyork1.png','https://i.ibb.co/CphdpH5M/newyork2.png','https://i.ibb.co/htgtSDw/newyork3.png']);
// cities.set('Adelaide', ['https://i.ibb.co/2YyKtSBj/adelaide1.png','https://i.ibb.co/pBdPL1Ym/adelaide2.png','https://i.ibb.co/67MHdGHY/adelaide3.png']);
// cities.set('Perth', ['https://i.ibb.co/HLHCPjhL/perth1.png','https://i.ibb.co/nMdnq073/perth2.png','https://i.ibb.co/7xH4mRS2/perth3.png']);
// cities.set('Dublin', ['https://i.ibb.co/JRKHQfVv/dublin1.png','https://i.ibb.co/r28dMr5f/dublin2.png','https://i.ibb.co/zHXNnCZQ/dublin3.png']);

async function getCities(){
    // const baseURL = window.location.origin;
    // const requestURL = baseURL + "/GuessTheCity/cities.json";
    // For local hosting: 
    const requestURL = "http://127.0.0.1:5500/cities.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    let citiesJSON = await response.json();
    return  citiesJSON["cities"];
}

async function onLoad(){
    try {
        globalThis.cityL = await getCities();

        globalThis.rands = Math.floor(Math.random() * cityL.length);

        city = cityL[rands];
        // For debugging: console.log("Loaded city:", city);

        document.getElementById('theGuess').src = cityL[rands].Links[guesses];// cities.get(city)[guesses];
        console.log("Loaded...");
    } catch (error) {
        console.error("Error loading cities:", error);
    }  
}

window.onload = () => {
    callOnLoad();
};

function callOnLoad() {
    onLoad()
        .then(() => console.log("Load success."))
        .catch((error) => console.error("Error loading: ", error));
}

function hideSplash(){
    let splash = document.getElementById('splash');
    splash.style.visibility = 'hidden';
    if(won == 1){
        location.reload();
        callOnLoad();
    }
}

function nextGuess(){
    // Debugging only: console.log(cities.get(city, guesses)[guesses]);
    document.getElementById('theGuess').src = cityL[rands].Links[guesses];
    // Old: document.getElementById('theGuess').src = cities.get(city, guesses)[guesses];

}

function Splash(right){
    let splash = document.getElementById('splash');
    splash.style.visibility = 'visible';
    if(right == "Correct"){
        document.getElementById('splash-text').innerHTML = "You got the answer right.";
        document.getElementById('startButton').innerHTML = "Play again";
        document.getElementById('give-up').innerHTML = "";
        // document.getElementById('theGuess').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_98g-kjCxQC58dPg8zioLJj1KaVmir1v0Fw&s";
        splash.style.height = "18rem";
        document.getElementById('next-steps').innerHTML = "Do not get complacent. Do not rest. I'm proud of you, even for the little wins.";
    }
    else{
        splash.style.height = "20rem";
        document.getElementById('splash-text').innerHTML = "You got the answer wrong.";
        document.getElementById('startButton').innerHTML = "Continue";
        document.getElementById('test').innerHTML = "";
        document.getElementById('test').placeholder = "Enter answer...";
        document.getElementById('give-up').innerHTML = "Give Up.";
        document.getElementById('next-steps').innerHTML = "Take a deep breath. Think harder next time. No room for error.";
    }
}

function check(){
    guesses = guesses + 1;
    if(guesses == 3){
        location.reload();
        callOnLoad();
    }
    var query = document.getElementById('test').value;
    console.log("Checking");
    console.log(query);
    //console.log(city.toString().toLowerCase());
    var guessVar = "guess" + guesses;
    if(query.toString().toLowerCase() == cityL[rands].City.toString().toLowerCase()){
        document.getElementById(guessVar).innerHTML = "✅";
        won = 1;
        Splash("Correct");
        nextGuess();
        return;
    }
    else{
        document.getElementById(guessVar).innerHTML = "❌";
        if(guesses == 1){
            Splash("Wrong");
            nextGuess();
            return;
        }
    }
}

// document.addEventListener("keyup", (e) => {
//     let pressedKey = String(e.key);
//     if (pressedKey == "r") {
//       location.reload();
//       callOnLoad();
//       return;
//     }
  
//     if (pressedKey == "Enter") {
//       check();
//       return;
//     }
//   });
