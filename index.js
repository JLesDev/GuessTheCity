
// globalThis.cities = ["Brisbane", ];

globalThis.cities2 = {};
globalThis.cities = new Map;

cities.set('Brisbane', ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png']);
cities.set('Hobart', ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png']);
cities.set('Zhaoqing', ['https://i.ibb.co/tMxvBR0Y/zhaoqing1.png','https://i.ibb.co/fV9fLQ9R/zhaoqing2.png','https://i.ibb.co/N2mFL4vJ/zhaoqing3.png']);
cities.set('New York City', ['https://i.ibb.co/d0WsKfhw/newyork1.png','https://i.ibb.co/CphdpH5M/newyork2.png','https://i.ibb.co/htgtSDw/newyork3.png']);
// Add key-value pairs to the map
cities2['Brisbane'] = ['https://i.ibb.co/Q3zzC6fJ/brisbane1.png', 'https://i.ibb.co/8nMSBM6R/brisbane2.png', 'https://i.ibb.co/27Z5DPt4/brisbane3.png'];
cities2['Hobart'] = ['https://i.ibb.co/FbDfFs7K/hobart1.png','https://i.ibb.co/LhsySHmF/hobart2.png','https://i.ibb.co/G4PJkKxP/hobart3.png'];
cities2['Zhaoqing'] = ['','',''];

function onLoad(){
    globalThis.city = "";
    globalThis.guesses = 0;
    var rands = Math.random();

    console.log("loaded...");
    console.log(rands);
    if(rands > 0.75 && rands < 1){
        city = "Brisbane"
        console.log("Brisbane...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.5 && rands < 0.5){
        city = "Hobart"
        console.log("Hobart...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0.25 && rands < 0.5){
        city = "Zhaoqing"
        console.log("Zhaoqing...");
        console.log(city);
        //document.getElementById('theGuess').src = "https://i.imgur.com/y2UyjhU.png";
    }
    else if (rands > 0 && rands < 0.25){
        city = "New York City"
        console.log("New York City...");
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

function nextGuess(){
    if(guesses == 3){
        alert("Game Over!");
        location.reload();
        onLoad();
    }
    else{
        console.log(cities.get(city, guesses)[guesses]);
        document.getElementById('theGuess').src = cities.get(city, guesses)[guesses];
    }
}

function check(){
    guesses = guesses + 1;
    var query = document.getElementById('test').value;
    console.log("Checking");
    console.log(query);
    console.log(getCity());
    if(query === city){
        alert("Correct");
        location.reload();
        onLoad();
    }
    else{
        var guessVar = "guess" + guesses;
        // document.getElementById('guess1').value = "❌";
        document.getElementById(guessVar).innerHTML = "❌";
        alert("Wrong");
    }
    nextGuess();

}
