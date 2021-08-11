const {adjectives, animals} = require('./nameData')

let formatDate = () => {
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${dd}/${mm}/${yyyy}`;
}

class Data {
    constructor(title, poem, giphyURL){
        this.author = randomName();
        this.title = title;
        this.text = poem;
        this.gifUrl = giphyURL;
        this.date = formatDate();
    }
}

function postValidity(title, poem) {
    console.log(poem)
    let poemNoSpace = poem.replace(/\s/g, '')
    if (!title) {
        throw new Error('please enter a title')
    }
    if (!poemNoSpace) {
        throw new Error(`you haven't written your poem yet!`)
    }
    if (poem.length > 500){
        throw new Error(`your poem is over the character limit`)
    }
}

function makeElement(element, type, id, value='') {
    newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}

function counter(e) {
    e.preventDefault();
    const max = 500;
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

let randomName = () => {
    let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdjective} ${randomAnimal}`
}


module.exports = { Data, makeElement, formatDate, postValidity, counter, scrollToTop }
