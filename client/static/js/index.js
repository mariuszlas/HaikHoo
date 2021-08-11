const { displayPost } = require('./requestHandlers.js');
const { showForm } = require('./formHandlers.js')
const { extendPage } = require('./mainHandlers.js')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', e => showForm(e));
    document.querySelector('#showMorePosts').addEventListener('click', e => extendPage(e));

}

displayPost();
initBindings();
