//const { displayPost } = require('./requestHandlers.js');
//const { makeComment } = require('./requestHandlers.js');

let url =  "https://haikhoo-server.herokuapp.com";
let pageCounter = 1;
let startIndex = 0;

function extendPage(e){
    e.preventDefault();
    pageCounter++;
    startIndex = startIndex +5;
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
        let divReact = document.createElement('div');

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
    let author = makeElement('p', 'p-author', post.author);
    let textCont = makeElement('p', 'p-text', post.text);
    let date = makeElement('p', 'p-date', `Date added: ${post.date}`);
    divBody.append(title, author, date, textCont);
    if (post.gifUrl !== "") {
        let gif = document.createElement('img');
        gif.setAttribute('src', post.gifUrl);
        divBody.appendChild(gif)
    }
    return divBody;
}

function createReactions(post) {

    let divReact = makeElement('div', 'div-react');
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
    } else { span.innerText = 1}
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

module.exports = { appendPost, extendPage, displayPost, extendPage }
