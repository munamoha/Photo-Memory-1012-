//set required node.js stuff
const express = require('express');
const app = express();
const fs = require('fs');
//leaderboard file stuff
var rawdata=fs.readFileSync('./leaderboard.json');
var leaderboard = JSON.parse(rawdata);

//set all the variables
var counter=0, currentMatches=0, misses=0;
var card1, card2, match, win, order;
var matchesNeeded=6;//amount of matches needed to win, changes by difficulty



app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);
    
    
    if (z['action']=='createDeck'){

        refresh()//refreshes all values that need to be rest
        //prepares the deck, and preps for the difficulty
        setMatches(z['difficulty'])
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
            if(duplicateCheck!=z['cardId']){
            returns=evaluate(card1, card2)
            match=returns[0]
            win=returns[1]
            }else{
                misses++
                match=2;
            }
            
        }
        //if this is the first card the user clicks
        else{
            duplicateCheck=z['cardId']
            card1=img;
            match=3
        }
        
        console.log(win)
        if(win)
            var jsontext =JSON.stringify({
                //since it wins, it calls for playerData for leaderboard
                'action':'playerData',
                'image': img,
                'cardId':z['cardId'],
            });
        else{
            var jsontext =JSON.stringify({
                'action':'selectCard',
                'image': img,
                'cardId':z['cardId'],
                'match':match,
                'misses':misses
        });}
        res.send(jsontext)
    
    
        }
    else if(z['action']=='show'){
        var jsontext =JSON.stringify({
            'action':'show',
            'array':order
        });
        res.send(jsontext)
    }
    else if(z['action']=='win'){//when win add the stuff to leaderboard stuff
        playerData={'name':z['name'],'misses':z['misses'],'difficulty':z['difficulty']}

        //inputs the player's info into the leaderboard
        leaderboard.push(playerData)

        //updates the leaderboard
        var data = JSON.stringify(leaderboard);
        fs.writeFileSync('leaderboard.json', data);

        //prepares the displayed leaderboard
        display=prepLeaderboard(playerData)
        console.log(display)
        var jsontext =JSON.stringify({
            'action':'win',
            'leaderboard': display,
            'player':playerData,

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
function evaluate(card1, card2,duplicateCheck){
    
    if(card2==card1){
        match=1;
        currentMatches++;
        if (currentMatches==matchesNeeded){
            win=true;
        }
    }else{
        misses++
        match=2}
return [match, win];

}
/*function refreshes all values that need to be refreshed whenever the page gets loaded/ a new deck gets created
*/
function refresh(){
    match=null,card1=null,card2=null,win=null;
    currentMatches=0;
    misses=0;
}
/*
*prepares the leaderboard
*sorts the leaderboard
*adds the players result
 */
function prepLeaderboard(playerData){
    
    leaderboardToDisplay=sortleaderboard(leaderboard,playerData['difficulty']);
    
    return(leaderboardToDisplay)
    

}
function sortleaderboard(array,difficulty){
    var sortedList=[];//original list, keeps the order of the dictionary
    var arrayByDifficulty=[];

    for(i=0;i<array.length;i++){
        if(array[i]['difficulty']==difficulty){
        arrayByDifficulty.push(array[i]);
        }
    }console.log(arrayByDifficulty)

    var sortedArray=[]//the sorted array
    for(i=0;i<arrayByDifficulty.length;i++){
        sortedList.push(arrayByDifficulty[i]['misses'])
    }
  
    sortedList.sort(function(a, b){return a - b});
    console.log(sortedList+'list')
    for(i=0;i<sortedList.length;i++){
        for(j=0;j<sortedList.length;j++){
            if(sortedList[i]==arrayByDifficulty[j]['misses']){
                sortedArray.push(arrayByDifficulty[j])
                //this prevents duplicates
                arrayByDifficulty[j]='filler'
            }
        } 
    }
   return sortedArray
}
function setMatches(difficulty){
    switch(difficulty){
        case 'easy':
            matchesNeeded=6;
            break;
        case 'medium':
            matchesNeeded=9;
            break;
        case 'hard':
            matchesNeeded=12;
            break;
    }

    }




/*stuff to work on
in general
the last card is not shown
no point system yet
in client: 
nitpicky because of the timeout function, it is possible to click on a card while the two other cards are still up(this might not be a large issue)

*/





