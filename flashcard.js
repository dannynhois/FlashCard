var Basic = require('./BasicCard');
var Cloze = require('./ClozeCard');
var inquirer = require('inquirer');

var clozeList = [];
var basicList = [];

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
    }
  ]).then(response => {
    if (response.action === 'Create a new card') {
      createCard();
    } else {
      testCard();
    }
  });
}

function createCard () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'typeOfCard',
      message: 'Select type of flashcard:',
      choices: [
        'Cloze',
        'Basic'
      ]
    }
  ]).then(response => {
    if (response.typeOfCard === 'Cloze') {
      addNewClozeCard();
    } else {
      addNewBasicCard();
    }
  });
}

function addNewClozeCard () {
  inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter your statement:'
    },
    {
      type: 'input',
      name: 'cloze',
      message: 'Enter your cloze:'
    }

  ]).then(response => {
    clozeList.push(new Cloze(response.text, response.cloze));
    console.log('Card added.');
    startProgram();
  });
}

function addNewBasicCard () {
  inquirer.prompt([
    {
      type: 'input',
      name: 'front',
      message: 'Enter the front card:'
    },
    {
      type: 'input',
      name: 'back',
      message: 'Enter the back card:'
    }

  ]).then(response => {
    basicList.push(new Basic(response.front, response.back));
    console.log('Card added.');
    startProgram();
  });
}

function testCard () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'typeOfCard',
      message: 'Select type of flashcard:',
      choices: [
        'Cloze',
        'Basic'
      ]
    }
  ]).then(response => {
    if (response.typeOfCard === 'Cloze') {
      testClozeCard();
    } else {
      testBasicCard();
    }
  });
}

function testClozeCard(){
  var choices = [];
  clozeList.forEach(card => {
    choices.push(card.partial);
  });

  inquirer.prompt([
    {
      type: 'list',
      name: 'typeOfCard',
      message: 'Select flashcard to see answers:',
      choices: choices
    }
  ]).then(response => {
    if (response.typeOfCard === 'Cloze') {
      testClozeCard();
    } else {
      testBasicCard();
    }
  });
}
