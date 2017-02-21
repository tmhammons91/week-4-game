$(document).ready(function() {

var targetNumber; 
var wins = 0; 
var losses = 0; 
var counter=0; 
var crystalValues=[]; 

//game reset function
function reset() {
targetNumber=getRandomInt(); 
counter=0; 
crystalValues=[]; 
$("#points-tally").empty(); 
$("#target-score").empty(); 
getCrystalValue(); 
assignCrystalValues(); 
	console.log(crystalValues); //built in developer "cheat" so I can make sure game is working
}

//function to generate random target number
function getRandomInt() {
	return Math.floor(Math.random() * (120-19+1))+19; 
}

//function to generate array of unique random values for crystals
function getCrystalValue() {
	var numbersNeeded=4
	  	do {	
			number=Math.floor(Math.random()*(12-1+1))+1; 
			tempIndex=crystalValues.indexOf(number); 
			if (tempIndex=== -1) {
				crystalValues.push(number); 
				numbersNeeded--; 					
				};				
		 } // end of do
		while (numbersNeeded>0); 
}; // end of getCyrstalValue function

//function to assign the random values to each crystal image
function assignCrystalValues() {
	var crystalImages = document.images;
		for (var i = 0; i < crystalImages.length; i++) {
		crystalImages[i].setAttribute("data-value", crystalValues[i]);  
	//note--I couldn't get the Jquery .attr to work for the above--read something about the images are part 
	//of the DOM so Jquery wouldn't work on DOM elements.  Not sure I understand all that (or repeated it correctly)
	//but used vanilla JS and it worked
    	}; 
    	return crystalImages
 }; // end of assignCrystalValues function

var audio = new Audio("assets/images/diamonds.wav");

//main on click function and testing statements to determine win/lose (modeled on in-class crystals example)
$(".crystal-image").on("click", function() {
 	var clickValue = ($(this).attr("data-value"));
 	clickValue=parseInt(clickValue); 
 	counter += clickValue; 
 	$("#points-tally").html(counter); 

 		if (counter === targetNumber) {
 			wins=wins+1; 
 			$("#losses-message").empty(); 
 			$("#wins-tally").html(wins);
 			$("#wins-message").html("Good job! You've met the target! Now try the new one."); 
 			audio.play(); 		
 			reset();
 			$("#target-score").html(targetNumber); 

 		} else if (counter >= targetNumber) {
 			losses=losses+1; 
 		$("#wins-message").empty(); 
 		$("#losses-tally").html(losses); 
 		$("#losses-message").html("Uh oh, you've flooded the market. Try again."); 
 		reset(); 
 		$("#target-score").html(targetNumber); 
 		}

}) // end of the on click function

targetNumber=getRandomInt(); 
	$("#target-score").html(targetNumber); 
getCrystalValue(); 
	console.log(crystalValues); 
assignCrystalValues(); 

}); //end of the document ready function