globalThis.won = 0;
globalThis.cities = new Map;

async function getCities(){
    const baseURL = window.location.origin;
    const requestURL = baseURL + "/GuessTheCity/cities.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    let citiesJSON = await response.json();
    citiesList = citiesJSON["cities"];
    return citiesList
}


cities.set('Brisbane', ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png']);
cities.set('Hobart', ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png']);
cities.set('Zhaoqing', ['https://i.ibb.co/tMxvBR0Y/zhaoqing1.png','https://i.ibb.co/fV9fLQ9R/zhaoqing2.png','https://i.ibb.co/N2mFL4vJ/zhaoqing3.png']);
cities.set('New York City', ['https://i.ibb.co/d0WsKfhw/newyork1.png','https://i.ibb.co/CphdpH5M/newyork2.png','https://i.ibb.co/htgtSDw/newyork3.png']);
cities.set('Adelaide', ['https://i.ibb.co/2YyKtSBj/adelaide1.png','https://i.ibb.co/pBdPL1Ym/adelaide2.png','https://i.ibb.co/67MHdGHY/adelaide3.png']);
cities.set('Perth', ['https://i.ibb.co/HLHCPjhL/perth1.png','https://i.ibb.co/nMdnq073/perth2.png','https://i.ibb.co/7xH4mRS2/perth3.png']);
cities.set('Dublin', ['https://i.ibb.co/JRKHQfVv/dublin1.png','https://i.ibb.co/r28dMr5f/dublin2.png','https://i.ibb.co/zHXNnCZQ/dublin3.png']);

function onLoad(){
    globalThis.city = "";
    globalThis.guesses = 0;
    // var citiesList = ["Brisbane","Hobart", "Zhaoqing", "New York City", "Adelaide", "Perth", "Dublin"];
    var rands = Math.floor(Math.random()*7);
    console.log(rands);
    // cityL = getCities().await();
    // city = cityL[rands];
    try {
        const cityL = await getCities();

        const rands = Math.floor(Math.random() * cityL.length);
        console.log(rands);

        city = cityL[rands];
        console.log("Loaded city:", city);

        document.getElementById('theGuess').src = cities.get(city)[guesses];
    } catch (error) {
        console.error("Error loading cities:", error);
    }
    console.log("loaded...");
    //document.getElementById('theGuess').src = cities.get(city, guesses)[guesses];
}

window.onload = function() {
    onLoad();
  };

function hideSplash(){
    let splash = document.getElementById('splash');
    splash.style.visibility = 'hidden';
    if(won == 1){
        location.reload();
        onLoad();
    }
}

function nextGuess(){
    if(guesses == 3){
        location.reload();
        onLoad();
    }
    else{
        console.log(cities.get(city, guesses)[guesses]);
        document.getElementById('theGuess').src = cities.get(city, guesses)[guesses];
    }
}

function Splash(right){
    let splash = document.getElementById('splash');
    splash.style.visibility = 'visible';
    if(right == "Correct"){
        document.getElementById('splash-text').innerHTML = "You got the answer right.";
        document.getElementById('startButton').innerHTML = "Play again";
        document.getElementById('give-up').innerHTML = "";
        splash.style.height = "18rem";
        document.getElementById('next-steps').innerHTML = "Do not get complacent. Do not rest. I'm proud of you, even for the little wins.";
    }
    else{
        splash.style.height = "20rem";
        document.getElementById('splash-text').innerHTML = "You got the answer wrong.";
        document.getElementById('startButton').innerHTML = "Continue";
        document.getElementById('give-up').innerHTML = "Give Up.";
        document.getElementById('next-steps').innerHTML = "Take a deep breath. Think harder next time. No room for error.";
    }
}

function check(){
    guesses = guesses + 1;
    var query = document.getElementById('test').value;
    console.log("Checking");
    console.log(query);
    if(query.toLowerCase() === city.toLowerCase()){
        document.getElementById(guessVar).innerHTML = "✅";
        won = 1;
        Splash("Correct");
    }
    else{
        var guessVar = "guess" + guesses;
        document.getElementById(guessVar).innerHTML = "❌";
        Splash("Wrong");
    }
    nextGuess();

}
