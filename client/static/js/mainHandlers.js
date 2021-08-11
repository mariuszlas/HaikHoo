// const handlers = require('./requestHandlers.js')
// const { makeComment } = require('./requestHandlers.js')

function appendPost(data){
    data.reverse()
    let container = document.querySelector("main");

    for (let i = 0; i < 5; i++){
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
    let comtDiv = document.querySelector('.comments-div');
    comtDiv.style.display = "block"
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
    let gif = document.createElement('img');
    gif.setAttribute('src', post.gifUrl);
    divBody.append(title, author, date, textCont, gif);
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
    let inputForm = makeElement("input", "input-form");
    inputForm.setAttribute("type","text");
    inputForm.setAttribute("name","comment");

    let commentBtn = makeElement("input", 'comment-btn');
    commentBtn.setAttribute("type", "submit");
    commentBtn.setAttribute("value", "Add Comment");
    commentForm.append(inputForm, commentBtn);
    commentForm.addEventListener('submit', e => makeComment(e));
    divComment.append(commentSection, commentForm);
    return divComment;
}

// function appendPost(data){
//     let container = document.querySelector("main");
//
//     for (let i = 0; i < data.length; i++){
//         let post = data[i]
//
//         let article = document.createElement('article');
//         article.setAttribute('id', post.id)
//
//         let divBody = document.createElement("div");
//         divBody.setAttribute("class", "post");
//
//         divBody.append(title, author, date, textCont)
//
//         let title = document.createElement('p');
//         title.textContent = post.title;
//         let textCont = document.createElement('p');
//         textCont.innerText = post.text;
//         let author = document.createElement('p');
//         author.innerText = post.author;
//         let date = document.createElement('p');
//         date.innerText = `Date added: ${post.date}`;
//
//         let divReact = document.createElement('div');
//
//         let likeBtn = document.createElement('button');
//         let cryBtn = document.createElement('button');
//         let smileBtn = document.createElement('button');
//
//         likeBtn.addEventListener('click', e => sendLike(e));
//         likeBtn.textContent = String.fromCodePoint(0x1F44D);
//         likeBtn.setAttribute('class', 'likes');
//         cryBtn.addEventListener('click', e => sendCry(e));
//         cryBtn.textContent = String.fromCodePoint(0x1F62D);
//         smileBtn.addEventListener('click', e => sendSmile(e));
//         smileBtn.textContent = String.fromCodePoint(0x1F603);
//
//
//
//         let divComment = document.createElement('div');
//         divReact.append(likeBtn, cryBtn, smileBtn);
//         let commentForm = document.createElement("form");
//         commentForm.setAttribute('name', post.id)
//         let inputForm = document.createElement("input");
//         inputForm.setAttribute("type","text");
//         inputForm.setAttribute("class","input-form");
//         inputForm.setAttribute("name","comment");
//
//         let commentBtn = document.createElement("input");
//         // commentBtn.textContent = "Comment";
//         commentBtn.setAttribute("type", "submit");
//         commentBtn.setAttribute("class", "comment-btn");
//
//         commentForm.appendChild( commentBtn);
//         commentForm.appendChild(inputForm);
//
//         commentForm.addEventListener('submit', e => makeComment(e));
//         let commentSection = document.createElement("div");
//         commentSection.setAttribute("class", "comment");
//
//         for (let x = 0; x < post.comments.length; x++ ){
//             let comments = document.createElement("p");
//             comments.textContent = post.comments[x];
//             commentSection.appendChild(comments);
//         }
//
//         divComment.append(commentSection, commentForm);
//         article.append(divBody, divReact, divComment)
//         container.appendChild(article);
//     }
// }

let url =  "https://hakema-server.herokuapp.com";
async function sendLike(e) {
    e.preventDefault();
    let button = e.target;
    let id = button.closest('article');
    const reaction = button.getAttribute('class');
    console.log(id.id);
    console.log(button.getAttribute('class'));
    let options = {
        method: "PUT",
        headers: { 'Content-Type':'application/json'}
    }
    await fetch(`${url}/posts/${id.id}/${reaction}`, options)
}


async function makeComment(e){
    e.preventDefault();
    const comment = e.target[1].value;
    let id = e.target.name;
    let commentInput = document.querySelector(`form[name="${e.target.name}"]`);
    // console.log(id);
    // console.log(comment);
    // // let postId = commentInput.closest("article").id
    // console.log(postId);
    const options = {
        method: "PUT",
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({"comment": comment})
    }
    // console.log(`${url}/posts/${id}/comment`);

    try {
        await fetch(`${url}/posts/${id}/comment`, options);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { appendPost }
