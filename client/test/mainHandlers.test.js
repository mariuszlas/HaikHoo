const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const mainHandlers = require('../static/js/mainHandlers.js');
global.fetch = require('jest-fetch-mock');   // create mock of the 'fetch' function as a global variable


describe('functionality of fuctions making fetch requests', () => {
    beforeEach( () => {
        fetch.resetMocks();
    });

    it('makes a fetch to haikhoo-server to create a new post', () => {
        mainHandlers.displayPost();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://haikhoo-server.herokuapp.com/posts")
    });

    it('makes new elemnt', () => {
        let newElement = mainHandlers.makeElement('p', 'p-element', 'Text content');
        expect(newElement.tagName).toBe('P');
        expect(newElement.textContent).toBe('Text content');
        expect(newElement.getAttribute('class')).toBe('p-element');
    });

    it('creates body of the post card', () => {
        let divBody = mainHandlers.createBody({title: "Title", author: 'Author', text: 'Text', date: '12112021', gifUrl: ""});
        let pElements = divBody.querySelectorAll('P');
        expect(divBody.tagName).toBe('DIV');
        expect(divBody.getAttribute('class')).toBe('post');
        expect(pElements.length).toBe(4);

    })

})
