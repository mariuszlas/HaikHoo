
const { showForm } = require('./formHandlers.js')
const { extendPage, displayPost} = require('./mainHandlers.js')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', e => showForm(e));
    document.querySelector('#showMorePosts').addEventListener('click', e => extendPage(e));

}

displayPost(1, 0);
initBindings();
