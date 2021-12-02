
deck = [["cards/10ofHearts.png", "cards/aceOfSpades.png"],[3,1]]

//create deck
//randomize deck numbers
/* two non class based ways that I thought of ,


first example of array :
[images*2](you have every image, so its a bigger list and you have a duplicate of everyimage in said list)
[location for corresponding spot on grid]
[identifier, every matching image has the same identifier,]

pros:
simpler to check for matching pairs

cons:
harder to code the list
larger list< not really an issue tho but still


second example of array
[images](only have one instance for one image)
[location 1]
[location 2]

pros:
smaller list
really easy to code the list itself

cons:
harder to match the pairs


*/




function assignImage() {
    var count = 0
    for (let i = 0; i <deck[0].length; i++ ){
    count++;
    document.getElementById(deck[1][i].toString()).src = deck[0][i];    
    } 
}



/* two non class based ways that I thought of ,


first example of array :
[images*2](you have every image, so its a bigger list and you have a duplicate of everyimage in said list)
[location for corresponding spot on grid]
[identifier, every matching image has the same identifier,] 



how first example?:

double this so that
[images](you have every image, so its a bigger list and you have a duplicate of everyimage in said list)
[identifier, every matching image has the same identifier,]

[images*2](you have every image, so its a bigger list and you have a duplicate of everyimage in said list)
[identifier*2, every matching image has the same identifier,]
the assign location so that


[images*2](you have every image, so its a bigger list and you have a duplicate of everyimage in said list)
[identifier*2, every matching image has the same identifier,] 
[location for corresponding spot on grid]



version two:

choose x amount of images
make list and double images
deck = (images*2)

randomize all the images using fisher-yates shuffle 

use the location of the images in the list for their location in the grid


Fisher-Yates Shuffle< list randomizing algorithm
*/


