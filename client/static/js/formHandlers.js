const { postValidity, makeElement, counter, scrollToTop } = require('./helpers.js')
const { postPoem, fetchGif } = require('./requestHandlers.js')
const { displayPost } = require('./mainHandlers')

function showForm(e) {
    e.preventDefault();
       scrollToTop()
    document.querySelector('#new-post-form').style.display = "block";
    formBtnsListeners();
}

function collapseForm(){
    document.querySelector('#new-post-form').style.display = "none";
}

function formBtnsListeners() {
    document.querySelector('#new-post-form').addEventListener('submit', e => checkPoem(e))
    document.querySelector('#addGif').addEventListener('click',  e => showGifForm(e));
    let textArea = document.querySelector('#userPoem');
    textArea.addEventListener("keyup", e => counter(e));
}

function showGifForm(e) {
    e.preventDefault();
    if(!document.querySelector('#gifForm')){
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
    else{
        document.querySelector('#gifForm').remove()
    }
    
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
    document.querySelector('#gifForm').remove()
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
    } catch (err) {
        document.querySelector('#formErrors').textContent = err
        console.log('whoops', err)
        return;
    }
    postPoem(title, poem, giphyURL)
    clearForm()
    updateDisplay()
}

function updateDisplay(){
    document.querySelectorAll('article').forEach(article => {
        article.remove()
    })
    setTimeout(displayPost, 500);
}

function clearForm(){
    document.querySelector('#poemTitle').value = ''
    document.querySelector('#userPoem').value = ''
    document.querySelector('#selectedGif').textContent = ''
    document.querySelector('#formErrors').textContent = ''
    document.querySelector('#new-post-form').style.display = "none"
}

module.exports = { showForm, collapseForm };
