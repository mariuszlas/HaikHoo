const { postValidity, makeElement, counter, scrollToTop } = require('./helpers.js')
const { postPoem, fetchGif } = require('./requestHandlers.js')

// function showForm(e) {
//     e.preventDefault();
//     scrollToTop();
//     document.querySelector('#new-post-form').style.display = "block";
//     let form = document.createElement('form')
//     form.setAttribute("id", "new-post-form");
//     let titleField = makeElement('input', 'text', 'poemTitle')
//     titleField.setAttribute('name', 'poemTitle')
//     let labelTitle = makeElement('label');
//     labelTitle.setAttribute("name", "poemTitle");
//     labelTitle.innerText = "Title  ";
//     let poemField = makeElement('input', 'text', 'userPoem');
//     poemField.setAttribute("name", "userPoem")
//     let labelPoem = makeElement('label');
//     labelPoem.setAttribute("name", "poemTitle");
//     labelPoem.innerText = "Your Poem:  ";
//     let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
//     let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
//     let counterArea = document.createElement("span");
//     let selectedGif = document.createElement('span');
//     selectedGif.setAttribute('id', 'selectedGif');
//     counterArea.setAttribute("id", "counter");
//     document.querySelector('body').appendChild(form)
//     form.append(labelTitle, titleField, labelPoem, poemField, counterArea, makePost, selectedGif, searchGif);
//     formBtnsListeners();
// }


function showForm(e) {
    e.preventDefault();
       scrollToTop()
    document.querySelector('#new-post-form').style.display = "block";
    formBtnsListeners();
}

function formBtnsListeners() {
    document.querySelector('#new-post-form').addEventListener('submit', e => checkPoem(e))
    document.querySelector('#addGif').addEventListener('click',  e => showGifForm(e));
    let textArea = document.querySelector('#userPoem');
    textArea.addEventListener("keyup", e => counter(e));
}

function showGifForm(e) {
    e.preventDefault();
    let gifForm = document.createElement('form')
    gifForm.setAttribute('id', 'gifForm')
    let searchWord = makeElement('input', 'text', 'gifWord');
    searchWord.setAttribute('placeholder', 'search for a gif');
    let searchGif = makeElement('input', 'submit', 'gifSearch','search');
    let gifContainer = document.createElement('section');
    gifContainer.setAttribute('id', 'gifContainer');
    gifForm.append(searchWord, searchGif, gifContainer);
    document.querySelector('form').append(gifForm);
    document.querySelector('#gifSearch').addEventListener('click', displayGif)
}

async function displayGif(e) {
    e.preventDefault()
    document.querySelector("#gifContainer").textContent = "";
    let userInput = document.querySelector('#gifWord').value;
    let gifData = await fetchGif(userInput)
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
    document.querySelector('#gifForm').remove();
}

function checkPoem(e) {
    e.preventDefault();
    console.log(e);
    let title = e.target.poemTitle.value;
    let poem = e.target.userPoem.value;
    let gif = document.querySelector('#selectedGif img')
    gif ? giphyURL = gif.getAttribute('src') : giphyURL = ''
    try {
        postValidity(title, poem)
        postPoem(title, poem, giphyURL)
    } catch (err) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = err
        document.querySelector('form').appendChild(errorMessage)
        console.log('whoops', err)
        return;
    }
}

module.exports = { showForm };
