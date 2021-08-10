const {Data, postPoem} = require('./model')

function checkPoem(e) {
    e.preventDefault();
    console.log(e);
    let title = e.target.poemTitle.value;
    let poem = e.target.userPoem.value;
    let gif = document.querySelector('#selectedGif img')
    gif ? giphyURL = gif.getAttribute('src') : giphyURL = ''
    try {
        postValidity(title, poem)
        postPoem(title, poem, giphyURL)
    } catch (err) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = err
        document.querySelector('form').appendChild(errorMessage)
        console.log('whoops', err)
        return;
    }
}


function postValidity(title, poem) {
    if (title.length == 0) {
        throw new Error('please enter a title')
    }
    if (poem.length == 0) {
        throw new Error(`you haven't written your poem yet!`)
    }
}

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
}

module.exports = { fetchGif, postPoem, checkPoem }