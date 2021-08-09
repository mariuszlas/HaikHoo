const { randomName } = require("../username_generator/nameGenerator");

//show the form
document.querySelector('#makePost').addEventListener('click', showForm)

function showForm(e) {
    e.preventDefault();
    let form = document.createElement('form')
    let titleField = makeElement('input', 'text', 'poemTitle', '')
    let poemField = makeElement('input', 'text', 'userPoem', '')
    let makePost = makeElement('input', 'submit', 'submitPoem', 'post')
    document.querySelector('body').appendChild(form)
    form.appendChild(titleField)
    form.appendChild(poemField)
    form.appendChild(makePost)
    document.querySelector('#submitPoem').addEventListener('click', postPoem)
}

function makeElement(element, type, id, value) {
    newElement = document.createElement(element)
    newElement.setAttribute('type', type);
    newElement.setAttribute('id', id);
    newElement.setAttribute('value', value);
    return newElement;
}



//add event listener to submit button
// document.querySelector('#submitPoem').addEventListener('click', postPoem)

function postPoem(e) {
    e.preventDefault();
    let title = document.querySelector('#poemTitle').value;
    let poem = document.querySelector('#userPoem').value;

    try {
        checkValidity(title, poem)
    } catch (err) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = err
        document.querySelector('form').appendChild(errorMessage)
        console.log('whoops', err)
        return;
    }
    function formatDate() {
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        return `${dd}${mm}${yyyy}`;
    }
    let data = {
        "author": randomName(),
        "title": "elizabeth",
        "body": "bob",
        "date": formatDate()
    }

    console.log(data);

    fetch('http://localhost:3000/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    console.log('sent!')


}

function checkValidity(title, poem) {
    if (title.length == 0) {
        throw new Error('please enter a title')
    }

    if (poem.length == 0) {
        throw new Error(`you haven't written your poem yet!`)
    }
}