

/*
what needs to be done:
make buttons in homepage work,

*/
var url = "http://localhost:3001/post"

var columns = 6; 
var rows = 2;
var myName;
var clickable=false;
var foundCards=[];
var card1, card2;

window.onload = function()
{

    preperation(); //draw the game board
    myName = prompt("Please enter your name", "");
    //creates the deck, rows*6 is the n of cards in the deck
    deck(rows*6);
    

    
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
        }),
        response
    );


}
function response(data){
    var response = JSON.parse(data);
    
    console.log(data);
    if (response['action']=='createDeck'){attemptOnOff();}
    
    
    else if(response['action']=='selectCard'){
        cardId=response['cardId'];
        image=response['image'];
        match=response['match'];
        win=response['win'];
        $('#identifier'+cardId).attr("src",image);
        
        console.log(win)

        
        if (match==3){//if there wasnt a need for a match
            card1=cardId

        }
        else if(match==2){//if they dont match
            card2=cardId
            cardList=[card1,card2]
            cover(cardList, 1000)//
        }
        else if(win){
        alert("congrats! you won!")}
        attemptOnOff();
    }
}


function selectCard(event){
    console.log(event.data.id)
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
    console.log(clickable)
    if (clickable){
        console.log("cant click")
        $(".imgColumn").off("click");
        clickable=false
    }
    else{
        for (var i = rows;i>0;i--){
            for (var j = 1; j <= columns; j++){
                $('#identifier'+((i-1)*6 + j)).click({id: (i-1)*6+j},selectCard);
        
                
    }}clickable=true;console.log("can click")}

}
/*flips the cards after a set amount of time */
function cover(ids,time){
  
    setTimeout(function(){for(i=0;i< ids.length;i++){
        $('#identifier'+ids[i]).attr('src','./cards/cover.png');
        console.log('covering')
    }},time)
}
