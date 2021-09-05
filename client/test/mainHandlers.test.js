const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const mainHandlers = require('../static/js/mainHandlers.js');
global.fetch = require('jest-fetch-mock');   // create mock of the 'fetch' function as a global variable


describe('functionality of fuctions making fetch requests', () => {
    beforeEach( () => {
        fetch.resetMocks();
    });

    describe('displayPost', () => {

        it('makes a fetch to haikhoo-server to create a new post', () => {
            mainHandlers.displayPost();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("http://localhost:3000/posts")
        });
    })

    describe('makeElement', () => {

        it('makes new element', () => {
            let newElement = mainHandlers.makeElement('p', 'p-element', 'Text content');
            expect(newElement.tagName).toBe('P');
            expect(newElement.textContent).toBe('Text content');
            expect(newElement.getAttribute('class')).toBe('p-element');
        });
    })

    describe('appendPost', () => {
        it('appends a new post to DOM', () => {

        })
    })

    describe('createBody', () => {

        it('creates body of the post card', () => {
            let divBody = mainHandlers.createBody({title: "Title", author: 'Author', text: 'Text', date: '12112021', gifUrl: ""});
            let pElements = divBody.querySelectorAll('P');
            expect(divBody.tagName).toBe('DIV');
            expect(divBody.getAttribute('class')).toBe('post');
            expect(pElements.length).toBe(4);
        })
    })

    describe('createReactions', () => {

        it('creates reactions span element', () => {
            let spanEmoji = mainHandlers.createReactions({reactions: {likes: 1, cries: 2, smiles: 3}});
            let btns = spanEmoji.querySelectorAll('button');
            let spans = spanEmoji.querySelectorAll('span');
            expect(spanEmoji.tagName).toBe('SPAN');
            expect(spanEmoji.getAttribute('class')).toBe('span-emoji');
            expect(btns.length).toBe(3);
            expect(spans.length).toBe(3);
        })
    })

    describe('createComSection', () => {

        it('creates comments div', () => {
            let divComment = mainHandlers.createComSection({comments: ['comment 1', 'comment 2']});
            let pEls = divComment.querySelectorAll('p');
            let form = divComment.querySelectorAll('form');
            expect(divComment.tagName).toBe('DIV');
            expect(divComment.getAttribute('class')).toBe('comments-div');
            expect(pEls.length).toBe(2);
            expect(form).toBeTruthy();
        });
    })

    describe('makeComment', () => {

        it('makes a fetch to haikhooo-server to send a new comment', async () => {
            const event = { preventDefault: jest.fn(), target: [0, {value: 'comment'}] };
            await mainHandlers.makeComment(event);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    })



})
