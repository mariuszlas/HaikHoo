let { postValidity, makeElement, counter, scrollToTop } = require('./helpers.js')
const { postPoem, fetchGif } = require('./requestHandlers.js')
const { displayPost } = require('./mainHandlers')

function showForm(e) {
    e.preventDefault();
    scrollToTop()
    let postForm = document.querySelector('#new-post-form');
    postForm.style.display = "flex";
    formBtnsListeners(postForm);
}


function formBtnsListeners(form) {
    let checking = (e) => checkPoem(e, form)
    form.addEventListener('submit', checking)
    document.querySelector('#addGif').addEventListener('click', showGifForm);
    document.querySelector('#closeForm').addEventListener('click', () => clearForm(form))
    document.querySelector('#userPoem').addEventListener("keyup", e => counter(e));
}

function showGifForm(e) {
    e.preventDefault();
    if (!document.querySelector('#gifForm')) {
        let gifForm = document.createElement('form')
        gifForm.setAttribute('id', 'gifForm')
        let searchWord = makeElement('input', 'text', 'gifWord');
        searchWord.setAttribute('placeholder', 'search for a gif');
        let searchGif = makeElement('input', 'submit', 'gifSearch', 'search');
        let gifContainer = document.createElement('section');
        gifContainer.setAttribute('id', 'gifContainer');
        gifForm.append(searchWord, searchGif, gifContainer);
        document.querySelector('#new-post-form').append(gifForm);
        document.querySelector('#gifSearch').addEventListener('click', displayGif)
    }
    else {
        document.querySelector('#gifForm').remove()
    }

}

async function displayGif(e) {
    e.preventDefault()
    let userInput = document.querySelector('#gifWord').value;
    document.querySelector("#gifContainer").textContent = "";
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
    let gifPath = e.target.src;
    let selectedGif = document.querySelector("#selectedGif");
    selectedGif.textContent = "";
    let previewGif = document.createElement('img')
    previewGif.setAttribute('src', gifPath)
    let removeGif = makeElement('input', 'button', 'removeGif', 'X')
    removeGif.addEventListener('click', (e) => { selectedGif.textContent = "" })
    selectedGif.append(previewGif, removeGif);
    // selectedGif.append(removeGif);
    document.querySelector('#gifForm').remove();
}

function checkPoem(e, poemForm) {
    e.preventDefault();
    let title = e.target.poemTitle.value;
    let poem = e.target.userPoem.value;
    let gif = document.querySelector('#selectedGif img')
    gif ? giphyURL = gif.getAttribute('src') : giphyURL = ''
    try {
        postValidity(title, poem)
    } catch (err) {
        document.querySelector('#formErrors').removeAttribute('hidden')
        document.querySelector('#formErrors').textContent = err
        console.log('whoops', err)
        return;
    }
    postPoem(title, poem, giphyURL)
    clearForm(poemForm)
    updateDisplay()
}

function updateDisplay() {
    let loader = document.createElement('div');
    loader.setAttribute('class', 'loader');
    document.querySelector('main').prepend(loader);
    setTimeout(() => {
        document.querySelector('.loader').remove();
        document.querySelectorAll('article').forEach(article => article.remove());
        displayPost();
    }, 1500);
}

function clearForm(form) {
    form.reset();
    form.querySelector('#formErrors').textContent = "";
    form.querySelector('#selectedGif').textContent = "";
    form.querySelector('#counter').textContent = "";
    form.querySelector('#gifForm') ? form.querySelector('#gifForm').remove() : console.log('no giphyform');
    form.style.display = "none";
}

module.exports = { showForm, checkPoem, formBtnsListeners, showGifForm, displayGif, selectGif, clearForm, updateDisplay};
