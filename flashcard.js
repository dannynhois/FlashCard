var Basic = require('./BasicCard');
var Cloze = require('./ClozeCard');
var inquirer = require('inquirer');

var clozeList = [];
var basicList = [];

seedCard();
startProgram();

function startProgram () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select and action',
      choices: [
        'Create a new card',
        'Test a card'
      ]
    },
    {
      type: 'list',
      name: 'typeOfCard',
      message: 'Select type of flashcard:',
      choices: [
        'Cloze',
        'Basic'
      ]
    },
    // input for creating new cloze card
    {
      type: 'input',
      name: 'text',
      message: 'Enter your statement:',
      when: function (answer) {
        return (answer.typeOfCard === 'Cloze') && (answer.action === 'Create a new card');
      }
    },
    {
      type: 'input',
      name: 'cloze',
      message: 'Enter your cloze:',
      when: function (answer) {
        return (answer.typeOfCard === 'Cloze') && (answer.action === 'Create a new card');
      }
    },
    // input for create new basic card
    {
      type: 'input',
      name: 'front',
      message: 'Enter the front card:',
      when: function (answer) {
        return (answer.typeOfCard === 'Basic') && (answer.action === 'Create a new card');
      }
    },
    {
      type: 'input',
      name: 'back',
      message: 'Enter the back card:',
      when: function (answer) {
        return (answer.typeOfCard === 'Basic') && (answer.action === 'Create a new card');
      }
    }

  ]).then(response => {
    // create new cards
    if (response.action === 'Create a new card') {
      if (response.typeOfCard === 'Cloze') {
        clozeList.push(new Cloze(response.text, response.cloze));
        console.log('Card added.');
      } else {
        basicList.push(new Basic(response.front, response.back));
        console.log('Card added.');
      }
    } else { // test cards
      if (response.typeOfCard === 'Cloze') {
        testClozeCard();
      } else {
        testBasicCard();
      }
    }
  });
}

function testClozeCard () {
  var choices = [];
  clozeList.forEach((card, index) => {
    choices.push((index + 1) + ') ' + card.partial);
  });

  inquirer.prompt([
    {
      type: 'list',
      name: 'card',
      message: 'Select flashcard to see answers:',
      choices: choices
    }
  ]).then(response => {
    var index = parseInt(response.card.slice(0, response.card.indexOf(')'))) - 1;
    console.log(clozeList[index].fullText);
    startProgram();
  });
}

function testBasicCard () {
  var choices = [];
  basicList.forEach((card, index) => {
    choices.push((index + 1) + ') ' + card.front);
  });

  inquirer.prompt([
    {
      type: 'list',
      name: 'card',
      message: 'Select flashcard to see answers:',
      choices: choices
    }
  ]).then(response => {
    var index = parseInt(response.card.slice(0, response.card.indexOf(')'))) - 1;
    console.log(basicList[index].back);
    startProgram();
  });
}

function seedCard () {
  clozeList.push(new Cloze('JJ Watt is number 99 of the Texans', 'Texans'));
  clozeList.push(new Cloze('James Harden plays for the Rockets', 'Rockets'));
  clozeList.push(new Cloze('Jeff Bagwell played for the Astros', 'Astros'));
  clozeList.push(new Cloze('Austin is the capital of Texas', 'Austin'));

  basicList.push(new Basic('What is the capital of Texas', 'Austin'));
  basicList.push(new Basic('Basketball team in Houston', 'Rockets'));
  basicList.push(new Basic('Football team in Houston', 'Texans'));
  basicList.push(new Basic('Baseball team in Houston', 'Astros'));
  basicList.push(new Basic('Number 99 of the Texans', 'JJ Watts'));
}
