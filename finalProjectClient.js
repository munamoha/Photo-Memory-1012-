

/*
what needs to be done:
make buttons in homepage work,

*/
var url = "http://localhost:3001/post"

var columns = 6; 
var rows = 2;
var myName="test";
var clickable=false;
var foundCards=[];
var card1, card2;
var difficulty='easy'
var misses=0;
var playerData;
var leaderboard;

window.onload = function()
{
    x=window.location.href
    
    
    if (x.slice(-13,)=='gamePage.html'){
        var playerValues = JSON.parse(sessionStorage.player); //player values from homePage
        difficulty = playerValues['difficulty'];
        myName = playerValues['name'];
        setRows();
        preperation(); //draw the game board
        //creates the deck, rows*6 is the n of cards in the deck
        deck(rows*6);
        //starts the functions to show cards
        $.post(
        url+'?data='+JSON.stringify({
        'action':'show', 
        }),
        response
    );   }
    else if((x.slice(-16,)=='leaderBoard.html')){
        var leaderboardValues = JSON.parse(sessionStorage.leaderboard); //player values from homePage
        
        displayLeaderboard(leaderboardValues['leaderboard'],leaderboardValues['playerData'])

    }
}
function updateDifficulty(d) {
    difficulty=d
    startGame(difficulty);
}
function startGame(d){
    var Name = prompt('Enter your name here:')
    sessionStorage.player = JSON.stringify({
        'name':Name,'difficulty':d 
        });
    window.location.href="./gamePage.html";


}

/* 
 * Create the game board, includes 
 * x number of rows(depending on difficulty)
 * 6 columns
 * img of cards
 */
function preperation(){
    
    //add rows
    for (var i = rows;i>0;i--){
        //for each row create a div
        var newDiv = document.createElement("div");
		// set its id and class
        $(newDiv).attr("id", "row" + i);
        $(newDiv).attr("class", "row");	
        //create a span, and set its id and class
        var newSpan = document.createElement("span");
        $(newSpan).attr("id", "row"+i+"cards");		
        $(newSpan).attr("class", "");	 
        // then add 6 columns per row and make them show the back of the card   
        for (var j = 1; j <= columns; j++){
            var newImg = document.createElement("img");		
            $(newImg).attr("src","./cards/cover.png");		
            $(newImg).attr("id", "identifier" + ((i-1)*6 + j));	
            $(newImg).attr("class", "imgColumn");	
            $(newSpan).append(newImg);
        }
        $(newDiv).append(newSpan);
        

        $("#gameboard").append(newDiv);
         
    }

}
/*function creates the deck for the game
*chooses images
*randomizes their location on the board
*/
function deck(numberOfCards){
   
    $.post(
        url+'?data='+JSON.stringify({
        'action':'createDeck', 
        'numberOfCards':numberOfCards,
        'difficulty':difficulty
        }),
        response
    );


}
function response(data){

    var res = JSON.parse(data);

    if (res['action']=='createDeck'){attemptOnOff();
    }
    else if(res['action']=='selectCard'){
        cardId=res['cardId'];
        image=res['image'];
        match=res['match'];
        misses=res['misses']
        console.log(misses)
        
        $('#identifier'+cardId).attr("src",image);
        
        
    
        if (match==3){//if there wasnt a need for a match
            card1=cardId

        }
        else if(match==2){//if they dont match
            card2=cardId
            cardList=[card1,card2]
            cover(cardList, 1000)//W
        }
        
        attemptOnOff();
    }
    else if(res['action']=='show'){
        
        show(res['array'])
        
    }
    else if(res['action']=='playerData'){
        cardId=res['cardId'];
        image=res['image'];
        
        $('#identifier'+cardId).attr("src",image);
        $.post(
            url+'?data='+JSON.stringify({
            'action':'win', 
            'name':myName,
            'difficulty':difficulty,
            'misses':misses
            }),
            response
        );
        
        
    }
    else if(res['action']=='win'){

        sessionStorage.leaderboard = JSON.stringify({
            'leaderboard':res['leaderboard'],'playerData':res['player'] 
            });
        
        
        alert("you won! Click okay to move to the leaderboard")
        window.location.assign("leaderBoard.html")

      
    }

}
function selectCard(event){
    
    attemptOnOff();
    $.post(
        url+'?data='+JSON.stringify({
        'action':'selectCard', 
        'cardId':event.data.id,
        }),
        response
    );

}
/*allows  the user to click the cards, only activates when server has returned all requests */
function attemptOnOff(){
    
    if (clickable){
        
        $(".imgColumn").off("click");
        clickable=false
    }
    else{
        for (var i = rows;i>0;i--){
            for (var j = 1; j <= columns; j++){
                $('#identifier'+((i-1)*6 + j)).click({id: (i-1)*6+j},selectCard);
        
                
    }}clickable=true;}

}
/*flips the cards after a set amount of time */
function cover(ids,time){
  
    setTimeout(function(){for(i=0;i< ids.length;i++){
        $('#identifier'+ids[i]).attr('src','./cards/cover.png');
        
    }},time)
}
function show(array){
    ids=[]
    
    console.log(array)
    for (i=0;i<array.length;i++){
        $('#identifier'+(i+1)).attr('src',array[i])
        //this sets up id's for the cover function
        ids.push(i+1)
    }
    console.log(ids)
    cover(ids,4000)
}
function displayLeaderboard(leaderboard,playerData){
    console.log("i am working")
    console.log(leaderboard)
    $('#leaderboardTable').append( '<tr><td>Name</td><td>Score</td></tr>' );

   
    for(i=0;i<leaderboard.length&&i<10;i++){
        $('#leaderboardTable').append( '<tr><td>'+leaderboard[i]['name']+'</td><td>'+leaderboard[i]['misses']+'</td></tr>' )
    }
    $('#leaderboardTable').append( '<tr id = "results"><td>Your results here:</td></tr>' );
    console.log(playerData)
    $('#leaderboardTable').append( '<tr><td>'+playerData['name']+'</td><td>'+playerData['misses']+'</td></tr>' );


}
function setRows(){
    switch (difficulty) {
        case 'easy':
            rows=2;
            break;
        case 'medium':
            rows=3;
            break;
        case 'hard':
                rows=4;
            break;
    }

}
function backHome(){
window.location.assign("homePage.html")}
/*
 *known issues:
 player cant select cards when the cards are being shown 
 */