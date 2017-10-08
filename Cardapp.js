var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var Questions = require("./Questions.js").questions;
var inquirer = require("inquirer");

var clozeQuestions = [];
var basicQuestions = [];
var questionPlaceholder = {};
var counter = 0;

for (i = 0; i < Questions.length; i++) {
	var clozeQuestion = new ClozeCard(Questions[i].text, Questions[i].cloze);
	clozeQuestions.push(clozeQuestion);
}

for (i = 0; i < Questions.length; i++) {
	var basicQuestion = new BasicCard(Questions[i].front, Questions[i].cloze);
	basicQuestions.push(basicQuestion);
}

menu();

function menu (){
	inquirer.prompt([
		{
			name: "menu",
			type: "list",
			message: "What would you like to do?",
			choices: ["Test It", "Create a Card", "View All Cards", "Ask Next Open-Ended Question", "Ask Next Fill-in-the-Blank Question", "Quit"]
		}
	]).then(function(response){
		switch (response.menu) {
			case "Test It":
				test();
				break;
			case "Create a Card":
				create();
				break;
			case "View All Cards":
				viewAll();
				break;
			case "Ask Next Open-Ended Question":
				if (counter < basicQuestions.length){
					nextBasic();
				} else {
					console.log("No more questions. Maybe you can submit one?");
					menu();
				}
				break;
			// NOT WORKING PROPERLY, NEED HELP AND TO RE-ADD TO INQUIRER
			// case "Ask All Open-Ended Questions":
				// 	askAllBasic(counter);
				// break;
			case "Ask Next Fill-in-the-Blank Question":
				if (counter < clozeQuestions.length){
					nextCloze();
				}	else {
					console.log("No more questions. Maybe you can submit one?");
					menu();
				}
				break;
			// NOT WORKING PROPERLY, NEED HELP AND TO RE-ADD TO INQUIRER
			// case "Ask All Fill-in-the-Blank Questions":
				// 	askAllCloze();
				// 	break;
			case "Quit":
				break;
		}
	});
}

function test () {
	var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

	// "Who was the first president of the United States?"
	console.log(firstPresident.front); 

	// "George Washington"
	console.log(firstPresident.back); 

	var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

	// "George Washington"
	console.log(firstPresidentCloze.cloze); 

	// " ... was the first president of the United States.
	console.log(firstPresidentCloze.partial);

	// "George Washington was the first president of the United States.
	console.log(firstPresidentCloze.fullText);

	// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
	var brokenCloze = new ClozeCard("This doesn't work", "oops");	
}

function create () {
	inquirer.prompt([
		{
			name: "newQ",
			message: "What is your question?",
		},
		{
			name: "newFull",
			message: "What the answer in a sentense (full text)?",
		},
		{
			name: "newCloze",
			message: "What is the answer (cloze)?",
		},
	]).then(function(response){
		questionPlaceholder.front = response.newQ;
		questionPlaceholder.text = response.newFull;
		questionPlaceholder.cloze = response.newCloze;
		var basicQuestion = new BasicCard(questionPlaceholder.front, questionPlaceholder.cloze);
		basicQuestions.push(basicQuestion);
		var clozeQuestion = new ClozeCard(questionPlaceholder.text, questionPlaceholder.cloze);
		clozeQuestions.push(clozeQuestion);
		menu();
	});
}

function viewAll () {
	for (i = 0; i < basicQuestions.length; i++){
		console.log(`Question ${i+1}: ${basicQuestions[i].front}`);
	}
	menu();
}

function nextBasic () {
	inquirer.prompt([
		{
			name: "basic",
			message: basicQuestions[counter].front
		}
	]).then(function(response){
		if (response.basic == basicQuestions[counter].back) {
			console.log("Correct!");
		} else {
			console.log("That is incorrect. The correct answer was " + basicQuestions[counter].back + ".");
		}
		counter++;
		menu();
	});
}

// NOT WORKING PROPERLY - NEED HELP AND TO RE-ADD THE ASK ALL BASIC TO INQUIRER.
// function askAllBasic (counter) {
// 	for (i = counter; i < basicQuestions.length; i++){
// 		inquirer.prompt([
// 			{
// 				name: "basicAll",
// 				message: basicQuestions[i].front
// 			}
// 		]).then(function(resp){
// 			if (resp.basicAll == basicQuestions[i].back) {
// 				console.log("Correct!");
// 			} else {
// 				console.log("That is incorrect. The correct answer was " + basicQuestions[i].back);
// 			}
// 		});
// 	}
// }

function nextCloze () {
	inquirer.prompt([
		{
			name: "cloze",
			message: clozeQuestions[counter].partial
		}
	]).then(function(response){
		if (response.cloze == clozeQuestions[counter].cloze) {
			console.log("Correct!");
		} else {
			console.log("That is incorrect. " + clozeQuestions[counter].fullText);
		}
		counter++;
		menu();
	});
}

// NOT WORKING PROPERLY - NEED HELP AND TO RE-ADD THE ASK ALL CLOZE TO INQUIRER.
// function askAllCloze () {
// 	for (i = 0; i < clozeQuestions.length; i++){
// 		inquirer.prompt([
// 			{
// 				name: "clozeAll",
// 				message: clozeQuestions[i].partial
// 			}
// 		]).then(function(resp){
// 			if (resp.clozeAll == clozeQuestions[i].cloze) {
// 				console.log("Correct!");
// 			} else {
// 				console.log("That is incorrect. " + clozeQuestions[i].fullText);
// 			}
// 			menu();
// 		});
// 	}
// }