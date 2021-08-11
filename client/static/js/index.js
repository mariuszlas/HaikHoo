const { displayPost } = require('./requestHandlers.js');
const { showForm } = require('./formHandlers.js')

function initBindings() {
    document.querySelector('#makePost').addEventListener('click', e => showForm(e));
}

displayPost();
initBindings();
