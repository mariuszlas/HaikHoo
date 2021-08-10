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
        title.innertext = post.title;
        let textCont = document.createElement('p');
        textCont.innerText = post.text;
        let author = document.createElement('p');
        author.innerText = post.author;
        let date = document.createElement('p');
        date.innerText = `Date added: ${post.date}`;
        divBody.append(title, author, date, textCont)
        // divBody.textContent = `${post.author} ${post.title} ${post.text}`
        let divReact = document.createElement('div');

        let divComment = document.createElement('div');
        let commentBtn = document.createElement("button");
        commentBtn.textContent = "Comment";
        commentBtn.setAttribute("class", "comment-btn");
        let commentForm = document.createElement("input");
        commentForm.setAttribute("type","text");
        commentForm.setAttribute("class","comment-form");

        // container.appendChild(div);
        // container.appendChild(commentForm);
        // container.appendChild(commentBtn);

        commentBtn.addEventListener('click', e => makeComment(e));
        let commentSection = document.createElement("div");
        commentSection.setAttribute("class", "comment");

        for (let x = 0; x < post.comments.length; x++ ){
            let comments = document.createElement("div");
            comments.textContent = post.comments[x];
            commentSection.appendChild(comments);
        }
        divComment.append(commentForm, commentBtn);
        article.append(divBody, divReact, divComment)
        container.appendChild(article);
        //
        // container.appendChild(commentSection);
        // container.setAttribute("class", "post-container");
        // container.setAttribute("id", post.id);
    }
}

// const commentBtn = document.querySelector(".comment-btn");

// commentBtn.addEventListener('click', post);
//
// function makeComment(e){
//     e.preventDefault();
//     let commentInput = document.getElementsByClassName('comment-form').value;
//     const data = commentInput
//     const postId = commentInput.closest(".post-container").id
//     fetch(`http://localhost:3000/posts/${postId}`,{
//         method: "POST",
//         headers:{
//             'Content-Type':'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error)=>{
//         console.error('Error:', error);
//     });
// };



displayPost();


initBindings();
