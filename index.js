globalThis.won = 0;
globalThis.city = "";
globalThis.guesses = 0;
globalThis.snapped = false;
globalThis.guessesText = [];

async function getCities(){
    const baseURL = window.location.origin;
    const requestURL = baseURL + "/GuessTheCity/cities.json";
    // For local hosting: 
    //const requestURL = "http://127.0.0.1:5500/cities.json";
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
    return;
}

function snapMap(){
    if(snapped == false){
        // border: 3px solid rgb(0, 0, 0);
        // color: rgb(0, 0, 0);
        // background-color:rgb(231, 182, 103);
        // border: 3px solid rgb(244, 233, 215);
        // background-color: rgb(244, 233, 215);
        // color: rgb(0, 0, 0);
        document.getElementById('snapButton').style.color = "rgb(0, 0, 0)";
        document.getElementById('snapButton').style.backgroundColor = "rgb(231, 182, 103)";
        document.getElementById('snapButton').style.border = "3px solid rgb(0, 0, 0)";
        document.getElementById('theGuess').style.height = "65vh";
        document.getElementById('theGuess').style.width = "65vh";
        document.getElementById('theGuess').style.opacity = "0.5";
        document.getElementById('centeredText').innerHTML = "Guesses:<br>";
        for(let i = 0; i < guessesText.length; i++){
            document.getElementById('centeredText').innerHTML = document.getElementById('centeredText').innerHTML + guessesText[i] + "<br>";
        }
        snapped = true;
    }
    else{
        document.getElementById('snapButton').style.color = "rgb(0, 0, 0)";
        document.getElementById('snapButton').style.backgroundColor = "rgb(244, 233, 215)";
        document.getElementById('snapButton').style.border = "3px solid rgb(244, 233, 215)";
        document.getElementById('centeredText').innerHTML = "";
        document.getElementById('theGuess').style.opacity = "1";
        document.getElementById('theGuess').style.height = "auto";
        document.getElementById('theGuess').style.width = "auto";
        snapped = false;
    }
}

function copyResults(){
    let results = [];
    for(let i = 0; i < (guesses - 1); i++){
        results[i] = "❌";
    }
    //let realResults = [];
   
    navigator.clipboard.writeText("I guessed the city was " + cityL[rands].City.toString() + ". My score: " + results + "✅ | JLesDev.github.io/GuessTheCity");
    
    let copied = document.getElementById('copyButton');
    copied.style.visibility = 'visible';
    copied.innerHTML = "Copy Results";
    document.getElementById('copyButton').innerHTML = "Copied results!";
    copied.style.color = "rgb(22, 109, 55)";
    //copied.innerHTML = "Copied results: " + results;
}

function Splash(right){
    let splash = document.getElementById('splash');
    splash.style.visibility = 'visible';
    
    if(right == "Correct"){
        document.getElementById('splash-text').innerHTML = "<b>You got the answer right!</b>";
        document.getElementById('startButton').innerHTML = "Play again";
        document.getElementById('give-up').innerHTML = "";
        // document.getElementById('theGuess').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_98g-kjCxQC58dPg8zioLJj1KaVmir1v0Fw&s";
        splash.style.height = "18rem";
        
        document.getElementById('next-steps').innerHTML = "Do not get complacent. Do not rest. I'm proud of you, even for the little wins.";
    }
    else if(right == "Wrong"){
        splash.style.height = "20rem";
        document.getElementById('splash-text').innerHTML = "<b>You got the answer wrong.</b>";
        document.getElementById('startButton').innerHTML = "Continue";
        document.getElementById('test').innerHTML = "";
        document.getElementById('test').placeholder = "Enter answer...";
        document.getElementById('give-up').innerHTML = "Give Up.";
        document.getElementById('next-steps').innerHTML = "Take a deep breath. Think harder next time. No room for error.";
    }
    else{
        document.getElementById('splash-text').innerHTML = "<b>You gave up.</b> The answer was <b>" + cityL[rands].City.toString() + ".</b>";
        document.getElementById('startButton').innerHTML = "Play again";
        document.getElementById('give-up').innerHTML = "";
        splash.style.height = "18rem";
        document.getElementById('next-steps').innerHTML = "It's okay to recognise your limits. Bounce back stronger.";
        return false;
    }
    
}

function giveUp(){
    console.log("test");
    return false;
}

function check(){
    var query = document.getElementById('test').value;
    guesses = guesses + 1;
    if(guesses == 3 && query.toString().toLowerCase() != cityL[rands].City.toString().toLowerCase()){
        location.reload();
        callOnLoad();
    }
    guessesText.push(query);
    console.log("Checking");
    console.log(query);
    //console.log(city.toString().toLowerCase());
    var guessVar = "guess" + guesses;
    if(query.toString().toLowerCase() == cityL[rands].City.toString().toLowerCase()){
        document.getElementById(guessVar).innerHTML = "✅";
        won = 1;
        document.getElementById('theGuess').style.visibility = "hidden";
        Splash("Correct");
        const newButton = document.createElement('button');
        newButton.id = "copyButton";
        newButton.innerHTML = "Copy Results";
        newButton.onclick = "copyResults()";
        document.getElementById("buttonHere").appendChild(newButton);
        newButton.addEventListener('click', () => {
            copyResults();
        })
        
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
        else{
            nextGuess();
            return;
        }
    }
}
