const animals = require('./animals')
const adjectives = require('./adjectives')

function randomName() {
let randomAdjective = adjectives.adjectivesArr[Math.floor(Math.random() * adjectives.adjectivesArr.length)]
let randomAnimal = animals.animalArr[Math.floor(Math.random() * animals.animalArr.length)]
console.log(`${randomAdjective} ${randomAnimal}`);
return `${randomAdjective} ${randomAnimal}`
}


//uncomment and run script to test.
//randomName();

module.exports = { randomName } 