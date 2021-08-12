(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { postValidity, makeElement, counter, scrollToTop } = require('./helpers.js')
const { postPoem, fetchGif } = require('./requestHandlers.js')
const { displayPost } = require('./mainHandlers')

function showForm(e) {
    e.preventDefault();
    scrollToTop()
    let postForm = document.querySelector('#new-post-form');
    postForm.style.display = "block";
    formBtnsListeners(postForm);
}


function formBtnsListeners(form) {
    form.addEventListener('submit', e => checkPoem(e, form))
    document.querySelector('#addGif').addEventListener('click', e => showGifForm(e));
    document.querySelector('#closeForm').addEventListener('click', () => clearForm(form))
    let textArea = document.querySelector('#userPoem');
    textArea.addEventListener("keyup", e => counter(e));
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
        document.querySelector('form').append(gifForm);
        document.querySelector('#gifSearch').addEventListener('click', displayGif)
    }
    else {
        document.querySelector('#gifForm').remove()
    }

}

async function displayGif(e) {
    e.preventDefault()
    document.querySelector("#gifContainer").textContent = "";
    let userInput = document.querySelector('#gifWord').value;
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
    console.log(e)
    let gifPath = e.target.src
    console.log(gifPath)
    document.querySelector("#selectedGif").textContent = "";
    let previewGif = document.createElement('img')
    previewGif.setAttribute('src', gifPath)
    document.querySelector('#selectedGif').append(previewGif)
    document.querySelector('#gifForm').remove();

}

function checkPoem(e, poemForm) {
    e.preventDefault();
    console.log(e);
    let title = e.target.poemTitle.value;
    let poem = e.target.userPoem.value;
    let gif = document.querySelector('#selectedGif img')
    gif ? giphyURL = gif.getAttribute('src') : giphyURL = ''
    try {
        postValidity(title, poem)
    } catch (err) {
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
        document.querySelector('.loader').remove()
        document.querySelectorAll('article').forEach(article => article.remove())
        displayPost()}, 1500);

}





function clearForm(form) {
    form.reset();
    form.querySelector('#selectedGif').textContent = "";
    form.querySelector('#counter').textContent = "";
    form.style.display = "none";
}


