const controller = require('./controller')
const { makeElement } = require('./model')

document.querySelector('#makePost').addEventListener('click', showForm)

function showForm(e) {
    e.preventDefault();
    console.log(e);
    let form = document.createElement('form')
    let titleField = makeElement('input', 'text', 'poemTitle')
    let poemField = makeElement('input', 'text', 'userPoem')
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    let selectedGif = document.createElement('span')
    selectedGif.setAttribute('id', 'selectedGif')
    document.querySelector('body').appendChild(form)
    form.append(titleField, poemField, makePost, selectedGif, searchGif)
    form.addEventListener('submit', controller.checkPoem)
    document.querySelector('#addGif').addEventListener('click', showGifForm);
}

function showGifForm(e) {
    e.preventDefault();
    console.log('e')
    let gifForm = document.createElement('form')
    gifForm.setAttribute('id', 'gifForm')
    let searchWord = makeElement('input', 'text', 'gifWord');
    searchWord.setAttribute('placeholder', 'search for a gif')
    let searchGif = makeElement('input', 'submit', 'gifSearch', 'search')
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
    for (let i = 0; i < gifData.data.length; i++) {

        let gifPath = gifData.data[i].images.fixed_height.url
        let gif = document.createElement('img')
        gif.setAttribute('src', gifPath)
        document.querySelector('#gifContainer').append(gif)
        gif.addEventListener('click', selectGif)

    }

}

function selectGif(e) {
    console.log(e)
    let gifPath = e.target.src
    console.log(gifPath)
    document.querySelector("#selectedGif").textContent = "";
    let previewGif = document.createElement('img')
    previewGif.setAttribute('src', gifPath)
    document.querySelector('#selectedGif').append(previewGif)
    e.path[2].remove()
}
