const port = 3000;
const host = 'localhost';

function initBindings() {
  // add event listeners to the static buttons
  post = document.querySelector('#post');
  comment = document.querySelector('#comment');
  like = document.querySelector('#like');
  get = document.querySelector('#get');

  post.addEventListener('click', e => {
    e.preventDefault();
    sendData('posts', opt);
  });

  comment.addEventListener('click', e => {
    e.preventDefault();
    sendDataCom('posts', optCom);
  });

  like.addEventListener('click', e => {
    e.preventDefault();
    sendDataRe('posts', optR);
  });

  get.addEventListener('click', e => {
    e.preventDefault();
    getData('posts');
  });

}

let opt = { method: "POST",
                body: JSON.stringify( {
                    // "author":"Joanne Snow",
                    "title":"Title 3",
                    "date":"392021",
                    "text":"Text content of the post",
                    "gifUrl": ""
                }),
                headers: {'Content-Type': 'application/json'}
            }

let optCom = { method: "PUT",
                body: JSON.stringify({ "comment": "New comment" }),
                headers: {'Content-Type': 'application/json'}
            }

            let optR = { method: "PUT",
                            headers: {'Content-Type': 'application/json'}
                        }

async function sendData(path, options) {
  // send POST request to the server with a name of new animal
  url = `http://${host}:${port}/${path}`;
  try {
    await fetch(url, options)
  } catch (err) {
    console.log(err);
  }
}

async function getData(path) {
  url = `http://${host}:${port}/${path}`;
  try {
    let data = await fetch(url);
    let json = await data.json();
  } catch (err) {
    console.log(err);
  }
}

async function sendDataCom(path, options) {
  // send POST request to the server with a name of new animal
  url = `http://${host}:${port}/${path}/1/comment`;
  try {
    await fetch(url, options)
  } catch (err) {
    console.log(err);
  }
}


async function sendDataRe(path, options) {
  // send POST request to the server with a name of new animal
  url = `http://${host}:${port}/${path}/1/likes`;
  try {
    await fetch(url, options)
  } catch (err) {
    console.log(err);
  }
}


initBindings();

//
// console.log(Object.keys(long).length);
// console.log(Object.keys(short).length);
// console.log(Object.keys(short));
