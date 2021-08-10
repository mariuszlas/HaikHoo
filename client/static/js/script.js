const controller = require('./controller')
const { makeElement } = require('./model')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', showForm);

}

function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    form.setAttribute("id", "new-post-form");
    let titleField = makeElement('input', 'text', 'poemTitle')
    titleField.setAttribute('name', 'poemTitle')
    let labelTitle = makeElement('label');
    labelTitle.setAttribute("name", "poemTitle");
    labelTitle.innerText = "Title  ";
    let poemField = makeElement('input', 'text', 'userPoem');
    poemField.setAttribute("name", "userPoem")
    let labelPoem = makeElement('label');
    labelPoem.setAttribute("name", "poemTitle");
    labelPoem.innerText = "Your Poem:  ";
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    let searchGif = makeElement('input', 'submit', 'addGif', 'gif?')
    let counterArea = document.createElement("span");
    let selectedGif = document.createElement('span');
    selectedGif.setAttribute('id', 'selectedGif');
    counterArea.setAttribute("id", "counter");
    document.querySelector('body').appendChild(form)
    form.append(labelTitle, titleField, labelPoem, poemField, counterArea, makePost, selectedGif, searchGif);
    formBtnsListeners();
}

function formBtnsListeners() {
    document.querySelector('#new-post-form').addEventListener('submit', controller.checkPoem)
    document.querySelector('#addGif').addEventListener('click', showGifForm);
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


function counter(e) {
    e.preventDefault();
    const max = 500;
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}


let url =  "https://hakema-server.herokuapp.com";

function displayPost(){
    fetch(`${url}/posts`)
    .then(res => res.json())
    .then(data => appendPost(data))
    .catch(err => console.log(err));
}

function appendPost(data){
    let container = document.getElementById("posts");

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
        divBody.append(title, author, date, textCont)
        let divReact = document.createElement('div');

        let likeBtn = document.createElement('button');
        let cryBtn = document.createElement('button');
        let smileBtn = document.createElement('button');

        let divComment = document.createElement('div');
        divReact.append(likeBtn, cryBtn, smileBtn);
        likeBtn.addEventListener('click', e => sendLike(e));
        likeBtn.textContent = String.fromCodePoint(0x1F44D);
        cryBtn.addEventListener('click', e => sendCry(e));
        cryBtn.textContent = String.fromCodePoint(0x1F62D);
        smileBtn.addEventListener('click', e => sendSmile(e));
        smileBtn.textContent = String.fromCodePoint(0x1F603);

        let commentForm = document.createElement("form");
        commentForm.setAttribute('name', post.id)
        let inputForm = document.createElement("input");
        inputForm.setAttribute("type","text");
        inputForm.setAttribute("class","input-form");
        inputForm.setAttribute("name","comment");

        let commentBtn = document.createElement("input");
        // commentBtn.textContent = "Comment";
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

// const commentBtn = document.querySelector(".comment-btn");
//
// commentBtn.addEventListener('click', post);

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

async function sendLike(e) {
    e.preventDefault();
    let button = e.target;
    let id = button.closest('article');
    console.log(id.id)
    let options = {
        method: "PUT",
        headers: { 'Content-Type':'application/json'}
    }
    await fetch(`${url}/posts/${id.id}/likes`, options)
}

displayPost();


initBindings();
