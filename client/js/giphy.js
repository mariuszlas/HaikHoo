import { renderGrid } from '@giphy/js-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch('O7Ofqkzvt4QDkaCmkpVX4peQwtxjLz1M')

const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 })

let test = renderGrid({width:800, fetchGifs }, targetE1)



modules.export = test

// function giphFetch(){
// let gifSearch = document.querySelector('#gifSearch').value
// let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=5&rating=pg-13&q=${gifSearch}`
// fetch(url)
// .then(resp => resp.json())
// .then(data => console.log(data))

