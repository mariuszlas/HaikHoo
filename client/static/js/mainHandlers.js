// const handlers = require('./requestHandlers.js')


function appendPost(data){
    data.reverse()
    let container = document.querySelector("main");

    for (let i = 0; i < data.length; i++){
        let post = data[i]
        let article = document.createElement('article');
        article.setAttribute('id', post.id)

        let divBody = document.createElement("div");
        divBody.setAttribute("class", "post");

        let title = document.createElement('p');
        title.textContent = post.title;
        let textCont = document.createElement('p');
        textCont.innerText = post.text;
        let author = document.createElement('p');
        author.innerText = post.author;
        let date = document.createElement('p');
        date.innerText = `Date added: ${post.date}`;
        let gif = document.createElement('img');
        gif.setAttribute('src', post.gifUrl);
        divBody.append(title, author, date, textCont, gif);

        let divReact = document.createElement('div');
        let spanEmoji = document.createElement('span');

        let likeBtn = document.createElement('button');
        let cryBtn = document.createElement('button');
        let smileBtn = document.createElement('button');

        likeBtn.addEventListener('click', e => {sendLike(e)});
        likeBtn.setAttribute('class', 'likes')
        likeBtn.textContent = String.fromCodePoint(0x1F44D);
        cryBtn.addEventListener('click',   e => {sendLike(e)});
        cryBtn.textContent = String.fromCodePoint(0x1F62D);
        smileBtn.addEventListener('click',  e => {sendLike(e)});
        smileBtn.textContent = String.fromCodePoint(0x1F603);
        let showComBtn = document.createElement('button');
        showComBtn.textContent = 'Show/Add Comments';
        showComBtn.addEventListener('click', e => showComSection(e));

        spanEmoji.append(likeBtn, cryBtn, smileBtn);


        let divComment = document.createElement('div');
        divComment.setAttribute('class', 'comments-div');

        let commentForm = document.createElement("form");
        commentForm.setAttribute('name', post.id)
        let inputForm = document.createElement("input");
        inputForm.setAttribute("type","text");
        inputForm.setAttribute("class","input-form");
        inputForm.setAttribute("name","comment");
        divReact.append(spanEmoji, showComBtn)

        let commentBtn = document.createElement("input");
        commentBtn.textContent = "Comment";
        commentBtn.setAttribute("type", "submit");
        commentBtn.setAttribute("class", "comment-btn");

        commentForm.appendChild( commentBtn);
        commentForm.appendChild(inputForm);

        commentForm.addEventListener('submit', e => makeComment(e));
        let commentSection = document.createElement("div");
        commentSection.setAttribute("class", "comment");

        for (let x = 0; x < post.comments.length; x++ ){
            let comments = document.createElement("p");
            comments.textContent = post.comments[x];
            commentSection.appendChild(comments);
        }
        divComment.append(commentSection, commentForm);
        article.append(divBody, divReact, divComment)
        container.appendChild(article);
    }
}

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

function showComSection(e) {
    e.preventDefault();
    letComSection = document.querySelector('#comments-div')
}

// function makeElement(element, className, textCont=null) {
//     newElement = document.createElement(element)
//     newElement.setAttribute('class', className);
//     textCont ? newElement.textContent = textCont: null;
//     return newElement;
// }

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


module.exports = { appendPost }
