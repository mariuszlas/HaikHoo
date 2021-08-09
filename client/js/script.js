const controller = require('./controller')
const { makeElement } = require('./model')

document.querySelector('#makePost').addEventListener('click', showForm)

function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    let titleField = makeElement('input', 'text', 'poemTitle', '')
    let poemField = makeElement('input', 'text', 'userPoem', '')
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    document.querySelector('body').appendChild(form)
    form.append(titleField, poemField, makePost, searchGif)
    document.querySelector('#submitPoem').addEventListener('click', controller.checkPoem)
    document.querySelector('#addGif').addEventListener('click', addGifForm);
}

function addGifForm(e) {
    e.preventDefault();
    console.log('e')
    let gifForm = document.createElement('form')
    gifForm.setAttribute('id', 'gifForm')
    let searchWord = makeElement('input', 'text', 'gifWord', 'Search for a gif');
    let searchGif = makeElement('input', 'submit', 'gifSearch')
    let gifContainer = document.createElement('section')
    gifContainer.setAttribute('id', 'gifContainer')
    gifForm.append(searchWord, searchGif, gifContainer);
    document.querySelector('form').append(gifForm)
    document.querySelector('#gifSearch').addEventListener('click', displayGif)
}

async function displayGif(e) {
    e.preventDefault()
    document.querySelector("#gifContainer").textContent = "";
    let userInput = document.querySelector('#gifWord').value;
    let gifData = await controller.fetchGif(userInput)
    let gifPath = gifData.data[0].images.fixed_height.url
    let gif = document.createElement('img')
    gif.setAttribute('src', gifPath)
    document.querySelector('#gifContainer').append(gif)
}

