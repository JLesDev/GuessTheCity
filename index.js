globalThis.won = 0;
globalThis.cities2 = {};
globalThis.cities = new Map;

cities.set('Brisbane', ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png']);
cities.set('Hobart', ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png']);
cities.set('Zhaoqing', ['https://i.ibb.co/tMxvBR0Y/zhaoqing1.png','https://i.ibb.co/fV9fLQ9R/zhaoqing2.png','https://i.ibb.co/N2mFL4vJ/zhaoqing3.png']);
cities.set('New York City', ['https://i.ibb.co/d0WsKfhw/newyork1.png','https://i.ibb.co/CphdpH5M/newyork2.png','https://i.ibb.co/htgtSDw/newyork3.png']);
cities.set('Adelaide', ['https://i.ibb.co/2YyKtSBj/adelaide1.png','https://i.ibb.co/pBdPL1Ym/adelaide2.png','https://i.ibb.co/67MHdGHY/adelaide3.png']);
cities.set('Perth', ['https://i.ibb.co/HLHCPjhL/perth1.png','https://i.ibb.co/nMdnq073/perth2.png','https://i.ibb.co/7xH4mRS2/perth3.png']);

cities2['Brisbane'] = ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png'];
cities2['Hobart'] = ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png'];
cities2['Zhaoqing'] = ['','',''];

function onLoad(){
    globalThis.city = "";
    globalThis.guesses = 0;
    var rands = Math.random();

    console.log("loaded...");
    console.log(rands);
    if(rands > 0.82 && rands < 1){
        city = "Brisbane"
        console.log("Brisbane...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.67 && rands < 0.82){
        city = "Hobart"
        console.log("Hobart...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.5 && rands < 0.67){
        city = "Zhaoqing"
        console.log("Zhaoqing...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.33 && rands < 0.5){
        city = "New York City"
        console.log("New York City...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.16 && rands < 0.33){
        city = "Adelaide"
        console.log("Adelaide...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0 && rands < 0.16){
        city = "Perth"
        console.log("Perth...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else{
        city = "Adelaide"
        console.log("Adelaide...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    document.getElementById('theGuess').src = cities.get(city, guesses)[guesses];
}

window.onload = function() {
    onLoad();
  };

function getCity(){
    console.log("City: " + document.getElementById('theGuess').src);
    if(document.getElementById('theGuess').src === "http://127.0.0.1:5500/THIS%20IS%20HOBART.png"){
        return "Hobart";
    }
    else if (document.getElementById('theGuess').src === "http://127.0.0.1:5500/THIS%20IS%BRISBANE.png"){
        return "Brisbane";
    }
    // else{
    //     return "Zhaoqing";
    // }
    
    return "";
}

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
        document.getElementById('next-steps').innerHTML = "Do not get complacent. Do not rest. I'm proud of you, even for the little wins.";
    }
    else{
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
    console.log(getCity());
    if(query.toLowerCase() === city.toLowerCase()){
        // alert("Correct");
        won = 1;
        Splash("Correct");
        // location.reload();
        // onLoad();
    }
    else{
        var guessVar = "guess" + guesses;
        // document.getElementById('guess1').value = "❌";
        document.getElementById(guessVar).innerHTML = "❌";
        Splash("Wrong");
    }
    nextGuess();

}
