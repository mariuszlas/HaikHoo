const { appendPost } = require('./mainHandlers')
const { collapseForm } = require('./formHandlers');
const { Data } = require('./helpers.js');

let url =  "https://haikhoo-server.herokuapp.com";
<<<<<<< HEAD
let pageCounter = 0;
let startIndex = 0;
=======
// let pageCounter = 0;
// let startIndex = 0;
>>>>>>> 715a8b065ea8ec7466cd0ad14c47becbd43d2ade



// function displayPost(){
//     fetch(`${url}/posts`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         appendPost(data, 1, 0)
//     })
//     .catch(err => console.log(err));
// }

function postPoem(title, poem, giphyURL) {
    let data = new Data(title, poem, giphyURL)
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    }
<<<<<<< HEAD
    fetch('https://haikhoo-server.herokuapp.com/posts', options)
=======
    fetch(`${url}/posts`, options)
>>>>>>> 715a8b065ea8ec7466cd0ad14c47becbd43d2ade
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


/////////////////  TEMPORAIRLY MOVED TO mainHandlers.js ////////////////////////////
// async function sendLike(e) {
//     e.preventDefault();
//     let button = e.target.getAttribute('class');
//     let id = button.closest('article');
//     console.log(id.id);
//     console.log(button);
//     let options = {
//         method: "PUT",
//         headers: { 'Content-Type':'application/json'}
//     }
//     await fetch(`${url}/posts/${id.id}/likes`, options)
// }
//////////////////////////////////////////////////////////////////////////////////


async function fetchGif(userInput) {
    const APIKEY = '1GZ3I3ZbWKLBCfC7UFrN1yWVhQkONQ32'
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${userInput}&rating=pg-13&limit=5`
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
