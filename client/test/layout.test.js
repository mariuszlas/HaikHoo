const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('layout of the static index.html webpage', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe('head', () =>{
        it('has correct title', () => {
            const title = document.querySelector('title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('HaikHoo');
        });
    });

    describe('body', ()=>{

        it('has a header with correct title and slogan', () => {
            const header = document.querySelector('header');
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            expect(header).toBeTruthy();
            expect(h1.textContent).toBe('HaikHoo');
            expect(h2.textContent).toBe('..where all your poetries come to a daylight!');
        });

        it('has a post button', () => {
            const postBtn = document.getElementById('#makePost');
            expect(postBtn).toBeDefined();
        });

        it('has a show more posts button', () => {
            const postBtn = document.getElementById('#showMorePosts');
            expect(postBtn).toBeDefined();
        });

        it('has a footer', () => {
            const footer = document.querySelector('footer');
            expect(footer).toBeTruthy();
        });

        it('has a new post form', () => {
            const form = document.querySelector('#new-post-form');
            expect(form).toBeTruthy();
        });
    });
})
