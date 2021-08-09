const { randomName } = require("../username_generator/nameGenerator");


function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    let titleField = makeElement('input', 'text', 'poemTitle', '')
    let poemField = makeElement('input', 'text', 'userPoem', '')
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    document.querySelector('body').appendChild(form)
    form.appendChild(titleField)
    form.appendChild(poemField)
    form.appendChild(makePost)
    form.appendChild(searchGif)
    document.querySelector('#submitPoem').addEventListener('click', postPoem)
    document.querySelector('#addGif').addEventListener('click', addGif)
}

function postPoem(e) {
    e.preventDefault();
    let title = document.querySelector('#poemTitle').value;
    let poem = document.querySelector('#userPoem').value;

    try {
        checkValidity(title, poem)
    } catch (err) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = err
        document.querySelector('form').appendChild(errorMessage)
        console.log('whoops', err)
        return;
    }
    let formatDate = () => {
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        return `${dd}${mm}${yyyy}`;
    }
    let data = {
        "author": randomName(),
        "title": title,
        "body": poem,
        "date": formatDate()
    }

    fetch('http://localhost:3000/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

function checkValidity(title, poem) {
    if (title.length == 0) {
        throw new Error('please enter a title')
    }

    if (poem.length == 0) {
        throw new Error(`you haven't written your poem yet!`)
    }
}

function makeElement(element, type, id, value) {
    newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}


function addGif(e) {
    e.preventDefault();
    let searchWord = makeElement('input', 'text', 'gifWord', 'Search for a gif');
    let searchGif = makeElement('input', 'submit', 'gifSearch')
    document.querySelector('form').appendChild(searchWord);
    document.querySelector('form').appendChild(searchGif)
    document.body.appendChild(document.createElement('section'))
    document.querySelector('#gifSearch').addEventListener('click', fetchGif)
}


function fetchGif(e) {
    e.preventDefault()
    document.querySelector("body section").textContent = "";
    let userInput = document.querySelector('#gifWord').value;
    let gif = document.createElement('img');

    const APIKEY = '1GZ3I3ZbWKLBCfC7UFrN1yWVhQkONQ32'
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${userInput}`

    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            console.log(content.data[0].images.fixed_height.url)
            let gifPath = content.data[0].images.fixed_height.url
            gif.setAttribute('src', gifPath)
            document.querySelector('body section').appendChild(gif)
        })
        .catch(err => {
            console.log(err)
        })
}





module.exports = { showForm }