const {adjectives, animals} = require('./nameData')

let formatDate = () => {
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${dd}${mm}${yyyy}`;
}

let randomName = () => {
    let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdjective} ${randomAnimal}`
}

class Data {
    constructor(title, poem, giphyURL){
        this.author = randomName();
        this.title = title;
        this.body = poem;
        this.giphy = giphyURL;
        this.date = formatDate();
    }
}

function makeElement(element, type, id, value) {
    newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}

function postPoem(title, poem) {
    let data = new Data(title, poem)
    fetch('http://localhost:3000/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}


module.exports = { Data, makeElement, formatDate, postPoem }