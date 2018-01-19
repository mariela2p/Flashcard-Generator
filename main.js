var inquirer = require('inquirer');
var fs = require("fs");

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var basicCardArr = [];
var basicCardFront;
var basicCardBack;
var basicCard;
var partial;

//CHOOSE CARD TYPE

inquirer.prompt([
    
      {
        type: "list",
        name: "chooseCardType",
        message: "What kind of Flashcard would you like to create?",
        choices: ["Basic", "Cloze"]
      }
    
    ]).then(function(card) {
    
      if (card.chooseCardType === "Basic") {
    
        console.log("=================== You chose Basic Card =====================");

        createBasicCard();
        
      }
    
      else {
    
        console.log("===================== You chose Cloze Card ===================");

        createClozeCard();
    
      }
    });
    


//CREATE BASIC CARD


function createBasicCard(){
    inquirer.prompt([
        
        {
            type: "input",
            name: "cardFront",
            message: "Please enter the Question"
        },
        {
            type: "input",
            name: "cardBack",
            message: "Please enter the Answer"
        },
        ]).then(function(basicText) {
           
            var newBasicCard = new BasicCard (basicText.cardFront, basicText.cardBack)
            fs.appendFile("cards.txt", "Question: " + basicText.cardFront + ", "  + "Answer: " +  basicText.cardBack + "\r\n", function(err) {
              if (err) {
                return console.log(err);
              }
            })
            // Print out current card
            console.log("============================= The Basic Card you just created is:" + "\n\r" +
						"Question: " + basicText.cardFront + ", "  + "Answer: " +  basicText.cardBack + "\n\r" + "============================================");
          
            readCards();
            
          }
        )
      };



//CREATE CLOZE CARD

    function createClozeCard(){
      inquirer.prompt([
          
          {
              type: "input",
              name: "text",
              message: "Please enter the full text"
          },
          {
              type: "input",
              name: "cloze",
              message: "Please enter the cloze"
          },
          ]).then(function(clozeText) {
              console.log(clozeText.text)
              var newClozeCard = new ClozeCard (clozeText.text, clozeText.cloze)
              
              partial = clozeText.text.replace(clozeText.cloze, "_____________");
              
              
              fs.appendFile("cards.txt", "Full Text: " + clozeText.text + ", "  + "Cloze: " +  clozeText.cloze + "\r\n", function(err) {
                if (err) {
                  return console.log(err);
                }
              })
              // Print out current card
              console.log("============================= The Cloze Card you just created is:" + "\n\r" +
						"Full text: " + partial + ", "  + "\n\r" + "Cloze: " +  clozeText.text + "\n\r" + "============================================");

              readCards();
              
            }
          )
        };

    function readCards() {
      
        // Read the existing data file
        fs.readFile("cards.txt", "utf8", function(err, cardData) {
          if (err) {
            return console.log(err);
          }
          // Print out all cards
          console.log("======================== All Cards ======================" + "\n\r" + cardData + 
          	"\n\r" + "==============================================");
         
        });
      }