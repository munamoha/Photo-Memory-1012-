# Photo Memory!
**Team Name:** Candice 
Joshua Little, jelittle@my.yorku.ca  *(Section B, Lab 03)*
Muna Mohamed, munamoh@my.yorku.ca *(Section B, Lab 03)*

**Project Name:** Photo Memory!

**Project Description:**
Our project is a memory game, where the player wins by successfully matching all pairs of images. The game will display a miss counter, which increases with each unsuccessful pairing. All images are displayed at the start of the game, which are then flipped, so that the user can no longer see the image on the card. The player will be introduced to a simple start screen where they can choose the difficulty and start the game. The difficulties would increase the amount of cards that the user has to remember. We plan to implement a simple leaderboard. We may implement an api of some sort.

We use card/deck terminology in this document, as a shorthand for our interactive images.

**Functional requirements:**
- Allow the user to choose a difficulty level
- Display all the cards and their locations to the player for a short duration, before hiding them
- Show card when the user clicks on it
- The system must count the amount of times the user selects two non-matching cards
- Once the user finds two matching cards, both cards must stay visible
- The system must create a deck of cards to use in the game
- The system must create a grid of locations on the screen for cards to be placed
- The system must randomly designate a location in the grid for each individual card
- The user must be able to input their name for the leaderboard 
- Based on the user’s miss count, they must be accurately sorted on the leaderboard
- The system shall have an area displaying weather information accurate to the user’s current geographical location. 
