const controller = require('./controller')
const { makeElement } = require('./model')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', showForm);

}

function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    form.setAttribute("id", "new-post-form");
    let titleField = makeElement('input', 'text', 'poemTitle', '')
    titleField.setAttribute('name', 'poemTitle')
    let labelTitle = makeElement('label');
    labelTitle.setAttribute("name", "poemTitle");
    labelTitle.innerText = "Title  ";
    let poemField = makeElement('input', 'text', 'userPoem', '');
    poemField.setAttribute("name", "userPoem")
    let labelPoem = makeElement('label');
    labelPoem.setAttribute("name", "poemTitle");
    labelPoem.innerText = "Your Poem:  ";
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    let counterArea = document.createElement("span");
    counterArea.setAttribute("id", "counter");
    document.querySelector('body').appendChild(form)
    form.append(labelTitle, titleField, labelPoem, poemField, counterArea, makePost, searchGif);
    formBtnsListeners();
}

function formBtnsListeners() {
    document.querySelector('#submitPoem').addEventListener('click', controller.checkPoem)
    document.querySelector('#addGif').addEventListener('click', showGifForm);
    let textArea = document.querySelector('#userPoem');
    textArea.addEventListener("keyup", e => counter(e));

}

function showGifForm(e) {
    e.preventDefault();
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

function counter(e) {
    e.preventDefault();
    const max = 500;
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}

initBindings();
