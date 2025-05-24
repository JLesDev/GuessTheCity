function onLoad(){
    globalThis.city = "";
    var rands = Math.random();
    console.log("loaded...");
    console.log(rands);
    if(rands > 0.7 && rands < 1){
        city = "Brisbane"
        console.log("Brisbane...");
        console.log(city);
        document.getElementById('theGuess').src = "/THIS IS BRISBANE.png";
    }
    else if (rands > 0.4 && rands < 0.7){
        city = "Hobart"
        console.log("Hobart...");
        console.log(city);
        document.getElementById('theGuess').src = "/THIS IS HOBART.png";
    }
    else if (rands > 0 && rands < 0.4){
        city = "Zhaoqing"
        console.log("Zhaoqing...");
        console.log(city);
        document.getElementById('theGuess').src = "/THIS IS ZHAOQING.png";
    }
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

function check(){
    
    var query = document.getElementById('test').value;
    console.log("Checking");
    console.log(query);
    console.log(getCity());
    if(query === city){
        alert("Correct");
    }
    else{
        alert("Wrong");
    }

}