# Photo Memory!
**Team Name:** Candice 

**Team Members:**
Joshua Little, jelittle@my.yorku.ca  *(Section B, Lab 03)*
Muna Mohamed, munamoh@my.yorku.ca *(Section B, Lab 03)*

**Project Name:** Photo Memory!

**Project Description:**
Our project is a memory game, where the player wins by successfully matching all pairs of images. The game will display a miss counter, which increases with each unsuccessful pairing. All images are displayed at the start of the game, which are then flipped, so that the user can no longer see the image on the card. The player will be introduced to a simple start screen where they can choose the difficulty and start the game. The difficulties would increase the amount of cards that the user has to remember. We plan to implement a simple leaderboard. We may implement an api of some sort.

We use card/deck terminology in this documents.

**Features:**
- Allow the user to choose a difficulty level between easy (12 cards), medium(18 cards) and hard(24 cards)
- Display all the cards and their locations to the player for a short duration, before hiding them
- Show card when the user clicks on it
- The server counts the amount of times the user selects two non-matching cards
- Once the user finds two matching cards, both cards stay visible
- The client side chooses the necessary amount of images from a preset library to create the deck
- the server randomizes the location of all the images in the deck
- The client side creates a grid of locations on the screen for cards to be placed, 
- The server chooses the location of the card on the grid based on its location in the deck
- The user is able to input their name for the leaderboard 
- Based on the user’s miss count, the user will be accurately sorted on the leaderboard, the less misses the better
- There will be seperate leaderboards for each difficulty
- The homepage has an area displaying weather information accurate to the city of Toronto. 
