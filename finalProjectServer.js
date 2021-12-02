var express = require('express');
var app = express();

var order;
var counter=0;
var card1, card2,match;
var matchesNeeded=6;//amount of matches needed to win, changes by difficulty
var currentMatches=0;
var win;
app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);
    
    
    if (z['action']=='createDeck'){
   
        order=prepareDeck(z['numberOfCards']);
        var jsontext =JSON.stringify({
            'action':'createDeck',
            'msg': 'new Deck generated.'
        });
        
        res.send(jsontext)
    }
    else if(z['action']=='selectCard'){    
        counter++
        img=order[parseInt((z['cardId'])-1)];
        /*if this is the second card the user clicks, 
        *set it as card 2 and reset the counter
        * check if both cards are the same
        * checks if there is a win*/
        if (counter==2){
            card2=img;
            counter=0;
            returns=evaluate(card1, card2)
            match=returns[0]
            win=returns[1]
            
        }
        //if this is the first card the user clicks
        else{
            card1=img;
            match=3
        }
        
        console.log(win)
        var jsontext =JSON.stringify({
            'action':'selectCard',
            'image': img,
            'cardId':z['cardId'],
            'match':match,
            'win':win
        });
        res.send(jsontext)
    
    
        }
    



}).listen(3001)
console.log("Server is running!");

/*chooses the images that will be found in the deck
this could be changed to be more random but its not super important
*/
function prepareDeck(numberOfCards){
    //chooses the images
    images=chooseImages(numberOfCards);
    //doubles images in the array
    images=doubleArray(images)
    //shuffles the deck
    shuffle(images)
    console.log(images);
    return images
}
/*chooses images that are going to be in the deck*/
function chooseImages(numberOfCards){
    array=[];
    for (i=1;i<=numberOfCards/2;i++){array.push("./cards/img"+i+".png")}
    
    return array;

}
/*Fisher-Yates shuffle:array randomizing algorithm, found on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
randomizes the location of the images
*/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
/*duplicate every item in an array */
function doubleArray(array){
   
    var temp=[];
    
    for(var i = 0; i< array.length;++i){
      temp.push(array[i]);
      temp.push(array[i]);
    }
    array=temp
    return temp

}
/*
*evaluates if the cards match
*if they match add 1 to total matches, set match to 1, which indicates its a match
*else set match to 2
*return match to the function
*if there are enough matches, go to win
*/
function evaluate(card1, card2){
  
    if(card2==card1){
        match=1
        currentMatches++
        if (currentMatches==matchesNeeded){
            win=true
        }
    }else{match=2}
return [match, win];

}


/*stuff to work on
in general
the last card is not shown
no point system yet
server doesnt reset when you load the page(not all the values reset)

in client: 
nitpicky because of the timeout function, it is possible to click on a card while the two other cards are still up(this might not be a large issue)

*/