module.exports = { showForm, checkPoem, formBtnsListeners };

},{"./helpers.js":2,"./mainHandlers":4,"./requestHandlers.js":6}],2:[function(require,module,exports){
const {adjectives, animals} = require('./nameData')

function formatDate() {
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return `${dd}/${mm}/${yyyy}`;
}

class Data {
    constructor(title, poem, giphyURL){
        this.author = randomName();
        this.title = title;
        this.text = poem;
        this.gifUrl = giphyURL;
        this.date = formatDate();
    }
}

function postValidity(title, poem) {
    console.log(poem)
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
    const max = 500;
    let textLen = e.target.value.length;
    let span = document.querySelector('#counter');
    span.innerText = `${textLen}/500`;
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

let randomName = () => {
    let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdjective} ${randomAnimal}`
}


module.exports = { Data, makeElement, formatDate, postValidity, counter, scrollToTop, randomName }

},{"./nameData":5}],3:[function(require,module,exports){

const { showForm } = require('./formHandlers.js')
const { extendPage, displayPost} = require('./mainHandlers.js')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', e => showForm(e));
    document.querySelector('#showMorePosts').addEventListener('click', e => extendPage(e));

}

displayPost(1, 0);
initBindings();

},{"./formHandlers.js":1,"./mainHandlers.js":4}],4:[function(require,module,exports){
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

module.exports = { createComSection, sendLike, makeComment, appendPost, extendPage, displayPost, extendPage, makeElement, createBody, createReactions }

},{}],5:[function(require,module,exports){
let animals =
    [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",
        "Bee",
        "Bison",
        "Boar",
        "Buffalo",
        "Butterfly",
        "Camel",
        "Capybara",
        "Caribou",
        "Cassowary",
        "Cat",
        "Caterpillar",
        "Cattle",
        "Chamois",
        "Cheetah",
        "Chicken",
        "Chimpanzee",
        "Chinchilla",
        "Chough",
        "Clam",
        "Cobra",
        "Cockroach",
        "Cod",
        "Cormorant",
        "Coyote",
        "Crab",
        "Crane",
        "Crocodile",
        "Crow",
        "Curlew",
        "Deer",
        "Dinosaur",
        "Dog",
        "Dogfish",
        "Dolphin",
        "Dotterel",
        "Dove",
        "Dragonfly",
        "Duck",
        "Dugong",
        "Dunlin",
        "Eagle",
        "Echidna",
        "Eel",
        "Eland",
        "Elephant",
        "Elk",
        "Emu",
        "Falcon",
        "Ferret",
        "Finch",
        "Fish",
        "Flamingo",
        "Fly",
        "Fox",
        "Frog",
        "Gaur",
        "Gazelle",
        "Gerbil",
        "Giraffe",
        "Gnat",
        "Gnu",
        "Goat",
        "Goldfinch",
        "Goldfish",
        "Goose",
        "Gorilla",
        "Goshawk",
        "Grasshopper",
        "Grouse",
        "Guanaco",
        "Gull",
        "Hamster",
        "Hare",
        "Hawk",
        "Hedgehog",
        "Heron",
        "Herring",
        "Hippopotamus",
        "Hornet",
        "Horse",
        "Human",
        "Hummingbird",
        "Hyena",
        "Ibex",
        "Ibis",
        "Jackal",
        "Jaguar",
        "Jay",
        "Jellyfish",
        "Kangaroo",
        "Kingfisher",
        "Koala",
        "Kookabura",
        "Kouprey",
        "Kudu",
        "Lapwing",
        "Lark",
        "Lemur",
        "Leopard",
        "Lion",
        "Llama",
        "Lobster",
        "Locust",
        "Loris",
        "Louse",
        "Lyrebird",
        "Magpie",
        "Mallard",
        "Manatee",
        "Mandrill",
        "Mantis",
        "Marten",
        "Meerkat",
        "Mink",
        "Mole",
        "Mongoose",
        "Monkey",
        "Moose",
        "Mosquito",
        "Mouse",
        "Mule",
        "Narwhal",
        "Newt",
        "Nightingale",
        "Octopus",
        "Okapi",
        "Opossum",
        "Oryx",
        "Ostrich",
        "Otter",
        "Owl",
        "Oyster",
        "Panther",
        "Parrot",
        "Partridge",
        "Peafowl",
        "Pelican",
        "Penguin",
        "Pheasant",
        "Pig",
        "Pigeon",
        "Pony",
        "Porcupine",
        "Porpoise",
        "Quail",
        "Quelea",
        "Quetzal",
        "Rabbit",
        "Raccoon",
        "Rail",
        "Ram",
        "Rat",
        "Raven",
        "Reindeer",
        "Rhinoceros",
        "Rook",
        "Salamander",
        "Salmon",
        "Sandpiper",
        "Sardine",
        "Scorpion",
        "Seahorse",
        "Seal",
        "Shark",
        "Sheep",
        "Shrew",
        "Skunk",
        "Snail",
        "Snake",
        "Sparrow",
        "Spider",
        "Spoonbill",
        "Squid",
        "Squirrel",
        "Starling",
        "Stingray",
        "Stinkbug",
        "Stork",
        "Swallow",
        "Swan",
        "Tapir",
        "Tarsier",
        "Termite",
        "Tiger",
        "Toad",
        "Trout",
        "Turkey",
        "Turtle",
        "Viper",
        "Vulture",
        "Wallaby",
        "Walrus",
        "Wasp",
        "Weasel",
        "Whale",
        "Wildcat",
        "Wolf",
        "Wolverine",
        "Wombat",
        "Woodcock",
        "Woodpecker",
        "Worm",
        "Wren",
        "Yak",
        "Zebra"
    ]

let adjectives =
    [
        "abandoned",
        "able",
        "absolute",
        "adorable",
        "adventurous",
        "academic",
        "acceptable",
        "acclaimed",
        "accomplished",
        "accurate",
        "aching",
        "acidic",
        "acrobatic",
        "active",
        "actual",
        "adept",
        "admirable",
        "admired",
        "adolescent",
        "adorable",
        "adored",
        "advanced",
        "afraid",
        "affectionate",
        "aged",
        "aggravating",
        "aggressive",
        "agile",
        "agitated",
        "agonizing",
        "agreeable",
        "ajar",
        "alarmed",
        "alarming",
        "alert",
        "alienated",
        "alive",
        "all",
        "altruistic",
        "amazing",
        "ambitious",
        "ample",
        "amused",
        "amusing",
        "anchored",
        "ancient",
        "angelic",
        "angry",
        "anguished",
        "animated",
        "annual",
        "another",
        "antique",
        "anxious",
        "any",
        "apprehensive",
        "appropriate",
        "apt",
        "arctic",
        "arid",
        "aromatic",
        "artistic",
        "ashamed",
        "assured",
        "astonishing",
        "athletic",
        "attached",
        "attentive",
        "attractive",
        "austere",
        "authentic",
        "authorized",
        "automatic",
        "avaricious",
        "average",
        "aware",
        "awesome",
        "awful",
        "awkward",
        "babyish",
        "bad",
        "back",
        "baggy",
        "bare",
        "barren",
        "basic",
        "beautiful",
        "belated",
        "beloved",
        "beneficial",
        "better",
        "best",
        "bewitched",
        "big",
        "big-hearted",
        "biodegradable",
        "bite-sized",
        "bitter",
        "black",
        "black-and-white",
        "bland",
        "blank",
        "blaring",
        "bleak",
        "blind",
        "blissful",
        "blond",
        "blue",
        "blushing",
        "bogus",
        "boiling",
        "bold",
        "bony",
        "boring",
        "bossy",
        "both",
        "bouncy",
        "bountiful",
        "bowed",
        "brave",
        "breakable",
        "brief",
        "bright",
        "brilliant",
        "brisk",
        "broken",
        "bronze",
        "brown",
        "bruised",
        "bubbly",
        "bulky",
        "bumpy",
        "buoyant",
        "burdensome",
        "burly",
        "bustling",
        "busy",
        "buttery",
        "buzzing",
        "calculating",
        "calm",
        "candid",
        "canine",
        "capital",
        "carefree",
        "careful",
        "careless",
        "caring",
        "cautious",
        "cavernous",
        "celebrated",
        "charming",
        "cheap",
        "cheerful",
        "cheery",
        "chief",
        "chilly",
        "chubby",
        "circular",
        "classic",
        "clean",
        "clear",
        "clear-cut",
        "clever",
        "close",
        "closed",
        "cloudy",
        "clueless",
        "clumsy",
        "cluttered",
        "coarse",
        "cold",
        "colorful",
        "colorless",
        "colossal",
        "comfortable",
        "common",
        "compassionate",
        "competent",
        "complete",
        "complex",
        "complicated",
        "composed",
        "concerned",
        "concrete",
        "confused",
        "conscious",
        "considerate",
        "constant",
        "content",
        "conventional",
        "cooked",
        "cool",
        "cooperative",
        "coordinated",
        "corny",
        "corrupt",
        "costly",
        "courageous",
        "courteous",
        "crafty",
        "crazy",
        "creamy",
        "creative",
        "creepy",
        "criminal",
        "crisp",
        "critical",
        "crooked",
        "crowded",
        "cruel",
        "crushing",
        "cuddly",
        "cultivated",
        "cultured",
        "cumbersome",
        "curly",
        "curvy",
        "cute",
        "cylindrical",
        "damaged",
        "damp",
        "dangerous",
        "dapper",
        "daring",
        "darling",
        "dark",
        "dazzling",
        "dead",
        "deadly",
        "deafening",
        "dear",
        "dearest",
        "decent",
        "decimal",
        "decisive",
        "deep",
        "defenseless",
        "defensive",
        "defiant",
        "deficient",
        "definite",
        "definitive",
        "delayed",
        "delectable",
        "delicious",
        "delightful",
        "delirious",
        "demanding",
        "dense",
        "dental",
        "dependable",
        "dependent",
        "descriptive",
        "deserted",
        "detailed",
        "determined",
        "devoted",
        "different",
        "difficult",
        "digital",
        "diligent",
        "dim",
        "dimpled",
        "dimwitted",
        "direct",
        "disastrous",
        "discrete",
        "disfigured",
        "disgusting",
        "disloyal",
        "dismal",
        "distant",
        "downright",
        "dreary",
        "dirty",
        "disguised",
        "dishonest",
        "dismal",
        "distant",
        "distinct",
        "distorted",
        "dizzy",
        "dopey",
        "doting",
        "double",
        "downright",
        "drab",
        "drafty",
        "dramatic",
        "dreary",
        "droopy",
        "dry",
        "dual",
        "dull",
        "dutiful",
        "each",
        "eager",
        "earnest",
        "early",
        "easy",
        "easy-going",
        "ecstatic",
        "edible",
        "educated",
        "elaborate",
        "elastic",
        "elated",
        "elderly",
        "electric",
        "elegant",
        "elementary",
        "elliptical",
        "embarrassed",
        "embellished",
        "eminent",
        "emotional",
        "empty",
        "enchanted",
        "enchanting",
        "energetic",
        "enlightened",
        "enormous",
        "enraged",
        "entire",
        "envious",
        "equal",
        "equatorial",
        "essential",
        "esteemed",
        "ethical",
        "euphoric",
        "even",
        "evergreen",
        "everlasting",
        "every",
        "evil",
        "exalted",
        "excellent",
        "exemplary",
        "exhausted",
        "excitable",
        "excited",
        "exciting",
        "exotic",
        "expensive",
        "experienced",
        "expert",
        "extraneous",
        "extroverted",
        "extra-large",
        "extra-small",
        "fabulous",
        "failing",
        "faint",
        "fair",
        "faithful",
        "fake",
        "false",
        "familiar",
        "famous",
        "fancy",
        "fantastic",
        "far",
        "faraway",
        "far-flung",
        "far-off",
        "fast",
        "fat",
        "fatal",
        "fatherly",
        "favorable",
        "favorite",
        "fearful",
        "fearless",
        "feisty",
        "feline",
        "female",
        "feminine",
        "few",
        "fickle",
        "filthy",
        "fine",
        "finished",
        "firm",
        "first",
        "firsthand",
        "fitting",
        "fixed",
        "flaky",
        "flamboyant",
        "flashy",
        "flat",
        "flawed",
        "flawless",
        "flickering",
        "flimsy",
        "flippant",
        "flowery",
        "fluffy",
        "fluid",
        "flustered",
        "focused",
        "fond",
        "foolhardy",
        "foolish",
        "forceful",
        "forked",
        "formal",
        "forsaken",
        "forthright",
        "fortunate",
        "fragrant",
        "frail",
        "frank",
        "frayed",
        "free",
        "French",
        "fresh",
        "frequent",
        "friendly",
        "frightened",
        "frightening",
        "frigid",
        "frilly",
        "frizzy",
        "frivolous",
        "front",
        "frosty",
        "frozen",
        "frugal",
        "fruitful",
        "full",
        "fumbling",
        "functional",
        "funny",
        "fussy",
        "fuzzy",
        "gargantuan",
        "gaseous",
        "general",
        "generous",
        "gentle",
        "genuine",
        "giant",
        "giddy",
        "gigantic",
        "gifted",
        "giving",
        "glamorous",
        "glaring",
        "glass",
        "gleaming",
        "gleeful",
        "glistening",
        "glittering",
        "gloomy",
        "glorious",
        "glossy",
        "glum",
        "golden",
        "good",
        "good-natured",
        "gorgeous",
        "graceful",
        "gracious",
        "grand",
        "grandiose",
        "granular",
        "grateful",
        "grave",
        "gray",
        "great",
        "greedy",
        "green",
        "gregarious",
        "grim",
        "grimy",
        "gripping",
        "grizzled",
        "gross",
        "grotesque",
        "grouchy",
        "grounded",
        "growing",
        "growling",
        "grown",
        "grubby",
        "gruesome",
        "grumpy",
        "guilty",
        "gullible",
        "gummy",
        "hairy",
        "half",
        "handmade",
        "handsome",
        "handy",
        "happy",
        "happy-go-lucky",
        "hard",
        "hard-to-find",
        "harmful",
        "harmless",
        "harmonious",
        "harsh",
        "hasty",
        "hateful",
        "haunting",
        "healthy",
        "heartfelt",
        "hearty",
        "heavenly",
        "heavy",
        "hefty",
        "helpful",
        "helpless",
        "hidden",
        "hideous",
        "high",
        "high-level",
        "hilarious",
        "hoarse",
        "hollow",
        "homely",
        "honest",
        "honorable",
        "honored",
        "hopeful",
        "horrible",
        "hospitable",
        "hot",
        "huge",
        "humble",
        "humiliating",
        "humming",
        "humongous",
        "hungry",
        "hurtful",
        "husky",
        "icky",
        "icy",
        "ideal",
        "idealistic",
        "identical",
        "idle",
        "idiotic",
        "idolized",
        "ignorant",
        "ill",
        "illegal",
        "ill-fated",
        "ill-informed",
        "illiterate",
        "illustrious",
        "imaginary",
        "imaginative",
        "immaculate",
        "immaterial",
        "immediate",
        "immense",
        "impassioned",
        "impeccable",
        "impartial",
        "imperfect",
        "imperturbable",
        "impish",
        "impolite",
        "important",
        "impossible",
        "impractical",
        "impressionable",
        "impressive",
        "improbable",
        "impure",
        "inborn",
        "incomparable",
        "incompatible",
        "incomplete",
        "inconsequential",
        "incredible",
        "indelible",
        "inexperienced",
        "indolent",
        "infamous",
        "infantile",
        "infatuated",
        "inferior",
        "infinite",
        "informal",
        "innocent",
        "insecure",
        "insidious",
        "insignificant",
        "insistent",
        "instructive",
        "insubstantial",
        "intelligent",
        "intent",
        "intentional",
        "interesting",
        "internal",
        "international",
        "intrepid",
        "ironclad",
        "irresponsible",
        "irritating",
        "itchy",
        "jaded",
        "jagged",
        "jam-packed",
        "jaunty",
        "jealous",
        "jittery",
        "joint",
        "jolly",
        "jovial",
        "joyful",
        "joyous",
        "jubilant",
        "judicious",
        "juicy",
        "jumbo",
        "junior",
        "jumpy",
        "juvenile",
        "kaleidoscopic",
        "keen",
        "key",
        "kind",
        "kindhearted",
        "kindly",
        "klutzy",
        "knobby",
        "knotty",
        "knowledgeable",
        "knowing",
        "known",
        "kooky",
        "kosher",
        "lame",
        "lanky",
        "large",
        "last",
        "lasting",
        "late",
        "lavish",
        "lawful",
        "lazy",
        "leading",
        "lean",
        "leafy",
        "left",
        "legal",
        "legitimate",
        "light",
        "lighthearted",
        "likable",
        "likely",
        "limited",
        "limp",
        "limping",
        "linear",
        "lined",
        "liquid",
        "little",
        "live",
        "lively",
        "livid",
        "loathsome",
        "lone",
        "lonely",
        "long",
        "long-term",
        "loose",
        "lopsided",
        "lost",
        "loud",
        "lovable",
        "lovely",
        "loving",
        "low",
        "loyal",
        "lucky",
        "lumbering",
        "luminous",
        "lumpy",
        "lustrous",
        "luxurious",
        "mad",
        "made-up",
        "magnificent",
        "majestic",
        "major",
        "male",
        "mammoth",
        "married",
        "marvelous",
        "masculine",
        "massive",
        "mature",
        "meager",
        "mealy",
        "mean",
        "measly",
        "meaty",
        "medical",
        "mediocre",
        "medium",
        "meek",
        "mellow",
        "melodic",
        "memorable",
        "menacing",
        "merry",
        "messy",
        "metallic",
        "mild",
        "milky",
        "mindless",
        "miniature",
        "minor",
        "minty",
        "miserable",
        "miserly",
        "misguided",
        "misty",
        "mixed",
        "modern",
        "modest",
        "moist",
        "monstrous",
        "monthly",
        "monumental",
        "moral",
        "mortified",
        "motherly",
        "motionless",
        "mountainous",
        "muddy",
        "muffled",
        "multicolored",
        "mundane",
        "murky",
        "mushy",
        "musty",
        "muted",
        "mysterious",
        "naive",
        "narrow",
        "nasty",
        "natural",
        "naughty",
        "nautical",
        "near",
        "neat",
        "necessary",
        "needy",
        "negative",
        "neglected",
        "negligible",
        "neighboring",
        "nervous",
        "new",
        "next",
        "nice",
        "nifty",
        "nimble",
        "nippy",
        "nocturnal",
        "noisy",
        "nonstop",
        "normal",
        "notable",
        "noted",
        "noteworthy",
        "novel",
        "noxious",
        "numb",
        "nutritious",
        "nutty",
        "obedient",
        "obese",
        "oblong",
        "oily",
        "oblong",
        "obvious",
        "occasional",
        "odd",
        "oddball",
        "offbeat",
        "offensive",
        "official",
        "old",
        "old-fashioned",
        "only",
        "open",
        "optimal",
        "optimistic",
        "opulent",
        "orange",
        "orderly",
        "organic",
        "ornate",
        "ornery",
        "ordinary",
        "original",
        "other",
        "our",
        "outlying",
        "outgoing",
        "outlandish",
        "outrageous",
        "outstanding",
        "oval",
        "overcooked",
        "overdue",
        "overjoyed",
        "overlooked",
        "palatable",
        "pale",
        "paltry",
        "parallel",
        "parched",
        "partial",
        "passionate",
        "past",
        "pastel",
        "peaceful",
        "peppery",
        "perfect",
        "perfumed",
        "periodic",
        "perky",
        "personal",
        "pertinent",
        "pesky",
        "pessimistic",
        "petty",
        "phony",
        "physical",
        "piercing",
        "pink",
        "pitiful",
        "plain",
        "plaintive",
        "plastic",
        "playful",
        "pleasant",
        "pleased",
        "pleasing",
        "plump",
        "plush",
        "polished",
        "polite",
        "political",
        "pointed",
        "pointless",
        "poised",
        "poor",
        "popular",
        "portly",
        "posh",
        "positive",
        "possible",
        "potable",
        "powerful",
        "powerless",
        "practical",
        "precious",
        "present",
        "prestigious",
        "pretty",
        "precious",
        "previous",
        "pricey",
        "prickly",
        "primary",
        "prime",
        "pristine",
        "private",
        "prize",
        "probable",
        "productive",
        "profitable",
        "profuse",
        "proper",
        "proud",
        "prudent",
        "punctual",
        "pungent",
        "puny",
        "pure",
        "purple",
        "pushy",
        "putrid",
        "puzzled",
        "puzzling",
        "quaint",
        "qualified",
        "quarrelsome",
        "quarterly",
        "queasy",
        "querulous",
        "questionable",
        "quick",
        "quick-witted",
        "quiet",
        "quintessential",
        "quirky",
        "quixotic",
        "quizzical",
        "radiant",
        "ragged",
        "rapid",
        "rare",
        "rash",
        "raw",
        "recent",
        "reckless",
        "rectangular",
        "ready",
        "real",
        "realistic",
        "reasonable",
        "red",
        "reflecting",
        "regal",
        "regular",
        "reliable",
        "relieved",
        "remarkable",
        "remorseful",
        "remote",
        "repentant",
        "required",
        "respectful",
        "responsible",
        "repulsive",
        "revolving",
        "rewarding",
        "rich",
        "rigid",
        "right",
        "ringed",
        "ripe",
        "roasted",
        "robust",
        "rosy",
        "rotating",
        "rotten",
        "rough",
        "round",
        "rowdy",
        "royal",
        "rubbery",
        "rundown",
        "ruddy",
        "rude",
        "runny",
        "rural",
        "rusty",
        "sad",
        "safe",
        "salty",
        "same",
        "sandy",
        "sane",
        "sarcastic",
        "sardonic",
        "satisfied",
        "scaly",
        "scarce",
        "scared",
        "scary",
        "scented",
        "scholarly",
        "scientific",
        "scornful",
        "scratchy",
        "scrawny",
        "second",
        "secondary",
        "second-hand",
        "secret",
        "self-assured",
        "self-reliant",
        "selfish",
        "sentimental",
        "separate",
        "serene",
        "serious",
        "serpentine",
        "several",
        "severe",
        "shabby",
        "shadowy",
        "shady",
        "shallow",
        "shameful",
        "shameless",
        "sharp",
        "shimmering",
        "shiny",
        "shocked",
        "shocking",
        "shoddy",
        "short",
        "short-term",
        "showy",
        "shrill",
        "shy",
        "sick",
        "silent",
        "silky",
        "silly",
        "silver",
        "similar",
        "simple",
        "simplistic",
        "sinful",
        "single",
        "sizzling",
        "skeletal",
        "skinny",
        "sleepy",
        "slight",
        "slim",
        "slimy",
        "slippery",
        "slow",
        "slushy",
        "small",
        "smart",
        "smoggy",
        "smooth",
        "smug",
        "snappy",
        "snarling",
        "sneaky",
        "sniveling",
        "snoopy",
        "sociable",
        "soft",
        "soggy",
        "solid",
        "somber",
        "some",
        "spherical",
        "sophisticated",
        "sore",
        "sorrowful",
        "soulful",
        "soupy",
        "sour",
        "Spanish",
        "sparkling",
        "sparse",
        "specific",
        "spectacular",
        "speedy",
        "spicy",
        "spiffy",
        "spirited",
        "spiteful",
        "splendid",
        "spotless",
        "spotted",
        "spry",
        "square",
        "squeaky",
        "squiggly",
        "stable",
        "staid",
        "stained",
        "stale",
        "standard",
        "starchy",
        "stark",
        "starry",
        "steep",
        "sticky",
        "stiff",
        "stimulating",
        "stingy",
        "stormy",
        "straight",
        "strange",
        "steel",
        "strict",
        "strident",
        "striking",
        "striped",
        "strong",
        "studious",
        "stunning",
        "stupendous",
        "stupid",
        "sturdy",
        "stylish",
        "subdued",
        "submissive",
        "substantial",
        "subtle",
        "suburban",
        "sudden",
        "sugary",
        "sunny",
        "super",
        "superb",
        "superficial",
        "superior",
        "supportive",
        "sure-footed",
        "surprised",
        "suspicious",
        "svelte",
        "sweaty",
        "sweet",
        "sweltering",
        "swift",
        "sympathetic",
        "tall",
        "talkative",
        "tame",
        "tan",
        "tangible",
        "tart",
        "tasty",
        "tattered",
        "taut",
        "tedious",
        "teeming",
        "tempting",
        "tender",
        "tense",
        "tepid",
        "terrible",
        "terrific",
        "testy",
        "thankful",
        "that",
        "these",
        "thick",
        "thin",
        "third",
        "thirsty",
        "this",
        "thorough",
        "thorny",
        "those",
        "thoughtful",
        "threadbare",
        "thrifty",
        "thunderous",
        "tidy",
        "tight",
        "timely",
        "tinted",
        "tiny",
        "tired",
        "torn",
        "total",
        "tough",
        "traumatic",
        "treasured",
        "tremendous",
        "tragic",
        "trained",
        "tremendous",
        "triangular",
        "tricky",
        "trifling",
        "trim",
        "trivial",
        "troubled",
        "true",
        "trusting",
        "trustworthy",
        "trusty",
        "truthful",
        "tubby",
        "turbulent",
        "twin",
        "ugly",
        "ultimate",
        "unacceptable",
        "unaware",
        "uncomfortable",
        "uncommon",
        "unconscious",
        "understated",
        "unequaled",
        "uneven",
        "unfinished",
        "unfit",
        "unfolded",
        "unfortunate",
        "unhappy",
        "unhealthy",
        "uniform",
        "unimportant",
        "unique",
        "united",
        "unkempt",
        "unknown",
        "unlawful",
        "unlined",
        "unlucky",
        "unnatural",
        "unpleasant",
        "unrealistic",
        "unripe",
        "unruly",
        "unselfish",
        "unsightly",
        "unsteady",
        "unsung",
        "untidy",
        "untimely",
        "untried",
        "untrue",
        "unused",
        "unusual",
        "unwelcome",
        "unwieldy",
        "unwilling",
        "unwitting",
        "unwritten",
        "upbeat",
        "upright",
        "upset",
        "urban",
        "usable",
        "used",
        "useful",
        "useless",
        "utilized",
        "utter",
        "vacant",
        "vague",
        "vain",
        "valid",
        "valuable",
        "vapid",
        "variable",
        "vast",
        "velvety",
        "venerated",
        "vengeful",
        "verifiable",
        "vibrant",
        "vicious",
        "victorious",
        "vigilant",
        "vigorous",
        "villainous",
        "violet",
        "violent",
        "virtual",
        "virtuous",
        "visible",
        "vital",
        "vivacious",
        "vivid",
        "voluminous",
        "wan",
        "warlike",
        "warm",
        "warmhearted",
        "warped",
        "wary",
        "wasteful",
        "watchful",
        "waterlogged",
        "watery",
        "wavy",
        "wealthy",
        "weak",
        "weary",
        "webbed",
        "wee",
        "weekly",
        "weepy",
        "weighty",
        "weird",
        "welcome",
        "well-documented",
        "well-groomed",
        "well-informed",
        "well-lit",
        "well-made",
        "well-off",
        "well-to-do",
        "well-worn",
        "wet",
        "which",
        "whimsical",
        "whirlwind",
        "whispered",
        "white",
        "whole",
        "whopping",
        "wicked",
        "wide",
        "wide-eyed",
        "wiggly",
        "wild",
        "willing",
        "wilted",
        "winding",
        "windy",
        "winged",
        "wiry",
        "wise",
        "witty",
        "wobbly",
        "woeful",
        "wonderful",
        "wooden",
        "woozy",
        "wordy",
        "worldly",
        "worn",
        "worried",
        "worrisome",
        "worse",
        "worst",
        "worthless",
        "worthwhile",
        "worthy",
        "wrathful",
        "wretched",
        "writhing",
        "wrong",
        "wry",
        "yawning",
        "yearly",
        "yellow",
        "yellowish",
        "young",
        "youthful",
        "yummy",
        "zany",
        "zealous",
        "zesty",
        "zigzag",
    ]

module.exports = { adjectives, animals }
},{}],6:[function(require,module,exports){
const { appendPost } = require('./mainHandlers')
const { collapseForm } = require('./formHandlers');
const { Data } = require('./helpers.js');

let url =  "https://haikhoo-server.herokuapp.com";
let pageCounter = 0;
let startIndex = 0;

// let pageCounter = 0;
// let startIndex = 0;




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

},{"./formHandlers":1,"./helpers.js":2,"./mainHandlers":4}]},{},[3]);
