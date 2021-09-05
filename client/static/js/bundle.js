(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./helpers.js":2,"./mainHandlers":4,"./requestHandlers.js":5}],2:[function(require,module,exports){
function formatDate() {
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${dd}/${mm}/${yyyy}`;
}

class Data {
    constructor(title, poem, giphyURL){
        this.title = title;
        this.text = poem;
        this.gifUrl = giphyURL;
        this.date = formatDate();
    }
}

function postValidity(title, poem) {
    let poemNoSpace = poem.replace(/\s/g, '')
    if (!title.replace(/\s/g, '')) {
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
    let newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}

function counter(e) {
    e.preventDefault();
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

module.exports = { Data, makeElement, formatDate, postValidity, counter, scrollToTop }

},{}],3:[function(require,module,exports){

const { showForm } = require('./formHandlers.js')
const { extendPage, displayPost} = require('./mainHandlers.js')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', e => showForm(e));
    document.querySelector('#showMorePosts').addEventListener('click', e => extendPage(e));

}

displayPost(1, 0);
initBindings();

},{"./formHandlers.js":1,"./mainHandlers.js":4}],4:[function(require,module,exports){
let url =  "http://localhost:3000";
let pageCounter = 1;
let startIndex = 0;

function extendPage(e){
    e.preventDefault();
    pageCounter++;
    startIndex += 5;
    displayPost(pageCounter, startIndex);

}

function displayPost(page=1, index=0){
    fetch(`${url}/posts`)
    .then(res => res.json())
    .then(data => { appendPost(data, page, index) })
    .catch(err => console.log(err));
}

function appendPost(data, page, index){
    data.reverse()

    for (let i = index; i < page*5; i++){

        let post = data[i]
        let article = document.createElement('article');
        article.setAttribute('id', post.id)

        let divBody = createBody(post);
        divBody.setAttribute("class", "post");
        let divReact = makeElement('div', 'div-react');

        let spanEmoji = createReactions(post);
        let showComBtn = makeElement('button', 'show-com-btn', 'Show Comments')
        showComBtn.addEventListener('click', e => showComSection(e));

        divReact.append(spanEmoji, showComBtn)
        let divComment = createComSection(post);
        article.append(divBody, divReact, divComment)
    document.querySelector('#showMorePosts').before(article);
    }
}

function showComSection(e) {
    e.preventDefault();
    let divCom = e.target.parentElement.nextElementSibling;
    if (divCom.style.display === "none") {
        divCom.style.display = "block"
    } else {
        divCom.style.display = "none"
    }
}

function makeElement(element, className, textCont=null) {
    newElement = document.createElement(element)
    newElement.setAttribute('class', className);
    textCont ? newElement.textContent = textCont: null;
    return newElement;
}

function createBody(post) {

    let divBody = makeElement("div", 'post');
    let title = makeElement('p', 'p-title', post.title);
    let topDiv = makeElement('div', 'author-date-div')
    let author = makeElement('p', 'p-author', `Posted by ${post.author} `);
    let correctedText = post.text.replace(/\n/g, "<br>")
    let textCont = makeElement('p', 'p-text')
    textCont.innerHTML = correctedText;
    let date = makeElement('p', 'p-date', `${post.date}`);
    topDiv.append(author, date);
    divBody.append(topDiv, title, textCont);
    if (post.gifUrl !== "") {
        let gif = document.createElement('img');
        gif.setAttribute('src', post.gifUrl);
        divBody.appendChild(gif)
    }
    return divBody;
}

function createReactions(post) {
    let spanEmoji = makeElement('span', 'span-emoji');
    let arr = [['likes', 0x1F44D], ['cries', 0x1F62D], ['smiles', 0x1F603]]

    let btns = arr.map(item => {
        let btn = makeElement('button', `${item[0]}`, `${String.fromCodePoint(item[1])}`);
        btn.addEventListener('click',   e => {sendLike(e)});
        let num = post['reactions'][item[0]];
        num ? num: num = '';
        let span = makeElement('span', `${item[0]}-count`, `${num}`)
        return [btn, span];
    })

    btns.forEach((item) => {
        spanEmoji.appendChild(item[0]);
        spanEmoji.appendChild(item[1]);
    });
    return spanEmoji;
}

function createComSection(post) {

    let divComment = makeElement('div', 'comments-div');
    divComment.style.display = 'none';
    let commentSection = makeElement("div", 'comment');
    post.comments.forEach((comment) => {
        let commentP = makeElement('p', 'p-comment', comment);
        commentSection.appendChild(commentP);
    });

    let commentForm = makeElement("form", "add-comment-form");
    commentForm.setAttribute('name', post.id)
    let inputForm = makeElement("textarea", "input-form");
    inputForm.setAttribute('rows', '2')
    inputForm.setAttribute('cols', '25')
    inputForm.setAttribute("name","comment");

    let commentBtn = makeElement("input", 'comment-btn');
    commentBtn.setAttribute("type", "submit");
    commentBtn.setAttribute("value", "Add Comment");
    commentForm.append(inputForm, commentBtn);
    commentForm.addEventListener('submit', e => makeComment(e));
    divComment.append(commentSection, commentForm);
    return divComment;
}

function appendOneComm(formElement, comment) {
    const comDiv = formElement.previousElementSibling;
    const p = makeElement('p', 'p-comment', comment)
    comDiv.appendChild(p)
}

async function sendLike(e) {
    e.preventDefault();
    let button = e.target;
    let id = button.closest('article');
    const reaction = button.getAttribute('class');
    let options = {
        method: "PUT",
        headers: { 'Content-Type':'application/json'}
    }
    await fetch(`${url}/posts/${id.id}/${reaction}`, options)
    liveReactionCounter(button);
}

function liveReactionCounter(btnElement) {
    let span = btnElement.nextElementSibling;
    if (span.innerText !== "") {
        span.innerText = `${parseInt(span.innerText) + 1}`
    } else { span.innerText = "1"}
}

async function makeComment(e) {
    e.preventDefault();
    const comment = e.target[0].value;
    let id = e.target.name;
    let commentInput = document.querySelector(`form[name="${e.target.name}"]`);
    const options = {
        method: "PUT",
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({"comment": comment})
    }
    try {
        await fetch(`${url}/posts/${id}/comment`, options);
        appendOneComm(e.target, comment);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createComSection, sendLike, makeComment, appendPost, extendPage, displayPost, extendPage, makeElement, createBody, createReactions, liveReactionCounter }

},{}],5:[function(require,module,exports){
const { appendPost } = require('./mainHandlers')
const { collapseForm } = require('./formHandlers');
const { Data } = require('./helpers.js');

let url =  "http://localhost:3000";
let pageCounter = 0;
let startIndex = 0;

function postPoem(title, poem, giphyURL) {
    let data = new Data(title, poem, giphyURL)
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    }
    fetch(`${url}/posts`, options)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

async function makeComment(e) {
    e.preventDefault();
    const comment = e.target[1].value;
    let id = e.target.name;
    let commentInput = document.querySelector(`form[name="${e.target.name}"]`);
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "comment": comment })
    }
    try {
        await fetch(`${url}/posts/${id}/comment`, options);
    } catch (err) {
        console.log(err);
    }
};

async function fetchGif(userInput) {
    const APIKEY = '1GZ3I3ZbWKLBCfC7UFrN1yWVhQkONQ32'
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${userInput}&rating=pg-13&limit=4`
    let response = await fetch(url)
        .then(resp => resp.json())
        .then(content => {
            console.log(content.data[0].images.fixed_height.url)
            return content;
        })
        .catch(err => {
            console.log(err)
        })
    return response
};

module.exports = { postPoem, makeComment, fetchGif }

},{"./formHandlers":1,"./helpers.js":2,"./mainHandlers":4}]},{},[3]);
