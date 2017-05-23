Bioluminescence
=================


Overview
----

Bioluminescence is a game inspired by deep sea creatures.
In terms of game play it's a cross between a memory card game and minesweeper.

The board is populated with a target, several enemies, and and inert background characters ( currently 1, 3 and 15 respectively) in a randomly generated configuration.
(This can be seen by commenting out the  switchVisibility(randomCol, randomRow); line in the populateBackground and populateElements function. Don't play the game in this mode though!)
These elements are hidden at the start of the game.
For each turn players can move around the board, or they can use their illuminate function to see the elements in their surroundings.

I aimed to make a game that has simple rules and game play, but still rewards skill, and has several options for strategy.
Players might choose to explore methodically, or take leaps into unknown territory and risk hitting an enemy. Players with a better memory will have to use the illuminate feature less often, and can get further in their exploration.



Approach
------

The game was created in HTML CSS and vanilla Javascript.

My method for planning out medium sized and bigger projects is:
- create a flow diagram
- based on that, make a list of all the logic elements, and all the DOM elements I need to keep track of
- from that, decide what kind of data structures I’m going to use
- write up a sequential list of tasks that need to happen, mark which ones are logic and which ones are DOM. These may or may not end up as separate functions.

All of these things will change during the development process, but it provides a pretty good foundation.



What I learned
-----

- DOM manipulation
- CSS styling
- The importance of data separation and single-purpose functions. I was able to rewrite a basic method I call on constantly with ease, because it is only defined in the one place.
- debugging & programming on the console.
- The importance of committing frequently, after a few last minute panics when I broke all of my code.
- Adding features and rewriting methods without breaking everything
- developing the parameters of a project while writing the code for the project; I changed the way the game functions based on gameplay, for example, moving around the board used to be keyboard based, and players could only move one square at a time, but that turned out to be extremely frustrating.


To do list
-----

- a function for clearing out the game elements and re-setting values, so the game can be re-started after a win without reloading
- a display for which player’s turn it is (I had one, but I wanted to change it)
- create images with the players overlaid with the target/enemy to use for winning, so they don’t just disappear from the board when someone wins
- checks to stop inappropriate use:
		- shouldn’t be able to click on the other player’s space
		- shouldn’t be able to click on board after win






Future Features
------

- User input for board size, number of enemies, number of targets
- animating the illuminate function: perhaps radiating out from the player, or fading or flickering, or some combination
- deep sea background artwork/ deep sea fish images for players (the ones I had didn’t work at such a small size. The current fishes are tropical, not deep sea, terribly inaccurate.
